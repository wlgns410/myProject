import OpenAI from 'openai';

const openaiInstance = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

export const openAI = async (foodSentence: string): Promise<string> => {
  let result = '';

  const stream = await openaiInstance.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: foodSentence }],
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    result += content;
  }

  return result;
};
