
/*global JSON,module,require,console,process*/
var debug, host, mongoUrl, mongoose, mongooseHidden, nodeUrl, port, protocol, restify, restifyMongoose, wine;

debug = require("debug")("rest_wines");

wine = require("../model/wine");

mongoose = require("mongoose");

mongooseHidden = require("mongoose-hidden")();

restify = require("restify");

restifyMongoose = require("restify-mongoose");

mongoUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/test";

protocol = process.env.PROTOCOL || "http";

host = process.env.HOST || "localhost";

port = process.env.PORT;

nodeUrl = port ? "" + protocol + "://" + host + ":" + port : "" + protocol + "://" + host;

module.exports = {
  register: function(server, path) {
    var Wine, options, schema, wines;
    path = path || "";
    mongoose.connect(mongoUrl);
    schema = new mongoose.Schema(wine.schema);
    schema.plugin(mongooseHidden, {
      defaultHidden: {
        _id: true,
        __v: true
      }
    });
    Wine = mongoose.model("wines", schema);
    function filter(req) {
      var query;
      query = {};
      if (req.query.name) {
        query.name = req.query.name;
      }
      if (req.query.year) {
        query.year = req.query.year;
      }
      if (req.query.type) {
        query.type = req.query.type;
      }
      if (req.query.country) {
        query.country = req.query.country;
      }
      return query;
    };
    options = {
      baseUrl: nodeUrl,
      queryString: "id",
      filter: filter
    };
    wines = restifyMongoose(Wine, options);
    server.get(path + "/wines", wines.query());
    server.get(path + "/wines/:id", wines.detail());
    server.post(path + "/wines", wines.insert());
    server.put(path + "/wines/:id", wines.update());
    server.del(path + "/wines/:id", wines.remove());
    return this;
  }
};

/*
//@ sourceMappingURL=rest_wines.js.map
*/