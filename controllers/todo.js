const Todo = require("../models/todo");
const postTodoConstraints = require("../validations/postTodoConstraints");
const validate = require("validate.js");

exports.getTodos = (req, res) => {
  const { id } = req.session.user;

  Todo.findAll({ where: { userId: id }, order: [["createdAt", "DESC"]] })
    .then((todos) => {
      res.status(200).json(todos);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.postTodo = (req, res, next) => {
  let { title } = req.body;

  const fieldsToValidate = { title };
  const validation = validate(fieldsToValidate, postTodoConstraints);

  if (validation) {
    return res.status(400).json({ message: validation });
  }

  Todo.findOne({ where: { title: title, userId: req.user.id } })
  .then((todo) => {
    if (todo) {
      return res.status(400).json({ message: "Todo already exists" });
    } else {
      return req.user.createTodo({
        title: title,
      })
      .then((todo) => {
        res.status(201).json({ message: "Todo created" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      });
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  });

};

exports.updateTodo = (req, res, next) => {
  const { id } = req.body;
  let { title, completed } = req.body;

  const fieldsToValidate = { title, completed };

  const validation = validate(fieldsToValidate, postTodoConstraints);

  if (validation) {
    return res.status(400).json({ message: validation });
  }

  Todo.findByPk(id)
    .then((todo) => {
      todo.title = title;
      todo.completed = completed;
      return todo.save();
    })
    .then(() => {
      res.status(200).json({ message: "Todo updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.deleteTodo = (req, res, next) => {
  const { id } = req.body;

  Todo.findByPk(id)
    .then((todo) => {
      return todo.destroy();
    })
    .then(() => {
      res.status(200).json({ message: "Todo deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};
