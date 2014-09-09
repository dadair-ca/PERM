Meteor.publish('shifts', function() {
  return Shifts.find();
});
