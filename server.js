const http = require('http');
const app = require('./app');

// If the port environment variable is set use that else
// use port 3000
const port = process.env.PORT || 3000;

// Initialize the server
const server = http.createServer(app);

server.listen(port);