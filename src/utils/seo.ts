/**
 * SEO Utilities
 * Helper functions for optimizing SEO across the site
 */

/**
 * Generate meta title with site name
 * Ensures proper length (50-60 characters recommended)
 */
export function generateTitle(pageTitle: string, siteName: string = 'WardayaHub'): string {
  const fullTitle = `${pageTitle} | ${siteName}`;
  
  // Warn if title is too long (Google shows ~60 chars)
  if (fullTitle.length > 60) {
    console.warn(`Title too long (${fullTitle.length} chars): "${fullTitle}"`);
  }
  
  return fullTitle;
}

/**
 * Truncate description to optimal length
 * Google shows ~155-160 characters
 */
export function truncateDescription(description: string, maxLength: number = 155): string {
  if (description.length <= maxLength) {
    return description;
  }
  
  return description.slice(0, maxLength - 3).trim() + '...';
}

/**
 * Generate Open Graph image URL
 * Ensures absolute URL for social sharing
 */
export function getOgImageUrl(
  imagePath?: string,
  siteUrl: string = 'https://wardayahub.vercel.app'
): string {
  if (!imagePath) {
    return `${siteUrl}/og-default.jpg`;
  }
  
  // If already absolute URL, return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Convert relative to absolute
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${siteUrl}${cleanPath}`;
}

/**
 * Extract keywords from content
 * Simple keyword extraction (can be enhanced)
 */
export function extractKeywords(content: string, limit: number = 10): string[] {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, '');
  
  // Split into words, filter common words, get unique
  const commonWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'is', 'was', 'are', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should',
    'can', 'could', 'may', 'might', 'must', 'this', 'that', 'these', 'those',
  ]);
  
  const words = text
    .toLowerCase()
    .split(/\W+/)
    .filter(word => word.length > 3 && !commonWords.has(word));
  
  // Get unique words and limit
  const uniqueWords = [...new Set(words)];
  return uniqueWords.slice(0, limit);
}

/**
 * Generate breadcrumb structured data
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
  siteUrl: string = 'https://wardayahub.vercel.app'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

/**
 * Validate URL structure for SEO
 */
export function validateSlug(slug: string): boolean {
  // Check for SEO-friendly slug
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Generate reading time estimate
 * Assumes 200 words per minute average reading speed
 */
export function calculateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 200);
  return minutes;
}

/**
 * Clean and normalize URL
 */
export function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    // Remove trailing slash
    const pathname = urlObj.pathname.replace(/\/$/, '');
    return `${urlObj.origin}${pathname}${urlObj.search}`;
  } catch {
    return url;
  }
}

/**
 * Generate article schema
 */
export interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
  url: string;
  siteName: string;
}

export function generateArticleSchema(props: ArticleSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.title,
    description: props.description,
    image: props.image,
    datePublished: props.publishedAt,
    dateModified: props.updatedAt || props.publishedAt,
    author: {
      '@type': 'Person',
      name: props.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: props.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${new URL(props.url).origin}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': props.url,
    },
  };
}
