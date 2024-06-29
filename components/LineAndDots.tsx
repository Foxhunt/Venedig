import { Container } from "@pixi/react";
import Dot from "./Dot";
import Line from "./Line";
import { useEffect, useState } from "react";

type LineProps = {
  start: [number, number];
  end: [number, number];
};

export default function LineAndDots({
  start: initialStart,
  end: initialEnd,
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
      <Dot position={start} />
      <Dot position={end} />
    </Container>
  );
}
