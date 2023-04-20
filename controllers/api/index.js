const router = require('express').Router();
const userRoutes = require('./userRoute');
const commentRoute = require('./commentRoute');
const postRoute = require('./postRoute');

router.use('/users', userRoutes);
router.use('/posts', postRoute);
router.use('/comments', commentRoute);

module.exports = router;
