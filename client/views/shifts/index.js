Template.shiftsIndex.helpers({
    upcomingShifts: function() {
        return upcomingShiftsFor(Meteor.user()._id);
    },
    noneUpcoming: function() {
        return upcomingShiftsFor(Meteor.user()._id).count() == 0;
    },
    expiredShifts: function() {
        return pastShiftsFor(Meteor.user()._id);
    },
    noneAttended: function() {
        return pastShiftsFor(Meteor.user()._id).count() == 0;
    },
    droppedShifts: function() {
        var roles = Meteor.user().roles;

        // If the user is a command student, allow them to pick up regular student shifts
        if (_.contains(roles, 'command')) {
            roles.push('student');
        }

        return shiftsAvailableForRoles(roles);
    },
    noneAvailable: function() {
        var roles = Meteor.user().roles;

        // If the user is a command student, allow them to pick up regular student shifts
        if (_.contains(roles, 'command')) {
            roles.push('student');
        }

        return shiftsAvailableForRoles(roles).count() == 0;
    },
    userId: function() {
        return Meteor.user()._id;
    }
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
            message: $('#'+ currentShiftId + '-email_message').val(),
            excuse: $('#'+ currentShiftId + '-email_excuse').val(),
            type: this.type
        };

        // Add default message
        if (email.subject === "") {
            throwFlash('danger', 'Your subject cannot be empty!');
        }
        if (email.message === "") {
            throwFlash('danger', 'Your message cannot be empty!');
        }
        if (email.excuse === "") {
            throwFlash('danger', 'You must include a message for the administrators.');
        }

        if (email.subject === "" || email.message === "" || email.excuse === "") {
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
                        throwFlash('success','The shift has been dropped. Make sure to grab a shift to remain shift-neutral.');
                    }
                });
            }
        });

        // Manually remove bootstrap modal background after drop,
        // since the DOM is messed up after a reactive refresh and bootstrap
        // can't find the necessary elements to remove by itself
        $('.modal-backdrop').remove();
    }
});

Template.shiftItemDropped.events({
    'click #grab-button': function(evt) {
        evt.preventDefault();

        var shiftProperties = {
            ownerId: Meteor.user()._id
        };

        Meteor.call('grabShift', this, function(error) {
            if (error) {
                throwFlash('danger', 'You cannot grab that shift.');
            }
        });
    }
});

Template.shiftRow.rendered = function() {
    var currentUser = Meteor.user();
    var currentUserId = currentUser._id;

    var total = Shifts.find({ ownerId: currentUserId }).count();
    var upcoming = upcomingShiftsFor(currentUserId).count();
    var attended = pastShiftsFor(currentUserId).count();
    var dropped = currentUser.profile.drops;
    var grabbed = currentUser.profile.grabs;

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
                { name: 'Grabbed', y: grabbed, color: '#4ECDC4' },
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
};

Template.shiftRow.helpers({
    day: function() {
        return moment.tz(this.start, zone()).format("ddd, MMMM DD, YYYY");
    },
    dayMD: function() {
        return moment.tz(this.start, zone()).format("MMM DD");
    },
    start: function() {
        return moment.tz(this.start, zone()).format("h:mmA");
    },
    startMD: function() {
        return moment.tz(this.start, zone()).format("HH:mm");
    },
    end: function() {
        return moment.tz(this.end, zone()).format("h:mmA");
    },
    endMD: function() {
        return moment.tz(this.end, zone()).format("HH:mm");
    }
});
