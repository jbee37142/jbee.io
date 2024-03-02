import { RssEntry } from './types';

interface Option {
  title: string;
  description: string;
  lang: string;
  link: string;
  entries: RssEntry[];
}

export function generateRss(
  origin: string,
  { description, entries, lang, link, title }: Option
): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${title}</title>
      <description>${description}</description>
      <link>${link}</link>
      <language>${lang}</language>
      <ttl>60</ttl>
      <atom:link href="https://${origin}.com/rss.xml" rel="self" type="application/rss+xml" />
      ${entries
    .map(
      (entry) => `
        <item>
          <title><![CDATA[${entry.title}]]></title>
          <description><![CDATA[${entry.description}]]></description>
          <pubDate>${entry.pubDate}</pubDate>
          <link>${entry.link}</link>
          ${entry.guid ? `<guid isPermaLink="false">${entry.guid}</guid>` : ''}
        </item>`
    )
    .join('')}
    </channel>
  </rss>`;
}
