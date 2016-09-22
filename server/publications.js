Meteor.publish('shifts', function() {
    // for performance reasons, don't publish all historical data
    var cutoff = moment().subtract(4, 'months').format();
    return Shifts.find({start: {$gt: cutoff}});
});

Meteor.publish('userData', function() {
    return Meteor.users.find({}, {fields: {emails: 1, roles: 1, profile: 1}});
});

Meteor.publish(null, function() {
    return Meteor.roles.find({});
});
