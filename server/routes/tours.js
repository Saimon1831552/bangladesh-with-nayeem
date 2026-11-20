const express = require('express');
const router  = express.Router();
const pool    = require('../db');
const validatePatchFields = require('../utils/validatePatchFields');

// SEO fields live with their tour so each detail page can have unique metadata.
// The column check keeps this safe for existing deployments that pre-date them.
const SEO_COLUMNS = {
  seo_title: 'VARCHAR(255) NULL',
  seo_description: 'TEXT NULL',
  seo_keywords: 'TEXT NULL',
  seo_image_alt: 'VARCHAR(500) NULL',
  seo_og_title: 'VARCHAR(255) NULL',
  seo_og_description: 'TEXT NULL',
  seo_og_image: 'VARCHAR(1000) NULL',
};

const EXISTING_TOUR_SEO = {
  'dhaka-city-tour-heritage-bangladesh-naim': {
    seo_title: 'Dhaka City Tour: Old Dhaka Heritage & Culture',
    seo_description: 'Discover Old and New Dhaka with a private local guide. Visit Lalbagh Fort, Ahsan Manzil, Star Mosque, Sadarghat and more in one memorable day.',
    seo_keywords: 'Dhaka city tour, Old Dhaka tour, Dhaka heritage tour, Lalbagh Fort tour, Ahsan Manzil tour, private Dhaka guide, Bangladesh tour',
    seo_image_alt: 'Lalbagh Fort Mughal architecture during a private Dhaka city tour',
    seo_og_title: 'Private Dhaka City & Old Dhaka Heritage Tour',
    seo_og_description: 'Explore the Mughal, colonial and living heritage of Dhaka with Naim, your private local guide.',
  },
  'sonargaon-day-tour-with-naim': {
    seo_title: 'Sonargaon & Panam City Day Tour from Dhaka',
    seo_description: 'Take a private day tour from Dhaka to historic Sonargaon and Panam City. Explore Bengal\'s former capital, folk art and centuries-old merchant houses.',
    seo_keywords: 'Sonargaon tour, Panam City tour, Sonargaon day tour, day trip from Dhaka, Bangladesh heritage tour, Folk Art Museum, private Bangladesh guide',
    seo_image_alt: 'Historic Sonargaon Folk Art Museum and Boro Sardar Bari in Bangladesh',
    seo_og_title: 'Sonargaon & Panam City Private Day Tour',
    seo_og_description: 'Step into Bengal\'s former capital and discover Panam City with a private local guide from Dhaka.',
  },
  'dhaka-street-photography-tour-with-naim': {
    seo_title: 'Dhaka Street Photography Tour with Local Guide',
    seo_description: 'Capture the colour, energy and river life of Dhaka on a private street photography tour with a local guide who knows the city\'s best stories and scenes.',
    seo_keywords: 'Dhaka photography tour, Dhaka street photography, Bangladesh photography tour, Buriganga River photography, Old Dhaka photo tour, private photo guide Dhaka',
    seo_image_alt: 'Buriganga River boat scene on a Dhaka street photography tour',
    seo_og_title: 'Private Dhaka Street Photography Tour',
    seo_og_description: 'Photograph the stories, streets and river life of Dhaka with a knowledgeable local guide.',
  },
  'rajshahi-north-bengal-heritage-UNESCO-tour': {
    seo_title: 'Rajshahi & North Bengal UNESCO Heritage Tour',
    seo_description: 'Explore Rajshahi and North Bengal on a private heritage journey featuring Puthia temples, UNESCO sites and the region\'s remarkable history.',
    seo_keywords: 'Rajshahi tour, North Bengal tour, UNESCO heritage tour Bangladesh, Puthia temple tour, Bangladesh cultural tour, private Bangladesh guide',
    seo_image_alt: 'Historic Shiva temple architecture in Puthia near Rajshahi, Bangladesh',
    seo_og_title: 'Rajshahi & North Bengal Heritage Journey',
    seo_og_description: 'Discover temple towns, UNESCO heritage and the rich culture of North Bengal with Naim.',
  },
  'sundarbans-private-safari-unesco-forest-tour': {
    seo_title: 'Private Sundarbans Safari & UNESCO Forest Tour',
    seo_description: 'Experience the Sundarbans on a private wildlife safari with expert local guidance. Cruise through the world\'s largest mangrove forest and look for Royal Bengal tigers.',
    seo_keywords: 'Sundarbans safari tour, private Sundarbans tour, Royal Bengal tiger tour, Bangladesh wildlife tour, UNESCO mangrove forest, Khulna tour',
    seo_image_alt: 'Royal Bengal tiger in the Sundarbans mangrove forest of Bangladesh',
    seo_og_title: 'Private Sundarbans Safari: Bangladesh Wildlife Adventure',
    seo_og_description: 'Cruise the UNESCO-listed Sundarbans and discover Bangladesh\'s extraordinary mangrove wilderness.',
  },
  'bangladesh-highlights-tour': {
    seo_title: 'Bangladesh Highlights Tour: Culture, Nature & Wildlife',
    seo_description: 'See the best of Bangladesh on a private 12-day journey through Dhaka, the Sundarbans and Sreemangal, blending culture, wildlife and tea-country landscapes.',
    seo_keywords: 'Bangladesh highlights tour, Bangladesh itinerary, private Bangladesh tour, Dhaka Sundarbans Sreemangal tour, Bangladesh culture wildlife tour',
    seo_image_alt: 'Highlights of Bangladesh private cultural, wildlife and nature tour',
    seo_og_title: 'The Ultimate Bangladesh Highlights Tour',
    seo_og_description: 'A private journey through Bangladesh\'s cities, mangrove wilderness and tea country with Naim.',
  },
  'barisal--floating-market-tour': {
    seo_title: 'Barisal Floating Market & Backwater Tour',
    seo_description: 'Explore Barisal\'s floating markets, canals and rural river life on a private multi-day tour through southern Bangladesh.',
    seo_keywords: 'Barisal floating market tour, Barisal tour, Bangladesh floating market, southern Bangladesh tour, backwater tour Bangladesh, private Bangladesh guide',
    seo_image_alt: 'Traditional boats at a floating market in Barisal, Bangladesh',
    seo_og_title: 'Barisal Floating Market Private Tour',
    seo_og_description: 'Travel through the canals, markets and peaceful river landscapes of Barisal with a local guide.',
  },
  'sreemangal-tea-country-tour-bangladesh': {
    seo_title: 'Sreemangal Tea Garden & Rainforest Tour',
    seo_description: 'Explore Sreemangal, Bangladesh\'s tea capital, on a private tour of tea gardens, rainforest trails, wildlife and local village life.',
    seo_keywords: 'Sreemangal tour, Sreemangal tea garden tour, Bangladesh tea country, Lawachara National Park tour, Sylhet wildlife tour, private Bangladesh guide',
    seo_image_alt: 'Tea garden workers harvesting fresh leaves in Sreemangal, Bangladesh',
    seo_og_title: 'Sreemangal Tea Country & Rainforest Tour',
    seo_og_description: 'Walk through tea gardens, explore Lawachara rainforest and experience Sreemangal with Naim.',
  },
  'village-homestay-organic-farming-tour': {
    seo_title: 'Kushtia Village Homestay & Organic Farming Tour',
    seo_description: 'Experience authentic rural Bangladesh in Kushtia with a village homestay, organic farming, local food, crafts and warm family hospitality.',
    seo_keywords: 'Bangladesh village homestay, Kushtia tour, organic farming tour Bangladesh, rural Bangladesh experience, cultural village tour, private Bangladesh guide',
    seo_image_alt: 'Traditional village homestay and organic farming experience in Kushtia, Bangladesh',
    seo_og_title: 'Authentic Bangladesh Village Homestay & Farming Tour',
    seo_og_description: 'Live close to the land, meet local families and discover the traditions of rural Kushtia with Naim.',
  },
};

