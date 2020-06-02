const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const logger = require('morgan');
const express = require('express');
const apiRoutes = require('./routes');


// const v1Routes = require('./routes/v1');


const app = express();

app.use(cors());
app.use(compression());
app.use(helmet());
app.use('/', express.static('public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api', apiRoutes);

// app.use('/api', v1Routes);

module.exports = app;
