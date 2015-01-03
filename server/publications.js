Meteor.publish('shifts', function() {
  return Shifts.find();
});
Meteor.publish('userData', function() {
  return Meteor.users.find({}, {fields: {emails: 1, roles: 1, profile: 1}});
});
Meteor.publish(null, function() {
  return Meteor.roles.find({});
});
