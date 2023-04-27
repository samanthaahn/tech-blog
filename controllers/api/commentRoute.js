const router = require('express').Router();
const { Comment } = require('../../models');

// This is to comment on a post
router.post('/', async (req, res) => {
try {
    const {post_id, content, user_id} = req.body;

    const newComment = await Comment.create({
        post_id,
        content,
        user_id: req.session.userId
    });
    res.status(200).json(newComment);
} catch (error) {
    console.error('Error with this post:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
}
});

module.exports = router;