if (Meteor.users.find().count() === 0) {
  var users = [
    {name: "David Adair", email: "dadair@ucalgary.ca", roles:['admin']},
    {name: "John Doe", email: "testuser@perm.com", roles:[]},
    ];

  _.each(users, function(user) {
    var id;

    id = Accounts.createUser({
      email: user.email,
      password: "test",
      profile: {name: user.name}
    });

    if (user.roles.length > 0) {
      Roles.addUsersToRoles(id, user.roles);
    }
  });
}
