const express = require('express');
const router = express.Router();
const pool = require('../db');

const DEFAULTS = {
  site_name: 'Bangladesh With Naim',
  site_url: 'https://bangladeshwithnaim.com',
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
  robots_index: 1,
  robots_follow: 1,
  google_verification: 'google0112f4e428fe015b',
  author_name: 'Naim',
  author_url: 'https://bangladeshwithnaim.com',
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

const STRING_FIELDS = Object.keys(DEFAULTS).filter(key => !['robots_index', 'robots_follow'].includes(key));
const BOOL_FIELDS = ['robots_index', 'robots_follow'];

let tableReady;
function ensureTable() {
  if (!tableReady) {
    tableReady = pool.query(`
      CREATE TABLE IF NOT EXISTS seo_settings (
        id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
        site_name VARCHAR(255) NOT NULL,
        site_url VARCHAR(500) NOT NULL,
        meta_title VARCHAR(255) NOT NULL,
        meta_description TEXT NOT NULL,
        keywords TEXT,
        canonical_url VARCHAR(500),
        og_title VARCHAR(255),
        og_description TEXT,
        og_image VARCHAR(1000),
        twitter_title VARCHAR(255),
        twitter_description TEXT,
        twitter_image VARCHAR(1000),
        twitter_creator VARCHAR(255),
        robots_index TINYINT(1) NOT NULL DEFAULT 1,
        robots_follow TINYINT(1) NOT NULL DEFAULT 1,
        google_verification VARCHAR(255),
        author_name VARCHAR(255),
        author_url VARCHAR(500),
        publisher_name VARCHAR(255),
        business_name VARCHAR(255),
        business_type VARCHAR(255),
        business_description TEXT,
        business_phone VARCHAR(100),
        business_email VARCHAR(255),
        business_street VARCHAR(255),
        business_city VARCHAR(255),
        business_country VARCHAR(10),
        business_logo VARCHAR(1000),
        area_served TEXT,
        price_range VARCHAR(50),
        opening_hours VARCHAR(255),
        guide_name VARCHAR(255),
        guide_job_title VARCHAR(255),
        guide_description TEXT,
        guide_image VARCHAR(1000),
        social_links TEXT,
        faq_json LONGTEXT,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `).then(async () => {
      const [rows] = await pool.query('SELECT id FROM seo_settings WHERE id = 1');
      if (!rows.length) {
        const fields = ['id', ...Object.keys(DEFAULTS)];
        const values = [1, ...Object.keys(DEFAULTS).map(key => DEFAULTS[key])];
        await pool.query(
          `INSERT INTO seo_settings (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`,
          values,
        );
      }
    });
  }
  return tableReady;
}

function normalize(row) {
  return {
    ...DEFAULTS,
    ...row,
    robots_index: Boolean(Number(row?.robots_index ?? DEFAULTS.robots_index)),
    robots_follow: Boolean(Number(row?.robots_follow ?? DEFAULTS.robots_follow)),
  };
}

router.get('/', async (req, res) => {
  try {
    await ensureTable();
    const [rows] = await pool.query('SELECT * FROM seo_settings WHERE id = 1 LIMIT 1');
    res.json({ success: true, data: normalize(rows[0] || DEFAULTS) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/', async (req, res) => {
  try {
    await ensureTable();
    const body = req.body || {};
    const values = {};
    STRING_FIELDS.forEach(field => {
      if (body[field] !== undefined) values[field] = String(body[field] ?? '');
    });
    BOOL_FIELDS.forEach(field => {
      if (body[field] !== undefined) values[field] = body[field] ? 1 : 0;
    });

    const fields = Object.keys(values);
    if (!fields.length) return res.status(400).json({ success: false, message: 'No SEO fields provided' });

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    await pool.query(`UPDATE seo_settings SET ${setClause} WHERE id = 1`, fields.map(field => values[field]));
    const [rows] = await pool.query('SELECT * FROM seo_settings WHERE id = 1 LIMIT 1');
    res.json({ success: true, message: 'SEO settings updated', data: normalize(rows[0]) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
