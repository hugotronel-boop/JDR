export async function onRequestPost(context) {
  try {
    const { prompt, name, style } = await context.request.json();

    // Configuration du Maître du Jeu
    const response = await context.env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { role: 'system', content: `Tu es un MJ de RPG ${style}. Le héros est ${name}. Réponds court et en français.` },
        { role: 'user', content: prompt }
      ]
    });

    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Erreur IA: " + e.message }), { status: 500 });
  }
}
