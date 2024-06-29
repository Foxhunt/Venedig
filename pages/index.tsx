import "@pixi/events";
import { Graphics, Stage } from "@pixi/react";

import LineAndDots from "@/components/LineAndDots";

const pairs = [
  [
    [0.37149455514736474 * 1920, 0.9695213169325143 * 1080],
    [0.11320938216522336 * 1920, 0.17448412254452705 * 1080],
  ],
  [
    [0.024208462331444025 * 1920, 0.8042505807243288 * 1080],
    [0.9416927343700081 * 1920, 0.22548545175231993 * 1080],
  ],
  [
    [0.38654953869991004 * 1920, 0.8692176234908402 * 1080],
    [0.8144724303856492 * 1920, 0.28146595670841634 * 1080],
  ],
];

export default function Home() {
  return (
    <main
    // className={`flex min-h-screen justify-center items-center`}
    >
      <Stage
        options={{
          antialias: true,
          resolution: 2,
          eventMode: "static",
          preserveDrawingBuffer: false,
          clearBeforeRender: true,
        }}
        raf={false}
        renderOnComponentChange
        // className="object-contain w-full h-svh"
        width={1920}
        height={1080}
      >
        {pairs.map((pair, index) => (
          <LineAndDots
            key={index}
            start={[pair[0][0], pair[0][1]]}
            end={[pair[1][0], pair[1][1]]}
          />
        ))}

        <Graphics
          draw={(g) => {
            g.lineStyle(1, 0xffffff);

            g.moveTo(0, 0);
            g.bezierCurveTo(50, 10, 50, 90, 100, 100);
          }}
        />
      </Stage>
    </main>
  );
}
