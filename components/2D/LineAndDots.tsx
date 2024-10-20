import { useMemo, useState } from "react";
import Dot from "./Dot";
import Line from "./Line";

type LineProps = {
  start: [number, number];
  end: [number, number];
  expectation: string;
  experience: string;
  extPointerOver?: boolean;
};

export default function LineAndDots({
  start,
  end,
  expectation,
  experience,
  extPointerOver,
}: LineProps) {
  const [poninterOver, setPointerOver] = useState<boolean>(false);

  const distanceFromDotCenterToLineStart =
    poninterOver || extPointerOver ? 14 : 18;
  const distanceFromDotCenterToLineEnd =
    poninterOver || extPointerOver ? 14 : 18;

  const LineAngle = Math.atan2(end[1] - start[1], end[0] - start[0]);

  const startX =
    start[0] + distanceFromDotCenterToLineStart * Math.cos(LineAngle);
  const startY =
    start[1] + distanceFromDotCenterToLineStart * Math.sin(LineAngle);
  const lineStart: [number, number] = [startX, startY];

  const endX = end[0] - distanceFromDotCenterToLineEnd * Math.cos(LineAngle);
  const endY = end[1] - distanceFromDotCenterToLineEnd * Math.sin(LineAngle);
  const lineEnd: [number, number] = [endX, endY];

  const expectationColor = useMemo(
    () => ({
      h: 360 * Math.random(),
      s: 50 + 50 * Math.random(),
      l: 30 + 30 * Math.random(),
    }),
    []
  );

  const experienceColor = useMemo(
    () => ({
      h: 360 * Math.random(),
      s: 50 + 50 * Math.random(),
      l: 30 + 30 * Math.random(),
    }),
    []
  );

  return (
    <>
      {(poninterOver || extPointerOver) && (
        <Line
          start={lineStart}
          end={lineEnd}
          color={0xa6b7fe}
          poninterOver={poninterOver || extPointerOver}
          setPointerOver={setPointerOver}
        />
      )}
      <Dot
        key={"s" + expectation}
        text={expectation}
        position={start}
        color={expectationColor}
        size={8}
        extPoninterOver={poninterOver || extPointerOver}
        extSetPointerOver={setPointerOver}
      />
      <Dot
        key={"e" + experience}
        text={experience}
        position={end}
        color={experienceColor}
        size={8}
        extPoninterOver={poninterOver || extPointerOver}
        extSetPointerOver={setPointerOver}
      />
    </>
  );
}
