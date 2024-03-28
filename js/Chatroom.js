$( document ).ready(function() {

  //Jquery for if the user presses enter
  //Adds the message to the UI, but does nothing else atm
  $('.user-input').on('keypress', function (e) {
    
    if(e.which == 13 && !e.shiftKey) 
    {
      if($('.message-input').val() == "")
      {
        return false;
      }
      event.preventDefault();
      var message = $('.message-input').val();
    addUserMessage(message);

    //Send the message content to ChatGPT

    }
   
  });
  
  //Add the users message to the UI
  function addUserMessage(message)
  {
    var chatroom = document.getElementById('window');
  
    var div = document.createElement('div');
    var p = document.createElement('p');
    var image = document.createElement('img');

    
    div.className = 'outgoing-chat';
    p.className = 'user-message';
    image.src = "images/DefaultUser.png";
    p.innerText = message;

    div.appendChild(image);
    div.appendChild(p);
    chatroom.appendChild(div);
    document.getElementById("message").value = '';
    var messageBody = document.querySelector('.chat-window');


    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  }

  //Should add the text we get from chat gpt to the UI
  function addAeroMessage(message)
  {
    var chatroom = document.getElementById('window');
  
    var div = document.createElement('div');
    var p = document.createElement('p');
    var image = document.createElement('img');

    
    div.className = 'incoming-chat';
    p.className = 'aero-message';
    image.src = "images/Aero-Circle.png";
    p.innerText = message;

    div.appendChild(image);
    div.appendChild(p);
    chatroom.appendChild(div);
    var messageBody = document.querySelector('.chat-window');

    //Ensures that the most recent message is visible
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  }

  /*
  * Potential feature where the user could double click
  * on what the bot suggests (like an example email)
  * and copy it to the clip board
  */
  function copyAeroMessage()
  {
    
  }

});





