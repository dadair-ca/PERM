Template.shiftsIndex.helpers({
  shifts: function() {
    return Shifts.find({ownerId: Meteor.user()._id, when: {$gt: moment().format(formatString)}}, {sort: {when: 1}});
  },
  expiredShifts: function() {
    return Shifts.find({ownerId: Meteor.user()._id, when: {$lte: moment().format(formatString)}}, {sort: {when: -1}});
  },
  droppedShifts: function() {
    return Shifts.find({ownerId: null}, {sort: {when: 1}});
  },
});

Template.shiftItemOwned.events({
  'click #drop-button': function(evt) {
    evt.preventDefault();

    var currentShiftId = this._id;

    var shiftProperties = {
      ownerId: null
    };

    Shifts.update(currentShiftId, {$set: shiftProperties}, function (err) {
      if (err) {
        throwFlash('danger', 'You cannot drop that shift.');
      }
    });
  }
});

Template.shiftItemDropped.events({
  'click #pick-button': function(evt) {
    console.log(this);
  }
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

Template.attendanceStats.rendered = function() {
  var total = Shifts.find({ownerId: Meteor.user()._id}).count();
  var attended = 4;
  var dropped = 2;
  var upcoming = total-attended-dropped;

  console.log(total);
  $('#attendancePie').highcharts({
    credits: false,
    chart: {
      plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false
    },
    title: null,
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          }
        }
      }
    },
    series: [{
      type: 'pie',
      name: 'Attendance',
      data: [
        { name: 'Attended', y: 100*attended/total, color: '#C7F464' },
        { name: 'Upcoming', y: 100*upcoming/total, color: '#556270' },
        {
          name: 'Dropped',
          y: 100*dropped/total,
          sliced: true,
          selected: true,
          color: '#FF6B6B'
        }
      ]
    }]
  });
}
