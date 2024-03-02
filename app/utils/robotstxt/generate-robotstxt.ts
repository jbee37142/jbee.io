/**
 * @see {@link https://github.com/nasa-gcn/remix-seo/blob/main/src/robotstxt/index.ts}
 */
import { RobotsPolicy, RobotsConfig } from './types';

const defaultPolicies: RobotsPolicy[] = [
  {
    type: 'userAgent',
    value: '*',
  },
  {
    type: 'allow',
    value: '/',
  },
];

const typeTextMap = {
  userAgent: 'User-agent',
  allow: 'Allow',
  disallow: 'Disallow',
  sitemap: 'Sitemap',
  crawlDelay: 'Crawl-delay',
};

function getRobotsText(policies: RobotsPolicy[]): string {
  return policies.reduce((acc, policy) => {
    const { type, value } = policy;

    return `${acc}${typeTextMap[type]}: ${value}\n`;
  }, '');
}

export async function generateRobotsTxt(
  policies: RobotsPolicy[] = [],
  { appendOnDefaultPolicies = true, headers }: RobotsConfig = {}
) {
  const policiesToUse = appendOnDefaultPolicies
    ? [...defaultPolicies, ...policies]
    : policies;
  const robotText = await getRobotsText(policiesToUse);
  const bytes = new TextEncoder().encode(robotText).byteLength;
    
  return new Response(robotText, {
    headers: {
      ...headers,
      'Content-Type': 'text/plain',
      'Content-Length': String(bytes),
    },
  });
}
