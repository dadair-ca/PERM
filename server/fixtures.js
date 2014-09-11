if (Meteor.users.find().count() === 0) {
  Accounts.createUser({email: 'dadair@ucalgary.ca', password: 'ed1ach'});
  Accounts.createUser({email: 'adair.david@gmail.com', password: 'ed1ach'});
  Accounts.createUser({email: 'testuser@perm.com', password: 'test'});

  var now = moment().tz('America/Edmonton');

  var users = Meteor.users.find();

  users.forEach(function(user) {
    for (i = 0; i < Math.floor(Math.random()*(12-5+1)+5); ++i) {
      Shifts.insert({
        ownerId: user._id,
        when: {
          day: moment(now).add(i, 'weeks').format("YYYY-MM-DD"),
          start: moment(now).add(i, 'hours').format("h:mmA")
        },
        duration: "4"
      });
    }
    Shifts.insert({
      ownerId: user._id,
        when: {
          day: moment(now).subtract(2, 'weeks').format("YYYY-MM-DD"),
          start: moment(now).format("h:mmA")
        },
      duration: "4"
    });
  });
}
