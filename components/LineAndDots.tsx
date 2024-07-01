import { Container } from "@pixi/react";
import Dot from "./Dot";
import Line from "./Line";
import { useEffect, useState } from "react";

type LineProps = {
  start: [number, number];
  end: [number, number];
  expectation: string;
  experience: string;
};

export default function LineAndDots({
  start: initialStart,
  end: initialEnd,
  expectation,
  experience,
}: LineProps) {
  const [start, setStart] = useState(initialStart);
  useEffect(() => {
    // setTimeout(() => setStart(([x, y]) => [(x + 10) % 1920, y]), 1000 / 30);
  }, [start]);

  const [end, setEnd] = useState(initialEnd);
  useEffect(() => {
    // setTimeout(() => setEnd(([x, y]) => [x, (y + 10) % 1080]), 1000 / 30);
  }, [end]);
  return (
    <Container>
      <Line start={start} end={end} />
      <Dot text={expectation} position={start} isStart />
      <Dot text={experience} position={end} />
    </Container>
  );
}
