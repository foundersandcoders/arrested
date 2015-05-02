"use strict";


var test = require("tape");
var arrested = require("../lib/arrested")(request);


function request (opts, cb) {

  return cb(opts);
}

var config = {
  collection: "members",
  url: "http://0.0.0.0:8080"
};
var members = arrested(config);


test("arrested should return object with create, find, findOne, update, delete methods", function (t) {

  ["create", "find", "findOne", "update", "del"].forEach(function (op) {

    t.ok(members.hasOwnProperty(op), "object has " + op + " method");
  });

  t.end();

});


test("#create should POST url/collection", function (t) {

  members.create({id: 1234}, function (opts) {

    t.equals(opts.uri, config.url + "/members", "uri matches expected");
    t.equals(opts.method, "POST", "post sent");
    t.equals(opts.body.id, 1234, "payload sent");
    t.end();
  });

});

test("#find should GET url/collection?query=value", function (t) {

  // don't query prototype properties
  var obj = {name: "wil"};
  var q = Object.create(obj);
  q.id = 1234;

  members.find(q, function (opts) {

    t.equals(opts.uri, config.url + "/members?id=1234", "uri matches expected");
    t.equals(opts.method, "GET", "get sent");
    t.end();
  });

});

test("#find without queries should GET url/collection", function (t) {

  members.find({}, function (opts) {

    t.equals(opts.uri, config.url + "/members", "uri matches expected");
    t.equals(opts.method, "GET", "get sent");
    t.end();
  });

});

test("#findOne should GET url/collection/id", function (t) {

  members.findOne({id: 1234}, function (opts) {

    t.equals(opts.uri, config.url + "/members/1234", "uri matches expected");
    t.equals(opts.method, "GET", "get sent");
    t.end();
  });

});

test("#update should PUT url/collection/id", function (t) {

  members.update({id: 1234}, {name: "wil"}, function (opts) {

    t.equals(opts.uri, config.url + "/members/1234", "uri matches expected");
    t.equals(opts.method, "PUT", "put sent");
    t.equals(opts.body.name, "wil", "changes sent in payload");
    t.end();
  });

});

test("#del should DELETE url/collection/id", function (t) {

  members.del({id: 1234}, function (opts) {

    t.equals(opts.uri, config.url + "/members/1234", "uri matches expected");
    t.equals(opts.method, "DELETE", "delete sent");
    t.end();
  });

});
