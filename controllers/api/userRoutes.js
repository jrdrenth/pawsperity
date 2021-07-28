const router = require('express').Router();
const { User } = require('../../models');
const { ValidationError } = require('sequelize');

const moment = require('moment');
moment().format();

router.get('/', async (req, res) => {
  try {
    const currentDate  = moment();
    const today = moment(moment().format('YYYY-MM-DD'));
    const tomorrow = moment(moment().format('YYYY-MM-DD')).add(1, 'days');
    
    console.log('Today:');
    console.log(today);
    console.log('Tomorrow:');
    console.log(tomorrow);

    const users = await User.findAll();
    res.status(200).json(users);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (user != null) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: `No user found with id: ${req.params.id}` });
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.status(200).json(newUser);
    });

  } catch (err) {
    // message = err
    // if (err instanceof ValidationError) {

    //   message = err.errors[0].message
    // }
    res
      .status(400)
      .json(err);

  }
});

router.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log(userData)

    if (!userData) {
      console.log('reached here!!')
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/:id', async (req, res) => {
  try {
    const result = await User.update(req.body, { where: { id: req.params.id } });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
