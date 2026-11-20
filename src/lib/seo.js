const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || 'https://api.bangladeshwithnaim.com'
).replace(/\/api\/?$/, '');

export const SEO_DEFAULTS = {
  site_name: 'Bangladesh With Naim',
  site_url: 'https://www.bangladeshwithnaim.com',
  meta_title: 'Bangladesh With Naim | Your Best Private Tour Guide in Bangladesh',
  meta_description: "Discover Bangladesh with Naim — a trusted local guide offering private, affordable tour packages to Dhaka, Sundarbans, Srimangal, Cox's Bazar & more.",
  keywords: 'Bangladesh tour packages, Bangladesh private tour, Bangladesh local guide, Sundarbans tour, Dhaka heritage tour, Srimangal tea garden tour, Cox\'s Bazar tour, Bangladesh travel guide',
  canonical_url: '/',
  og_title: 'Bangladesh With Naim | Private Tours in Bangladesh',
  og_description: 'Private, personalized tours across Bangladesh guided by your trusted local friend, Naim.',
  og_image: '/og-image.jpeg',
  twitter_title: 'Bangladesh With Naim | Private Tours in Bangladesh',
  twitter_description: 'Book private Bangladesh tours directly with Naim and travel like a local.',
  twitter_image: '/og-image.jpeg',
  twitter_creator: '@bangladeshwithnaim',
  robots_index: true,
  robots_follow: true,
  google_verification: 'google0112f4e428fe015b',
  author_name: 'Naim',
  author_url: 'https://www.bangladeshwithnaim.com',
  publisher_name: 'Bangladesh With Naim',
  business_name: 'Bangladesh With Naim',
  business_type: 'TravelAgency,LocalBusiness',
  business_description: 'Private, personalized tour packages across Bangladesh guided by Naim.',
  business_phone: '+8801750536667',
  business_email: 'info@bangladeshwithnaim.com',
  business_street: 'Dhaka',
  business_city: 'Dhaka',
  business_country: 'BD',
  business_logo: '/og-image.jpeg',
  area_served: 'Bangladesh, Dhaka, Khulna, Sylhet, Cox\'s Bazar',
  price_range: '$$',
  opening_hours: 'Monday-Sunday 09:00-21:00',
  guide_name: 'Naim',
  guide_job_title: 'Private Tour Guide',
  guide_description: 'Local tour guide from Bangladesh leading cultural, heritage, and adventure tours for international travellers.',
  guide_image: 'https://i.ibb.co.com/wN3B0nsT/46463372-2343868569174862-5457719980747390976-n-jpg-1.jpg',
  social_links: 'https://www.instagram.com/bangladesh.with.naim/\nhttps://www.facebook.com/Bangladeshwithnaim\nhttps://x.com/naim55714',
  faq_json: '',
};

