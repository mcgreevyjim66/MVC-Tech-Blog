const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  console.log("*************************************homeroutes.js / " + req)
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', withAuth, async (req, res) => {
  console.log("*************************************homeroutes.js /blog:id" + req)
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['blog_id', 'comment', 'comment_created_by', 'date_comment_created'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });
    console.log("*************************************homeroutes.js /blog:id blogData", blog)

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogout/:id', async (req, res) => {
  console.log("*************************************homeroutes.js /blogout:id" + req)
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['blog_id', 'comment', 'comment_created_by', 'date_comment_created'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    let same_user = false;
    
    if (blog.user.name === req.session.user_name){
      same_user = true
    }
    console.log("*************************************homeroutes.js /blog:id blogData", blog)

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in,
      same_user: same_user
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  console.log("*************************************homeroutes.js /dashboard" + req)
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//render the new post page
router.get("/newpost", (req, res) => {
  if (req.session.logged_in) {
    res.render("newpost");
    return;
  }
  res.redirect("/login");
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  console.log("*************************************homeroutes.js /login" + req)
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
