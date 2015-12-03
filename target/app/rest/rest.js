
/*global JSON,module,require,console,process*/
var debug, formatter, traces, wines;

traces = require("debug");

debug = require("debug")("rest");

formatter = require("./formatter");

wines = require("./rest_wines");

module.exports = {
  register: function(server) {
    wines.register(server, "/");
    debug("register() wines.register server");
    formatter.register(server);
    return this;
  }
};

/*
//@ sourceMappingURL=rest.js.map
*/