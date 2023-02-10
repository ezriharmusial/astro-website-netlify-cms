import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const get: APIRoute = async ({ params, request }) => {
  const pageList = await getCollection('pages').then((result) => result.map(entry => ({
      author: entry.slug, slug: entry.slug, title: entry.data.title , subtitle: entry.data.subtitle, description: entry.data.description, image: entry.data.image, imageAlt: entry.data.imageAlt
  })));

  return {
    body: JSON.stringify(pageList)
  };
}