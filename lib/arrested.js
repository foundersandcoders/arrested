"use strict";


var is = require("torf");


module.exports = function (request) {


  return function arrested (config) {

    return {

      create: function (doc, token, cb) {

        if (is.type(token, "function")) {
          cb = token;
          token = null;
        }

        var opts = {
          method: "POST",
          uri: config.url + "/" + config.collection,
          json: true,
          body: doc
        };

        if (is.ok(token)) {
          opts.headers = {
            authorization: token
          };
        }

        request(opts, cb);

      },
      find: function (query, token, cb) {

        if (is.type(token, "function")) {
          cb = token;
          token = null;
        }

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

        if (is.ok(token)) {
          opts.headers = {
            authorization: token
          };
        }

        request(opts, cb);
      },
      findOne: function (query, token, cb) {

        if (is.type(token, "function")) {
          cb = token;
          token = null;
        }

        var opts = {

          method: "GET",
          uri: config.url + "/" + config.collection + "/" + query.id
        };

        if (is.ok(token)) {
          opts.headers = {
            authorization: token
          };
        }

        request(opts, cb);

      },
      update: function (query, doc, token, cb) {

        if (is.type(token, "function")) {
          cb = token;
          token = null;
        }

        var opts = {

          method: "PUT",
          uri: config.url + "/" + config.collection + "/" + query.id,
          json: true,
          body: doc
        };

        if (is.ok(token)) {
          opts.headers = {
            authorization: token
          };
        }

        request(opts, cb);
      },
      del: function (query, token, cb) {

        if (is.type(token, "function")) {
          cb = token;
          token = null;
        }

        var opts = {
          method: "DELETE",
          uri: config.url + "/" + config.collection + "/" + query.id,
        };

        if (is.ok(token)) {
          opts.headers = {
            authorization: token
          };
        }

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
