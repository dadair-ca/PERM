Accounts.validateNewUser(function (user) {
  var loggedInUser = Meteor.user();

  if (Roles.userIsInRole(loggedInUser, 'admin')) {
    return true;
  }

  throw new Meteor.Error(403, "Not authorized to create new users.");
});

Meteor.methods({
  newUser: function(user) {
    var id = Accounts.createUser({
      email: user.email,
      password: Meteor.uuid().split('-')[0],
      profile: {name: user.name}
    });

    if (user.roles.length > 0) {
      Roles.addUsersToRoles(id, user.roles);
    }

    //TODO: re-enable emails when in production
    console.log("Re-enable emails to send enrollment email.");
    //Accounts.sendEnrollmentEmail(id);
  },
  deleteUser: function(user) {
    var loggedInUser = Meteor.user();

    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, 'admin')) {
      throw new Meteor.Error(403, "Access denied.");
    }

    if (Roles.userIsInRole(user, 'admin')) {
      throw new Meteor.Error(403, "Cannot delete the administrator.");
    }

    var userShifts = Shifts.find({ownerId: user._id});
    userShifts.forEach(function(shift) {
      Shifts.update({_id: shift._id}, {$set: {ownerId: null}});
    });

    Meteor.users.remove({_id: user._id});
    Roles.setUserRoles(user, []);
  },
  editUser: function(args) {
    Meteor.users.update(args._id, {$set: args.user});
  },
});

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
