import { Graphics as PixiGraphics } from "@pixi/graphics";
import { Graphics } from "@pixi/react";
import { useCallback, useState } from "react";

type DotProps = {
  position: [number, number];
};

export default function Dot({ position }: DotProps) {
  const [poninterOver, setPointerOver] = useState<boolean>(false);

  const draw = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      g.beginFill(poninterOver ? 0xff0000 : 0xffffff);
      g.drawCircle(0, 0, 15);
    },
    [poninterOver]
  );

  return (
    <Graphics
      position={position}
      draw={draw}
      onpointerdown={() => console.log("onpointerdown")}
      onpointerenter={() => setPointerOver(true)}
      onpointerleave={() => setPointerOver(false)}
    />
  );
}
