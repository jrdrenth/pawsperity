const router = require('express').Router();
const { Service, ServiceCategory, ServiceProvider, ServiceProvided } = require('../../models/');
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


// ===== Service Providers =====
// Create
router.post('/providers/', async (req, res) => {
  try {
    const newServiceProvider = await ServiceProvider.create(req.body, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [
        ["id", "asc"],
      ],
    });
    res.status(200).json(newServiceProvider);

  } catch (err) {
    res.status(500).json(err);
  }
});


// Read all
router.get('/providers/', async (req, res) => {
  try {
    const newServiceProviders = await ServiceProvider.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [
        ["id", "asc"],
      ],
    });
    res.status(200).json(newServiceProviders);

  } catch (err) {
    res.status(500).json(err);
  }
});


// Read by id
router.get('/providers/:id', async (req, res) => {
  try {
    const serviceProvider = await ServiceProvider.findByPk(req.params.id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [
        ["id", "asc"],
      ],
    });

    if (serviceProvider != null) {
      res.status(200).json(serviceProvider);
    } else {
      res.status(404).json({ message: `No service provider found with id: ${req.params.id}` });
    }    
  
  } catch (err) {
    res.status(500).json(err);
  }
});


// Update
router.put('/providers/:id', async (req, res) => {
  try {
    const [affectedRowCount] = await ServiceProvider.update(req.body, {
        where: { id: req.params.id } 
      }
    );

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
router.delete('/providers/:id', async (req, res) => {
  try {
    const isDeleted = await ServiceProvider.destroy({ where: { id: req.params.id } });

    if (isDeleted != 0) {
      res.status(200).json(isDeleted);
    } else {
      res.status(404).json(isDeleted);
    }

  } catch (err) {
    res.status(500).json(err);
  }
});


// ===== Service Provided =====
// Create
router.post('/provided/', async (req, res) => {
  try {
    const newServiceProvided = await ServiceProvided.create(req.body);
    res.status(200).json(newServiceProvided);

  } catch (err) {
    res.status(500).json(err);
  }
});


// Read all
router.get("/provided/", async (req, res) => {
  try {
    const servicesProvided = await ServiceProvided.findAll({
      attributes: { exclude: ['visit_id', 'service_id'] },
      include: [{
        model: Service,
        attributes: ['name'],
        include: [{
          model: ServiceCategory,
          attributes: ['name'] 
        }]
      }],
      order: [
        ['id', 'asc'],
      ]
    });
    res.status(200).json(servicesProvided);

  } catch (err) {
    res.status(500).json(err);
  }
});


// Read by id
router.get("/provided/:id", async (req, res) => {
  try {
    const serviceProvided = await ServiceProvided.findByPk(req.params.id, {
      attributes: { exclude: ['visit_id', 'service_id'] },
      include: [{
        model: Service,
        attributes: ['name'],
        include: [{
          model: ServiceCategory,
          attributes: ['name'] 
        }]
      }],
      order: [
        ['id', 'asc'],
      ]
    });
    
    if (serviceProvided != null) {
      res.status(200).json(serviceProvided);
    } else {
      res.status(404).json({ message: `No pet found with id: ${req.params.id}` });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});


// Read by visit_id
router.get("/provided/byvisitid/:id", async (req, res) => {
  try {
    const servicesProvided = await ServiceProvided.findAll({
      attributes: { exclude: ['visit_id', 'service_id'] },
      include: [{
        model: Service,
        attributes: ['name'],
        include: [{
          model: ServiceCategory,
          attributes: ['name'] 
        }]
      }],
      order: [
        ['id', 'asc'],
      ]
    });

    if (servicesProvided != null) {
      res.status(200).json(servicesProvided);
    } else {
      res.status(404).json({ message: `No services provided found` });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Update
router.put("/provided/:id", async (req, res) => {
  try {
    const [affectedRowCount] = await ServiceProvided.update(req.body, {
      where: { id: req.params.id },
    });

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
router.delete("/provided/:id", async (req, res) => {
  try {
    const isDeleted = await ServiceProvided.destroy({ where: { id: req.params.id } });

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
