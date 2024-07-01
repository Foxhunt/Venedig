import { openai } from "@ai-sdk/openai";
import { embedMany } from "ai";

export async function generateEmbeddings(values: string[]) {
  return embedMany({
    model: openai.embedding("text-embedding-3-small"),
    values: values,
  });
}
