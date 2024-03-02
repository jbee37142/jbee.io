import { MetaFunction } from '@remix-run/node';
import BlogConfig from '../../blog.config';

export const meta: MetaFunction = () => {
  return [{
    title: `Brand | ${BlogConfig.seo.title}}`,
  }];
};

export default function BrandPage() {
  return (
    <p>Coming soon</p>
  );
}
  
