const router = require('express').Router();
const { User } = require('../../models');

//register route
router.post('/', async (req, res) => {
try {
    const userData = await User.create({
        username: req.body.username,
        password: req.body.password
    });
    req.session.save(() => {
        req.session.userId = userData.id;
        req.session.loggedIn = true;
        res.status(200).json('User successfully created!');
    })
} catch (error) {
    res.status(400).json('User could not be created. Please try again!');
}
});

//login route
router.post('/', async (req, res) => {

});

//logout
router.post('/', async (req, res) => {

});

module.exports = router;