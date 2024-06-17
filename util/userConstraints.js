const userConstraints = {
  name: {
    type: 'string',
    presence: true,
    length: {
      maximum: 255,
    },
  },
  email: {
    presence: true,
    email: true, // Validar se é um formato de email válido
    length: {
      maximum: 255,
    },
  }
};

module.exports = userConstraints;
