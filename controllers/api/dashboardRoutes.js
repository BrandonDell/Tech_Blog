const router = require('express').Router();
const { Post } = require('../models/');
const { withGuard, apiGuard, withoutGuard } = require('../utils/authGaurd');


// get all posts for homepage
router.get('/', withGuard, async (req, res) => {
    try {
      const postData = await Post.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });
   // Takes array postData converts into a readable object with get/plain/true 
      const posts = postData.map((post) => post.get({ plain: true }));
      console.log(posts);
      // Pass serialized data into template
      res.render('dashboard', {
        posts,
        loggedIn: req.session.loggedIn,
        currentPage: 'Dashboard',
      });
    } catch (err) {
      res.redirect('/login');
    }
});
  
// get single post
router.get('/update/:id', withGuard, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('editPost', {
        post,
        currentPage: 'Dashboard',
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('/login');
  }
});
module.exports = router;