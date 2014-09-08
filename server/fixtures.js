if (Meteor.users.find().count() === 0) {
  Accounts.createUser({email: 'dadair@ucalgary.ca', password: 'ed1ach'});
}
