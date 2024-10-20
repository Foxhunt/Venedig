import { openai } from "@ai-sdk/openai";
import { embedMany, generateText, streamText } from "ai";

export async function generateEmbeddings(values: string[]) {
  return embedMany({
    model: openai.embedding("text-embedding-3-small"),
    values: values,
  });
}

export async function generateTextForForeignIntersection(
  pair1: [string, string],
  pair2: [string, string]
) {
  return streamText({
    model: openai("gpt-4o-mini"),
    maxTokens: 100,
    stopSequences: [". "],
    system:
      "Anser in a german sentence. " +
      "Do not be a smart ass talk casual. " +
      "Two people share their Expectations and their Experiances. " +
      "Find a deeper meaning or understanding behind the givent Expectations and Experiances. " +
      "Do not mention that there are people involved, just talk about the content in the Expectation and Experiance.",
    prompt: `
    Expectation: ${pair1[0]}
    Experiance: ${pair1[1]}

    Expectation: ${pair2[0]}
    Experiance: ${pair2[1]}
    `,
  });
}
