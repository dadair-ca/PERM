var userTitle = function(user) {
    var start = moment(user.profile.started);
    var now = moment();

    var diff = now.diff(start, 'months', false);

    // diff < 0: user starts in the future (is new)
    // 0 < diff < 4: user has started, but is less than 4 months old (is new)
    // 4 <= diff: user is considered a veteran
    if (diff < 4) {
        return '★ ' + user.profile.name;
    }
    return user.profile.name;
}

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
                    title = userTitle(user);
                } else {
                    title = "Dropped";
                }
                title = title + ' (' + shift.type + ')';
                
                var shiftClass = shift.type;
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
