Template.shiftsIndex.helpers({
  //upcoming shifts
  shifts: function() {
    var now = moment().tz('America/Edmonton').format("YYYY-MM-DD");
    return Shifts.find({ownerId: Meteor.user()._id, 'when.day': {$gt: now}}, {sort: {'when.day': 1}});
  },
  expiredShifts: function() {
    var now = moment().tz('America/Edmonton').format("YYYY-MM-DD");
    return Shifts.find({ownerId: Meteor.user()._id, 'when.day': {$lte: now}}, {sort: {'when.day': -1}});
  },
  droppedShifts: function() {
    return Shifts.find({ownerId: null}, {sort: {'when.day': 1}});
  },
  noneAvailable: function() {
    return Shifts.find({ownerId: null}).count() == 0;
  },
  noneUpcoming: function() {
    var now = moment().tz('America/Edmonton').format("YYYY-MM-DD");
    return Shifts.find({ownerId: Meteor.user()._id, 'when.day': {$gt: now}}, {sort: {'when.day': 1}}).count() == 0;
  },
  noneAttended: function() {
    var now = moment().tz('America/Edmonton').format("YYYY-MM-DD");
    return Shifts.find({ownerId: Meteor.user()._id, 'when.day': {$lte: now}}, {sort: {'when.day': -1}}).count() == 0;
  }
});

Template.shiftItemOwned.helpers({
  endTime: function() {
    return moment(this.when.start, 'h:mmA').add(this.duration, 'hours').format('h:mmA');
  },
  formattedDate: function() {
    return moment(this.when.day, 'YYYY-MM-DD').format('dddd, MMMM Do YYYY');
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

    var shiftProperties = {
      ownerId: null
    };

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
  var now = moment().tz('America/Edmonton').format("YYYY-MM-DD");

  var total = Shifts.find({ownerId: Meteor.user()._id}).count();
  var upcoming = Shifts.find({ownerId: Meteor.user()._id, 'when.day': {$gt: now}}).count();

  var attended = Shifts.find({ownerId: Meteor.user()._id, 'when.day': {$lte: now}}, {sort: {'when.day': -1}}).count();
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

Template.shiftRow.helpers({
  day: function() {
    return moment(this.when.day, "YYYY-MM-DD").format("ddd, MMMM DD, YYYY");
  },
  startTime: function() {
    return this.when.start;
  },
  endTime: function() {
    return moment(this.when.start, "h:mmA").add(this.duration, 'hours').format("h:mmA");
  },
});
