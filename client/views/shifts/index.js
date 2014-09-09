Template.shiftsIndex.helpers({
  shifts: function() {
    return Shifts.find({ownerId: Meteor.user()._id, when: {$gt: moment().format("YYYY-MM-DD h:mmA")}}, {sort: {when: 1}});
  },
  expiredShifts: function() {
    return Shifts.find({ownerId: Meteor.user()._id, when: {$lt: moment().format("YYYY-MM-DD h:mmA")}}, {sort: {when: -1}});
  },
});

Template.shiftItem.helpers({
  formattedDate: function() {
    return moment(this.when, "YYYY-MM-DD h:mmA").format("dddd, MMMM Do YYYY, h:mm:ss a");
  },
});
