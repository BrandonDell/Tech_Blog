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
// Add a post
router.post('/', async (req, res) => {
  try {
    const dashboardData = await Category.create(req.body);
    res.status(200).json(dashboardDataData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
  const dashboardData = await Category.findByPk(req.params.id);
  if (!categoryData) {
    res.status(404).json({ message: 'No categor with this id!' });
    return;
  }
  await dashboardData.destroy();
  res.status(200).json({ message: 'Content deleted successfully' });
  } catch (err) {
  res.status(500).json(err);
  }
});
module.exports = router;