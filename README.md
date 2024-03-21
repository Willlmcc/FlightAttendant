![READMEHeader](https://github.com/Willlmcc/FlightAttendant/assets/96445211/74c3ef13-08ea-49c0-b3e1-3d14cee7e4af)

# FlightAttendant
Virginia Tech Capstone Project on how to decrease meeting bloating and inefficiency. Google Chrome Mail Extension with NLP and GPT Prompt Engineering.

# How to run:
1) clone the repo
2) In manifest.json replace the "client_id" in "oauth2" with your own.
3) In popup.js add your key to the Authorization.
   ```
   headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer <OpenAI_API_Key>'
      }
   ```
4) Navigate to chrome://extensions
5) Expand the Developer dropdown menu and click “Load Unpacked Extension”
6) Navigate to the local folder containing the extension’s code and click Ok

Assuming there are no errors, the extension should load into your browser

# How to get the client_id:
1) Find the extension ID 
   
    ![image](https://github.com/Willlmcc/FlightAttendant/assets/134977591/17c6b539-17ca-4db1-bbf8-3779d4de70c0)

2) Navigate to the [Google API console](https://console.developers.google.com/apis) and create a new project. Once ready, select Credentials in the sidebar, click Create credentials and choose OAuth client ID.

    ![image](https://github.com/Willlmcc/FlightAttendant/assets/134977591/e5d103b7-5aea-4929-b33d-4ea1971886dd)

    ![image](https://github.com/Willlmcc/FlightAttendant/assets/134977591/6d4c4a33-5e69-4013-a864-af2180723335)

    
```
      
      "oauth2": {
        "client_id": "yourExtensionOAuthClientIDWillGoHere.apps.googleusercontent.com",
        "scopes":[""]
     
      }
```









