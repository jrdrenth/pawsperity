const router = require('express').Router();
const { Todo } = require('../../models/');
// const withAuth = require('../../utils/auth');


// Create
router.post('/', async (req, res) => {
  try {
    //// TEMPORARY ////
    if (req.session.user_id == null) {
      req.session.user_id = 1;
    }

    const requestedTodo = { ...req.body, user_id: req.session.user_id };
    
    console.log('\nNew Todo Request:');
    console.log(requestedTodo);
    console.log();

    const newTodo = await Todo.create(requestedTodo);
    res.status(200).json(newTodo);

  } catch (err) {
    res.status(500).json(err);
  }
});


// Read all
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);

  } catch (err) {
    res.status(500).json(err);
  }
});


// Read by id
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);

    if (todo != null) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ message: `No todo found with id: ${req.params.id}` });
    }    
  
  } catch (err) {
    res.status(500).json(err);
  }
});



// Read by user_id
router.get("/byuserid/:id", async (req, res) => {
  try {
      const todos = await Todo.findAll({
          where: { user_id: req.params.id },
          order: [["id", "asc"]]
      });

      if (todos != null) {
          res.status(200).json(todos);
      } else {
          res.status(404).json({ message: `No todos found` });
      }

  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});


// Update
//router.put('/:id', withAuth, async (req, res) => {
router.put('/:id', async (req, res) => {
  console.log("REACHED PUT")
  try {
    const todoCheck = await Todo.update(req.body, { where: { id: req.params.id } });

  } catch (err) {
    res.status(500).json(err);
  }
  console.log("REACHED PUT")
});


// Delete
router.delete('/:id', async (req, res) => {
  try {
    const isDeleted = await Todo.destroy({ where: { id: req.params.id } });

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