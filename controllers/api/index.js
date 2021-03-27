const router = require('express').Router();

const userRoutes = require('./userRoutes');
const todoRoutes = require('./todoRoutes');
const petRoutes = require('./petRoutes');
const serviceRoutes = require('./serviceRoutes');

router.use('/users', userRoutes);
router.use('/todos', todoRoutes);
router.use('/pets', petRoutes);
router.use('/services', serviceRoutes);

module.exports = router;
