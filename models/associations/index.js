const User = require("../user");
const Todo = require("../todo");

/**
 * Define as associações entre as entidades User e Todo.
 * Esta função configura as relações onde um usuário pode ter muitos todos,
 * e um todo pertence a um único usuário.
 */
function defineAssociations() {
  // Define a associação User.hasMany(Todo):
  // Um usuário pode ter muitos todos.
  User.hasMany(Todo);

  // Define a associação Todo.belongsTo(User):
  // Um todo pertence a um único usuário.
  Todo.belongsTo(User);
}

// Exporta a função defineAssociations para ser utilizada em outras partes da aplicação.
module.exports = defineAssociations;
