Template.enrollAccount.helpers({

});

Template.enrollAccount.events({
  'submit #choosepassword-form' : function(evt) {
    evt.preventDefault();

    var password = $('#new-password').val();
    var confirmation = $('#new-password-confirmation').val();

    if (!(password === confirmation)) {
      throwFlash('danger', 'The passwords do not match!');
      return;
    }

    Accounts.resetPassword(this.token, password, function(error) {
      if (error) {
        throwFlash('danger', error.reason);
      } else {
        Router.go('shiftsIndex');
        throwFlash('success', 'Reset password.');
      }
    });
  }
});
