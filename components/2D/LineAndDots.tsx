import { useState } from "react";
import Dot from "./Dot";
import Line from "./Line";

type LineProps = {
  start: [number, number];
  end: [number, number];
  expectation: string;
  experience: string;
};

export default function LineAndDots({
  start,
  end,
  expectation,
  experience,
}: LineProps) {
  const [poninterOver, setPointerOver] = useState<boolean>(false);

  const distanceFromDotCenterToLineStart = poninterOver ? 14 : 18;
  const distanceFromDotCenterToLineEnd = poninterOver ? 14 : 18;

  const LineAngle = Math.atan2(end[1] - start[1], end[0] - start[0]);

  const startX =
    start[0] + distanceFromDotCenterToLineStart * Math.cos(LineAngle);
  const startY =
    start[1] + distanceFromDotCenterToLineStart * Math.sin(LineAngle);
  const lineStart: [number, number] = [startX, startY];

  const endX = end[0] - distanceFromDotCenterToLineEnd * Math.cos(LineAngle);
  const endY = end[1] - distanceFromDotCenterToLineEnd * Math.sin(LineAngle);
  const lineEnd: [number, number] = [endX, endY];

  return (
    <>
      <Line
        start={lineStart}
        end={lineEnd}
        color={0x3333ff}
        poninterOver={poninterOver}
        setPointerOver={setPointerOver}
      />
      <Dot
        text={expectation}
        position={start}
        color={0x33ff33}
        size={8}
        extPoninterOver={poninterOver}
        extSetPointerOver={setPointerOver}
      />
      <Dot
        text={experience}
        position={end}
        color={0xff3333}
        size={8}
        extPoninterOver={poninterOver}
        extSetPointerOver={setPointerOver}
      />
    </>
  );
}
