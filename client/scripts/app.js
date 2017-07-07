var app = {
  server: 'http://parse.la.hackreactor.com/chatterbox/classes/messages'
};

app.init = function() {
  $('#main').append('<div id="roomSelect"></div>');
};

app.send = function(message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};
app.post = function() {};
app.fetch = function(message) { 
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};
app.clearMessages = function() {
  //find the node
  $('#chats').empty();
};

app.renderMessage = function(node) {
  var $userName = node.username.split(' ').join('-');
  $('#main').append('<div id=' + $userName + '></div>');
  $('#chats').append('<div id=' + $userName + '>' + node.text + '</div>');
};

app.renderRoom = function(roomName) {
  let $roomName = roomName.split(' ').join('-');
  $('#roomSelect').append('<div id="' + $roomName + '"></div>');
};

app.handleUsernameClick = function() {
  $('#main').find('.username').trigger('click');
};

app.handleSubmit = function() {

};