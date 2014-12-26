Template.usersEdit.events({
  'click #resetPassword': function(evt) {
    evt.preventDefault();
    var options = {email: this.emails[0].address};

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
        profile: {
          name: $('#edit-name').val(),
        }
      }
    };

    if (args.user.profile.name == "") {
      throwFlash('danger', 'Your name cannot be blank!');
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
