export async function onRequestPost(context) {
  // 1. Récupérer la question du joueur
  const { prompt } = await context.request.json();

  // 2. Appeler l'IA de Cloudflare (Llama 3 par exemple)
  const answer = await context.env.AI.run('@cf/meta/llama-3-8b-instruct', {
    messages: [
      { role: 'system', content: 'Tu es le maître du jeu d’un RPG narratif. Réponds en français.' },
      { role: 'user', content: prompt }
    ]
  });

  // 3. Renvoyer la réponse au format JSON
  return new Response(JSON.stringify(answer), {
    headers: { 'Content-Type': 'application/json' }
  });
}
