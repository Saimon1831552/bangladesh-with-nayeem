
## API Reference

### 🗺️ Tours — `/api/tours`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tours` | Get all tours |
| GET | `/api/tours?tour_type=day` | Filter by type |
| GET | `/api/tours?location=Sylhet` | Filter by location |
| GET | `/api/tours/:id` | Get tour by ID or slug |
| POST | `/api/tours` | Create a tour |
| PUT | `/api/tours/:id` | Full update |
| PATCH | `/api/tours/:id` | Partial update |
| DELETE | `/api/tours/:id` | Delete tour |

**POST/PUT body:**
```json
{
  "slug": "sylhet-tea-gardens",
  "title": "Sylhet Tea Gardens & Waterfalls",
  "image_url": "https://...",
  "location": "Sylhet, Bangladesh",
  "duration": "2 Days, 1 Night",
  "group_size": "2 - 8 People",
  "price": 180.00,
  "rating": 4.8,
  "review_count": 89,
  "tour_type": "multiday,holiday,day"
}
```

---

### 📝 Blogs — `/api/blogs`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blogs` | Get all blogs |
| GET | `/api/blogs?category=Wilderness` | Filter by category |
| GET | `/api/blogs?featured=true` | Get featured blogs |
| GET | `/api/blogs/:id` | Get blog by ID or slug |
| POST | `/api/blogs` | Create a blog |
| PUT | `/api/blogs/:id` | Full update |
| PATCH | `/api/blogs/:id` | Partial update |
| DELETE | `/api/blogs/:id` | Delete blog |

**POST/PUT body:**
```json
{
  "slug": "/blogs/my-blog",
  "title": "My Travel Blog",
  "excerpt": "Short description...",
  "image_url": "https://...",
  "category": "Wilderness",
  "publish_date": "2025-10-12",
  "read_time": "5 min read",
  "author": "John Doe",
  "author_img": "https://...",
  "is_featured": 1
}
```

---

### ⭐ Reviews — `/api/reviews`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews` | Get all reviews |
| GET | `/api/reviews?tour_id=2` | Filter by tour |
| GET | `/api/reviews?rating=5` | Filter by rating |
| GET | `/api/reviews?verified=true` | Verified only |
| GET | `/api/reviews/:id` | Get review by ID |
| POST | `/api/reviews` | Create a review |
| PUT | `/api/reviews/:id` | Full update |
| PATCH | `/api/reviews/:id` | Partial update |
| DELETE | `/api/reviews/:id` | Delete review |

**POST/PUT body:**
```json
{
  "tour_id": 2,
  "tour_name": "Sylhet Tea Gardens",
  "name": "John Smith",
  "country": "USA",
  "initials": "JS",
  "color_hex": "#3B6D11",
  "bg_hex": "#EAF3DE",
  "review_date": "April 2026",
  "rating": 5,
  "title": "Amazing experience!",
  "body": "Detailed review text...",
  "helpful_votes": 0,
  "is_verified": 1
}
```

---

### 🖼️ Gallery — `/api/gallery`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gallery` | Get all images (joins tour info) |
| GET | `/api/gallery?tour_id=2` | Filter by tour |
| GET | `/api/gallery/:id` | Get single image |
| POST | `/api/gallery` | Upload image record |
| PUT | `/api/gallery/:id` | Full update |
| PATCH | `/api/gallery/:id` | Partial update |
| DELETE | `/api/gallery/:id` | Delete image |

**POST/PUT body:**
```json
{
  "tour_id": 2,
  "image_url": "https://...",
  "alt_text": "Sylhet tea gardens view"
}


