// Uset to catch errors when request handler is async function

const asyncMiddleware = requestHandler => (req, res, next) => {
  Promise.resolve(requestHandler(req, res, next)).catch(err => {
    next(err);
  });
};

module.exports = {
  asyncMiddleware
};
