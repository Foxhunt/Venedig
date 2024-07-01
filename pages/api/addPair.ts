import { NextApiRequest, NextApiResponse } from "next";

import { generateEmbeddings } from "@/application/ai";
import { addPairToKvList } from "@/application/kv";

export default async function addPair(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { expectation, experience } = JSON.parse(request.body);

  const {
    embeddings: [expectationEmbedding, experienceEmbedding],
  } = await generateEmbeddings([expectation, experience]);

  const pairs = await addPairToKvList({
    key: Math.random(),
    expectation,
    expectationEmbedding,
    experience,
    experienceEmbedding,
  });

  response.status(200).json(pairs);
}
