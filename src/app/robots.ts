import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://arthurvasconcellos.com/sitemap.xml',
    host: 'https://arthurvasconcellos.com',
  };
}
