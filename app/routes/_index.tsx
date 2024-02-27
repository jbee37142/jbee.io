import type { MetaFunction } from '@remix-run/node';
import { Container } from '~/components/container/Container';
import { GlobalNavigationBar } from '~/components/gnb/GlobalNavigationBar';

export const meta: MetaFunction = () => {
  return [
    { title: 'Home | Jbee.io' },
    { name: '개발 블로그', content: 'Welcome to Jbee.io' },
  ];
};

export default function HomePage() {
  return (
    <Container>
      <GlobalNavigationBar />
      Home - summary
    </Container>
  );
}
