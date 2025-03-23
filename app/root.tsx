import { Analytics } from '@vercel/analytics/react';
import type { LinksFunction } from 'react-router';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router';
import '~/styles/article.css';
import '~/styles/global.css';
import '~/styles/highlight-text.css';
import '~/styles/reset.css';
import BlogConfig from '../blog.config';
import { Container } from './components/container/Container';
import { GlobalNavigationBar } from './components/gnb/GlobalNavigationBar';
import { GoogleAnalyticsScripts } from './utils/ga/google-analytics';
import { createRSSLink } from './utils/rss/link';
import { createSitemapLink } from './utils/sitemap/link';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css' },
  { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.css' },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icon/favicon-32x32.png' },
  { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icon/favicon-16x16.png' },
  { rel: 'icon', href: '/favicon.ico' },
  { rel: 'preload', as: 'image', href: BlogConfig.image.main },
  { rel: 'manifest', href: '/icon/site.webmanifest' },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/icon/apple-touch-icon.png' },
  createSitemapLink(),
  createRSSLink()
];

export default function App() {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content={BlogConfig.seo.name}></meta>
        <Meta />
        <Links />
        <GoogleAnalyticsScripts id={BlogConfig.ga.id} />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <GlobalNavigationBar />
      {children}
    </Container>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  function parseError(error: unknown) {
    if (isRouteErrorResponse(error)) {
      return `${error.status} ${error.statusText}`;
    }if (error instanceof Error) {
      return error.message;
    }

    return 'Unknown Error';
  }

  return (
    <html lang='ko'>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <h1>{parseError(error)}</h1>
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}
