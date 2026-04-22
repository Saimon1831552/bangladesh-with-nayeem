export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",        
          "/admin/",      
          "/_next/",      
          "/private/",
        ],
      },
      {
        // Keep AI training crawlers out
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "Omgilibot",
        ],
        disallow: "/",
      },
    ],
    sitemap: "https://bangladeshwithnaim.com/sitemap.xml",
    host: "https://bangladeshwithnaim.com",
  };
}