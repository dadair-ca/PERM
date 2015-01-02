Shifts = new Meteor.Collection('shifts');

shiftsFor = function(userId) {
    return Shifts.find(
        { ownerId: userId, start: {$gt: nowInMST()} },
        { sort: {start: 1} }
    );  
};

shiftsAvailableForRoles = function(roles) {
    return Shifts.find(
        { ownerId: null, start: {$gt: nowInMST()}, type: {$in: roles} },
        { sort: {start: 1} }
    );
};

pastShiftsFor = function(userId) {
    return Shifts.find(
        { ownerId: userId, start: {$lte: nowInMST()} },
        { sort: {start: -1} }
    );
};

Meteor.methods({
  dropShift: function(shift) {
    Drops.insert({ownerId: shift.ownerId, shiftId: shift._id});
    Shifts.update({_id: shift._id}, {$set: {ownerId: null}});
  },

  deleteShift: function(shift) {
    Shifts.remove({_id: shift._id});
  },

  createShift: function(shift) {
    Shifts.insert({
      ownerId: shift.ownerId,
      start: shift.start,
      end: shift.end,
      type: shift.type
    });
  },

  pickupShift: function(shift) {
    var user = Meteor.user();
    PickUps.insert({ownerId: user._id, shiftId: shift._id});
    Shifts.update({_id: shift._id}, {$set: {ownerId: user._id}});
  },

  sendEmail: function(email) {
    var from = Meteor.user();
    var fromEmail = from.emails[0].address;

    var to = Roles.getUsersInRole(email.type).fetch();
    var toEmail = _.map(to, function(user) {
      return user.emails[0].address;
    });

    // Email to other users with same role as dropped shift
    Email.send({
      from: fromEmail,
      to: toEmail,
      replyTo: fromEmail || undefined,
      subject: email.subject,
      text: email.message
    });

    var admins = Roles.getUsersInRole('admin').fetch();
    var adminEmails = _.map(admins, function(admin) {
      return admin.emails[0].address;
    });

    var content = "Reason:\n" + email.excuse + "\n\nOriginal message:\n" + email.message;

    // Email to administrators
    Email.send({
      from: fromEmail,
      to: adminEmails,
      replyTo: fromEmail || undefined,
      subject: "A PEMRAP shift has been dropped!",
      text: content
    });
  }
});
