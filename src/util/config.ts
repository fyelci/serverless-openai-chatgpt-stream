export interface Config {
  awsRegion: string;
  openAiApiKey: string;
}

export const config: Config = Object.freeze({
  awsRegion: process.env.AWS_REGION || 'eu-west-2',
  openAiApiKey: process.env.OPENAI_API_KEY as string,
});

export const getConfig = (): Config => config;
