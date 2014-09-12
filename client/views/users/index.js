Template.userItem.helpers({
  email: function() {
    return this.emails[0].address;
  },
  isAdmin: function() {
    return this.admin === true;
  }
});

Template.usersIndex.helpers({
  users: function() {
    return Meteor.users.find();
  }
});
