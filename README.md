## Serverless OpenAI ChatGPT Stream

API Gateway doesn't support streaming, so this is a workaround to stream data from OpenAI ChatGPT.

Lambda offers function urls which allows you to call Lambda function via http. Lambda function urls support streaming, so you can stream data from OpenAI ChatGPT. 

## Setup and deployment
You need to copy `.env.example` to `.env` and fill in the `OPENAI_API_KEY` environment variable.

* Run ```npm install``` to install all the necessary dependencies.
 

### Deploy on AWS, simply run:

```
$ npm run deploy

# or

$ serverless deploy
```

This will deploy your function and print your lambda function's url like below:

```shell
endpoint: https://XXXXXXXXXXXXXX.lambda-url.eu-west-2.on.aws/
```

## Usage

You can test your endpoint like below

```shell
curl --location 'https://XXXXXXXXXXXXXX.lambda-url.eu-west-2.on.aws/' \
--header 'Content-Type: application/json' \
--data '{"chatLog": [{ "role": "user",  "content": "Write me a blog post about London." }]}'
```
