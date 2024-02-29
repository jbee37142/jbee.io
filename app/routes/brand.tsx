import { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Brand | Jbee.io' },
    { name: '브랜딩', content: 'Welcome to Jbee.io' },
  ];
};

export default function BrandPage() {
  return (
    <p>Coming soon</p>
  );
}
  
