const router = require('express').Router();

const userRoutes = require('./userRoutes');
const todoRoutes = require('./todoRoutes');
// const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/todos', todoRoutes);
// router.use('/comment', commentRoutes);

module.exports = router;