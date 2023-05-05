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


router.get("/dashboard", async (req, res) => {
  res.render("dashboard");
});

router.get("/comment", async (req, res) => {
  try {
    await Comment.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
    const updatedComment = await Comment.findByPk(req.params.id);
    const newComment = updatedComment.get({plain:true})
    
    res.status(200).render(newComment);
} catch (error) {
    console.error('Error with this comment:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
}
res.render("comment");
});


router.get("/createpost", async (req, res) => {
  res.render("createpost");
});

router.get("/editpost", async (req, res) => {
  res.render("editpost");
});

router.get("/deletepost", async (req, res) => {
  res.render("deletepost");
});

// This allows the user to login to the webpage
router.get("/login", async (req, res) => {
  if (req.session.loggedIn) {
  res.redirect('/');
  return;
  }
  res.render("login");
});

// This helps the user signup for an account 
router.get("/signup", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
    }
  res.render("signup");
});

// This is to view a specific post
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

  res.status(200).render("viewpost", {post, loggedIn: req.session.loggedIn});
} catch (error) {
  console.log(error);
  res.status(500).json(error);
}
});

module.exports = router; 
