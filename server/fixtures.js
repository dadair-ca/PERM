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

  var users = [
    {
      name: "David Adair",
      email: "dadair@ucalgary.ca",
      roles:['admin', 'student']
    },
  ];

  _.each(users, function(user) {
    var id;

    id = Accounts.createUser({
      email: user.email,
      password: Meteor.uuid().split('-')[0],
      profile: { 
	  name: user.name,
	  started: moment().format(),
      },
    });

    if (user.roles.length > 0) {
      Roles.addUsersToRoles(id, user.roles);
    }

    Accounts.sendEnrollmentEmail(id);
  });
}
