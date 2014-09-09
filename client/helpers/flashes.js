Flashes = new Meteor.Collection(null);

throwFlash = function(type, message) {
  Flashes.insert({type: type, message: message, seen: false});
}

clearFlashes = function() {
  Flashes.remove({seen: true});
}
