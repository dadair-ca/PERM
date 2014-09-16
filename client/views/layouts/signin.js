Template.signIn.events({
  'submit #signin-form': function(evt) {
    evt.preventDefault();

    var email = $('#signin_email').val();
    var password = $('#signin_password').val();

    //TODO: add trimming and validations
    if (email == "" || password == "") {
      throwFlash('danger', 'Please provide both an email and password.');
      return;
    }

    Meteor.loginWithPassword(email, password, function(err) {
      if (err) {
        throwFlash('danger', err.reason);
        Router.go('signIn');
      } else {
        throwFlash('success', 'You have been signed in.');
        Router.go('shiftsIndex');
      }
    });
  },

  'click .forgotPassword': function(evt) {
    evt.preventDefault();

    var email = $('#signin_email').val();
    if (email == "") {
      throwFlash('danger', 'Please enter your email in the email field.');
      return;
    }

    var options = {email: email};

    Accounts.forgotPassword(options, function(err) {
      if (err) {
        throwFlash('danger', err.reason);
      } else {
        throwFlash('success', 'An email has been sent to the specified address which will allow you to reset your password.');
      }
    });
  },
});
