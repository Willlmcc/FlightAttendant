#!/bin/bash
echo $OPENAI_API_KEY
prompt=$(cat $1)
message=$(cat $2)
echo $prompt
echo $message

cat<<EOF > testName.txt
{
"model": "gpt-3.5-turbo",
    "messages": [
      {
        "role": "system",
        "content": "$prompt"
      },
      {
        "role": "user",
        "content": "$message"
      }
    ]
  }
EOF
curl https://api.openai.com/v1/chat/completions -H "Content-Type: application/json" -H "Authorization: Bearer $OPENAI_API_KEY" -d @testName.txt 
