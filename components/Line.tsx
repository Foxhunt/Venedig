import { useCallback } from "react";
import { Graphics as PixiGraphics } from "@pixi/graphics";
import { Graphics } from "@pixi/react";
import { ColorSource } from "pixi.js";

type LineProps = {
  start: [number, number];
  end: [number, number];
  color?: ColorSource;
};

export default function Line({ start, end, color = 0xffffff }: LineProps) {
  const draw = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      g.lineStyle(2, color);
      g.moveTo(start[0], start[1]);
      g.lineTo(end[0], end[1]);
    },
    [color, end, start]
  );

  return <Graphics draw={draw} />;
}
