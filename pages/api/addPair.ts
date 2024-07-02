import { NextApiRequest, NextApiResponse } from "next";

import { generateEmbeddings } from "@/application/ai";
import { addPairToKvList, getPairFromKvList } from "@/application/kv";

export default async function addPair(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { expectation, experience } = JSON.parse(request.body);

  const {
    embeddings: [expectationEmbedding, experienceEmbedding],
  } = await generateEmbeddings([expectation, experience]);

  await addPairToKvList({
    key: Math.random(),
    expectation,
    expectationEmbedding,
    experience,
    experienceEmbedding,
  });

  const pairs = await getPairFromKvList();

  await response.revalidate("/");
  response.status(200).json(pairs);
}
