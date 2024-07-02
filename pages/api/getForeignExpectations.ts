import { NextApiRequest, NextApiResponse } from "next";

import { getForeignExpectationsFromKvList } from "@/application/kv";

export default async function getForeignExpectations(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const foreignExpectations = await getForeignExpectationsFromKvList();

  response.status(200).json(foreignExpectations);
}
