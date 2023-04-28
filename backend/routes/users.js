const userController = require('../controllers/users');
const { getUsers, getUser, createUser, updateUser, deleteUser, login } = userController;
const router = require('express').Router();

// CRUD Routes /users
router.get('/', getUsers); // /users
router.get('/:userId', getUser); // /users/:userId
router.post('/', createUser); // /users
router.put('/:userId', updateUser); // /users/:userId
router.delete('/:userId', deleteUser); // /users/:userId
router.post('/login', login ) // /users/login

module.exports = router;