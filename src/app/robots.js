import { getSeoSettings, preferredSiteUrl } from '@/lib/seo';

export default async function robots() {
  const seo = await getSeoSettings();
  const siteUrl = preferredSiteUrl(seo.site_url);

  return {
    rules: [{ userAgent: '*', allow: seo.robots_index ? '/' : [], disallow: seo.robots_index ? ['/api/', '/admin/', '/private/', '/dashboard/'] : ['/'] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
