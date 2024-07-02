import { NextApiRequest, NextApiResponse } from "next";

import { generateEmbeddings } from "@/application/ai";
import {
  addForeignExpectationToKvList,
  getForeignExpectationsFromKvList,
} from "@/application/kv";

export default async function addForeignExpectation(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { expectation, experience } = JSON.parse(request.body);

  const {
    embeddings: [expectationEmbedding, experienceEmbedding],
  } = await generateEmbeddings([expectation, experience]);

  await addForeignExpectationToKvList({
    key: Math.random(),
    expectation,
    expectationEmbedding,
    experience,
    experienceEmbedding,
  });

  const foreignExpectations = await getForeignExpectationsFromKvList();

  await response.revalidate("/");
  response.status(200).json(foreignExpectations);
}
