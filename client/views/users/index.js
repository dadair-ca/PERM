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
