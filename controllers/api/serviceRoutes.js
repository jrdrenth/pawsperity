const router = require('express').Router();
const { Service, ServiceCategory } = require('../../models/');
//const withAuth = require('../../utils/auth');

// ===== Service Categories =====
// Create
router.post('/categories/', async (req, res) => {
  try {
    const newServiceCategory = await ServiceCategory.create(req.body);
    res.status(200).json(newServiceCategory);

  } catch (err) {
    res.status(500).json(err);
  }
});


// Read all
router.get('/categories/', async (req, res) => {
  try {
    const serviceCategories = await ServiceCategory.findAll();
    res.status(200).json(serviceCategories);

  } catch (err) {
    res.status(500).json(err);
  }
});


// Read by id
router.get('/categories/:id', async (req, res) => {
  try {
    const serviceCategory = await ServiceCategory.findByPk(req.params.id);

    if (serviceCategory != null) {
      res.status(200).json(serviceCategory);
    } else {
      res.status(404).json({ message: `No service category found with id: ${req.params.id}` });
    }    
  
  } catch (err) {
    res.status(500).json(err);
  }
});


// Update
//router.put('/:id', withAuth, async (req, res) => {
router.put('/categories/:id', async (req, res) => {
  try {
    const [affectedRowCount] = await ServiceCategory.update(req.body, { where: { id: req.params.id } });

    if (affectedRowCount > 0) {
      res.status(200).json(affectedRowCount);
    } else {
      res.status(404).json(affectedRowCount);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


// Delete
router.delete('/categories/:id', async (req, res) => {
  try {
    const isDeleted = await ServiceCategory.destroy({ where: { id: req.params.id } });

    if (isDeleted != 0) {
      res.status(200).json(isDeleted);
    } else {
      res.status(404).json(isDeleted);
    }

  } catch (err) {
    res.status(500).json(err);
  }
});


// ===== Services =====
// Create
router.post('/', async (req, res) => {
  try {
    const newService = await Service.create(req.body, { 
      include: [{ model: ServiceCategory }],
      attributes: { exclude: ['service_category_id'] },
      order: [['id', 'asc']]
    });
    res.status(200).json(newService);

  } catch (err) {
    res.status(500).json(err);
  }
});


// Read all
router.get('/', async (req, res) => {
  try {
    const service = await Service.findAll({ 
      include: [{ model: ServiceCategory }],
      attributes: { exclude: ['service_category_id'] },
      order: [['id', 'asc']]
    });
    res.status(200).json(service);

  } catch (err) {
    res.status(500).json(err);
  }
});


// Read by id
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);

    if (service != null) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: `No service found with id: ${req.params.id}` });
    }    
  
  } catch (err) {
    res.status(500).json(err);
  }
});


// Update
router.put('/:id', async (req, res) => {
  try {
    const [affectedRowCount] = await Service.update(req.body, { where: { id: req.params.id } });

    if (affectedRowCount > 0) {
      res.status(200).json(affectedRowCount);
    } else {
      res.status(404).json(affectedRowCount);
    }

  } catch (err) {
    res.status(500).json(err);
  }
});


// Delete
router.delete('/:id', async (req, res) => {
  try {
    const isDeleted = await Service.destroy({ where: { id: req.params.id } });

    if (isDeleted != 0) {
      res.status(200).json(isDeleted);
    } else {
      res.status(404).json(isDeleted);
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
