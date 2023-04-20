const router = require('express').Router();
const { User } = require('../../models');


router.get('/', async (req, res) => {
res.send("This is the user route!");
});

module.exports = router;