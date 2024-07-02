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
  return (
    <>
      <Line start={start} end={end} color={0x3333ff} />
      <Dot text={expectation} position={start} color={0x33ff33} size={8} />
      <Dot text={experience} position={end} color={0xff3333} size={8} />
    </>
  );
}
