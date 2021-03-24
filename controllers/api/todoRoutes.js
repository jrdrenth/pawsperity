const router = require('express').Router();
const { Todo } = require('../../models/');
// const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    req.session.user_id = 1;
    
    console.log(req.body);
    const newTodo = await Todo.create({
      ...req.body, user_id: req.session.user_id,
    });
    res.json(newTodo);

  } catch (err) {
    res.status(500).json(err);
  }
});

// router.put('/todo/:id', withAuth, async (req, res) => {
//   try {
//     const [affectedRows] = await Post.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (affectedRows > 0) {
//       res.status(200).end();
//     } else {
//       res.status(404).end();
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;