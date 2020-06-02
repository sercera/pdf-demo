const jwt = require('jsonwebtoken');
// const User = require('../database/models/user');

module.exports = async (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error();
    }
    if (!req.headers.authorization) {
      throw new Error();
    }
    let token;
    try {
      const split = req.headers.authorization.split(' ');
      if (split[0] === 'Bearer') {
        token = split[1];
      }
      if (!token) {
        throw new Error();
      }
    } catch (e) {
      return res.status(401).json({
        message:
          'Invalid Authorization header format. Format is "{AUTHORIZATION_TYPE} {TOKEN}". For jwt authorization use Bearer type'
      });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await User.findById(payload.id);
    // if (user) {
    //   req.user = user;
    if (payload) {
      req.user = payload;
    } else {
      return res.status(401).json({
        message: 'Invalid token'
      });
    }
  } catch (e) {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }
  return next();
};
