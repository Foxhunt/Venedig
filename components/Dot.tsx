import { useCallback, useState } from "react";

import { Container, Graphics, Text } from "@pixi/react";

import { TextStyle } from "@pixi/text";
import { Graphics as PixiGraphics } from "@pixi/graphics";
import { TEXT_GRADIENT } from "pixi.js";

type DotProps = {
  position: [number, number];
  text?: string;
  isStart?: boolean;
};

export default function Dot({ position, isStart = false, text }: DotProps) {
  const [poninterOver, setPointerOver] = useState<boolean>(false);

  const draw = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      g.beginFill(isStart ? 0xff0000 : 0xffffff);
      g.drawCircle(0, 0, poninterOver ? 20 : 15);
    },
    [isStart, poninterOver]
  );

  return (
    <Container position={position}>
      <Graphics
        draw={draw}
        onpointerenter={() => setPointerOver(true)}
        onpointerleave={() => setPointerOver(false)}
      />
      {poninterOver && (
        <Text
          text={`${text || ""}
x: ${Math.trunc(position[0])}
y: ${Math.trunc(position[1])}`}
          position={[20, 20]}
          style={
            new TextStyle({
              // align: "center",
              // fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
              fontSize: 50,
              // fontWeight: "400",
              fill: ["#ffffff"], // gradient
              // fillGradientStops: [0, 0.1, 1, 0],
              // fillGradientType: TEXT_GRADIENT.LINEAR_HORIZONTAL,
              stroke: "#000000",
              strokeThickness: 4,
              // letterSpacing: 20,
              // dropShadow: true,
              // dropShadowColor: "#ccced2",
              // dropShadowBlur: 4,
              // dropShadowAngle: Math.PI / 6,
              // dropShadowDistance: 6,
              // wordWrap: true,
              // wordWrapWidth: 440,
            })
          }
        />
      )}
    </Container>
  );
}
