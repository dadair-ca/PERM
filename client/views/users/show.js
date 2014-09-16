Template.usersShow.helpers({
  shifts: function() {
    return Shifts.find({ownerId: this._id}, {sort: {'when.day': 1}});
  },
  noShifts: function() {
    return Shifts.find({ownerId: this._id}, {sort: {'when.day': 1}}).count() == 0;
  },
  roles: function() {
    return this.roles;
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
    var shiftType = $('#shift-role').val();

    if (startDate == "" || endDate == "" || startTime == "" || endTime == "") {
      throwFlash('danger', 'Please fill in all form fields.');
      return;
    }

    console.log('startDate: ' + startDate);
    console.log('endDate: ' + endDate);
    console.log('startTime: ' + startTime);
    console.log('endTime: ' + endTime);

    Session.set("startDate", startDate);
    Session.set("endDate", endDate);
    Session.set("startTime", startTime);
    Session.set("endTime", endTime);

    var startTimeMoment = moment(startTime, 'hh:mm');
    var endTimeMoment = moment(endTime, 'hh:mm');

    var hoursBetween = endTimeMoment.diff(startTimeMoment, 'hours', true);
    if (hoursBetween <= 0) {
      throwFlash('danger', 'The end time must be after the start time.');
      return;
    }

    var startDateMoment = moment(startDate);
    var startingDay = startDateMoment.day();

    var daysBetween = moment(endDate).diff(startDateMoment, 'days');

    if (daysBetween < 0) {
      throwFlash('danger', 'The end date must be after the start date.');
      return;
    }

    // Cannot schedule people for today
    for (i = 0; i <= daysBetween; i++) {
      var clone = startDateMoment.clone();
      var date = clone.add(i, 'days');
      if (_.contains(days, date.day())) {
        var dateToSchedule = date.format("YYYY-MM-DD");
        var shift = {
          ownerId: shownUserId,
          when: {
            day: dateToSchedule,
            start: moment(startTime, 'hh:mm').format('h:mmA')
          },
          duration: hoursBetween,
          type: shiftType
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

    Meteor.call('dropShift', this, function(err) {
      if (err) {
        throwFlash('danger', err.reason);
      } else {
        throwFlash('success', 'Dropped shift.');
      }
    });
  }
});

Template.userShiftRow.helpers({
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
