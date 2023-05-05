const router = require("express").Router();

const { User, Comment, Post } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }, { model: Comment }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", { posts });
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
    });
    const updatedComment = await Comment.findByPk(req.params.id);
    const newComment = updatedComment.get({ plain: true });

    res.status(200).render(newComment);
  } catch (error) {
    console.error("Error with this comment:", error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
  res.render("comment");
});

router.get("/createpost", async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id,
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error in POST /:", err);
    res.status(400).json({ message: "Bad Request", error: err });
  }
  res.render("createpost");
});

router.get("/editpost", async (req, res) => {
  try {
    await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    const updatedPost = await Post.findByPk(req.params.id);
    res.redirect("/dashboard");
  } catch (error) {
    next(error);
  }
  res.render("editpost");
});

router.get("/deletepost", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(postData);
  } catch (error) {
    res.status(404).json(error);
  }
  res.render("deletepost");
});

// This allows the user to login to the webpage
router.get("/login", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// This helps the user signup for an account
router.get("/signup", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

// This is to view a specific post
router.get("/viewpost/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [User, Comment],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found! Try again." });
      return;
    }
    const post = postData.get({ plain: true });

    res
      .status(200)
      .render("viewpost", { post, loggedIn: req.session.loggedIn });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
