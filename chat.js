export async function onRequestPost(context) {
  const { prompt, name, style } = await context.request.json();

  // On configure le système pour qu'il sache quel style de jeu utiliser
  const systemPrompt = `Tu es le maître du jeu d'un RPG ${style}. 
    Le joueur s'appelle ${name}. 
    Réponds de manière immersive, courte (max 3 phrases) et en français.`;

  try {
    const response = await context.env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ]
    });

    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
