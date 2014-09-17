Template.calendar.rendered = function() {
  $('#shiftCalendar').fullCalendar({
    editable: false,

    header: {
      left: 'today prev,next',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },

    events: function(start, end, callback) {
      var events = [];
      var shifts = Shifts.find();
      shifts.forEach(function(shift) {
        var user = Meteor.users.findOne({_id: shift.ownerId});
        var title;
        if (user) {
          title = user.profile.name;
        } else {
          title = "Dropped";
        }
        var color = "";
        if (shift.type == "admin") color = '#556270';
        else if (shift.type == "student") color = '#4ECDC4';
        else if (shift.type == "command") color = '#C44D58';
        else if (shift.type == "nurse") color = '#C7F464';
        var evt = {
          id: shift._id,
          title: title + ' (' + shift.type + ')',
          start: shift.start,
          end: shift.end,
          allDay: false,
          color: color,
        };
        events.push(evt);
      });
      callback(events);
    },
  });
};
