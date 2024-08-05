import { Graphics as PixiGraphics } from "@pixi/graphics";
import { Graphics } from "@pixi/react";
import { ColorSource, LINE_CAP, LINE_JOIN, Texture } from "pixi.js";
import { useCallback } from "react";

const arrowLength = 15;

type LineProps = {
  start: [number, number];
  end: [number, number];
  color?: ColorSource;
};

export default function Line({ start, end, color = 0xffffff }: LineProps) {
  const draw = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      g.lineTextureStyle({
        width: 3,
        cap: LINE_CAP.ROUND,
        join: LINE_JOIN.ROUND,
        texture: gradient("red", "green", start, end),
      });

      g.moveTo(start[0], start[1]);
      g.lineTo(end[0], end[1]);

      const LineAngle = Math.atan2(end[1] - start[1], end[0] - start[0]);

      const x1 =
        end[0] - arrowLength * Math.cos(LineAngle + (Math.PI / 180) * 45);
      const y1 =
        end[1] - arrowLength * Math.sin(LineAngle + (Math.PI / 180) * 45);

      const x2 =
        end[0] - arrowLength * Math.cos(LineAngle - (Math.PI / 180) * 45);
      const y2 =
        end[1] - arrowLength * Math.sin(LineAngle - (Math.PI / 180) * 45);

      // Draw arrow
      g.lineTo(x1, y1);
      g.moveTo(end[0], end[1]);
      g.lineTo(x2, y2);
    },
    [end, start]
  );

  return <Graphics draw={draw} />;
}

function gradient(
  from: string,
  to: string,
  start: [number, number],
  end: [number, number]
) {
  const lineLenth = Math.sqrt(
    Math.abs(end[0] - start[0]) ** 2 + Math.abs(end[1] - start[1]) ** 2
  );

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;

  const grd = context.createRadialGradient(
    start[0],
    start[1],
    0,
    start[0],
    start[1],
    lineLenth
  );
  grd.addColorStop(0, from);
  grd.addColorStop(1, to);

  context.fillStyle = grd;
  context.arc(start[0], start[1], lineLenth + 3, 0, 2 * Math.PI);
  context.fill();

  return Texture.from(canvas);
}
