
/*global JSON,module,require,console,process*/
var debug, traces, wines;

traces = require("debug");

debug = require("debug")("rest");

wines = require("./rest_wines");

module.exports = {
  format: function(server) {
    var formatter;
    formatter = server.formatters["application/json"];
    debug("format() formatter=" + formatter);
    server.formatters["application/json"] = function(req, res, body, callback) {
      var err, error, errors, name;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      if (body instanceof Error) {
        res.statusCode = body.statusCode || 500;
        if (body.statusCode === 404) {
          res.statusCode = 400;
          body = {
            error: "UNKNOWN_OBJECT"
          };
        } else {
          if (body.body) {
            body = body.body;
          }
          if (body.message === "Validation failed") {
            errors = body.errors;
            body = {
              error: "VALIDATION_ERROR",
              validation: {}
            };
            if (errors) {
              for (name in errors) {
                error = errors[name];
                try {
                  body.validation[name] = error.kind === "required" ? "MISSING" : error.message;
                } catch (_error) {
                  err = _error;
                  debug("newFormatter err=" + err);
                }
              }
            }
          }
        }
      } else if (res.statusCode === 201) {
        res.statusCode = 200;
      } else if (req.method === "delete" || req.method === "DELETE") {
        body = {
          success: true
        };
      }
      return formatter(req, res, body, callback);
    };
    return this;
  },
  register: function(server) {
    wines.register(server, "/");
    debug("register() wines.register server");
    this.format(server);
    return this;
  }
};

/*
//@ sourceMappingURL=rest.js.map
*/