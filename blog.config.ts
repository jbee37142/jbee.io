export interface ArticleFrontMatter {
  title: string;
  date: Date;
  category: string;
  thumbnail?: string;
  draft?: boolean;
}

export default {
  content: {
    directory: 'content',
  },
  image: {
    directory: '**/images',
  },
};
