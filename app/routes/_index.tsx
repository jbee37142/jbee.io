import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Home | Jbee.io' },
    { name: '개발 블로그', content: 'Welcome to Jbee.io' },
  ];
};

export default function HomePage() {
  return (
    <section>
      <h2>{'Hi, I\'m JaeYeop'}</h2>
    </section>
  );
}
