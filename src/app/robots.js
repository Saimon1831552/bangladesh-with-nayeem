export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/",
        "/private/",
      ],
    },

    sitemap: "https://www.bangladeshwithnaim.com/sitemap.xml",

    host: "https://www.bangladeshwithnaim.com",
  };
}
