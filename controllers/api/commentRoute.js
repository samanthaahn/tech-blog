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
    console.error('Error with this comment:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
}
});

// This is to edit a comment 
router.put('/:id', async (req, res) => {
    try {
        await Comment.update(req.body, {
            where: {
                id: req.params.id,
            },
        })
        const updatedComment = await Comment.findByPk(req.params.id);
        res.status(200).json(updatedComment);
    } catch (error) {
        console.error('Error with this comment:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error });
    }
})

module.exports = router;