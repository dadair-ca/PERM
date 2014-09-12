Template.header.helpers({
  administrator: function() {
    var user = Meteor.user()
    if (user) {
      return user.admin == true;
    }
    return false;
  }
});
