import { MetaFunction } from '@remix-run/node';
import BlogConfig from '../../blog.config';
import { generateMeta } from '~/utils/meta/generate-meta';

export const meta: MetaFunction = () => {
  return generateMeta({
    title: ['Brand', BlogConfig.seo.title],
    description: BlogConfig.seo.description,
  });
};

export default function BrandPage() {
  return (
    <p>Coming soon</p>
  );
}
  
