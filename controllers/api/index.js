const router = require('express').Router();

// const userRoutes = require('./user-routes.js');
const todoRoutes = require('./todoRoutes');
// const commentRoutes = require('./comment-routes');

// router.use('/user', userRoutes);
router.use('/todo', todoRoutes);
// router.use('/comment', commentRoutes);

module.exports = router;