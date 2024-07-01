import { useCallback } from "react";
import { Graphics as PixiGraphics } from "@pixi/graphics";
import { Graphics } from "@pixi/react";

type LineProps = {
  start: [number, number];
  end: [number, number];
};

export default function Dot({ start, end }: LineProps) {
  const draw = useCallback(
    (g: PixiGraphics) => {
      // g.clear();
      g.lineStyle(4, 0xffffff);
      g.moveTo(start[0], start[1]);
      g.lineTo(end[0], end[1]);
    },
    [end, start]
  );

  return <Graphics draw={draw} />;
}
