const loginConstraints = {
    email: {
      presence: {
        allowEmpty: false,
        message: "E-mail do not be empty",
      },
      email: true,
      length: {
        maximum: 255,
      },
    },
    password: {
      presence: {
        allowEmpty: false,
        message: "Password do not be empty",
      },
      length: {
        minimum: 5,
        maximum: 255,
      },
    },
  };
  
  module.exports = loginConstraints;
  