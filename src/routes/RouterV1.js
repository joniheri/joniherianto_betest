const express = require('express');
const router = express.Router();

// import middlewares
const { middleware } = require('../middlewares/AuthMiddleware');

// import controllers
const { login } = require('../controller/AuthController');
const {
  getUserDummy,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require('../controller/UserController');
const { addPost, getPosts } = require('../controller/PostController');

// import seeders
const { userSeederDummy, userSeeder } = require('../seeders/UserSeeder');

// Seeder Router
router.post('/userseeder-dummy', userSeederDummy);
router.post('/userseeder', userSeeder);

// Auth Router
router.post('/login', login);

// User Router
router.get('/user-dummies', getUserDummy);
router.get('/user-dummies-middleware', middleware, getUserDummy);
router.get('/users', middleware, getUsers);
router.post('/user', middleware, addUser);
router.patch('/user/:id', middleware, updateUser);
router.delete('/user', middleware, deleteUser);

// Post Router
router.post('/post', addPost);

module.exports = router;
