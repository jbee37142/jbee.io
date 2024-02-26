
const {
  remarkMdxFrontmatter,
} = require('remark-mdx-frontmatter');

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/*.css'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
};
// can be an sync / async function or an object
exports.mdx = async (filename) => {
  const [rehypeHighlight, remarkToc, remarkSlug] = await Promise.all([
    import('rehype-highlight').then((mod) => mod.default),
    import('remark-toc').then((mod) => mod.default),
    import('remark-slug').then((mod) => mod.default),
  ]);

  return {
    remarkPlugins: [remarkToc],
    rehypePlugins: [rehypeHighlight, remarkSlug],
  };
};
