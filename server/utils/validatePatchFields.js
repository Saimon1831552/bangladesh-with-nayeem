// utils/validatePatchFields.js

// Whitelist of columns allowed per table
const ALLOWED_FIELDS = {
  blogs:   ['slug','title','excerpt','image_url','category','publish_date','read_time','author','author_img','is_featured'],
  reviews: ['tour_id','tour_name','name','country','initials','color_hex','bg_hex','review_date','rating','title','body','helpful_votes','is_verified'],
  gallery: ['tour_id','image_url','alt_text'],
  tours:   ['slug','title','overview','image_url','location','duration','group_size','price','rating','review_count','tour_type','isFeatured','highlights','why_choose','itinerary','trip_note','faq','gallery_img','included','excluded','quick_view','price_packages','seo_title','seo_description','seo_keywords','seo_image_alt','seo_og_title','seo_og_description','seo_og_image'],
};

/**
 * Filters req.body to only allowed columns for the given table.
 * Returns { safeFields, rejected } so the route can warn or error.
 */
function validatePatchFields(table, body) {
  const allowed = ALLOWED_FIELDS[table] || [];
  const safeFields = {};
  const rejected   = [];

  for (const key of Object.keys(body)) {
    if (allowed.includes(key)) {
      safeFields[key] = body[key];
    } else {
      rejected.push(key);
    }
  }
  return { safeFields, rejected };
}

module.exports = validatePatchFields;
