import { ForeignExpectation2D } from "@/types";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";

import LineAndDots from "@/components/LineAndDots";
import Dot from "@/components/Dot";
import Form from "@/components/Form";

import "@pixi/events";
import { Stage } from "@pixi/react";

import { getPairFromKvList } from "@/application/kv";

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const foreignExpectations: ForeignExpectation2D[] = await getPairFromKvList();

  // Pass data to the page via props
  return { props: { foreignExpectations } };
}) satisfies GetServerSideProps<{
  foreignExpectations: ForeignExpectation2D[];
}>;

export default function Home({
  foreignExpectations: initialForeignExpectations,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [clicks, setClicks] = useState<[number, number][]>([]);

  const [foreignExpectations, setForeignExpectations] = useState(
    initialForeignExpectations
  );

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
        // raf={false}
        // renderOnComponentChange
        className="bg-black"
        width={1920}
        height={1080}
        onPointerMove={({ clientX, clientY }) => {
          setClicks([[clientX, clientY]]);
        }}
      >
        {foreignExpectations.map(
          ({
            expectationEmbedding2D,
            experienceEmbedding2D,
            expectation,
            experience,
            key,
          }) => (
            <LineAndDots
              key={key}
              expectation={expectation}
              experience={experience}
              start={[
                expectationEmbedding2D[0] * 1920,
                expectationEmbedding2D[1] * 1080,
              ]}
              end={[
                experienceEmbedding2D[0] * 1920,
                experienceEmbedding2D[1] * 1080,
              ]}
            />
          )
        )}
        {/* {clicks.map((click, index) => (
          <Dot key={index} position={click} />
        ))} */}
      </Stage>
      <Form setForeignExpectations={setForeignExpectations} />
    </main>
  );
}
