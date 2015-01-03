Template.userItem.helpers({
    email: function() {
        return this.emails[0].address;
    },
    role: function() {
        return this.roles[0];
    },
    rolesList: function() {
        var r = "";
        for (i = 0; i < this.roles.length; i++) {
            r = r + this.roles[i];
            if (i < this.roles.length - 1) {
                r = r + ', ';
            }
        }
        return r;
    },
    net: function() {
        return this.profile.grabs - this.profile.drops;
    }
});

Template.usersIndex.helpers({
    users: function() {
        return Meteor.users.find({}, {sort: {'profile.name': 1}});
    }
});

Template.newUserModal.helpers({
    allRoles: function() {
        return Meteor.roles.find({}, {sort: {name: -1}});
    },
    today: function() {
        return moment().tz('America/Edmonton').format("YYYY-MM-DD");
    },
});

Template.usersIndex.events({
    'click .newUserButton': function(evt) {
        evt.preventDefault();

        var user = {
            email: $('#user-email').val(),
            password: Meteor.uuid().split('-')[0],
            roles: [$('#user-role').val()],
            name: $('#user-name').val(),
            started: $('#user-start').val()
        };

        console.log(user);

        if (user.email == "") {
            throwFlash('danger', 'Please enter an email address for the user.');
        }
        if (user.name == "") {
            throwFlash('danger', 'Please enter a name for the user.');
        }
        if (user.name == "" || user.email == "") {
            return;
        }

        Meteor.call('newUser', user, function(error) {
            if (error) {
                throwFlash('danger', error.reason);
            } else {
                throwFlash('success', 'Created user: ' + user.email);
            }
        });
    }
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

        // Manually remove bootstrap modal background after drop,
        // since the DOM is messed up after a reactive refresh and bootstrap
        // can't find the necessary elements to remove by itself
        $('.modal-backdrop').remove();
    }
});
