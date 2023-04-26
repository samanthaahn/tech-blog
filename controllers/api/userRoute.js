const router = require('express').Router();
const { User } = require('../../models');

//register route
router.post('/register', async (req, res) => {
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
router.post('/login', async (req, res) => {
try {
    const userData = await User.findOne({where: {username: req.body.username}});
    if (!userData) {
        res.status(400).json('No user found with that username!')
        return;
    }
    const validPassward = await userData.checkPassword(req.body.password);
    if(!validPassward) {
        res.status(400).json('Please try again!');
        return;
    }
    req.session.save(() =>{
        req.session.userId = userData.id;
        req.session.loggedIn = true;
        res.status(200).json('You are successfully logged in!');
    })
} catch (error) {
    res.status(400).json('Unable to login! Please try again.');
}
});

//logout
router.post('/', async (req, res) => {

});

module.exports = router;