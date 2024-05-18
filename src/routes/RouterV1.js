const express = require('express');
const router = express.Router();
const { userData: userDataDummy } = require('../data/DataDummies');

// import middlewares
const { middleware } = require('../middlewares/AuthMiddleware');

// import controllers
const { dataDummy } = require('../controller/UserController');
const { login } = require('../controller/AuthController');

// import seeders
const { userSeederDummy } = require('../seeders/UserSeeder');

// Auth Router
router.post('/login', login);

// User Router
router.get('/dummies', dataDummy);
router.get('/userseeder', userSeederDummy);
router.get('/user-dummies', middleware, (_, res) => {
  return res.send({
    status: 'success',
    message: `Get user dummies Success`,
    data: userDataDummy,
  });
});

module.exports = router;
