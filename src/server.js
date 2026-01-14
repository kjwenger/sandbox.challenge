const restify = require('restify');
const { registerRoutes } = require('./routes/wines');

function createServer() {
  const server = restify.createServer({
    name: 'wine-api'
  });

  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());

  registerRoutes(server);

  return server;
}

module.exports = { createServer };
