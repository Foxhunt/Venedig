import { TSNE, UMAP } from "@saehrimnir/druidjs";
import { writeFileSync } from "node:fs";

import data from "../embedddings.json" assert { type: "json" };

console.log(data);

const texts = data.map(({ text }) => text);
const embeddings = data.map(({ embedding }) => embedding);

{
  const reduction = new UMAP(embeddings, { n_neighbors: data.length - 1 });
  const mappedReduction = reduction.projection.map((embedding, index) => ({
    text: texts[index],
    embedding: [embedding[0], embedding[1]],
  }));
  console.log(mappedReduction);

  writeFileSync("embedddings2D_UMAP.json", JSON.stringify(mappedReduction));
}

{
  const reduction = new TSNE(embeddings);
  const mappedReduction = reduction.projection.map((embedding, index) => ({
    text: texts[index],
    embedding: [embedding[0], embedding[1]],
  }));
  console.log(mappedReduction);

  writeFileSync("embedddings2D_TNSE.json", JSON.stringify(mappedReduction));
}
