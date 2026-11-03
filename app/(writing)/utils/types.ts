export type Post = {
  id: string;
  title: string;
  description: string;
  date: string;
  draft?: boolean;
};

export enum HeadingLevel {
  H1 = 1,
  H2 = 2,
  H3 = 3,
  H4 = 4,
  H5 = 5,
}

export type Slug = { slug: string };

export type Slugs = Slug[];
