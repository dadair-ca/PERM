Template.userItem.helpers({
  email: function() {
    return this.emails[0].address;
  },
  isAdmin: function() {
    if(Roles.userIsInRole(this._id, 'admin')) {
      return true;
    }
    return false;
  }
});

Template.usersIndex.helpers({
  users: function() {
    return Meteor.users.find();
  }
});

Template.usersIndex.events({
  'click .newUserButton': function(evt) {
    evt.preventDefault();

    var user = {
      email: $('#user-email').val(),
      roles: [$('#user-role').val()]
    };

    if (user.email == "") {
      throwFlash('danger', 'Please enter an email address for the user.');
      return;
    }

    Meteor.call('newUser', user, function(error) {
      if (error) {
        throwFlash('danger', error.reason);
      } else {
        throwFlash('success', 'Created user: ' + user.email);
      }
    });
  },
});

Template.userItem.events({
  'click .deleteUserButton': function(evt) {
    evt.preventDefault();

    var email = this.emails[0].address;

    Meteor.call('deleteUser', this, function(error) {
      if (error) {
        throwFlash('danger', error.reason);
      } else {
        throwFlash('success', 'Deleted user: ' + email);
      }
    });
  },
});
