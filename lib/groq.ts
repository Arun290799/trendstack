import Groq from "groq-sdk";

export async function generateSummary(title: string, descriptionOrUrl: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.warn("GROQ_API_KEY is not set. Skipping AI summary generation.");
    return "No summary available.";
  }

  const groq = new Groq({ apiKey });

  try {
    const prompt = `Summarize this tool or repo in 2 lines:
- What it does
- Why it's useful for developers.

Tool: ${title}
Context: ${descriptionOrUrl}

Only return the summary string. No introductory text.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.1-8b-instant", // Fast model
      max_tokens: 100,
      temperature: 0.5,
    });

    const output = chatCompletion.choices[0]?.message?.content || "No summary available.";
    return output.trim();
  } catch (error) {
    console.error("Groq API Error:", error);
    return "Failed to generate summary.";
  }
}
