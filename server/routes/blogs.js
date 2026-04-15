const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/blogs — list all (optional: ?category=&featured=true)
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = 'SELECT * FROM blogs WHERE 1=1';
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    if (featured === 'true') {
      query += ' AND is_featured = 1';
    }

    query += ' ORDER BY publish_date DESC';
    const [rows] = await pool.query(query, params);
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/blogs/:id — by id or slug
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const isNumeric = /^\d+$/.test(id);
    const column = isNumeric ? 'id' : 'slug';
    const [rows] = await pool.query(`SELECT * FROM blogs WHERE ${column} = ?`, [id]);

    if (!rows.length) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/blogs — create
router.post('/', async (req, res) => {
  try {
    const { slug, title, excerpt, image_url, category, publish_date, read_time, author, author_img, is_featured } = req.body;

    if (!slug || !title) {
      return res.status(400).json({ success: false, message: 'slug and title are required' });
    }

    const [result] = await pool.query(
      `INSERT INTO blogs (slug, title, excerpt, image_url, category, publish_date, read_time, author, author_img, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [slug, title, excerpt, image_url, category, publish_date, read_time, author, author_img, is_featured ?? 0]
    );

    res.status(201).json({ success: true, message: 'Blog created', data: { id: result.insertId, slug } });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'Slug already exists' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/blogs/:id — full update
router.put('/:id', async (req, res) => {
  try {
    const { slug, title, excerpt, image_url, category, publish_date, read_time, author, author_img, is_featured } = req.body;
    const [result] = await pool.query(
      `UPDATE blogs SET slug=?, title=?, excerpt=?, image_url=?, category=?, publish_date=?, read_time=?, author=?, author_img=?, is_featured=?
       WHERE id=?`,
      [slug, title, excerpt, image_url, category, publish_date, read_time, author, author_img, is_featured, req.params.id]
    );

    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, message: 'Blog updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/blogs/:id — partial update
router.patch('/:id', async (req, res) => {
  try {
    const fields = req.body;
    if (!Object.keys(fields).length) {
      return res.status(400).json({ success: false, message: 'No fields provided' });
    }

    const setClauses = Object.keys(fields).map(k => `${k} = ?`).join(', ');
    const values = [...Object.values(fields), req.params.id];

    const [result] = await pool.query(`UPDATE blogs SET ${setClauses} WHERE id = ?`, values);
    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, message: 'Blog updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/blogs/:id
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM blogs WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;