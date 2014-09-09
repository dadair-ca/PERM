Template.signinButtons.events({
  'click #signout': function(evt) {
    Meteor.logout();
  }
});
