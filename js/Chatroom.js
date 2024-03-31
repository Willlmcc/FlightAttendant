$(document).ready(function () {
  //May need to put something here
  //If I need it to wait for the document
  //to load up

  //Jquery for if the user presses enter
  //Adds the message to the UI, but does nothing else atm
  $('.user-input').on('keypress', function (e) {

    if (e.which == 13 && !e.shiftKey) {
      if ($('.message-input').val() == "") {
        return false;
      }
      event.preventDefault();
      var message = $('.message-input').val();
      addUserMessage(message);

      
      contextualizeMessage(message);

      //Send the message content
      //Which will call the asyc chatgpt 
      sendMessage()

    }
  });

});
//PUT API KEY HERE FOR CHATTING
const API_KEY = '';
const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

//Need to change this to the email thing
const SYSTEM_PROMPT = "You are a helpful assistant"

//May need a variable that controls
//When a user can send a message
//SO they don't bombard the API

//How fast Aero types
const chatSpeed = 25;

//For a conversation to be in any way valuable
//All messages need to be stored and sent so that
//ChatGPT is "context aware"
let conversation = []

//TODO: I doubt we will reach token limits with this
//But if we do we will need to think of some pruning strategies
//Like, getting rid of the initial "you are a" prompt
//Cause the conversation is already happening
let tokenSize = 0;

//Easiest way to se this ^, divide text by 4 roughly idk if spaces count

//Add the users message to the UI
function addUserMessage(message) {
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
//TODO: could make this nicer by having the reponse come as if it's
//Being typed in, rather than all at
function addAeroMessage(message) {
  var chatroom = document.getElementById('window');

  var div = document.createElement('div');
  var p = document.createElement('p');
  var image = document.createElement('img');


  div.className = 'incoming-chat';
  p.className = 'aero-message';
  image.src = "images/Aero-Circle.png";

  //Slowly types the message
  for (let i = 0; i < message.length; i++) {
    setTimeout(() => {
      p.textContent += message[i];
    }, i * chatSpeed);
  }


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
function copyAeroMessage() {

}

//Call this when a message should be a part of the conversation
//Being had with Chat GPT
function contextualizeMessage(message) {
  conversation.push(message);
  console.log(conversation);
}


function sendMessage() {
  
  ChatwithGPT()
    .then(response => {
      contextualizeMessage(response)
      addAeroMessage(response)
    })
    .catch(error => alert("An error with ChatGPT has occured!" + error))
  
}


//An API call that works with what I'm doing
//Hopefully can integrate this with our other stuff
//Don't really want this function in here
//Don't use yet??
async function ChatwithGPT() {

  const context = conversation.join("\n");

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo', // Specify the model you want to use
      max_tokens: 150, // Adjust as needed
      messages: [
        {
          "role": "system",
          "content": SYSTEM_PROMPT
        },
        {
          "role": "user",
          "content": context
        }
      ]
    })
  };

  const response = await fetch(API_ENDPOINT, requestOptions);
  const data = await response.json();
  console.log(data.choices[0]);
  return data.choices[0].message.content; // Extract generated text from the response

}







