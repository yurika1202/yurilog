export type SiteMeta = {
  title?: string;
  description?: string;
  author?: string;
  ogImage?: string | undefined;
  articleDate?: string | undefined;
};

export interface PostType {
  frontmatter: {
    layout: string;
    title: string;
    description: string;
    pubDate: string;
    minutes?: number;
    tags?: string[];
  };
  url: string;
}
