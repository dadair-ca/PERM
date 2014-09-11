Shifts = new Meteor.Collection('shifts');

Meteor.methods({
  dropShift: function(shift) {
    Drops.insert({ownerId: shift.ownerId, shiftId: shift._id});
    Shifts.update({_id: shift._id}, {$set: {ownerId: null}});
  },

  pickupShift: function(shift) {
    var user = Meteor.user();
    PickUps.insert({ownerId: user._id, shiftId: shift._id});
    Shifts.update({_id: shift._id}, {$set: {ownerId: user._id}});
  },

  sendEmail: function(email) {
    var from = Meteor.user();
    var to = Meteor.users.find({});
    var fromEmail = from.emails[0].address;
    var toEmail = Meteor.users.find().map(function(user) {
      return user.emails[0].address;
    });

    Email.send({
      from: fromEmail,
      to: toEmail,
      replyTo: fromEmail || undefined,
      subject: email.subject,
      text: email.message
    });
  },
});
