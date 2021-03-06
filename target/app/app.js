
/*global JSON,module,require,console,process*/
var debug, dotenv, error, port, rest, restify, server;

dotenv = require("dotenv");

dotenv.config({
  path: process.argv[2] || ".env"
});

debug = require("debug")("app");

restify = require("restify");

rest = require("./rest/rest");

port = process.env.PORT || 80;

server = restify.createServer({
  name: "sandbox.challenge"
});

server.use(restify.fullResponse());

server.use(restify.gzipResponse());

server.use(restify.acceptParser(server.acceptable));

server.use(restify.queryParser());

server.use(restify.bodyParser());

server.pre(restify.pre.userAgentConnection());

rest.register(server);

server.post("/shutdown", function(req, res) {
  debug("server.post('/shutdown').callback()");
  res.send({
    success: true
  });
  return setTimeout((function() {
    debug("server.post('/shutdown').callback().setTimeout()");
    server.close();
    return process.exit(0);
  }), 100);
});

try {
  server.listen(port, function() {
    return debug("server.listen(port).callback() listening=http://*:" + port);
  });
} catch (_error) {
  error = _error;
  console.log(error);
}

/*
//@ sourceMappingURL=app.js.map
*/