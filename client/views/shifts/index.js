Template.shiftsIndex.helpers({
  shifts: function() {
    return Shifts.find({ownerId: Meteor.user()._id});
  },
  shiftPattern: function() {
    return 'everyday';
  },
});
