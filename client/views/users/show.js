Template.usersShow.helpers({
  shifts: function() {
    return Shifts.find({ownerId: this._id}, {sort: {'when.day': 1}});
  },
  noShifts: function() {
    return Shifts.find({ownerId: this._id}, {sort: {'when.day': 1}}).count() == 0;
  },
});

Template.newShiftsModal.helpers({
  startDate: function() { return Session.get("startDate"); },
  endDate: function() { return Session.get("endDate"); },
  startTime: function() { return Session.get("startTime"); },
  endTime: function() { return Session.get("endTime"); },
});

Template.usersShow.events({
  'click .newShiftsButton': function(evt) {
    evt.preventDefault();

    var shownUserId = this._id;

    var boxes = $('input[name="weekdays"]:checked');

    var days = [];
    _.each(boxes, function(box) {
      var day;
      if (box.id == "Sunday") day = 0;
      else if (box.id == "Monday") day = 1;
      else if (box.id == "Tuesday") day = 2;
      else if (box.id == "Wednesday") day = 3;
      else if (box.id == "Thursday") day = 4;
      else if (box.id == "Friday") day = 5;
      else if (box.id == "Saturday") day = 6;
      days.push(day);
    });

    var startDate = $('input[id="fromDate"]').val();
    var endDate = $('input[id="toDate"]').val();
    var startTime = $('input[id="startTime"]').val();
    var endTime = $('input[id="endTime"]').val();

    if (startDate == "" || endDate == "" || startTime == "" || endTime == "") {
      throwFlash('danger', 'Please fill in all form fields.');
      return;
    }

    Session.set("startDate", startDate);
    Session.set("endDate", endDate);
    Session.set("startTime", startTime);
    Session.set("endTime", endTime);

    var hoursBetween = moment(endTime, 'hh:mm').diff(moment(startTime, 'hh:mm'), 'hours', true);
    if (hoursBetween <= 0) {
      throwFlash('danger', 'The end time must be after the start time.');
      return;
    }

    var daysBetween = moment(endDate).diff(moment(startDate), 'days');

    if (daysBetween < 0) {
      throwFlash('danger', 'The end date must be after the start date.');
      return;
    }

    var startMoment = moment(startDate);
    var startingDay = startMoment.day();

    // Cannot schedule people for today
    for (i = 0; i <= daysBetween; i++) {
      var clone = startMoment.clone();
      var date = clone.add(i, 'days');
      if (_.contains(days, date.day())) {
        var dateToSchedule = date.format("YYYY-MM-DD");
        var shift = {
          ownerId: shownUserId,
          when: {
            day: dateToSchedule,
            start: moment(startTime, 'hh:mm').tz('America/Edmonton').format('h:mmA')
          },
          duration: hoursBetween
        };
        Meteor.call('createShift', shift, function(error) {
          if (error) {
            throwFlash('danger', error.reason);
          }
        });
      }
    }
  },
});

Template.shiftItemForUser.events({
  'click .deleteShiftButton': function(evt) {
    evt.preventDefault();

    Meteor.call('deleteShift', this, function(err) {
      if (err) {
        throwFlash('danger', err.reason);
      } else {
        throwFlash('success', 'Deleted shift.');
      }
    });
  },

  'click .dropShiftButton': function(evt) {
    evt.preventDefault();

    console.log(this);
    Meteor.call('dropShift', this, function(err) {
      if (err) {
        throwFlash('danger', err.reason);
      } else {
        throwFlash('success', 'Dropped shift.');
      }
    });
  }
});
