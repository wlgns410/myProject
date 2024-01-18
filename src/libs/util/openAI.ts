import OpenAI from 'openai';

export const openAI = async (foodSentence: string) => {
  const openaiInstance = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.ORGANIZATION_INFO,
  });

  try {
    const response: any = await openaiInstance.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: foodSentence }],
    });
    const messagesContent = response.choices[0]?.message;

    return messagesContent;
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status); // e.g. 401
      console.error(error.message); // e.g. The authentication token you passed was invalid...
      console.error(error.code); // e.g. 'invalid_api_key'
      console.error(error.type); // e.g. 'invalid_request_error'
    } else {
      // Non-API error
      console.log(error);
    }
    return null;
  }
};
