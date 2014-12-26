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
        var title = "";
        var userIsNew = false;
        if (user) {
          title = user.profile.name;
          var userStart = moment(user.profile.started);
	  var timeDifference = userStart.diff(moment(), 'months', true);
          userIsNew = (timeDifference < 4);
        } else {
          title = "Dropped";
        }
        title = title + ' (' + shift.type + ')';
        if (userIsNew) title = title + ' ★';

        var shiftClass = "event-" + shift.type;
        if (shift.ownerId === null) shiftClass = shiftClass + ' event-dropped';

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

  Meteor.autorun(function() {
    var calendarEvents = Shifts.find();
    $('#shiftCalendar').fullCalendar('refetchEvents');
  });
};
