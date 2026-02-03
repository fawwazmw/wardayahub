export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}
