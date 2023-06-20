import 'source-map-support/register';
import util from 'util';
import stream from 'stream';
import { Configuration, OpenAIApi } from 'openai';
import { createParser } from 'eventsource-parser';
import { getConfig } from '../util/config';
import { logger } from '../util/logger';

const { openAiApiKey } = getConfig();
const pipeline = util.promisify(stream.pipeline);

const config = new Configuration({ apiKey: openAiApiKey });
const openai = new OpenAIApi(config);

// @ts-ignore
export const chatStream = awslambda.streamifyResponse(async (event, responseStream, _context) => {
  logger.info('body: ' + event.body);
  const body = JSON.parse(event.body);
  const chatLog = body.chatLog;
  logger.info('chatLog: ', { body, chatLog });

  const response = await openai.createChatCompletion(
    {
      model: 'gpt-3.5-turbo',
      temperature: 0,
      messages: chatLog,
      stream: true,
    },
    { responseType: 'stream' }
  );

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  /* global ReadableStream */
  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event) {
        if (event.type === 'event') {
          const data = event.data;
          if (data === '[DONE]') {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta?.content || '';
            if (counter < 2 && (text.match(/\n/) || []).length) {
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            controller.error(e);
          }
        }
      }

      const parser = createParser(onParse);

      // @ts-ignore
      for await (const chunk of response.data) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  // @ts-ignore
  await pipeline(stream, responseStream);
});
