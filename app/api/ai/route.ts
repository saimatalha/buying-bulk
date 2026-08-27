export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return Response.json(
        { error: "Please provide a message" },
        { status: 400 }
      );
    }

    const ollamaResponse = await fetch(
      "http://localhost:11434/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen2.5:0.5b",
          prompt: message,
          stream: false,
        }),
      }
    );

    if (!ollamaResponse.ok) {
      throw new Error("Ollama connection failed");
    }

    const data = await ollamaResponse.json();

    return Response.json({
      response: data.response,
    });
  } catch (error) {
    console.error("Ollama error:", error);

    return Response.json(
      {
        error: "Could not connect to Ollama",
      },
      { status: 500 }
    );
  }
}