let Chatter = function(text) {

  this.roomname = $("#roomselect").val();
  this.username = window.location.search;
  this.text = text;

};

let app = {
  server: 'http://parse.la.hackreactor.com/chatterbox/classes/messages'
};

app.init = function() {
  app.fetch();

  $('#main').append('<div id="roomSelect"></div>');
};

app.send = function(message) {

  let $message = app.renderMessage(message);
  $.post('http://parse.la.hackreactor.com/chatterbox/classes/messages', $message);
  

  // $.ajax({
  // // This is the url you should use to communicate with the parse API server.
  //   url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
  //   type: 'POST',
  //   data: {order:'-createdAt'},
  //   contentType: 'application/json',
  //   success: function (data) {
  //     console.log('chatterbox: Message sent');
  //   },
  //   error: function (data) {
  //     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
  //     console.error('chatterbox: Failed to send message', data);
  //   }
  // });
};

app.fetch = function() { 
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: {order: '-createdAt'},
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
      let i = 0;
      let fn = this;
      var refreshFeed = function() {
    
        app.renderMessage(data.results[i]);
        i++;
      };

      refreshFeed();
      // setInterval(refreshFeed.bind(fn), 1000);//take data from outside
      //store in a variable
      //data object
      //display
      //data.results is an array that holds all messages
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

app.renderMessage = function(message) {

  if(message[0] === '<' || message[0] === '>') {
    console.log('BLOCKED');
    return;
  } else {

    let postifiedMessage = new Chatter(message);

    let $message = message;
    let $userName = postifiedMessage.username.split(' ').join('-');
    let $roomname = postifiedMessage.roomname.split(' ').join('-');
    $('#chats').prepend('<div id=' + $userName + '>' + $message + '</div>');

  }
  

//creating a dom node <div id= username >message </div>
};

app.renderRoom = function(roomName) {
  let $roomName = roomName.split(' ').join('-');
  $('#roomSelect').append('<div id="' + $roomName + '"></div>');
};

app.handleUsernameClick = function() {
  $('#main').find('.username').trigger('click');
//plug in the message to the node constructor
//after the message is plugged in
//post it to the server
//
//
};


app.handleSubmit = function(message) {
  app.send(message);
};

$(document).ready(function() {

  app.init();

  $('#chatter-box-submit-button').on('click', function() {
    let message = $('#chatter-box-input').val();

    app.handleSubmit(message);
  });

});