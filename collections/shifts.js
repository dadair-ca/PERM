Shifts = new Meteor.Collection('shifts');

Shifts.allow({
  update: ownsShift
});
