import { ForeignExpectation, ForeignExpectation2D } from "@/types";
import { UMAP, cosine, TSNE, TriMap } from "@saehrimnir/druidjs";
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
      // local_connectivity: 6,
      // metric: cosine,
      // seed: 0,
      // min_dist: 90,
      // _spread: 55,
    });

    const projection: [number, number][] = reduction.transform();

    const min = Math.min(...projection.flatMap((arr) => Array.from(arr)));
    const max = Math.max(...projection.flatMap((arr) => Array.from(arr)));
    const normalizedProjection = projection.map(([x, y]) => [
      (x - min) / (max - min),
      (y - min) / (max - min),
    ]);

    return pairs.map(({ expectation, experience, key }, index) => ({
      expectation,
      experience,
      key,
      expectationEmbedding2D: Array.from(normalizedProjection[index * 2]),
      experienceEmbedding2D: Array.from(normalizedProjection[index * 2 + 1]),
    }));
  } else {
    return [];
  }
}

export async function addPairToKvList(pair: ForeignExpectation) {
  await kv.lpush<ForeignExpectation>("pairs", pair);
  return getPairFromKvList();
}
