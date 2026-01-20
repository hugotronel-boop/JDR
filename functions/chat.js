export async function onRequestPost(context) {
  try {
    const { prompt, name, style } = await context.request.json();
    const apiKey = context.env.GEMINI_API_KEY;

    // Configuration du message pour Gemini
    const systemInstruction = `Tu es un MJ de RPG ${style}. Le héros est ${name}. Réponds court et en français.`;
    
    // Appel à l'API Gemini
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{ text: systemInstruction + "\n\nAction du joueur : " + prompt }]
        }]
      })
    });

    const data = await response.json();
    
    // On extrait la réponse de la structure Gemini
    const aiText = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ response: aiText }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: "Erreur Gemini: " + e.message }), { status: 500 });
  }
}
