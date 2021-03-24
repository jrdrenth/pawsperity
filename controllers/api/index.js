const router = require('express').Router();

const userRoutes = require('./userRoutes');
const todoRoutes = require('./todoRoutes');
const petRoutes = require('./petRoutes');

router.use('/users', userRoutes);
router.use('/todos', todoRoutes);
router.use('/pets', petRoutes);


module.exports = router;