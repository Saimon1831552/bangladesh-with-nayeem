// Helpers for admin-entered rich text (titles, excerpts, descriptions).
// The admin editor stores formatted HTML, so anything that is shown on the page
// renders it as-is, and anything that needs plain text (<title>, meta tags,
// alt text, share links, search) strips the tags first.

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", apos: "'", nbsp: " " };

// True for tags and for entities such as &amp; / &nbsp; (typing "&" or a double
// space in the editor saves an entity even when there is no formatting).
export function isHtml(value) {
  return typeof value === "string" && /<\/?[a-z][^>]*>|&(#\d+|#x[0-9a-f]+|[a-z]+\d*);/i.test(value);
}

export function hasTags(value) {
  return typeof value === "string" && /<\/?[a-z][^>]*>/i.test(value);
}

export function stripHtml(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(p|div|li|h[1-6]|tr|blockquote)>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&(#\d+|#x[0-9a-f]+|[a-z]+\d*);/gi, (match, code) => {
      const key = code.toLowerCase();
      if (ENTITIES[key] !== undefined) return ENTITIES[key];
      if (key.startsWith("#x")) return String.fromCodePoint(parseInt(key.slice(2), 16));
      if (key.startsWith("#")) return String.fromCodePoint(parseInt(key.slice(1), 10));
      return match;
    })
    .replace(/\s+/g, " ")
    .trim();
}

// Renders `html` with its formatting (bold, fonts, colors…) when it is HTML,
// and as normal escaped text when it is a legacy plain-text value.
export function RichText({ html, as: Tag = "span", fallback = null, ...props }) {
  if (html === null || html === undefined || html === "") {
    return fallback === null ? null : <Tag {...props}>{fallback}</Tag>;
  }
  if (isHtml(html)) {
    return <Tag {...props} dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <Tag {...props}>{html}</Tag>;
}
