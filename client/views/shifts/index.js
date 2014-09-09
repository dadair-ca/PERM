Template.shiftsIndex.helpers({
  shifts: function() {
    return Shifts.find({ownerId: Meteor.user()._id, when: {$gt: moment().format(formatString)}}, {sort: {when: 1}});
  },
  expiredShifts: function() {
    return Shifts.find({ownerId: Meteor.user()._id, when: {$lt: moment().format(formatString)}}, {sort: {when: -1}});
  },
});

Template.shiftItem.helpers({
  formattedDate: function() {
    return moment(this.when, formatString).format("dddd, MMMM Do YYYY, h:mm:ss a");
  },
  thisWeek: function() {
    var date = moment(this.when, formatString);
    var now = moment();
    var difference = date.diff(now, 'days');
    if (difference < 7 && difference > 0) {
      return true;
    }
    return false;
  }
});
