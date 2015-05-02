"use strict";


var is = require("torf");


module.exports = function (request) {


  return function arrested (config) {

    return {

      create: function (doc, cb) {

        var opts = {
          method: "POST",
          uri: config.url + "/" + config.collection,
          json: true,
          body: doc
        };

        request(opts, cb);

      },
      find: function (query, cb) {

        var url = config.url + "/" + config.collection;
        var queries = [];

        if (is.type(query, "object") && is.ok(query)) {

          url += "?";

          _foreach(query, function (va, ke) {

           return queries.push(ke + "=" + va);
          });
          url += queries.join("&");
        }

        var opts = {
          method: "GET",
          uri: url,
          json: true
        };

        request(opts, cb);
      },
      findOne: function (query, cb) {

        var opts = {

          method: "GET",
          uri: config.url + "/" + config.collection + "/" + query.id
        };

        request(opts, cb);

      },
      update: function (query, doc, cb) {

        var opts = {

          method: "PUT",
          uri: config.url + "/" + config.collection + "/" + query.id,
          json: true,
          body: doc
        };

        request(opts, cb);
      },
      del: function (query, cb) {

        var opts = {
          method: "DELETE",
          uri: config.url + "/" + config.collection + "/" + query.id,
        };

        request(opts, cb);
      }
    };
  };
};

function _foreach (object, cb) {

  var prop;
  for (prop in object) {
    if (object.hasOwnProperty(prop)) {
      cb(object[prop], prop, object);
    }
  }
}
