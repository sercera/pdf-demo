const express = require('express');

const router = express.Router();

const pdfRoutes = require('./pdf');
const v1Routes = require('./v1');

router.use('/v1', v1Routes);
router.use('/pdf', pdfRoutes);

module.exports = router;
