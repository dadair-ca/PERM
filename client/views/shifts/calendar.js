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
        var userIsNew = false;
        if (user) {
          title = user.profile.name;
          var userStart = moment(user.createdAt, zone());
          userIsNew = (userStart.diff(moment(), 'months', true) < 4);
        } else {
          title = "Dropped";
        }
        title = title + ' (' + shift.type + ')';

        var shiftClass = "event-" + shift.type;
        if (shift.ownerId === null) shiftClass = shiftClass + ' event-dropped';

        if (userIsNew) title = title + ' ★';
        var evt = {
          id: shift._id,
          title: title,
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
