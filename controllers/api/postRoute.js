const router = require('express').Router();
const { Post, User, Comment } = require('../../models');


//Get all posts
router.get('/', async (req, res) => {
try {
    const postData = await Post.findAll({
        include: [{ model:User}, {model: Comment}],
    });
    res.status(200).json(postData);
} catch (error) {
    res.status(500).json(error);
}
});

//Get one post
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.find(req.params.id, {
            include: [{ model: User}, {model: Comment}],
        });
    if (!postData) {
        res.status(404).json({message: 'No post found! Try again.'});
        return;
    }
    res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Add a post 
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
          title: req.body.title,
          content: req.body.content,
          user_id: req.body.user_id,  
        });
        res.status(201).json(newPost)
    } catch (error) {
        console.error("Error in POST /:", err);
        res.status(400).json({ message: "Bad Request", error: err }); 
    }
})

module.exports = router;