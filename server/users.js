Accounts.validateNewUser(function (user) {
  var loggedInUser = Meteor.user();

  if (Roles.userIsInRole(loggedInUser, ['admin'])) {
    return true;
  }

  throw new Meteor.Error(403, "Not authorized to create new users.");
});
