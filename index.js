const fs = require('fs');
const dotenv = require('dotenv');
const http = require('http');

initializeEnvironment();

const app = require('./src/app');

const server = http.createServer(app);

const port = normalizePort(process.env.API_PORT || '3000');
app.set('port', port);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Catch nodeJS unhandled errors
process.on('uncaughtException', (error) => {
  console.error('Error not cought');
  console.error(error);
});

function initializeEnvironment() {
  dotenv.config();
  const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  switch (error.code) {
    case 'EACCES':
      console.error('Port requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('Port is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  console.log(`Listening on port: ${port}`);
}
