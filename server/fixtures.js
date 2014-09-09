if (Meteor.users.find().count() === 0) {
  Accounts.createUser({email: 'dadair@ucalgary.ca', password: 'ed1ach'});
  Accounts.createUser({email: 'test@test.com', password: 'test'});

  Shifts.insert({
    ownerId: Meteor.users.findOne()._id,
    when: moment().format("dddd, MMMM Do YYYY, h:mm a"),
    duration: "4"
  });
  Shifts.insert({
    ownerId: Meteor.users.findOne({ emails: { $elemMatch: { address: "test@test.com" } } })._id,
    when: moment().format("dddd, MMMM Do YYYY, h:mm a"),
    duration: "4"
  });
}
