import { MetaFunction } from '@remix-run/node';
import BlogConfig from '../../blog.config';
import { generateMeta } from '~/utils/meta/generate-meta';
import { pathJoin } from '~/utils/path';

export const meta: MetaFunction = () => {
  return generateMeta({
    title: ['Brand', BlogConfig.seo.title],
    description: BlogConfig.seo.description,
    image: pathJoin(BlogConfig.site, BlogConfig.image.main),
  });
};

export default function BrandPage() {
  return (
    <p>Coming soon</p>
  );
}
  
