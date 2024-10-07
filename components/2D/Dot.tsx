import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";

import { Container, Graphics, Text } from "@pixi/react";

import { ColorSource } from "pixi.js";
import { TextStyle } from "@pixi/text";
import { Graphics as PixiGraphics } from "@pixi/graphics";

type DotProps = {
  position: [number, number];
  size?: number;
  text?: string;
  color?: ColorSource;
  extPoninterOver?: boolean;
  extSetPointerOver?: Dispatch<SetStateAction<boolean>>;
};

export default function Dot({
  position,
  size = 10,
  text,
  color = 0xffffff,
  extPoninterOver,
  extSetPointerOver,
}: DotProps) {
  const draw = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      g.beginFill(color);
      g.drawCircle(0, 0, extPoninterOver ? 10 : size);
    },
    [color, extPoninterOver, size]
  );

  const [poninterOver, setPointerOver] = useState<boolean>(false);

  const handlePointer = useCallback(
    (value: boolean) => {
      if (extSetPointerOver) {
        extSetPointerOver(value);
      } else {
        setPointerOver(value);
      }
    },
    [extSetPointerOver]
  );

  return (
    <Container
      position={position}
      zIndex={extPoninterOver || poninterOver ? 999 : 0}
    >
      <Graphics
        draw={draw}
        alpha={extPoninterOver || poninterOver ? 1 : 0.9}
        onpointerenter={() => handlePointer(true)}
        onpointerleave={() => handlePointer(false)}
      />
      {(extPoninterOver || poninterOver) && (
        <Text
          text={`${text || ""}`}
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
              strokeThickness: 2,
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
