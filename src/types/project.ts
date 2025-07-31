export type ProjectProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  isFeatured: boolean;
  demoUrl: string;
  repoUrl: string;
  createdAt?: string;
  updatedAt?: string;
  projectTechs?: {
    tech: {
      id: string;
      name: string;
    };
  }[];
  techs?: string[];
};
