import { ForeignExpectation, ForeignExpectation2D } from "@/types";
import { UMAP, TSNE, TriMap } from "@saehrimnir/druidjs";
import { kv } from "@vercel/kv";

export async function getPairFromKvList(): Promise<ForeignExpectation2D[]> {
  // await kv.del("pairs");

  const pairs = await kv.lrange<ForeignExpectation>("pairs", 0, -1);

  const embeddings = pairs.flatMap(
    ({ expectationEmbedding, experienceEmbedding }) => [
      expectationEmbedding,
      experienceEmbedding,
    ]
  );

  if (embeddings.length > 0) {
    const reduction = new UMAP(embeddings, {
      n_neighbors: 1,
    });

    return pairs.map(({ expectation, experience, key }, index) => ({
      expectation,
      experience,
      key,
      expectationEmbedding2D: Array.from(reduction.projection[index * 2]),
      experienceEmbedding2D: Array.from(reduction.projection[index * 2 + 1]),
    }));
  } else {
    return [];
  }
}

export async function addPairToKvList(pair: ForeignExpectation) {
  await kv.lpush<ForeignExpectation>("pairs", pair);
  return getPairFromKvList();
}
