import { LoaderFunction } from '@remix-run/node';
import { articleQuery } from '~/queries/article';
import { generateRss } from '~/utils/rss/generate-rss';
import BlogConfig from '../../blog.config';

export const loader: LoaderFunction = async () => {
  const articles = await articleQuery.getArticles();
  
  const feed = generateRss(BlogConfig.origin, {
    title: 'My Blog',
    description: 'My Blog',
    lang:'ko',
    link: `https://${BlogConfig.origin}}`,
    entries: articles.map((article) => ({
      description: article.description ?? '',
      pubDate: new Date(article.lastUpdatedAt).toUTCString(),
      title: article.title,
      link: `https://${BlogConfig.origin}/articles/${article.category}/${article.title}`,
      guid: `https://${BlogConfig.origin}/articles/${article.category}/${article.title}`,
    })),
  });
  
  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=2419200',
    },
  });
};
