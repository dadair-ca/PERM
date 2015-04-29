(function () {
    "use strict";

    Accounts.urls.resetPassword = function(token) {
        return Meteor.absoluteUrl('reset-password/' + token);
    };
    Accounts.urls.verifyEmail = function(token) {
        return Meteor.absoluteUrl('verify-email/' + token);
    };
    Accounts.urls.enrollAccount = function(token) {
        return Meteor.absoluteUrl('enroll-account/' + token);
    };
})();

Kadira.connect('pny4Y9xsh8fznbtt7', 'b17333f7-2c9e-4c62-87a3-b6a19efcbd7d');

if (Meteor.users.find().count() === 0) {
    var roles = ['admin', 'student', 'command', 'nurse'];
    _.each(roles, function(r) { Roles.createRole(r); });

    var id = Accounts.createUser({
        email: 'dadair@ucalgary.ca',
        password: Meteor.uuid().split('-')[0],
        profile: {
	          name: 'David Adair',
	          started: moment().format(),
            drops: 0,
            grabs: 0
        }
    });

    Roles.addUsersToRoles(id, 'admin');
    Accounts.sendEnrollmentEmail(id);
}

Meteor.startup(function () {
    try {
        Roles.createRole('inactive');
    } catch (e) {
        console.log(e);
    }
});
