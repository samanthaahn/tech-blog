const router = require("express").Router();

const { User, Comment, Post } = require('../models');


router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }, { model: Comment }],
    });
    const posts = postData.map(post => post.get({plain:true}))
    res.render('homepage', {posts});
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get("/createpost", async (req, res) => {
  res.render("createpost");
});

router.get("/dashboard", async (req, res) => {
  res.render("dashboard");
});

router.get("/editpost", async (req, res) => {
  res.render("editpost");
});

router.get("/login", async (req, res) => {
  if (req.session.loggedIn) {
  res.redirect('/');
  return;
  }
  res.render("login");
});

router.get("/signup", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
    }
  res.render("signup");
});

router.get("/viewpost", async (req, res) => {
  res.render("viewpost");
});

module.exports = router; 
