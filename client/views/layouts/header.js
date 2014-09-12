Template.header.helpers({
  administrator: function() {
    var user = Meteor.user();
    if (user) {
      console.log(user.admin);
      return user.admin == true;
    }
    return false;
  }
});
