const taskController = require('../controllers/tasks');
const { getTasks, getTask, createTask, updateTask, deleteTask } = taskController;
const router = require('express').Router();

// Task CRUD Routes /tasks
router.get('/', getTasks); // /tasks
router.get('/:taskId', getTask); // /tasks/:taskId
router.post('/', createTask); // /tasks
router.put('/:taskId', updateTask); // /tasks/:taskId
router.delete('/:taskId', deleteTask); // /tasks/:taskId

module.exports = router;