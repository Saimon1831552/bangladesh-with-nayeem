"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faClock, faInbox } from '@fortawesome/free-solid-svg-icons';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80';

export default function Blog({ blogs = [] }) {

  if (!blogs.length) {
    return (
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <FontAwesomeIcon icon={faInbox} style={{ fontSize: 48, color: '#d1d5db', marginBottom: 16 }} />
          <p style={{ fontSize: 18, color: '#9ca3af', fontWeight: 500 }}>No articles published yet. Check back soon!</p>
        </div>
      </section>
    );
  }

  const processedBlogs = blogs.map((b) => ({
    ...b,
    isFeatured: b.is_featured === 1 || b.isFeatured || false,
  }));

  const featuredBlog = processedBlogs.find(b => b.isFeatured) || processedBlogs[0];

  const finalBlogs = processedBlogs.map(b => ({
    ...b,
    isFeatured: b.id === featuredBlog?.id,
  }));

  return (
    <div className="bg-slate-50">

      {/* ── Hero Header ── */}
      <section className="relative overflow-hidden bg-green-900 py-24 md:py-32 px-4">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: '#bbf7d0', filter: 'blur(100px)', opacity: 0.12 }} />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: '#fde68a', filter: 'blur(90px)', opacity: 0.1 }} />

        {/* Grid texture overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Label */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-6 h-px bg-amber-400" />
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
              Travel Journal
            </span>
            <span className="w-6 h-px bg-amber-400" />
          </div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Discover the Untold Stories
            <br className="hidden sm:block" />
            <span
              style={{
                background: 'linear-gradient(90deg, #86efac 0%, #fde68a 60%, #86efac 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 3s linear infinite',
              }}
            >
              of Bangladesh
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-green-100/70 max-w-2xl mx-auto leading-relaxed mb-10">
            Stories, travel guides, local culture, hidden destinations, photography journeys, and authentic experiences from across Bangladesh. Insightful articles and real travel stories from{' '}
            <a
              href="https://www.bangladeshwithnaim.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 font-semibold underline underline-offset-2 hover:text-amber-200 transition-colors"
            >
              Bangladesh with Naim
            </a>{' '}
            — helping travelers discover the people, traditions, food, nature, and untold beauty beyond the usual tourist path.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            {[
              { value: `${blogs.length}+`, label: 'Articles' },
              { value: '100%', label: 'Authentic' },
              { value: '∞',   label: 'Discoveries' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-extrabold text-white">{value}</p>
                <p className="text-xs font-semibold text-green-300/70 uppercase tracking-widest mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade into page bg */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #f8fafc)' }} />

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
          @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        `}</style>
      </section>

      {/* ── Blog Grid ── */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section label + view all */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <span className="w-8 h-0.5 bg-amber-500" />
              <span className="text-sm font-bold tracking-widest text-green-800 uppercase">
                All Articles
              </span>
            </div>
            <span className="text-sm text-gray-400 font-medium">
              {blogs.length} {blogs.length === 1 ? 'article' : 'articles'} published
            </span>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {finalBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}

function BlogCard({ blog }) {
  const [imgSrc, setImgSrc] = useState(blog.image_url || FALLBACK_IMAGE);

  const href = blog.slug
    ? blog.slug.startsWith('/') ? blog.slug : `/blogs/${blog.slug}`
    : '#';

  const dateDisplay = blog.publish_date
    ? (() => {
        try {
          return new Date(blog.publish_date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
          });
        } catch { return blog.publish_date; }
      })()
    : null;

  return (
    <Link href={href} className={`block group ${blog.isFeatured ? 'lg:col-span-2' : 'lg:col-span-1'}`}>
      <article
        className={`
          bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl
          border border-gray-100 transition-all duration-500 h-full flex flex-col
          ${blog.isFeatured ? 'md:flex-row' : ''}
          transform group-hover:-translate-y-1
        `}
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${blog.isFeatured ? 'md:w-1/2 aspect-square md:aspect-auto' : 'w-full aspect-video'}`}>
          <Image
            src={imgSrc}
            alt={blog.title || 'Blog image'}
            fill
            sizes={blog.isFeatured ? '(max-width:768px) 100vw, 50vw' : '(max-width:768px) 100vw, 33vw'}
            className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            priority={blog.isFeatured}
          />
          {blog.category && (
            <div className="absolute top-5 left-5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg z-10">
              {blog.category}
            </div>
          )}
          {blog.isFeatured && (
            <div className="absolute top-5 right-5 bg-amber-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg z-10">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`flex flex-col grow ${blog.isFeatured ? 'md:w-1/2 p-8 md:p-10 justify-center' : 'p-7'}`}>
          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-amber-600 font-bold tracking-wide uppercase mb-4">
            {dateDisplay && <span>{dateDisplay}</span>}
            {dateDisplay && blog.read_time && <span className="w-1 h-1 rounded-full bg-gray-300" />}
            {blog.read_time && (
              <span className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faClock} />
                {blog.read_time}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className={`font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300 leading-snug line-clamp-3 ${blog.isFeatured ? 'text-2xl md:text-3xl mb-4' : 'text-xl mb-3'}`}>
            {blog.title}
          </h3>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className={`text-gray-500 line-clamp-3 leading-relaxed grow ${blog.isFeatured ? 'text-base mb-8' : 'text-sm mb-6'}`}>
              {blog.excerpt}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <AuthorAvatar author={blog.author} authorImg={blog.author_img} />
              {blog.author && (
                <span className="text-sm font-bold text-gray-900">{blog.author}</span>
              )}
            </div>
            <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-green-700 group-hover:text-white transition-all duration-300 flex-shrink-0">
              <FontAwesomeIcon icon={faArrowRight} className="transform group-hover:rotate-45 transition-transform duration-300 text-sm" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

function AuthorAvatar({ author, authorImg }) {
  const [imgError, setImgError] = useState(false);

  if (authorImg && !imgError) {
    return (
      <div className="relative w-9 h-9 rounded-full overflow-hidden shadow-sm shrink-0">
        <Image src={authorImg} alt={author || 'Author'} fill sizes="36px" className="object-cover" onError={() => setImgError(true)} />
      </div>
    );
  }

  return (
    <div className="w-9 h-9 rounded-full bg-emerald-50 text-green-700 flex items-center justify-center font-extrabold text-sm shrink-0">
      {author?.charAt(0)?.toUpperCase() || 'A'}
    </div>
  );
}