export async function getSeoSettings() {
  try {
    const response = await fetch(`${API_BASE}/api/seo`, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error(`SEO API returned ${response.status}`);
    const json = await response.json();
    return { ...SEO_DEFAULTS, ...(json.data || {}) };
  } catch (error) {
    // The API may not have the SEO route deployed yet; use local defaults quietly.
    return SEO_DEFAULTS;
  }
}

// Keep every SEO signal on the public, preferred hostname. The bare domain
// redirects to www in production, so emitting it in canonical tags or a
// sitemap would send Google conflicting signals.
export function preferredSiteUrl(value) {
  try {
    const url = new URL(value || SEO_DEFAULTS.site_url);
    if (url.hostname === 'bangladeshwithnaim.com') {
      url.hostname = 'www.bangladeshwithnaim.com';
    }
    return url.origin;
  } catch {
    return SEO_DEFAULTS.site_url;
  }
}

export function absoluteSeoUrl(value, siteUrl = SEO_DEFAULTS.site_url) {
  if (!value) return siteUrl;
  if (/^https?:\/\//i.test(value)) return value;
  return `${siteUrl.replace(/\/$/, '')}/${String(value).replace(/^\//, '')}`;
}

export function seoMetadata(settings, pathname = '/') {
  const seo = { ...SEO_DEFAULTS, ...(settings || {}) };
  const siteUrl = preferredSiteUrl(seo.site_url);
  const safePathname = typeof pathname === 'string' && pathname.startsWith('/')
    ? pathname.split('?')[0]
    : '/';
  // The editable canonical value is for the homepage only. Every other
  // indexable page must declare itself as canonical, not the homepage.
  const canonicalPath = safePathname === '/' ? (seo.canonical_url || '/') : safePathname;
  const canonicalUrl = absoluteSeoUrl(canonicalPath, siteUrl);
  const keywords = String(seo.keywords || '').split(',').map(keyword => keyword.trim()).filter(Boolean);

  return {
    metadataBase: new URL(siteUrl),
    title: { default: seo.meta_title, template: `%s | ${seo.site_name}` },
    description: seo.meta_description,
    keywords,
    authors: [{ name: seo.author_name, url: absoluteSeoUrl(seo.author_url, siteUrl) }],
    creator: seo.author_name,
    publisher: seo.publisher_name,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'website', locale: 'en_US',
      url: canonicalUrl,
      siteName: seo.site_name,
      title: seo.og_title || seo.meta_title,
      description: seo.og_description || seo.meta_description,
      images: [{ url: absoluteSeoUrl(seo.og_image, siteUrl), alt: seo.og_title || seo.meta_title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.twitter_title || seo.og_title || seo.meta_title,
      description: seo.twitter_description || seo.og_description || seo.meta_description,
      images: [absoluteSeoUrl(seo.twitter_image || seo.og_image, siteUrl)],
      creator: seo.twitter_creator || undefined,
    },
    robots: {
      index: Boolean(seo.robots_index), follow: Boolean(seo.robots_follow), nocache: false,
      googleBot: { index: Boolean(seo.robots_index), follow: Boolean(seo.robots_follow), noimageindex: false, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    verification: seo.google_verification ? { google: seo.google_verification } : undefined,
    icons: { icon: '/favicon.ico', shortcut: '/favicon.ico' },
    manifest: '/site.webmanifest',
  };
}

export function seoStructuredData(settings) {
  const seo = { ...SEO_DEFAULTS, ...(settings || {}) };
  const siteUrl = preferredSiteUrl(seo.site_url);
  const socialLinks = String(seo.social_links || '').split(/\r?\n|,/).map(v => v.trim()).filter(Boolean);
  const areaServed = String(seo.area_served || '').split(',').map(name => name.trim()).filter(Boolean);
  const rootUrl = siteUrl.replace(/\/$/, '');
  let faq;
  try {
    faq = seo.faq_json ? JSON.parse(seo.faq_json) : null;
  } catch {
    faq = null;
  }

  return {
    business: { '@context': 'https://schema.org', '@type': String(seo.business_type || 'TravelAgency,LocalBusiness').split(',').map(v => v.trim()), '@id': `${rootUrl}/#business`, name: seo.business_name, description: seo.business_description, url: siteUrl, telephone: seo.business_phone, email: seo.business_email, logo: absoluteSeoUrl(seo.business_logo, siteUrl), priceRange: seo.price_range, openingHours: seo.opening_hours || undefined, areaServed: areaServed.map(name => ({ '@type': 'Place', name })), sameAs: socialLinks, address: { '@type': 'PostalAddress', streetAddress: seo.business_street, addressLocality: seo.business_city, addressCountry: seo.business_country } },
    person: { '@context': 'https://schema.org', '@type': 'Person', '@id': `${rootUrl}/#guide`, name: seo.guide_name, jobTitle: seo.guide_job_title, description: seo.guide_description, image: absoluteSeoUrl(seo.guide_image, siteUrl), url: siteUrl, worksFor: { '@id': `${rootUrl}/#business` } },
    website: { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${rootUrl}/#website`, name: seo.site_name, url: siteUrl, publisher: { '@id': `${rootUrl}/#business` } },
    ...(faq && typeof faq === 'object' ? { faq } : {}),
  };
}
