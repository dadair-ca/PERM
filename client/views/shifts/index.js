Template.shiftsIndex.helpers({
  //upcoming shifts
  shifts: function() {
    var now = moment().tz('America/Edmonton').format();
    return Shifts.find({ownerId: Meteor.user()._id, start: {$gt: now}}, {sort: {start: 1}});
  },
  expiredShifts: function() {
    var now = moment().tz('America/Edmonton').format();
    return Shifts.find({ownerId: Meteor.user()._id, start: {$lte: now}}, {sort: {start: -1}});
  },
  droppedShifts: function() {
    var now = moment().tz('America/Edmonton').format();
    return Shifts.find({ownerId: null, start: {$gt: now}, role: {$in: Meteor.user().roles}}, {sort: {start: 1}});
  },
  noneAvailable: function() {
    var now = moment().tz('America/Edmonton').format();
    return Shifts.find({ownerId: null, start: {$gt: now}, role: {$in: Meteor.user().roles}}, {sort: {start: 1}}).count() == 0;
  },
  noneUpcoming: function() {
    var now = moment().tz('America/Edmonton').format();
    return Shifts.find({ownerId: Meteor.user()._id, start: {$gt: now}}, {sort: {start: 1}}).count() == 0;
  },
  noneAttended: function() {
    var now = moment().tz('America/Edmonton').format();
    return Shifts.find({ownerId: Meteor.user()._id, start: {$lte: now}}, {sort: {start: -1}}).count() == 0;
  },
  userId: function() {
    return Meteor.user()._id;
  },
});

Template.shiftItemOwned.helpers({
  startTime: function() {
    return moment.tz(this.start, zone()).format('h:mmA');
  },
  endTime: function() {
    return moment.tz(this.end, zone()).format('h:mmA');
  },
  formattedDate: function() {
    return moment.tz(this.start, zone()).format('dddd, MMMM Do YYYY');
  }
});

Template.shiftItemOwned.events({
  'click .drop-button': function(evt) {
    evt.preventDefault();

    var currentShiftId = $(evt.target).data('id');

    var email = {
      subject: $('#'+ currentShiftId + '-email_subject').val(),
      message: $('#'+ currentShiftId + '-email_message').val()
    }

    // Add default message
    if (email.subject == "") {
      throwFlash('danger', 'Your subject cannot be empty!');
    }
    if (email.message == "") {
      throwFlash('danger', 'Your message cannot be empty!');
    }

    if (email.subject == "" || email.message == "") {
      return;
    }

    Meteor.call('dropShift', this, function(error) {
      if (error) {
        throwFlash('danger', 'You cannot drop that shift.');
      } else {
        Meteor.call('sendEmail', email, function(error) {
          if (error) {
            throwFlash('danger', 'We were unable to send your email(s) at this time.');
          } else {
            throwFlash('success', 'The shift has been dropped. Make sure to pick up a shift to remain shift-neutral.');
          }
        });
      }
    });

    // Manually remove bootstrap modal background after drop,
    // since the DOM is messed up after a reactive refresh and bootstrap
    // can't find the necessary elements to remove by itself
    $('.modal-backdrop').remove();
  },
});

Template.shiftItemDropped.events({
  'click #pickup-button': function(evt) {
    evt.preventDefault();

    var shiftProperties = {
      ownerId: Meteor.user()._id
    };

    Meteor.call('pickupShift', this, function(error) {
      if (error) {
        throwFlash('danger', 'You cannot pick up that shift.');
      }
    });
  }
});

Template.shiftRow.rendered = function() {
  var now = moment().tz('America/Edmonton').format();

  var total = Shifts.find({ownerId: Meteor.user()._id}).count();
  var upcoming = Shifts.find({ownerId: Meteor.user()._id, start: {$gt: now}}).count();

  var attended = Shifts.find({ownerId: Meteor.user()._id, start: {$lte: now}}, {sort: {start: -1}}).count();
  var dropped = Drops.find({ownerId: Meteor.user()._id}).count();
  var pickedup = PickUps.find({ownerId: Meteor.user()._id}).count();

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
          enabled: false,
          format: '<b>{point.name}</b>: {point.y:.0f}',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          }
        },
        showInLegend: true
      }
    },
    series: [{
      type: 'pie',
      name: 'Stats',
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

Template.shiftRow.helpers({
  day: function() {
    return moment.tz(this.start, zone()).format("ddd, MMMM DD, YYYY");
  },
  startTime: function() {
    return moment.tz(this.start, zone()).format("h:mmA");
  },
  endTime: function() {
    return moment.tz(this.end, zone()).format("h:mmA");
  },
});
