const router = require('express').Router();
const { Post } = require('../../models');


router.get('/', async (req, res) => {
res.send("This is a blog post!");
});

module.exports = router;