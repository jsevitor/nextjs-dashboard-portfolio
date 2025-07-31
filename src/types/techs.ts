export type TechProps = {
  id: string;
  name: string;
};

export type TechsProps = {
  id: string;
  name: string;
  projectTechs?: {
    tech: {
      id: string;
      name: string;
    };
  }[];
};
