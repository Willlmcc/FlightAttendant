
document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('refresh').addEventListener('click', function() {
        chrome.runtime.sendMessage({action: 'fetchInbox'}, function(response) {
      });
  });

    chrome.runtime.onMessage.addListener(
      async function(request, sender, sendResponse) {
        if (request.action == "fetchInbox") {
          // Log the message body to the console
          console.log(request.data);

          const systemPrompt = "Assume you are an assistant that will analyze mail and give a response about whether a meeting is required or not";
          const userPrompt = request.data;

          fetch('http://127.0.0.1:5000/api/analyze', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ question: request.data }),
              })
              .then(response => response.json())
              .then(data => {
                console.log(data.message)
                //Add the message to the chatbox
                addAeroMessage(data.message)
            })
                
              .catch((error) => {
                  console.error('Error:', error);
              });

  
      }
    });
});