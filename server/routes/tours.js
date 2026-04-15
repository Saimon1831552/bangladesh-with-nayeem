const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/tours — list all (with optional filter by tour_type)
router.get('/', async (req, res) => {
  try {
    const { tour_type, location } = req.query;
    let query = 'SELECT * FROM tours WHERE 1=1';
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

// GET /api/tours/:id — get single tour by id or slug
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const isNumeric = /^\d+$/.test(id);
    const column = isNumeric ? 'id' : 'slug';
    const [rows] = await pool.query(`SELECT * FROM tours WHERE ${column} = ?`, [id]);

    if (!rows.length) return res.status(404).json({ success: false, message: 'Tour not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/tours — create a tour
router.post('/', async (req, res) => {
  try {
    const { slug, title, image_url, location, duration, group_size, price, rating, review_count, tour_type } = req.body;

    if (!slug || !title) {
      return res.status(400).json({ success: false, message: 'slug and title are required' });
    }

    const [result] = await pool.query(
      `INSERT INTO tours (slug, title, image_url, location, duration, group_size, price, rating, review_count, tour_type)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [slug, title, image_url, location, duration, group_size, price ?? null, rating ?? null, review_count ?? 0, tour_type]
    );

    res.status(201).json({ success: true, message: 'Tour created', data: { id: result.insertId, slug } });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'Slug already exists' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/tours/:id — full update
router.put('/:id', async (req, res) => {
  try {
    const { slug, title, image_url, location, duration, group_size, price, rating, review_count, tour_type } = req.body;
    const [result] = await pool.query(
      `UPDATE tours SET slug=?, title=?, image_url=?, location=?, duration=?, group_size=?, price=?, rating=?, review_count=?, tour_type=?
       WHERE id=?`,
      [slug, title, image_url, location, duration, group_size, price, rating, review_count, tour_type, req.params.id]
    );

    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Tour not found' });
    res.json({ success: true, message: 'Tour updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/tours/:id — partial update
router.patch('/:id', async (req, res) => {
  try {
    const fields = req.body;
    if (!Object.keys(fields).length) {
      return res.status(400).json({ success: false, message: 'No fields provided' });
    }

    const setClauses = Object.keys(fields).map(k => `${k} = ?`).join(', ');
    const values = [...Object.values(fields), req.params.id];

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