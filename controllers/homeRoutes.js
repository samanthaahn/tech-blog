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

router.get("/viewpost/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id,
    { include: [User, Comment] },
  );
  
  if (!postData) {
    res.status(404).json({ message: "No post found! Try again." });
    return;
  }
  const post = postData.get({plain:true})

  res.status(200).render("viewpost", {post});
} catch (error) {
  console.log(error);
  res.status(500).json(error);
}
});

module.exports = router; 
