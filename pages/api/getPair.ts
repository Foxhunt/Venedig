import { NextApiRequest, NextApiResponse } from "next";

import { getPairFromKvList } from "@/application/kv";

export default async function getPair(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const pairs = await getPairFromKvList();

  response.status(200).json(pairs);
}
