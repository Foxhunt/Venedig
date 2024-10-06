import { openai } from "@ai-sdk/openai";
import { embedMany } from "ai";

import { writeFileSync } from "node:fs";

const values = [
  "sunny day at the beach",
  "cool day at the beach",
  "icecream on the beach",
  "running on the beach",
  "playing ball on the beach",
  "sunbathing on the beach",
];

// 'embedding' is a single embedding object (number[])
const { embeddings } = await embedMany({
  model: openai.embedding("text-embedding-3-small"),
  values,
});

const textMappedToEmbedding = embeddings.map((embedding, index) => ({
  text: values[index],
  embedding,
}));

writeFileSync("embedddings.json", JSON.stringify(textMappedToEmbedding));
