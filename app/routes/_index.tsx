import type { MetaFunction } from '@remix-run/node';
import { GlobalNavigationBar } from '~/components/GlobalNavigationBar';

export const meta: MetaFunction = () => {
  return [
    { title: 'Home | Jbee.io' },
    { name: '개발 블로그', content: 'Welcome to Jbee.io' },
  ];
};

export default function HomePage() {
  return (
    <main>
      <GlobalNavigationBar />
      Home - summary
    </main>
  );
}
