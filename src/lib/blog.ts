import { fetchAPI } from './strapi';
import type {
  Post,
  Author,
  Category,
} from '../types';

const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';

// Strapi v5 Response Types (flat structure)
interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

interface StrapiPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: StrapiImage | null;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  author: StrapiAuthor | null;
  category: StrapiCategory | null;
}

interface StrapiAuthor {
  id: number;
  documentId: string;
  name: string;
  email: string | null;
  bio: string | null;
  avatar: StrapiImage | null;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface StrapiCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface StrapiResponse<T> {
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

// Helper to get full image URL
function getImageUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

// Normalize Strapi data to our app format
function normalizeAuthor(data: StrapiAuthor | null): Author | undefined {
  if (!data) return undefined;
  return {
    id: data.id,
    name: data.name,
    email: data.email || undefined,
    avatar: getImageUrl(data.avatar?.url),
    bio: data.bio || undefined,
  };
}

function normalizeCategory(data: StrapiCategory | null): Category | undefined {
  if (!data) return undefined;
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description || undefined,
  };
}

function normalizePost(data: StrapiPost): Post {
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    content: data.content,
    excerpt: data.excerpt || undefined,
    coverImage: getImageUrl(data.coverImage?.url),
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    author: normalizeAuthor(data.author),
    category: normalizeCategory(data.category),
    tags: undefined,
  };
}

// Get all posts with pagination
export async function getPosts(page = 1, pageSize = 10): Promise<{
  posts: Post[];
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}> {
  try {
    const response = await fetchAPI<StrapiResponse<StrapiPost[]>>(
      '/posts',
      {
        params: {
          'populate': '*',
          'pagination[page]': page,
          'pagination[pageSize]': pageSize,
          'sort': 'publishedAt:desc',
        },
      }
    );

    return {
      posts: response.data.map(normalizePost),
      pagination: response.meta?.pagination,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [] };
  }
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await fetchAPI<StrapiResponse<StrapiPost[]>>(
      '/posts',
      {
        params: {
          'filters[slug][$eq]': slug,
          'populate': '*',
        },
      }
    );

    if (response.data.length === 0) {
      return null;
    }

    return normalizePost(response.data[0]);
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

// Get all posts (for static path generation)
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const response = await fetchAPI<StrapiResponse<StrapiPost[]>>(
      '/posts',
      {
        params: {
          'fields[0]': 'slug',
          'pagination[pageSize]': 100,
        },
      }
    );

    return response.data.map((post) => post.slug);
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}

// Get posts by category
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  try {
    const response = await fetchAPI<StrapiResponse<StrapiPost[]>>(
      '/posts',
      {
        params: {
          'filters[category][slug][$eq]': categorySlug,
          'populate': '*',
          'sort': 'publishedAt:desc',
        },
      }
    );

    return response.data.map(normalizePost);
  } catch (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error);
    return [];
  }
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetchAPI<StrapiResponse<StrapiCategory[]>>(
      '/categories',
      {
        params: {
          'sort': 'name:asc',
        },
      }
    );

    return response.data.map((cat) => normalizeCategory(cat)!).filter(Boolean);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Get category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await fetchAPI<StrapiResponse<StrapiCategory[]>>(
      '/categories',
      {
        params: {
          'filters[slug][$eq]': slug,
        },
      }
    );

    if (response.data.length === 0) {
      return null;
    }

    return normalizeCategory(response.data[0])!;
  } catch (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    return null;
  }
}
