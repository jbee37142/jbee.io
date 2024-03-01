import fm from 'front-matter';
import readingTime from 'reading-time';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

export async function parseMarkdown<FrontMatterType>(text: string) {
  const frontmatter = fm<FrontMatterType>(text);
      
  if (frontmatter == null) {
    return null;
  }
  
  const attr = frontmatter.attributes;
  const time = Math.ceil(readingTime(text).minutes)
  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .process(text)
    .then((value) => String(value));
  
  return {
    attr: {
      ...attr,
      readingTime: time,
    },
    html,
  }
}
  
