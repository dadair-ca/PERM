Template.signinButtons.events({
  'click #signout': function(evt) {
    Meteor.logout();
    throwFlash('success', 'You have been signed out.');
    Router.go('public');
  }
});

Template.signinButtons.helpers({
  name: function() {
    return Meteor.user().profile.name;
  }
});
