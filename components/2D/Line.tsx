import { Dispatch, SetStateAction, useCallback } from "react";

import { Graphics as PixiGraphics } from "@pixi/graphics";
import { Graphics } from "@pixi/react";
import { ColorSource, LINE_CAP, LINE_JOIN } from "pixi.js";

const arrowLength = 8;
const arrowAngle = 20;

type LineProps = {
  start: [number, number];
  end: [number, number];
  color?: ColorSource;
  poninterOver?: boolean;
  setPointerOver?: Dispatch<SetStateAction<boolean>>;
};

export default function Line({
  start,
  end,
  color = 0xffffff,
  poninterOver,
}: LineProps) {
  const draw = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      g.lineStyle({
        width: poninterOver ? 3 : 2,
        color,
        cap: LINE_CAP.ROUND,
        join: LINE_JOIN.ROUND,
      });

      g.moveTo(start[0], start[1]);
      g.lineTo(end[0], end[1]);

      const lineAngle = Math.atan2(end[1] - start[1], end[0] - start[0]);

      const x1 =
        end[0] -
        arrowLength * Math.cos(lineAngle + (Math.PI / 180) * arrowAngle);
      const y1 =
        end[1] -
        arrowLength * Math.sin(lineAngle + (Math.PI / 180) * arrowAngle);

      const x2 =
        end[0] -
        arrowLength * Math.cos(lineAngle - (Math.PI / 180) * arrowAngle);
      const y2 =
        end[1] -
        arrowLength * Math.sin(lineAngle - (Math.PI / 180) * arrowAngle);

      // Draw arrow
      g.lineTo(x1, y1);
      g.moveTo(end[0], end[1]);
      g.lineTo(x2, y2);
    },
    [color, end, poninterOver, start]
  );

  return <Graphics alpha={poninterOver ? 1 : 0.9} draw={draw} />;
}
