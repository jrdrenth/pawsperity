const router = require('express').Router();

const petRoutes = require('./petRoutes');
const serviceRoutes = require('./serviceRoutes');
const todoRoutes = require('./todoRoutes');
const userRoutes = require('./userRoutes');
const visitRoutes = require('./visitRoutes');

router.use('/pets', petRoutes);
router.use('/services', serviceRoutes);
router.use('/todos', todoRoutes);
router.use('/users', userRoutes);
router.use('/visits', visitRoutes);

module.exports = router;
