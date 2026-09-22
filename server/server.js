const express = require('express');
const cors = require('cors');

const toursRouter = require('./routes/tours');
const blogsRouter = require('./routes/blogs');
const reviewsRouter = require('./routes/reviews');
const galleryRouter = require('./routes/gallery');
const bookingRouter = require('./routes/booking');

const app = express();


// ========================================
// CORS CONFIGURATION
// ========================================

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL
      .split(',')
      .map(o => o.trim().replace(/\/$/, ''))
  : [];

console.log('Allowed Origins:', allowedOrigins);

app.use(cors({
  origin: (origin, callback) => {

    // Allow requests without Origin
    // Example: Postman, curl, server-to-server
    if (!origin) {
      return callback(null, true);
    }

    const cleanOrigin = origin.replace(/\/$/, '');

    if (allowedOrigins.includes(cleanOrigin)) {
      return callback(null, true);
    }

    console.error('CORS blocked:', origin);

    return callback(
      new Error(`CORS: origin ${origin} not allowed`)
    );
  },

  methods: [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS'
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization'
  ],

  credentials: true
}));


// ========================================
// BODY PARSER
// ========================================

app.use(express.json({
  limit: '1mb'
}));


// ========================================
// RATE LIMIT
// ========================================

const rateMap = new Map();

app.use((req, res, next) => {

  const ip = req.ip || req.socket.remoteAddress;
  const now = Date.now();

  const windowMs = 60_000;
  const max = 120;

  const entry = rateMap.get(ip) || {
    count: 0,
    start: now
  };

  if (now - entry.start > windowMs) {
    entry.count = 0;
    entry.start = now;
  }

  entry.count++;

  rateMap.set(ip, entry);

  if (entry.count > max) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.'
    });
  }

  next();
});


// Clean old rate-limit entries
setInterval(() => {

  const cutoff = Date.now() - 60_000;

  for (const [ip, entry] of rateMap) {

    if (entry.start < cutoff) {
      rateMap.delete(ip);
    }

  }

}, 300_000);


// ========================================
// HEALTH CHECK
// ========================================

app.get('/', (req, res) => {

  res.json({
    message: 'Travel API is running 🌍',
    version: '1.0.0'
  });

});


// ========================================
// API ROUTES
// ========================================

app.use('/api/tours', toursRouter);

app.use('/api/blogs', blogsRouter);

app.use('/api/reviews', reviewsRouter);

app.use('/api/gallery', galleryRouter);

app.use('/api/booking', bookingRouter);


// ========================================
// 404 HANDLER
// ========================================

app.use((req, res) => {

  res.status(404).json({
    success: false,
    message: 'Route not found'
  });

});


// ========================================
// ERROR HANDLER
// ========================================

app.use((err, req, res, next) => {

  console.error('SERVER ERROR:', err);

  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    success: false,
    message: 'Internal server error',

    ...(isProd
      ? {}
      : {
          error: err.message
        })
  });

});


// ========================================
// START SERVER
// ========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {

  console.log(`Server running on port ${PORT}`);

});


module.exports = app;
