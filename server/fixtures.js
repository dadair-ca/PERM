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
