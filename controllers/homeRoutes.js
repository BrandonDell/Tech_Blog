const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const { withAuth } = require('../utils/auth');

router.get('/allPosts', async (req, res) => {
  try {
    const postData = await Post.findAll({
      limit: 20,
    });
    const post = postData.map((post) => post.get({ plain: true }));
    console.log('!!!!!');
    console.log(post);
    res.render('allPosts', { post });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // Check to see if user is logged in..truthy
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // if statement is falsy render the login in form
  res.render('login');
});

router.get('/signup', (req, res) => {
  // Check to see if user is logged in..truthy
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // if statement is falsy render the login in form
  res.render('signup', { currentPage: 'Home' });
});

router.get('/addPost', (req, res) => {
  try {
    res.render('addPost');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get('/homepage', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;

// get single post router
// router.get('/post/:id', async (req, res) => {
//     try {
//       // findByPk (find by primary key)
//       const postData = await Post.findByPk(req.params.id, {
//         include: [
//           User,
//           {
//             model: Comment,
//             include: [User],
//           },
//         ],
//       });
//   // if found sequelize model into JS object using get/plain/true method
//       if (postData) {
//         const post = postData.get({ plain: true });

//         res.render('singlePost', { post, currentPage: 'Home' });
//       } else {
//         res.status(404).end();
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
// });
