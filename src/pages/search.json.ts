import { getPosts } from '../lib/blog';

export async function GET() {
  try {
    // Fetch all posts (pass a large limit)
    const { posts } = await getPosts(1, 1000);
    
    const searchIndex = posts.map(post => ({
      title: post.title,
      slug: post.slug,
      description: post.excerpt,
      category: post.category.name,
      publishedAt: post.publishedAt
    }));

    return new Response(JSON.stringify(searchIndex), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to generate search index' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
