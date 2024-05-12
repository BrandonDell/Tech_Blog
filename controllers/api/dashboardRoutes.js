const router = require('express').Router();
const { Post } = require('../models/');


// get all posts for homepage
router.get('/', withGuard, async (req, res) => {
    try {
      const postData = await Post.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('dashboard', {
        posts,
        loggedIn: req.session.loggedIn,
        currentPage: 'Dashboard',
      });
    } catch (err) {
      res.redirect('/login');
    }
  });