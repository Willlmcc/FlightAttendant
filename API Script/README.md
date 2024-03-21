# Notes on how to use script

## Must have access to ChatGPT API Key for use

How to use the script step by step is laid out below. This file is a guide but once streamlined will no longer need to changed by hand as it will only be called by the extension.

In this interim stage the file does a couple of things:
  1. Takes a prompt engineering input. Example: you are a mail assistant
  2. Takes a question input to be answered. Example: Who was the ninth president of the US? 
  3. Calls and returns a file with the provided 1. & 2.

The prompt takes two inputs in the call and looks something like this:
``` 
./promptscript promptEng.txt inputFile.txt
```
As mentioned above it is important to not that a global varibale "OPENAI_API_KEY" needs to be replaced for an actual call to the API.

Lastly there are a couple of echos used with variables to make sure that everything is correctly listed. This includes a file that is made specifically to create the JSON that is passed into the curl. This file is unimportant and does not need to be edited as it is rewritten over time. 

The two files to edit are as currently named:
  1. promptEng.txt -> if you want to change how the AI answers questions
  2. inputFile.txt -> where you ask the question you want answered

Later in the development process the results from this script will be put and cleaned into a seperate file which will be returned to the user.
