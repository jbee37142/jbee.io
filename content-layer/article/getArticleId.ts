import { Category, Title } from './types';

export function getArticleId(category: Category, title: Title) {
  return `${category}+${title}`;
}
