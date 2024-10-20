export type ForeignExpectation = {
  key: number;
  expectation: string;
  expectationEmbedding: number[];
  experience: string;
  experienceEmbedding: number[];
};

export type ForeignExpectation2D = Omit<
  ForeignExpectation,
  "expectationEmbedding" | "experienceEmbedding"
> & {
  expectationEmbedding2D: number[];
  experienceEmbedding2D: number[];
};

export type Intersection = {
  x: number;
  y: number;
  foreignExpectationKeys: number[];
  foreignExpectations: ForeignExpectation2D[];
};
