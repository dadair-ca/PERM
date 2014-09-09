Template.signIn.events({
  'submit #signin-form': function(evt) {
    evt.preventDefault();

    var email = $('#signin_email').val();
    var password = $('#signin_password').val();

    //TODO: add trimming and validations

    Meteor.loginWithPassword(email, password, function(err) {
      if (err) {
        throwFlash('danger', err.reason);
      } else {
        throwFlash('success', 'You have been signed in.');
      }
    });

    Router.go('public');
  },
});
