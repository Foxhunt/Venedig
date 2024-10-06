import { ForeignExpectation2D } from "@/types";

import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useMemo, useState } from "react";

import Form from "@/components/Form";

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

const stageWidth = 1920;
const stageHeight = 1080;

export default function Home({
  foreignExpectations: initialForeignExpectations,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [foreignExpectations, setForeignExpectations] = useState(
    initialForeignExpectations
  );

  return (
    <main>
      <Form setForeignExpectations={setForeignExpectations} />
    </main>
  );
}
