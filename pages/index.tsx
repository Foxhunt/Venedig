import { ForeignExpectation2D } from "@/types";

import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useMemo, useState } from "react";

import Dot from "@/components/Dot";
import Form from "@/components/Form";
import LineAndDots from "@/components/LineAndDots";

import "@pixi/events";
import { Container, Stage } from "@pixi/react";

import { getPairFromKvList } from "@/application/kv";
import { intersect } from "@/application/math";

export const getStaticProps = (async () => {
  // Fetch data from external API
  const foreignExpectations: ForeignExpectation2D[] = await getPairFromKvList();

  // Pass data to the page via props
  return { props: { foreignExpectations } };
}) satisfies GetStaticProps<{
  foreignExpectations: ForeignExpectation2D[];
}>;

const stageWidth = 1920;
const stageHeight = 1080;

export default function Home({
  foreignExpectations: initialForeignExpectations,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [foreignExpectations, setForeignExpectations] = useState(
    initialForeignExpectations
  );

  const intersections = useMemo(
    () =>
      foreignExpectations.flatMap((currentElement, index, array) => {
        const intersections: { x: number; y: number; text: string }[] = [];
        const remainingElements = array.slice(index + 1);

        remainingElements.forEach((otherElement) => {
          const intersection = intersect(
            currentElement.expectationEmbedding2D[0] * stageWidth,
            currentElement.expectationEmbedding2D[1] * stageHeight,
            currentElement.experienceEmbedding2D[0] * stageWidth,
            currentElement.experienceEmbedding2D[1] * stageHeight,
            otherElement.expectationEmbedding2D[0] * stageWidth,
            otherElement.expectationEmbedding2D[1] * stageHeight,
            otherElement.experienceEmbedding2D[0] * stageWidth,
            otherElement.experienceEmbedding2D[1] * stageHeight
          );
          if (intersection) {
            intersections.push({
              ...intersection,
              text: `${currentElement.expectation} -> ${currentElement.experience} X ${otherElement.expectation} -> ${otherElement.experience}`,
            });
          }
        });
        return intersections;
      }),
    [foreignExpectations]
  );

  return (
    <main>
      <Form setForeignExpectations={setForeignExpectations} />
      <Stage
        options={{
          antialias: true,
          resolution: 2,
          eventMode: "static",
          clearBeforeRender: true,
          preserveDrawingBuffer: false,
          backgroundColor: 0xc0c0c0,
        }}
        raf={false}
        renderOnComponentChange
        // className="bg-black"
        width={stageWidth}
        height={stageHeight}
      >
        <Container
        // anchor={[0.5, 0.5]}
        // position={[stageWidth / 2, stageHeight / 2]}
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
                  expectationEmbedding2D[0] * stageWidth,
                  expectationEmbedding2D[1] * stageHeight,
                ]}
                end={[
                  experienceEmbedding2D[0] * stageWidth,
                  experienceEmbedding2D[1] * stageHeight,
                ]}
              />
            )
          )}
          {intersections.map(({ x, y, text }, index) => (
            <Dot
              key={index}
              position={[x, y]}
              text={text}
              color={0x00ccf0}
              size={3}
            />
          ))}

          <Dot
            position={[0.5 * stageWidth, 0.5 * stageHeight]}
            color={0x000000}
            size={10}
          />
        </Container>
      </Stage>
      {/* {foreignExpectations.map(
        (
          {
            expectation,
            expectationEmbedding2D,
            experience,
            experienceEmbedding2D,
            key,
          },
          index
        ) => (
          <div key={key}>
            {index} {expectation}(
            {expectationEmbedding2D.map(Math.trunc).join(",")}) {"->"}{" "}
            {experience}({experienceEmbedding2D.map(Math.trunc).join(",")})
          </div>
        )
      )} */}
    </main>
  );
}
