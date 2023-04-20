const router = require('express').Router();
const { Comment } = require('../../models');


router.get('/', async (req, res) => {
res.send("This is a comment!");
});

module.exports = router;