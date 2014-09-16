Template.usersEdit.events({
  'click #resetPassword': function(evt) {
    evt.preventDefault();

    var email = $('#edit-email').val();
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
  'submit form': function(evt) {
    evt.preventDefault();

    var currentUserId = this._id;

    var args = {
      _id: currentUserId,
      user: {
        email: $('#edit-email').val(),
        profile: {
          name: $('#edit-name').val(),
        }
      }
    };

    if (args.user.email == "" || args.user.profile.name == "") {
      throwFlash('danger', 'Email and/or name cannot be empty!');
      return;
    }

    Meteor.call('editUser', args, function (err) {
      if (err) {
        throwFlash('danger', err.reason);
        return;
      }
      throwFlash('success', 'Edited account details.');
    });
  },
});
