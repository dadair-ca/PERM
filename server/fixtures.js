if (Meteor.users.find().count() === 0) {
  var users = [
    {
      name: "David Adair",
      email: "dadair@ucalgary.ca",
      roles:['admin']
    },
    {
      name: "Janell Lauter",
      email: "jtlauter@ucalgary.ca",
      roles:['student', 'command']
    },
    {
      name: "Jianling Xie",
      email: "Jianling.Xie@albertahealthservices.ca",
      roles:['admin']
    },
    {
      name: "Gabino Travassos",
      email: "Gabino.Travassos@albertahealthservices.ca",
      roles:['admin']
    },
    {
      name: "Antonia Stang",
      email: "Antonia.Stang@albertahealthservices.ca",
      roles:['admin']
    },
    {
      name: "Stephen Freedman",
      email: "Stephen.Freedman@albertahealthservices.ca",
      roles:['admin']
    },
    {
      name: "Heather Godfrey",
      email: "Heather.Godfrey@albertahealthservices.ca",
      roles:['admin', 'nurse']
    },
    {
      name: "Jennifer Crotts",
      email: "Jennifer.Crotts@albertahealthservices.ca",
      roles:['admin', 'nurse']
    },
    {
      name: "Sarah Urquhart",
      email: "Sarah.Urquhart@albertahealthservices.ca",
      roles:['admin']
    },
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
