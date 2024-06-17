const User = require("../models/user");
const bcrypt = require("bcryptjs");
const loginConstraints = require("../validations/loginConstraints");
const signupConstraints = require("../validations/signupConstraints");
const validate = require("validate.js");

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const cellphone = req.body.cellphone;
  const password = req.body.password;

  const fieldsToValidate = { name, email, cellphone, password };
  const validation = validate(fieldsToValidate, signupConstraints);

  if (validation) {
    return res.status(400).json({ message: validation });
  }

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        User.create({
          name: name,
          email: email,
          cellphone: cellphone,
          password: hashedPassword,
        });
      });
    })
    .then((result) => {
      res.status(201).json({ message: "User created" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const fieldsToValidate = { email, password };
  const validation = validate(fieldsToValidate, loginConstraints);

  if (validation) {
    return res.status(400).json({ message: validation });
  }

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      return bcrypt.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save((err) => {
            if (err) {
              res.status(500).json({ message: "Internal server error" });
            }
            res.status(200).json({ message: "Logged in" });
          });
        }
        res.status(400).json({ message: "Incorrect password" });
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.status(200).json({ message: "Logged out" });
  });
};