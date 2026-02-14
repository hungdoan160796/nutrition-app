export async function addUsdaFood(payload: any, openAIKey?: string) {
  // allow caller to provide a per-user OpenAI key (from profile).
  const key = openAIKey ?? process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!key) {
    throw new Error('OpenAI API key not set');
  }

  const res = await fetch('/api/foods/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-openai-key': key,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Failed to save food');
}
