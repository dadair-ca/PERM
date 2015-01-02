Accounts.validateNewUser(function (user) {
    var loggedInUser = Meteor.user();
    
    if (loggedInUser && Roles.userIsInRole(loggedInUser, 'admin')) {
        return true;
    }
    
    throw new Meteor.Error(403, "Not authorized to create new users.");
    return false;
});

Meteor.methods({
    newUser: function(user) {
        console.log(user);
        var id = Accounts.createUser({
            email: user.email,
            password: Meteor.uuid().split('-')[0],
            profile: {
	              name: user.name,
	              started: moment(user.started).format()
            }
        });
        
        if (user.roles.length > 0) {
            Roles.addUsersToRoles(id, user.roles);
        }
        
        Accounts.sendEnrollmentEmail(id);
    },
    deleteUser: function(user) {
        var loggedInUser = Meteor.user();
        
        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, 'admin')) {
            throw new Meteor.Error(403, "Access denied.");
        }
        
        if (Roles.userIsInRole(user, 'admin')) {
            throw new Meteor.Error(403, "Cannot delete the administrator.");
        }
        
        var now = moment.tz('America/Edmonton').format();
        var userShifts = Shifts.find({ownerId: user._id, start: {$gte: now}});
        userShifts.forEach(function(shift) {
            Meteor.call('dropShift', shift);
        });
        
        Roles.setUserRoles(user, []);
        Meteor.users.remove({_id: user._id});
    },
    editUser: function(args) {
        Meteor.users.update(args._id, {$set: args.user});
    },
    adminEditUser: function(data) {
        var args = data.args;
        Meteor.call('editUser', args);

        var user = Meteor.users.findOne({_id: args._id});

        if (data.role != 'admin'
            && Roles.userIsInRole(user._id, 'admin')
            && Roles.getUsersInRole('admin').count() == 1) {
            throw new Meteor.Error(403, "There must always be at least one administrator.");
        }
        Roles.setUserRoles(user._id, data.role);
    }
});

(function () {
    "use strict";
    
    Accounts.urls.resetPassword = function(token) {
        return Meteor.absoluteUrl('reset-password/' + token);
    };
    Accounts.urls.verifyEmail = function(token) {
        return Meteor.absoluteUrl('verify-email/' + token);
    };
    Accounts.urls.enrollAccount = function(token) {
        return Meteor.absoluteUrl('enroll-account/' + token);
    };
})();
