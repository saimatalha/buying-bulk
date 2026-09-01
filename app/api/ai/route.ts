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
      console.error("AI_GATEWAY_API_KEY is not configured");

      return Response.json(
        { error: "AI service is not configured" },
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
              content: `
You are MyBulkAI, the friendly AI shopping assistant for My Bulk Deals,
Pakistan's smart bulk grocery marketplace.

Help customers with:
- Finding grocery products
- Bulk shopping
- Monthly grocery planning
- Grocery recommendations
- Understanding bulk deals
- Creating shopping lists
- Budget-conscious grocery suggestions
- Using the My Bulk Deals website

Keep responses helpful, concise, and easy to understand.

When discussing prices, use Pakistani Rupees (PKR/Rs.) when appropriate.

Do not invent product prices, stock availability, discounts, or product details.
If you do not have enough information, clearly say so.

You are a shopping assistant, not a medical or financial professional.
              `.trim(),
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();

      console.error("AI Gateway error:", errorText);

      return Response.json(
        { error: "AI service is temporarily unavailable" },
        { status: 502 }
      );
    }

    const data = await aiResponse.json();

    const response = data?.choices?.[0]?.message?.content;

    if (!response) {
      console.error("Unexpected AI response:", data);

      return Response.json(
        { error: "AI returned an empty response" },
        { status: 502 }
      );
    }

    return Response.json({
      response,
    });
  } catch (error) {
    console.error("MyBulkAI error:", error);

    return Response.json(
      {
        error: "Could not connect to the AI service",
      },
      { status: 500 }
    );
  }
}
