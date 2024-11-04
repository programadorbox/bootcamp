
// middleware/verifySignUp.js
const db = require('../models');
const User = db.users;

const checkDuplicateEmail = async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    return res.status(400).send({ message: 'El correo ya está en uso.' });
  }
  next();
};

module.exports = checkDuplicateEmail;
