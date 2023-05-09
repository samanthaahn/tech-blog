const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

//Get all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }, { model: Comment }],
    });
    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get one post
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findOne(
      {
        where: {
          id: req.params.id,
        },
      },
      { include: [{ model: User }, { model: Comment }] }
    );
    if (!postData) {
      res.status(404).json({ message: "No post found! Try again." });
      return;
    }
    res.status(200).json(postData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Add a post
router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create({
      // ...req.body,
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.userId,
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error in POST /:", err);
    res.status(400).json({ message: "Bad Request", error: err });
  }
});

// This route is to edit a post
router.post('/edit/:id', async (req, res, next) => {
  try {
    await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    const updatedPost = await Post.findByPk(req.params.id);
    res.redirect('/dashboard')
  } catch (error) {
    next(error);
  }
});

// This route is used to delete a post
router.delete('/:id', async (req, res) => {
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
});

module.exports = router;
