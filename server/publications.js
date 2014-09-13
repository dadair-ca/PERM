Meteor.publish('shifts', function() {
  return Shifts.find();
});
Meteor.publish('drops', function() {
  return Drops.find();
});
Meteor.publish('pickups', function() {
  return PickUps.find();
});
Meteor.publish('userData', function() {
  return Meteor.users.find({}, {fields: {emails: 1, roles: 1, profile: 1}});
});
