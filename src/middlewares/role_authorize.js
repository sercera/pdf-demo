module.exports = role => {
  return (req, res, next) => {
    const user = req.user;
    if (user.roles.includes(role)) {
      return next();
    }
    return res.status(403).json({ message: 'Not authorized for this action' });
  };
};
