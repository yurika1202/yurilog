export type SiteMeta = {
  title?: string;
  description?: string;
  author?: string;
  ogImage?: string | undefined;
  articleDate?: string | undefined;
};

export interface PostType {
  layout: string;
  title: string;
  description: string;
  publishDate: string;
  thumbnail?: string;
  category: string;
  tags?: string[];
}
