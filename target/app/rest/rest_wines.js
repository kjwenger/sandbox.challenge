
/*global JSON,module,require,console,process*/
var debug, mongoose, mongooseHidden, restify, restifyMongoose, wine;

debug = require("debug")("rest_wines");

wine = require("../model/wine");

mongoose = require("mongoose");

mongooseHidden = require("mongoose-hidden")();

restify = require("restify");

restifyMongoose = require("restify-mongoose");

module.exports = {
  register: function(server, path) {
    var Wine, options, schema, url, wines;
    path = path || "";
    url = "mongodb://localhost:27017/test";
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
      baseUrl: "http://localhost",
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