let seoColumnsReady;
function ensureTourSeoColumns() {
  if (!seoColumnsReady) {
    seoColumnsReady = (async () => {
      const [rows] = await pool.query(
        "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'tours'"
      );
      const existingColumns = new Set(rows.map(row => row.COLUMN_NAME));

      for (const [column, definition] of Object.entries(SEO_COLUMNS)) {
        if (!existingColumns.has(column)) {
          await pool.query(`ALTER TABLE tours ADD COLUMN ${column} ${definition}`);
        }
      }

      for (const [slug, seo] of Object.entries(EXISTING_TOUR_SEO)) {
        await pool.query(
          `UPDATE tours SET
            seo_title = COALESCE(NULLIF(seo_title, ''), ?),
            seo_description = COALESCE(NULLIF(seo_description, ''), ?),
            seo_keywords = COALESCE(NULLIF(seo_keywords, ''), ?),
            seo_image_alt = COALESCE(NULLIF(seo_image_alt, ''), ?),
            seo_og_title = COALESCE(NULLIF(seo_og_title, ''), ?),
            seo_og_description = COALESCE(NULLIF(seo_og_description, ''), ?),
            seo_og_image = COALESCE(NULLIF(seo_og_image, ''), image_url)
           WHERE slug = ?`,
          [seo.seo_title, seo.seo_description, seo.seo_keywords, seo.seo_image_alt, seo.seo_og_title, seo.seo_og_description, slug]
        );
      }
    })();
  }
  return seoColumnsReady;
}

