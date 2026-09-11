export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return Response.json(
        { error: "Please provide a message" },
        { status: 400 }
      );
    }

    const apiKey = process.env.AI_GATEWAY_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "AI_GATEWAY_API_KEY is missing" },
        { status: 500 }
      );
    }

    const aiResponse = await fetch(
      "https://ai-gateway.vercel.sh/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-5.5-fast",
          messages: [
            {
              role: "system",
              content:
                "You are MyBulkAI, the friendly AI assistant for My Bulk Deals, a Pakistani bulk grocery marketplace. Keep answers short and helpful.",
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await aiResponse.json();

    if (!aiResponse.ok) {
      console.error("AI Gateway error:", data);

      return Response.json(
        {
          error:
            data?.error?.message ||
            "AI Gateway request failed",
        },
        { status: 502 }
      );
    }

    const response = data?.choices?.[0]?.message?.content;

    if (!response) {
      console.error("Unexpected AI response:", data);

      return Response.json(
        { error: "AI returned no response" },
        { status: 502 }
      );
    }

    return Response.json({ response });
  } catch (error) {
    console.error("MyBulkAI error:", error);

    return Response.json(
      { error: "MyBulkAI backend failed" },
      { status: 500 }
    );
  }
}
