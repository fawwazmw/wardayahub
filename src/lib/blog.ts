import { fetchAPI } from './strapi';
import type {
  Post,
  Author,
  Category,
  StrapiResponse,
  StrapiData,
  PostAttributes,
  AuthorAttributes,
  CategoryAttributes,
} from '../types';

const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';

// Helper to get full image URL
function getImageUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

// Normalize Strapi data to our app format
function normalizeAuthor(data: StrapiData<AuthorAttributes> | null): Author | undefined {
  if (!data) return undefined;
  return {
    id: data.id,
    name: data.attributes.name,
    email: data.attributes.email,
    avatar: getImageUrl(data.attributes.avatar?.data?.attributes.url),
    bio: data.attributes.bio,
  };
}

function normalizeCategory(data: StrapiData<CategoryAttributes> | null): Category | undefined {
  if (!data) return undefined;
  return {
    id: data.id,
    name: data.attributes.name,
    slug: data.attributes.slug,
    description: data.attributes.description,
  };
}

function normalizePost(data: StrapiData<PostAttributes>): Post {
  const attrs = data.attributes;
  return {
    id: data.id,
    title: attrs.title,
    slug: attrs.slug,
    content: attrs.content,
    excerpt: attrs.excerpt,
    coverImage: getImageUrl(attrs.coverImage?.data?.attributes.url),
    publishedAt: attrs.publishedAt,
    updatedAt: attrs.updatedAt,
    author: normalizeAuthor(attrs.author?.data || null),
    category: normalizeCategory(attrs.category?.data || null),
    tags: attrs.tags,
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
    const response = await fetchAPI<StrapiResponse<StrapiData<PostAttributes>[]>>(
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
    const response = await fetchAPI<StrapiResponse<StrapiData<PostAttributes>[]>>(
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
    const response = await fetchAPI<StrapiResponse<StrapiData<PostAttributes>[]>>(
      '/posts',
      {
        params: {
          'fields[0]': 'slug',
          'pagination[pageSize]': 100,
        },
      }
    );

    return response.data.map((post) => post.attributes.slug);
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}

// Get posts by category
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  try {
    const response = await fetchAPI<StrapiResponse<StrapiData<PostAttributes>[]>>(
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
    const response = await fetchAPI<StrapiResponse<StrapiData<CategoryAttributes>[]>>(
      '/categories',
      {
        params: {
          'sort': 'name:asc',
        },
      }
    );

    return response.data.map((cat) => normalizeCategory(cat)!);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Get category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await fetchAPI<StrapiResponse<StrapiData<CategoryAttributes>[]>>(
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
