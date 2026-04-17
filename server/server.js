const express = require('express');
const cors = require('cors');

const toursRouter = require('./routes/tours');
const blogsRouter = require('./routes/blogs');
const reviewsRouter = require('./routes/reviews');
const galleryRouter = require('./routes/gallery');

const app = express();


// ✅ Restrict CORS to your Vercel frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.use('/api/tours', toursRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/gallery', galleryRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Travel API is running 🌍', version: '1.0.0' });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;