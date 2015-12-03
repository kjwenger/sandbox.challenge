
/*global module,require,console*/
var debug, mongoose;

debug = require("debug")("wine");

mongoose = require("mongoose");

module.exports = {
  Class: function(id, name, year, country, type, description) {
    this.id = id;
    this.name = name || "";
    this.year = year;
    this.country = country || "";
    this.type = type || "";
    this.description = description || "";
    return this;
  },
  model: {
    id: 0,
    name: "",
    year: null,
    country: "",
    type: "",
    description: ""
  },
  schema: {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return v;
        },
        message: "MISSING"
      }
    },
    year: {
      type: Number,
      required: true,
      validate: {
        validator: function(v) {
          return 0 <= v && v <= new Date().getFullYear();
        },
        message: "INVALID"
      }
    },
    country: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return v;
        },
        message: "MISSING"
      }
    },
    type: {
      type: String,
      required: true,
      "enum": {
        values: ["red", "white", "rose"],
        message: 'INVALID'
      }
    },
    description: {
      type: String,
      required: true
    }
  }
};

/*
//@ sourceMappingURL=wine.js.map
*/