import { ForeignExpectation2D, Intersection } from "@/types";

import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useEffect, useMemo, useState } from "react";

import Form from "@/components/Form";

import Dot from "@/components/2D/Dot";
import LineAndDots from "@/components/2D/LineAndDots";

import { initDevtools } from "@pixi/devtools";
import "@pixi/events";
import { Container, Stage } from "@pixi/react";

import { getForeignExpectationsFromKvList } from "@/application/kv";
import { intersect } from "@/application/math";

export const getStaticProps = (async () => {
  // Fetch data from external API
  const foreignExpectations: ForeignExpectation2D[] =
    await getForeignExpectationsFromKvList();

  // Pass data to the page via props
  return { props: { foreignExpectations } };
}) satisfies GetStaticProps<{
  foreignExpectations: ForeignExpectation2D[];
}>;

export default function Home({
  foreignExpectations: initialForeignExpectations,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const stageWidth = typeof window !== "undefined" ? window.innerWidth : 10;
  const stageHeight =
    typeof window !== "undefined" ? window.innerHeight - 45 : 10;

  const [foreignExpectations, setForeignExpectations] = useState(
    initialForeignExpectations
  );

  const intersections = useMemo(
    () =>
      foreignExpectations.flatMap((currentElement, index, array) => {
        const intersections: Intersection[] = [];
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
              foreignExpectationKeys: [currentElement.key, otherElement.key],
              foreignExpectations: [currentElement, otherElement],
            });
          }
        });
        return intersections;
      }),
    [foreignExpectations, stageHeight, stageWidth]
  );

  const text =
    "aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaaaaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaaaaa aaa aaa aaa aaa aaa aaa aaaaaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaaaaa aaa aaa aaa aaa aaa aaa aaaaaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaaaaa aaa aaa aaa aaa aaa aaa aaaaaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaaaaa aaa aaa aaa aaa aaa aaa aaaaaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaaaaa aaa aaa aaa aaa aaa aaa aaaaaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa";

  const [hoveredIntersection, setHoveredIntersection] =
    useState<Intersection>();

  const [foreignIntersection, setForeignIntersection] = useState("");

  useEffect(() => {
    hoveredIntersection &&
      fetch("/api/getForeignIntersection", {
        method: "POST",
        body: JSON.stringify({
          pair1: [
            hoveredIntersection?.foreignExpectations[0].expectation,
            hoveredIntersection?.foreignExpectations[0].experience,
          ],
          pair2: [
            hoveredIntersection?.foreignExpectations[1].expectation,
            hoveredIntersection?.foreignExpectations[1].experience,
          ],
        }),
      })
        .then((response) => {
          return response.arrayBuffer();
        })
        .then((buffer) => {
          const decoder = new TextDecoder("iso-8859-1");
          const text = decoder.decode(buffer);
          setForeignIntersection(text);
        });

    return () => {
      setForeignIntersection("");
    };
  }, [hoveredIntersection]);

  return (
    <>
      <Form setForeignExpectations={setForeignExpectations} />
      <Stage
        options={{
          antialias: true,
          resolution: 2,
          eventMode: "static",
          clearBeforeRender: true,
          preserveDrawingBuffer: false,
          backgroundColor: 0x000000,
        }}
        onMount={(app) => {
          initDevtools({ app });
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
          sortableChildren
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
                extPointerOver={hoveredIntersection?.foreignExpectationKeys.includes(
                  key
                )}
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
          {intersections.map((intersection) => (
            <Dot
              key={intersection.foreignExpectationKeys.sort().join("")}
              position={[intersection.x, intersection.y]}
              text={
                hoveredIntersection === intersection ? foreignIntersection : ""
              }
              color={0xff8800}
              form="cross"
              extPoninterOver={hoveredIntersection === intersection}
              extSetPointerOver={(isPointerOver) => {
                isPointerOver
                  ? setHoveredIntersection(intersection)
                  : setHoveredIntersection(undefined);
              }}
            />
          ))}

          <Dot
            position={[0.5 * stageWidth, 0.5 * stageHeight]}
            size={10}
            text={text}
          />

          <Dot position={[100, 10]} size={10} text={text} form="cross" />
          <Dot position={[1200, 670]} size={10} text={text} />
          <Dot position={[1220, 670]} size={10} text={text} />
        </Container>
      </Stage>
    </>
  );
}
