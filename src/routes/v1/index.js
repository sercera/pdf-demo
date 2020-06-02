const express = require('express');
const router = express.Router();

// const roleAuthorize = require('../../middlewares/role_authorize');
const jwtAuth = require('../../middlewares/jwt_auth');
// const ROLES = require('../../constants/roles.js');

const authRoutes = require('./auth.routes');

router.use('/auth', authRoutes);

module.exports = router;
