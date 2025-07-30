const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const taskController = require('../controllers/taskController');

router.use(verifyToken); // захищає всі роутери

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
