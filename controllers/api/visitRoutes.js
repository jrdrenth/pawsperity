const router = require('express').Router();
const { Visit, User } = require('../../models');
// const { Visit } = require('../../models');
//const withAuth = require('../../utils/auth');

// ===== Visit =====
// Create
router.post('/', async (req, res) => {
  try {
   
    const requestedVisit = { ...req.body };
    console.log(requestedVisit)
    const newVisit = await Visit.create(requestedVisit);
    
    console.log(requestedVisit)
    res.status(200).json(newVisit);

  } catch (err) {
    res.status(500).json(err);
  }
});


// Read all
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.findAll({ 
      include: [{ model: PetType, attributes: ['name'] }, { model: User, attributes: ['name'] }],
      attributes: { exclude: ['owner_id', 'pet_type_id', 'createdAt', 'updatedAt'] },
      order: [
        ['id', 'asc'],                  // this orders first by Pet.id
        //[{ model: Visit }, 'id', 'asc']   // this orders second by Visit.id
      ]
    });
    res.status(200).json(pets);

  } catch (err) {
    res.status(500).json(err);
  }
});


// Read by id
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);

    if (pet != null) {
      res.status(200).json(pet);
    } else {
      res.status(404).json({ message: `No pet found with id: ${req.params.id}` });
    }    
  
  } catch (err) {
    res.status(500).json(err);
  }
});


// Read by user_id
router.get('/byuserid/:id', async (req, res) => {
  try {
    console.log('\nBEFORE');

    const pets = await Pet.findAll({
      where: { owner_id: req.params.id },
      include: [{ model: PetType, attributes: ['name'] }, { model: User, attributes: ['name'] }],
      attributes: { exclude: ['owner_id', 'pet_type_id', 'createdAt', 'updatedAt'] },
      order: [['id', 'asc']]
    });

    console.log('\nAFTER\n');

    if (pets != null) {
      res.status(200).json(pets);
    } else {
      res.status(404).json({ message: `No pets found` });
    }    
  
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Update
//router.put('/:id', withAuth, async (req, res) => {
router.put('/:id', async (req, res) => {
  try {
    const [affectedRowCount] = await Pet.update(req.body, { where: { id: req.params.id } });

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
    const isDeleted = await Pet.destroy({ where: { id: req.params.id } });

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
