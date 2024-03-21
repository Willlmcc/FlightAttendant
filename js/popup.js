
document.getElementById('refresh').addEventListener('click', function() {
    chrome.runtime.sendMessage({action: 'fetchInbox'}, function(response) {
  
    });
    

    chrome.runtime.onMessage.addListener(
      async function(request, sender, sendResponse) {
        if (request.action == "fetchInbox") {
          // Log the message body to the console
          console.log(request.data);

          const systemPrompt = "Assume you are a asisstant that analyze mail and give a repsone about mail whether meeting is required or not";
          const userPrompt = request.data;

          // Call OpenAI API
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              //'Authorization': 'Bearer' // Add your API key here
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
                  messages: [
                    {
                      "role": "system",
                      "content": systemPrompt
                    },
                    {
                      "role": "user",
                      "content": userPrompt
                    }
                  ]
                })
              });

          const data = await response.json();
          console.log(data);

          const assistantMessage = data.choices[0].message.content;
          console.log(assistantMessage);  
  
      }
    });
});