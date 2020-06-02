const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
// const User = require('../../database/models/user');

router.post('/login', loginRoute);

function loginRoute(req, res) {
  //  const user = await User.findOne({ username: req.body.username });
  //   if (user && user.checkPassword(req.body.password)) {
  const payload = { id: req.body.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
  return res.json({
    token,
    user: req.body
  });
  //   }
  //   return res.status(400).json({ message: 'Wrong username or password' });
}

module.exports = router;
