import { generateTextForForeignIntersection } from "@/application/ai";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getForeignIntersection(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { pair1, pair2 } = JSON.parse(request.body);

  const foreignIntersection = await generateTextForForeignIntersection(
    pair1,
    pair2
  );

  foreignIntersection.pipeDataStreamToResponse(response);

  //   response
  //     .status(200)
  //     .end(, "latin1");
  //
}
