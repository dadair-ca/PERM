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

    Meteor.call('dropShift', this, function(error) {
      if (error) {
        throwFlash('danger', 'You cannot drop that shift.');
      }
    });
  }
});

Template.shiftItemDropped.events({
  'click #pickup-button': function(evt) {
    evt.preventDefault();

    var currentShiftId = this._id;

    var shiftProperties = {
      ownerId: Meteor.user()._id
    };

    Meteor.call('pickupShift', this, function(error) {
      if (error) {
        throwFlash('danger', 'You cannot drop that shift.');
      }
    });
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

Template.shiftItem.rendered = function() {
  var total = Shifts.find({ownerId: Meteor.user()._id}).count();
  var attended = 2;
  var dropped = Drops.find({ownerId: Meteor.user()._id}).count();
  var pickedup = PickUps.find({ownerId: Meteor.user()._id}).count();

  var upcoming = Shifts.find({ownerId: Meteor.user()._id, when: {$gt: moment().format(formatString)}}).count();

  $('#attendancePie').highcharts({
    credits: false,
    chart: {
      plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false
    },
    title: null,
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y:.0f}</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y:.0f}',
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
        { name: 'Attended', y: attended, color: '#C7F464' },
        { name: 'Upcoming', y: upcoming, color: '#556270' },
        { name: 'Picked Up', y: pickedup, color: '#4ECDC4' },
        {
          name: 'Dropped',
          y: dropped,
          sliced: true,
          selected: true,
          color: '#FF6B6B'
        }
      ]
    }]
  });
}
