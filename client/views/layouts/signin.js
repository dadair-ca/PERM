Template.signIn.events({
  'submit #signin-form': function(evt) {
    evt.preventDefault();

    var email = $('#signin_email').val();
    var password = $('#signin_password').val();

    if (email == "") {
      throwError('Username cannot be blank.');
      return;
    }
    if (password == "") {
      throwError('Password cannot be blank.');
      return;
    }

    //TODO: add trimming and more validations

    Meteor.loginWithPassword(email, password, function(err) {
      if (err) {
        throwError(err.reason);
      }
    });

    Router.go('public');
  },
});
