# arrested
interface for crud api calls to restful services


[givit](https://github.com/foundersandcoders/givit) is the  request engine. It is built ontop of [hyperquest](https://github.com/substack/hyperquest). Check them out for the request callback


```
var arrested = require("arrested");

var config = {
  //api url
  url: "http://0.0.0.0:8080",
  //name of collection
  collection: "members"
};

// create new interface
var members = arrested(config);

members.create({id: 1234, name: "Tarquin"}, function (e, r) {

  console.log("created a new member!");
});
```

### api

#### create
```
var newMember = {
  name: "Jacques",
  id: 298
};
// sends POST url/members with newMember as request body
members.create(newMember, function (e, r) {

  ...
});
```

#### find
```
var member = {
  name: "Jacques",
  id: 298
};
// sends GET url/members?name=Jacques&id=298
members.find(member, function (e, r) {

  ...
});
```

#### findOne
```
var member = {
  name: "Jacques",
  id: 298
};
// sends GET url/members/298
members.findOne(member, function (e, r) {

  ...
});
```

#### update
```
var member = {
  name: "Jacques",
  id: 298
};
var changes = {
  name: "Leibniz"
};
// sends PUT url/members/298 with changes is request body
members.update(member, changes, function (e, r) {

  ...
});
```

#### delete
```
var member = {
  name: "Jacques",
  id: 298
};
// sends DELETE url/members/298
members.del(member, function (e, r) {

  ...
});
```