// ── JSON field helpers ────────────────────────────────────────────────────────
const toJson  = (v) => JSON.stringify(Array.isArray(v) ? v : (v || []));
const CONTENT_FIELDS = new Set(['highlights', 'why_choose', 'itinerary', 'faq']);
const sanitizeRichHtml = (value) => String(value || '')
  .replace(/<\s*(script|style|iframe|object|embed|link|meta)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
  .replace(/<\s*(script|style|iframe|object|embed|link|meta)[^>]*\/?\s*>/gi, '')
  .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/\s(href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi, '');
const toContent = (v) => typeof v === 'string' ? sanitizeRichHtml(v) : JSON.stringify(v || []);
const parseJsonField = (row, fields) => {
  fields.forEach(f => {
    if (row[f] && typeof row[f] === 'string') {
      try { row[f] = JSON.parse(row[f]); } catch { row[f] = CONTENT_FIELDS.has(f) ? row[f] : []; }
    }
    if (!row[f]) row[f] = CONTENT_FIELDS.has(f) ? '' : [];
  });
  return row;
};
const JSON_FIELDS = ['highlights', 'why_choose', 'itinerary', 'faq', 'gallery_img', 'included', 'excluded'];

// GET /api/tours
router.get('/', async (req, res) => {
  try {
    await ensureTourSeoColumns();
    const { tour_type, location } = req.query;
    let query  = 'SELECT * FROM tours WHERE 1=1';
    const params = [];

    if (tour_type) {
      query += ' AND FIND_IN_SET(?, tour_type)';
      params.push(tour_type);
    }
    if (location) {
      query += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }

    const [rows] = await pool.query(query, params);
    const data = rows.map(r => parseJsonField(r, JSON_FIELDS));
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/tours/:id
router.get('/:id', async (req, res) => {
  try {
    await ensureTourSeoColumns();
    const { id } = req.params;
    const column = /^\d+$/.test(id) ? 'id' : 'slug';
    const [rows] = await pool.query(`SELECT * FROM tours WHERE ${column} = ?`, [id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Tour not found' });
    const data = parseJsonField(rows[0], JSON_FIELDS);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/tours
router.post('/', async (req, res) => {
  try {
    await ensureTourSeoColumns();
    const {
      slug, title, overview, image_url, location, duration, group_size,
      price, rating, review_count, tour_type, isFeatured,
      highlights, why_choose, itinerary, trip_note, faq,
      gallery_img, included, excluded, quick_view, price_packages,
      seo_title, seo_description, seo_keywords, seo_image_alt,
      seo_og_title, seo_og_description, seo_og_image
    } = req.body;

    if (!slug || !title) return res.status(400).json({ success: false, message: 'slug and title are required' });

    const [result] = await pool.query(
      `INSERT INTO tours
        (slug, title, overview, image_url, location, duration, group_size, price, rating,
         review_count, tour_type, isFeatured, highlights, why_choose, itinerary, trip_note, faq,
         gallery_img, included, excluded, quick_view, price_packages,
         seo_title, seo_description, seo_keywords, seo_image_alt,
         seo_og_title, seo_og_description, seo_og_image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        slug, title, overview ?? null, image_url, location, duration, group_size,
        price ?? null, rating ?? null, review_count ?? 0, tour_type, isFeatured ? 1 : 0,
        toContent(highlights), toContent(why_choose), toContent(itinerary), trip_note ?? null, toContent(faq),
        toJson(gallery_img), toJson(included), toJson(excluded), toJson(quick_view), toJson(price_packages),
        seo_title ?? null, seo_description ?? null, seo_keywords ?? null, seo_image_alt ?? null,
        seo_og_title ?? null, seo_og_description ?? null, seo_og_image ?? null,
      ]
    );
    res.status(201).json({ success: true, message: 'Tour created', data: { id: result.insertId, slug } });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ success: false, message: 'Slug already exists' });
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/tours/:id
router.put('/:id', async (req, res) => {
  try {
    await ensureTourSeoColumns();
    const {
      slug, title, overview, image_url, location, duration, group_size,
      price, rating, review_count, tour_type, isFeatured,
      highlights, why_choose, itinerary, trip_note, faq,
      gallery_img, included, excluded, quick_view, price_packages,
      seo_title, seo_description, seo_keywords, seo_image_alt,
      seo_og_title, seo_og_description, seo_og_image
    } = req.body;

    const [result] = await pool.query(
      `UPDATE tours SET
        slug=?, title=?, overview=?, image_url=?, location=?, duration=?, group_size=?,
        price=?, rating=?, review_count=?, tour_type=?, isFeatured=?,
        highlights=?, why_choose=?, itinerary=?, trip_note=?, faq=?,
        gallery_img=?, included=?, excluded=?, quick_view=?, price_packages=?,
        seo_title=?, seo_description=?, seo_keywords=?, seo_image_alt=?,
        seo_og_title=?, seo_og_description=?, seo_og_image=?
       WHERE id=?`,
      [
        slug, title, overview ?? null, image_url, location, duration, group_size,
        price ?? null, rating ?? null, review_count ?? 0, tour_type, isFeatured ? 1 : 0,
        toContent(highlights), toContent(why_choose), toContent(itinerary), trip_note ?? null, toContent(faq),
        toJson(gallery_img), toJson(included), toJson(excluded), toJson(quick_view), toJson(price_packages),
        seo_title ?? null, seo_description ?? null, seo_keywords ?? null, seo_image_alt ?? null,
        seo_og_title ?? null, seo_og_description ?? null, seo_og_image ?? null,
        req.params.id,
      ]
    );
    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Tour not found' });
    res.json({ success: true, message: 'Tour updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/tours/:id
router.patch('/:id', async (req, res) => {
  try {
    await ensureTourSeoColumns();
    const { safeFields, rejected } = validatePatchFields('tours', req.body);
    if (!Object.keys(safeFields).length) {
      return res.status(400).json({ success: false, message: 'No valid fields provided', ...(rejected.length ? { rejected } : {}) });
    }

    // Stringify all JSON fields if present
    JSON_FIELDS.filter(f => !CONTENT_FIELDS.has(f)).forEach(f => {
      if (safeFields[f] !== undefined) safeFields[f] = toJson(safeFields[f]);
    });
    CONTENT_FIELDS.forEach(f => {
      if (safeFields[f] !== undefined) safeFields[f] = toContent(safeFields[f]);
    });

    const setClauses = Object.keys(safeFields).map(k => `${k} = ?`).join(', ');
    const values     = [...Object.values(safeFields), req.params.id];

    const [result] = await pool.query(`UPDATE tours SET ${setClauses} WHERE id = ?`, values);
    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Tour not found' });
    res.json({ success: true, message: 'Tour updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/tours/:id
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM tours WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Tour not found' });
    res.json({ success: true, message: 'Tour deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
