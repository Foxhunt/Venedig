import { useCallback, useState } from "react";

import { Container, Graphics, Text } from "@pixi/react";

import { ColorSource } from "pixi.js";
import { TextStyle } from "@pixi/text";
import { Graphics as PixiGraphics } from "@pixi/graphics";

type DotProps = {
  position: [number, number];
  size?: number;
  text?: string;
  color?: ColorSource;
};

export default function Dot({
  position,
  size = 10,
  text,
  color = 0xffffff,
}: DotProps) {
  const [poninterOver, setPointerOver] = useState<boolean>(false);

  const draw = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      g.beginFill(color, poninterOver ? 1 : 0.99);
      g.drawCircle(0, 0, poninterOver ? 20 : size);
    },
    [color, poninterOver, size]
  );

  return (
    <Container position={position} zIndex={poninterOver ? 999 : 0}>
      <Graphics
        draw={draw}
        onpointerenter={() => setPointerOver(true)}
        onpointerleave={() => setPointerOver(false)}
      />
      {poninterOver && (
        <Text
          text={`${text || ""} (${Math.trunc(position[0])},${Math.trunc(
            position[1]
          )})`}
          position={[25, -24]}
          anchor={[0, 0]}
          angle={0}
          style={
            new TextStyle({
              // align: "center",
              // fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
              fontSize: 30,
              // lineHeight: 20,
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
              wordWrap: true,
              wordWrapWidth: 300,
            })
          }
        />
      )}
    </Container>
  );
}
