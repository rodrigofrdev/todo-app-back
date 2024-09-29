
const signupConstraints = {
  name: {
    presence: {
      allowEmpty: false,
      message: "do not be empty",
    },
    length: {
      maximum: 255,
    },
  },
  email: {
    presence: {
      allowEmpty: false,
      message: "do not be empty",
    },
    email: true,
    length: {
      maximum: 255,
    },
  },
  cellphone: {
    presence: {
      allowEmpty: false,
      message: "do not be empty",
    },
    length: {
      maximum: 255,
    },
    format: {
      pattern: "[0-9]+",
      flags: "i",
      message: "can only contain numbers",
    },
  },
  password: {
    presence: {
      allowEmpty: false,
      message: "do not be empty",
    },
    length: {
      minimum: 5,
      maximum: 255,
    },
  },
};

module.exports = signupConstraints;
