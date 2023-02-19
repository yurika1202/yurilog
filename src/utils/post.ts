import type { CollectionEntry } from 'astro:content';

/**
 * 投稿日の新しい順にソート
 * @param posts ソート対象の配列posts
 * @returns ソート処理後に上書きした配列posts
 */
export const sortedPosts = (posts: CollectionEntry<'post'>[] = []) => {
  return posts.sort(
    (a, b) => new Date(b.data.publishDate).valueOf() - new Date(a.data.publishDate).valueOf()
  );
};

/**
 * タグを取得
 * @param posts タグ取得対象のpost
 */
export const getTags = (posts: CollectionEntry<'post'>[] = []) => {
  const tags = new Set<string>();
  posts.forEach(post => {
    post.data.tags.map(tag => tags.add(tag));
  });
  return Array.from(tags);
};
