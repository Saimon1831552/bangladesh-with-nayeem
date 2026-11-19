import { getSeoSettings } from '@/lib/seo';

export default async function robots() {
  const seo = await getSeoSettings();
  const siteUrl = String(seo.site_url || 'https://bangladeshwithnaim.com').replace(/\/$/, '');

  return {
    rules: [{ userAgent: '*', allow: seo.robots_index ? '/' : [], disallow: seo.robots_index ? ['/api/', '/admin/', '/private/', '/dashboard/'] : ['/'] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
