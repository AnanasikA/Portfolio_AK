import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: number;
  tags: string[];
  locale: string;
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'content/blog');

export function getAllPosts(locale: string): Post[] {
  const dir = path.join(CONTENT_DIR, locale);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  const posts: Post[] = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '');
    try {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const { data, content } = matter(raw);

      const words = content.split(/\s+/).length;
      const readingTime = Math.ceil(words / 200);

      posts.push({
        slug,
        title: data.title ?? '',
        description: data.description ?? '',
        date: data.date ? String(data.date) : '',
        readingTime,
        tags: data.tags ?? [],
        locale,
        content,
      });
    } catch (err) {
      console.error(`Error parsing ${file}:`, err);
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPost(slug: string, locale: string): Post | null {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);

    const words = content.split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);

    return {
      slug,
      title: data.title ?? '',
      description: data.description ?? '',
      date: data.date ? String(data.date) : '',
      readingTime,
      tags: data.tags ?? [],
      locale,
      content,
    };
  } catch (err) {
    console.error(`Error parsing ${slug}.mdx:`, err);
    return null;
  }
}