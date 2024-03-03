import { MetaDescriptor } from '@remix-run/node';

interface generateMetaOptions {
  title: string[];
  description: string;
  image?: string;
  author?: string;
  site?: string;
}

const DELIMITER = ' | ';

export function generateMeta({ title, description, image = '', author = '' }: generateMetaOptions): MetaDescriptor[] {
  return [
    { title: title.join(DELIMITER) },
    { description },
    meta('description', description),
    og('type', 'website'),
    og('title', title[0]),
    og('image', image),
    twitter('title', title[0]),
    twitter('description', description),
    twitter('image', image),
    twitter('card', 'summary_large_image'),
    twitter('creator', `@${author}`),
    twitter('site', `@${author}`),
  ];
}

function meta(property: string, content: string) {
  return { property, content };
}

function og(property: string, content: string) {
  return { property: `og:${property}`, content };
}
function twitter(property: string, content: string) {
  return { name: `twitter:${property}`, content };
}
