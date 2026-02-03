import { getClientKeys } from './getClientKeys';

export async function addUsdaFood(payload: any) {
  const keys = getClientKeys();
  if (!keys?.openaiApiKey) {
    throw new Error('OpenAI API key not set');
  }

  const res = await fetch('/api/foods/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-openai-key': keys.openaiApiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Failed to save food');
}
