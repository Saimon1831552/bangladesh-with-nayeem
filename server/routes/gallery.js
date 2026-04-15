const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/gallery — list all (optional: ?tour_id=)
router.get('/', async (req, res) => {
  try {
    const { tour_id } = req.query;
    let query = `
      SELECT g.*, t.title AS tour_title, t.slug AS tour_slug
      FROM gallery g
      LEFT JOIN tours t ON g.tour_id = t.id
      WHERE 1=1
    `;
    const params = [];

    if (tour_id) {
      query += ' AND g.tour_id = ?';
      params.push(tour_id);
    }

    query += ' ORDER BY g.uploaded_at DESC';
    const [rows] = await pool.query(query, params);
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/gallery/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT g.*, t.title AS tour_title, t.slug AS tour_slug
       FROM gallery g
       LEFT JOIN tours t ON g.tour_id = t.id
       WHERE g.id = ?`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/gallery — create
router.post('/', async (req, res) => {
  try {
    const { tour_id, image_url, alt_text } = req.body;

    if (!image_url) {
      return res.status(400).json({ success: false, message: 'image_url is required' });
    }

    const [result] = await pool.query(
      'INSERT INTO gallery (tour_id, image_url, alt_text) VALUES (?, ?, ?)',
      [tour_id ?? null, image_url, alt_text]
    );

    res.status(201).json({ success: true, message: 'Gallery item created', data: { id: result.insertId } });
  } catch (err) {
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ success: false, message: 'tour_id does not exist' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/gallery/:id — full update
router.put('/:id', async (req, res) => {
  try {
    const { tour_id, image_url, alt_text } = req.body;

    const [result] = await pool.query(
      'UPDATE gallery SET tour_id=?, image_url=?, alt_text=? WHERE id=?',
      [tour_id, image_url, alt_text, req.params.id]
    );

    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    res.json({ success: true, message: 'Gallery item updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/gallery/:id — partial update
router.patch('/:id', async (req, res) => {
  try {
    const fields = req.body;
    if (!Object.keys(fields).length) {
      return res.status(400).json({ success: false, message: 'No fields provided' });
    }

    const setClauses = Object.keys(fields).map(k => `${k} = ?`).join(', ');
    const values = [...Object.values(fields), req.params.id];

    const [result] = await pool.query(`UPDATE gallery SET ${setClauses} WHERE id = ?`, values);
    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    res.json({ success: true, message: 'Gallery item updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/gallery/:id
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM gallery WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    res.json({ success: true, message: 'Gallery item deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;