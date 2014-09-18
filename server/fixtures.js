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
    {
      name: "Fake McGee",
      email: "fake@perm.com",
      roles:['student', 'command']
    },
    {
      name: "Jianling Xie",
      email: "Jianling.Xie@albertahealthservices.ca",
      roles:['admin']
    },
    {
      name: "Gabino Travassos",
      email: "Gabino.Travassos@albertahealthservices.ca",
      roles:['admin']
    },
    {
      name: "Antonia Stang",
      email: "Antonia.Stang@albertahealthservices.ca",
      roles:['admin']
    },
    {
      name: "Stephen Freedman",
      email: "Stephen.Freedman@albertahealthservices.ca",
      roles:['admin']
    },
    {
      name: "Heather Godfrey",
      email: "Heather.Godfrey@albertahealthservices.ca",
      roles:['nurse']
    },
    {
      name: "Jennifer Crotts",
      email: "Jennifer.Crotts@albertahealthservices.ca",
      roles:['nurse']
    },
  ];

  _.each(users, function(user) {
    var id;

    id = Accounts.createUser({
      email: user.email,
      password: Meteor.uuid().split('-')[0],
      profile: {name: user.name},
      createdAt: moment().format()
    });

    if (user.roles.length > 0) {
      Roles.addUsersToRoles(id, user.roles);
    }

    Accounts.sendEnrollmentEmail(id);
  });
}
