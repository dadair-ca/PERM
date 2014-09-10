Shifts = new Meteor.Collection('shifts');

Shifts.allow({
  update: function(userId, shift) {
    return ownsShift(userId, shift) || droppedShift(userId, shift);
  }
});
