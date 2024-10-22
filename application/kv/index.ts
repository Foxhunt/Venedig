import { ForeignExpectation, ForeignExpectation2D } from "@/types";
import {
  UMAP,
  cosine,
  euclidean_squared,
  TSNE,
  TriMap,
} from "@saehrimnir/druidjs";
import { kv } from "@vercel/kv";

/**
 * Funktion um alle ForeignExpectations aus dem KV-Store zu holen.
 *
 * @returns {Promise<ForeignExpectation2D[]>}
 */
export async function getForeignExpectationsFromKvList(): Promise<
  ForeignExpectation2D[]
> {
  const foreignExpectations = await kv.lrange<ForeignExpectation>(
    "foreignExpectations",
    0,
    -1
  );

  const embeddings = foreignExpectations.flatMap(
    ({ expectationEmbedding, experienceEmbedding }) => [
      expectationEmbedding,
      experienceEmbedding,
    ]
  );

  if (embeddings.length > 0) {
    const reduction = new UMAP(embeddings, {
      n_neighbors: 10,
      min_dist: 0.0000001,
      local_connectivity: 0.000001,
      // seed: 0,
      // _spread: 1,
      metric: euclidean_squared,
    });

    const projection: [number, number][] = reduction.transform();

    const min = Math.min(...projection.flatMap((arr) => Array.from(arr)));
    const max = Math.max(...projection.flatMap((arr) => Array.from(arr)));
    const normalizedProjection = projection.map(([x, y]) => [
      (x - min) / (max - min),
      (y - min) / (max - min),
    ]);

    return foreignExpectations.map(
      ({ expectation, experience, key }, index) => ({
        expectation,
        experience,
        key,
        expectationEmbedding2D: Array.from(normalizedProjection[index * 2]),
        experienceEmbedding2D: Array.from(normalizedProjection[index * 2 + 1]),
      })
    );
  } else {
    return [];
  }
}

/**
 * Funktion um eine ForeignExpectation hinzuzufügen.
 *
 * @param {ForeignExpectation} foreignExpectation
 * @returns {Promise<void>}
 */

export async function addForeignExpectationToKvList(
  foreignExpectation: ForeignExpectation
) {
  await kv.lpush<ForeignExpectation>("foreignExpectations", foreignExpectation);
}
