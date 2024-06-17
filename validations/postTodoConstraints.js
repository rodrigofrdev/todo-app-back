
const postTodoConstraints = {
    title: {
      presence: {
        allowEmpty: false,
        message: "Title do not be empty",
      },
      length: {
        maximum: 255,
      },
    },
  };
  
  module.exports = postTodoConstraints;
  