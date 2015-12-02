
/*global JSON,module,require,console,process*/
var debug, host, mongoose, mongooseHidden, nodeUrl, port, restify, restifyMongoose, wine;

debug = require("debug")("rest_wines");

wine = require("../model/wine");

mongoose = require("mongoose");

mongooseHidden = require("mongoose-hidden")();

restify = require("restify");

restifyMongoose = require("restify-mongoose");

host = process.env.HOST || "localhost";

port = process.env.PORT || 8080;

nodeUrl = "http://" + host + ":" + port;

module.exports = {
  register: function(server, path) {
    var Wine, options, schema, url, wines;
    path = path || "";
    url = process.env.MONGODB_URL;
    mongoose.connect(url);
    schema = new mongoose.Schema(wine.schema);
    schema.plugin(mongooseHidden, {
      defaultHidden: {
        _id: true,
        __v: true
      }
    });
    Wine = mongoose.model("wines", schema);
    options = {
      baseUrl: nodeUrl,
      queryString: "id"
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