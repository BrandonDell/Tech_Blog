const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// get all posts for homepage
router.get('/', async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        const postData = await Post.findAll({
            include: [User],
        });
        // Takes array postData converts into a readable object with get/plain/true  
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts);
        // sends serialized data into template
        res.render('allPosts', {
            posts,
            loggedIn: req.session.loggedIn,
            currentPage: 'Home',
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
       
// get single post
router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          User,
          {
            model: Comment,
            include: [User],
          },
        ],
      });
  
      if (postData) {
        const post = postData.get({ plain: true });
  
        res.render('single-post', { post, currentPage: 'Home' });
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
});
        
// Need Router get for login and signup. 
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  
  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('signup', { currentPage: 'Home' });
  });
module.exports = router;