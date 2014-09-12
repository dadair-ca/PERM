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
  return Meteor.users.find({_id: this.userId}, {fields: {'admin': 1}});
});
