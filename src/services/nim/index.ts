const API_KEY = import.meta.env.VITE_NIM_API_KEY;

interface NimResponse {
  text: string;
  error?: string;
}

const getSystemPrompt = (countryContext?: string) => `You are a concise travel assistant that provides brief, focused information about countries. Keep responses short and to the point.
${countryContext ? `The user is currently viewing information about ${countryContext}.` : ''}
Focus on the most essential information, limit examples, and avoid unnecessary details.
Aim for responses that are 3-4 sentences for simple queries and no more than 2-3 short bullet points for lists.
When providing recommendations, limit to top 2-3 most important items.`;

export const generateResponse = async (
  prompt: string,
  countryContext?: string
): Promise<NimResponse> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'meta/llama-3.1-405b-instruct',
        messages: [
          {
            role: 'system',
            content: getSystemPrompt(countryContext)
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 512,
        top_p: 0.7
      }),
    });

    if (!response.ok) {
      throw new Error('API request failed: ' + response.statusText);
    }

    const data = await response.json();
    return { 
      text: data.choices[0]?.message?.content || 'No response generated'
    };
  } catch (error) {
    console.error('Error calling NIM API:', error);
    return {
      text: 'I apologize, but I encountered an error. Please try again later.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};