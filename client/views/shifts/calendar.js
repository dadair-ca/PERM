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
        var shiftClass = "event-" + shift.type;
        if (shift.ownerId === null) shiftClass = shiftClass + ' event-dropped';
        var evt = {
          id: shift._id,
          title: title + ' (' + shift.type + ')',
          start: shift.start,
          end: shift.end,
          allDay: false,
          className: shiftClass,
          description: shift.type
        };
        events.push(evt);
      });
      callback(events);
    },
  });
};
