const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.STRAPI_API_TOKEN || '';

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

export async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;

  const queryString = params
    ? '?' + new URLSearchParams(params as Record<string, string>).toString()
    : '';

  const url = `${STRAPI_URL}/api${endpoint}${queryString}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
    ...fetchOptions.headers,
  };

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error(`Error fetching from Strapi: ${endpoint}`, error);
    throw error;
  }
}
