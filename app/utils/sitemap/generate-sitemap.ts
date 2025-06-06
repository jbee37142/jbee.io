/**
 * @see {@link https://github.com/nasa-gcn/remix-seo/blob/main/src/sitemap/index.ts}
 */
import type { ServerBuild } from 'react-router';
import { isEqual } from '../isEqual';
import { SEOHandle, SEOOptions, SitemapEntry } from './types';

export async function generateSitemap(
  request: Request,
  routes: ServerBuild['routes'],
  options: SEOOptions
) {
  const { siteUrl, headers } = options;
  const sitemap = await getSitemapXml(request, routes, { siteUrl });
  const bytes = new TextEncoder().encode(sitemap).byteLength
  
  return new Response(sitemap, {
    headers: {
      ...headers,
      'Content-Type': 'application/xml',
      'Content-Length': String(bytes),
    },
  });
}

type Options = {
  siteUrl: string;
};

function typedBoolean<T>(
  value: T
): value is Exclude<T, '' | 0 | false | null | undefined> {
  return Boolean(value);
}

function removeTrailingSlash(s: string) {
  return s.endsWith('/') ? s.slice(0, -1) : s;
}

async function getSitemapXml(
  request: Request,
  routes: ServerBuild['routes'],
  options: Options
) {
  const { siteUrl } = options;

  function getEntry({
    route,
    lastmod,
    changefreq,
    priority = 0.7,
  }: SitemapEntry) {
    return `
  <url>
    <loc>${siteUrl}${route}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}
    ${typeof priority === 'number' ? `<priority>${priority}</priority>` : ''}
  </url>
    `.trim();
  }

  const rawSitemapEntries = (
    await Promise.all(
      Object.entries(routes).map(async ([id, { module: mod }]) => {
        if (id === 'root') return;

        const handle = mod.handle as SEOHandle | undefined;
        if (handle?.getSitemapEntries) {
          return handle.getSitemapEntries(request);
        }

        // exclude resource routes from the sitemap
        // (these are an opt-in via the getSitemapEntries method)
        if (!('default' in mod)) return;

        const manifestEntry = routes[id];
        if (!manifestEntry) {
          console.warn(`Could not find a manifest entry for ${id}`);

          return;
        }
        let parentId = manifestEntry.parentId;
        let parent = parentId ? routes[parentId] : null;

        let path;
        if (manifestEntry.path) {
          path = removeTrailingSlash(manifestEntry.path);
        } else if (manifestEntry.index) {
          path = '';
        } else {
          return;
        }

        while (parent) {
          // the root path is '/', so it messes things up if we add another '/'
          const parentPath = parent.path
            ? removeTrailingSlash(parent.path)
            : '';
          path = `${parentPath}/${path}`;
          parentId = parent.parentId;
          parent = parentId ? routes[parentId] : null;
        }

        // we can't handle dynamic routes, so if the handle doesn't have a
        // getSitemapEntries function, we just
        if (path.includes(':')) return;
        if (id === 'root') return;

        const entry: SitemapEntry = { route: removeTrailingSlash(path) };

        return entry;
      })
    )
  )
    .flatMap((z) => z)
    .filter(typedBoolean);

  const sitemapEntries: Array<SitemapEntry> = [];
  for (const entry of rawSitemapEntries) {
    const existingEntryForRoute = sitemapEntries.find(
      (e) => e.route === entry.route
    );
    if (existingEntryForRoute) {
      if (!isEqual(existingEntryForRoute, entry)) {
        console.warn(
          `Duplicate route for ${entry.route} with different sitemap data`,
          { entry, existingEntryForRoute }
        );
      }
    } else {
      sitemapEntries.push(entry);
    }
  }

  return `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  >
    ${sitemapEntries.map((entry) => getEntry(entry)).join('')}
  </urlset>
    `.trim();
}
