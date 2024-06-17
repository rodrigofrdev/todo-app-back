const todoConstraints = {
  title: {
    type: "string",
    presence: true,
    length: {
      maximum: 255,
    },
  },
  completed: {
    type: "boolean",
    presence: true,
  },
};

module.exports = todoConstraints;
