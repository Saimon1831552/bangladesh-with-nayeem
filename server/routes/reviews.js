const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/reviews — list all (optional: ?tour_id=&rating=&verified=true)
router.get('/', async (req, res) => {
  try {
    const { tour_id, rating, verified } = req.query;
    let query = 'SELECT * FROM reviews WHERE 1=1';
    const params = [];

    if (tour_id) {
      query += ' AND tour_id = ?';
      params.push(tour_id);
    }
    if (rating) {
      query += ' AND rating = ?';
      params.push(rating);
    }
    if (verified === 'true') {
      query += ' AND is_verified = 1';
    }

    query += ' ORDER BY id DESC';
    const [rows] = await pool.query(query, params);
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/reviews/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reviews WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Review not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/reviews — create
router.post('/', async (req, res) => {
  try {
    const {
      tour_id, tour_name, name, country, initials, color_hex, bg_hex,
      review_date, rating, title, body, helpful_votes, is_verified
    } = req.body;

    if (!name || !rating) {
      return res.status(400).json({ success: false, message: 'name and rating are required' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'rating must be between 1 and 5' });
    }

    const [result] = await pool.query(
      `INSERT INTO reviews (tour_id, tour_name, name, country, initials, color_hex, bg_hex, review_date, rating, title, body, helpful_votes, is_verified)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [tour_id ?? null, tour_name, name, country, initials, color_hex, bg_hex,
       review_date, rating, title, body, helpful_votes ?? 0, is_verified ?? 0]
    );

    res.status(201).json({ success: true, message: 'Review created', data: { id: result.insertId } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/reviews/:id — full update
router.put('/:id', async (req, res) => {
  try {
    const {
      tour_id, tour_name, name, country, initials, color_hex, bg_hex,
      review_date, rating, title, body, helpful_votes, is_verified
    } = req.body;

    const [result] = await pool.query(
      `UPDATE reviews SET tour_id=?, tour_name=?, name=?, country=?, initials=?, color_hex=?, bg_hex=?,
       review_date=?, rating=?, title=?, body=?, helpful_votes=?, is_verified=? WHERE id=?`,
      [tour_id, tour_name, name, country, initials, color_hex, bg_hex,
       review_date, rating, title, body, helpful_votes, is_verified, req.params.id]
    );

    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Review not found' });
    res.json({ success: true, message: 'Review updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/reviews/:id — partial update
router.patch('/:id', async (req, res) => {
  try {
    const fields = req.body;
    if (!Object.keys(fields).length) {
      return res.status(400).json({ success: false, message: 'No fields provided' });
    }

    const setClauses = Object.keys(fields).map(k => `${k} = ?`).join(', ');
    const values = [...Object.values(fields), req.params.id];

    const [result] = await pool.query(`UPDATE reviews SET ${setClauses} WHERE id = ?`, values);
    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Review not found' });
    res.json({ success: true, message: 'Review updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/reviews/:id
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM reviews WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Review not found' });
    res.json({ success: true, message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;