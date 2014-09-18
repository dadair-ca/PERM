chatStream = new Meteor.Stream('chat');
chatCollection = new Meteor.Collection(null);

chatStream.on('chat', function(chat, username) {
  chatCollection.insert({
    username: chat.username,
    message: chat.message
  });
});

Template.chat.helpers({
  'messages': function() {
    return chatCollection.find();
  }
});

Template.chatMessage.helpers({
  'user': function() {
    return this.username;
  }
});

Template.chat.events({
  'click #chat-send': function() {
    var message = $('#chat-message').val();
    var chat = {message: message, username: Meteor.user().profile.name};
    chatCollection.insert({
      username: chat.username,
      message: chat.message
    });

    chatStream.emit('chat', chat);
    $('#chat-message').val('');
  }
});
