import { routes } from '@remix-run/dev/server-build';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { generateSitemap } from '~/utils/sitemap/generate-sitemap';

export function loader({ request }: LoaderFunctionArgs) {
  return generateSitemap(request, routes, {
    siteUrl: 'https://jbee.io',
  });
}
