
/*global JSON,module,require,console,process*/
var contentType, debug, traces;

traces = require("debug");

debug = require("debug")("formatter");

contentType = "application/json";

module.exports = {
  register: function(server) {
    var formatter;
    formatter = server.formatters[contentType];
    debug("format() formatter=" + formatter);
    server.formatters[contentType] = function(req, res, body, callback) {
      var err, error, errors, matches, name;
      res.setHeader("Content-Type", "" + contentType + "; charset=utf-8");
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
          matches = body.message && body.message.match(/^E11000.*\$(\w+)_.*\{ : ([-]?\d+) \}$/);
          if (matches && (matches.length > 2)) {
            body = {
              error: "DUPLICATION_ERROR",
              duplication: {}
            };
            body.duplication[matches[1]] = matches[2];
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
  }
};

/*
//@ sourceMappingURL=formatter.js.map
*/