Template.flashes.helpers({
  flashes: function() {
    return Flashes.find();
  },
});

Template.flash.rendered = function() {
  var flash = this.data;
  Meteor.defer(function() {
    Flashes.update(flash._id, {$set: {seen: true}});
  });
};

Template.flash.helpers({
  exclaim: function() {
    if (this.type === 'danger') {
      return 'Error';
    }
    return 'Success';
  },
});
