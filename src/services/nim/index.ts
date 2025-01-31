const API_KEY = import.meta.env.VITE_NIM_API_KEY;

interface NimResponse {
  text: string;
  error?: string;
}

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
            content: `You are a helpful travel assistant that provides information about countries. 
            ${countryContext ? `The user is currently viewing information about ${countryContext}.` : ''}
            Provide accurate and concise information about countries, travel recommendations, and help with translations when asked.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 0.7
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return { 
      text: data.choices?.[0]?.message?.content || 'No response generated'
    };
  } catch (error) {
    console.error('Error calling NIM API:', error);
    return {
      text: 'I apologize, but I encountered an error. Please try again later.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};