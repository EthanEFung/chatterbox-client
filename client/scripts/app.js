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
      let fn = this;
      var refreshFeed = function() {
        app.clearMessages();
        app.renderMessage(data.results);

      };
      refreshFeed();
      setInterval(refreshFeed.bind(fn), 1000);//take data from outside
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

app.renderMessage = function(messages) {
  messages.forEach(function (message) {
    if (!message.text || message.text[0] === '<' || message.text[0] === '>') {
      console.log('BLOCKED');
    } else {
      let $userName = message.username.split('%20').join('-');
      let $roomname = message.roomname.split('%20').join('-');

      console.log($userName)
      $('#chats').prepend('<div id=' + $userName + '>' + message.text + '</div>');
    }
  })

  //renderMessages takes in an array of messages -> {}
    //iterate
      // if the message text begins with a '<' or '>'
        //console.log('blocked'), and don't do anything
      // otherwise 
        // take the message, and use the properties username, text, and roomname 
          //to create html tags with an 'id' and text


  // console.log('this is data.results: ', node);

  // if(message[0] === '<' || message[0] === '>') {
  //   console.log('BLOCKED');
  //   return;
  // } else {

  //   let postifiedMessage = new Chatter(message);
  //   console.log(postifiedMessage);

  //   let $message = message;
  //   console.log($message);
  //   let $userName = postifiedMessage.username.split(' ').join('-');
  //   let $roomname = postifiedMessage.roomname.split(' ').join('-');
  //   $('#chats').prepend('<div id=' + $userName + '>' + $message + '</div>');

  // }
  

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