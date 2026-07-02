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
    sitemap: "https://www.bangladeshwithnaim.com/sitemap.xml",
    host: "https://www.bangladeshwithnaim.com",
  };
}
