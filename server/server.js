const express = require('express');
const cors    = require('cors');

const toursRouter   = require('./routes/tours');
const blogsRouter   = require('./routes/blogs');
const reviewsRouter = require('./routes/reviews');
const galleryRouter = require('./routes/gallery');

const app = express();

// ✅ Fix 1: Strict CORS — never fall back to wildcard in production
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map(o => o.trim())
  : [];

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server (no origin) or whitelisted origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  // ✅ Fix 2: Added PATCH to allowed methods
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// ✅ Fix 3: Limit request body size to 1mb to prevent payload attacks
app.use(express.json({ limit: '1mb' }));

// ✅ Fix 4: Simple rate limiting without extra dependency
const rateMap = new Map();
app.use((req, res, next) => {
  const ip  = req.ip || req.socket.remoteAddress;
  const now = Date.now();
  const windowMs = 60_000; // 1 minute
  const max = 120;         // requests per window per IP

  const entry = rateMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > windowMs) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count++;
  rateMap.set(ip, entry);

  if (entry.count > max) {
    return res.status(429).json({ success: false, message: 'Too many requests. Please try again later.' });
  }
  next();
});

// Clean up rateMap every 5 minutes to prevent memory leak
setInterval(() => {
  const cutoff = Date.now() - 60_000;
  for (const [ip, entry] of rateMap) {
    if (entry.start < cutoff) rateMap.delete(ip);
  }
}, 300_000);

// Routes
app.use('/api/tours',   toursRouter);
app.use('/api/blogs',   blogsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/gallery', galleryRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Travel API is running 🌍', version: '1.0.0' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ✅ Fix 5: Hide error details in production
app.use((err, req, res, next) => {
  console.error(err.stack);
  const isProd = process.env.NODE_ENV === 'production';
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(isProd ? {} : { error: err.message }),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

module.exports = app;