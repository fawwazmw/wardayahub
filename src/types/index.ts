// Raw Strapi API response types
export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiImage {
  id: number;
  attributes: {
    url: string;
    alternativeText?: string;
    width: number;
    height: number;
    formats?: {
      thumbnail?: StrapiImageFormat;
      small?: StrapiImageFormat;
      medium?: StrapiImageFormat;
      large?: StrapiImageFormat;
    };
  };
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Content type attributes
export interface AuthorAttributes {
  name: string;
  email?: string;
  avatar?: { data: StrapiImage | null };
  bio?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface CategoryAttributes {
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface PostAttributes {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: { data: StrapiImage | null };
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  author?: { data: StrapiData<AuthorAttributes> | null };
  category?: { data: StrapiData<CategoryAttributes> | null };
  tags?: string[];
}

// Normalized types for use in components
export interface Author {
  id: number;
  name: string;
  email?: string;
  avatar?: string;
  bio?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  publishedAt: string;
  updatedAt?: string;
  author?: Author;
  category?: Category;
  tags?: string[];
}
