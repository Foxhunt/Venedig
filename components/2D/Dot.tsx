import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import { Container, Graphics, Text, useApp, Sprite } from "@pixi/react";

import { ColorSource, Texture } from "pixi.js";
import { TextStyle, TextMetrics } from "@pixi/text";
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
  text = "",
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

  const style = useMemo(
    () =>
      new TextStyle({
        // align: "center",
        // fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
        fontSize: 30,
        // lineHeight: 30,
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
      }),
    []
  );

  const metrics = useMemo(
    () => TextMetrics.measureText(text, style),
    [style, text]
  );

  const app = useApp();

  const wouldClipX = metrics.width + position[0] + 15 > app.screen.width;
  const wouldClipY = metrics.height + position[1] - 22 > app.screen.height;

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
        <>
          <Sprite
            texture={Texture.WHITE}
            tint={0xd0d0d0}
            width={metrics.width}
            height={metrics.height}
            position={[wouldClipX ? -15 : 15, wouldClipY ? 16 : -22]}
            anchor={[wouldClipX ? 1 : 0, wouldClipY ? 1 : 0]}
            alpha={0.9}
          />
          {/* <Graphics
            draw={(g) => {}}
            width={metrics.width}
            height={metrics.height}
            position={[wouldClipX ? -15 : 15, wouldClipY ? 16 : -22]}
            anchor={[wouldClipX ? 1 : 0, wouldClipY ? 1 : 0]}
            alpha={0.9}
          /> */}
          <Text
            text={text}
            position={[wouldClipX ? -15 : 15, wouldClipY ? 16 : -22]}
            anchor={[wouldClipX ? 1 : 0, wouldClipY ? 1 : 0]}
            angle={0}
            style={style}
          />
        </>
      )}
    </Container>
  );
}
