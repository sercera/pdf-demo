const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const logger = require('morgan');
const express = require('express');
const path = require('path');
const apiRoutes = require('./routes');


// const v1Routes = require('./routes/v1');


const app = express();

app.use(cors());
app.use(compression());
app.use(helmet());
app.use('/', express.static('public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', apiRoutes);
app.get('/', async (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/index.html`));
});

// app.use('/api', v1Routes);

module.exports = app;
