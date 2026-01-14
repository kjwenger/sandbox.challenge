const restify = require('restify');
const { registerRoutes: registerWineRoutes } = require('./routes/wines');
const { registerRoutes: registerDocsRoutes } = require('./routes/docs');

function createServer() {
  const server = restify.createServer({
    name: 'wine-api'
  });

  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());

  registerWineRoutes(server);
  registerDocsRoutes(server);

  return server;
}

module.exports = { createServer };
