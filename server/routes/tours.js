const express = require('express');
const router  = express.Router();
const pool    = require('../db');
const validatePatchFields = require('../utils/validatePatchFields');

// GET /api/tours
router.get('/', async (req, res) => {
  try {
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
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/tours/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const column = /^\d+$/.test(id) ? 'id' : 'slug';
    const [rows] = await pool.query(`SELECT * FROM tours WHERE ${column} = ?`, [id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Tour not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/tours
router.post('/', async (req, res) => {
  try {
    const { slug, title, overview, image_url, location, duration, group_size, price, rating, review_count, tour_type, isFeatured, highlights, why_choose, itinerary, trip_note, faq } = req.body;
    if (!slug || !title) return res.status(400).json({ success: false, message: 'slug and title are required' });

    const highlightsJson  = JSON.stringify(highlights  || []);
    const whyChooseJson   = JSON.stringify(why_choose  || []);
    const itineraryJson   = JSON.stringify(itinerary   || []);
    const faqJson         = JSON.stringify(faq         || []);
    const featuredVal     = isFeatured ? 1 : 0;

    const [result] = await pool.query(
      `INSERT INTO tours (slug, title, overview, image_url, location, duration, group_size, price, rating,
       review_count, tour_type, isFeatured, highlights, why_choose, itinerary, trip_note, faq)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [slug, title, overview ?? null, image_url, location, duration, group_size, price ?? null, rating ?? null,
       review_count ?? 0, tour_type, featuredVal, highlightsJson, whyChooseJson, itineraryJson, trip_note ?? null, faqJson]
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
    const { slug, title, overview, image_url, location, duration, group_size, price, rating, review_count, tour_type, isFeatured, highlights, why_choose, itinerary, trip_note, faq } = req.body;

    const highlightsJson  = JSON.stringify(highlights  || []);
    const whyChooseJson   = JSON.stringify(why_choose  || []);
    const itineraryJson   = JSON.stringify(itinerary   || []);
    const faqJson         = JSON.stringify(faq         || []);
    const featuredVal     = isFeatured ? 1 : 0;

    const [result] = await pool.query(
      `UPDATE tours SET slug=?, title=?, overview=?, image_url=?, location=?, duration=?, group_size=?,
       price=?, rating=?, review_count=?, tour_type=?, isFeatured=?, highlights=?, why_choose=?, itinerary=?, trip_note=?, faq=?
       WHERE id=?`,
      [slug, title, overview ?? null, image_url, location, duration, group_size, price, rating,
       review_count, tour_type, featuredVal, highlightsJson, whyChooseJson, itineraryJson, trip_note ?? null, faqJson, req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Tour not found' });
    res.json({ success: true, message: 'Tour updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/tours/:id — ✅ Fix: whitelist fields + stringify JSON fields safely
router.patch('/:id', async (req, res) => {
  try {
    const { safeFields, rejected } = validatePatchFields('tours', req.body);
    if (!Object.keys(safeFields).length) {
      return res.status(400).json({ success: false, message: 'No valid fields provided', ...(rejected.length ? { rejected } : {}) });
    }

    // Stringify JSON fields if present
    if (safeFields.highlights)  safeFields.highlights  = JSON.stringify(safeFields.highlights);
    if (safeFields.why_choose)  safeFields.why_choose  = JSON.stringify(safeFields.why_choose);
    if (safeFields.itinerary)   safeFields.itinerary   = JSON.stringify(safeFields.itinerary);
    if (safeFields.faq)         safeFields.faq         = JSON.stringify(safeFields.faq);

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