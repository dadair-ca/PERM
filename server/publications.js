Meteor.publish('shifts', function() {
  return Shifts.find();
});
Meteor.publish('drops', function() {
  return Drops.find();
});
Meteor.publish('pickups', function() {
  return PickUps.find();
});
