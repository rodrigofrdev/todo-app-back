const express = require('express');

const isAuth = require('../middlewares/isAuth');
const todoController = require('../controllers/todo');

const router = express.Router();

router.get('/', isAuth, todoController.getTodos);

router.post('/add-todo', isAuth, todoController.postTodo);

router.post('/delete-todo', isAuth, todoController.deleteTodo);

router.post('/update-todo', isAuth, todoController.updateTodo);

module.exports = router;
