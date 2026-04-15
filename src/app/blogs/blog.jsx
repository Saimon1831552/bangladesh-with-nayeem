"use client";

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faClock, faInbox } from '@fortawesome/free-solid-svg-icons';

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

  // Mark the first blog as featured if none have is_featured set
  const processedBlogs = blogs.map((b, i) => ({
    ...b,
    isFeatured: b.is_featured === 1 || b.isFeatured || false,
  }));

  // Ensure at most one featured (the first is_featured=1 one)
  let featuredFound = false;
  const finalBlogs = processedBlogs.map(b => {
    if (b.isFeatured && !featuredFound) { featuredFound = true; return b; }
    return { ...b, isFeatured: false };
  });

  return (
    <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-0.5 bg-amber-500" />
              <span className="text-sm font-bold tracking-widest text-green-800 uppercase">Travel Journal</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Inspiring Stories &{' '}
              <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500">
                Local Guides
              </span>
            </h2>
          </div>

          <Link href="/blogs">
            <button className="group flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-900 hover:border-green-700 hover:bg-green-700 hover:text-white px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-sm hover:shadow-lg">
              Explore All Articles
              <FontAwesomeIcon icon={faArrowRight} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {finalBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

      </div>
    </section>
  );
}

function BlogCard({ blog }) {
  // Normalize slug: ensure it starts correctly for Next.js routing
  // DB stores "/blogs/my-slug" or just "my-slug"
  const href = blog.slug
    ? blog.slug.startsWith('/') ? blog.slug : `/blogs/${blog.slug}`
    : '#';

  // Normalize date display
  const dateDisplay = blog.publish_date
    ? (() => {
        try {
          return new Date(blog.publish_date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
          });
        } catch {
          return blog.publish_date;
        }
      })()
    : null;

  return (
    <Link
      href={href}
      key={blog.id}
      className={`block group ${blog.isFeatured ? 'lg:col-span-2' : 'lg:col-span-1'}`}
    >
      <article
        className={`
          bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl
          border border-gray-100 transition-all duration-500 h-full flex flex-col
          ${blog.isFeatured ? 'md:flex-row' : ''}
          transform group-hover:-translate-y-1
        `}
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${blog.isFeatured ? 'md:w-1/2 aspect-square md:aspect-auto' : 'w-full aspect-[4/3]'}`}>
          <img
            src={blog.image_url}
            alt={blog.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={e => {
              e.target.src = 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80';
            }}
          />
          {/* Category badge */}
          {blog.category && (
            <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">
              {blog.category}
            </div>
          )}
          {/* Featured badge */}
          {blog.isFeatured && (
            <div className="absolute top-6 right-6 bg-amber-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`flex flex-col flex-grow ${blog.isFeatured ? 'md:w-1/2 p-8 md:p-12 justify-center' : 'p-8'}`}>

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
          <h3
            className={`
              ${blog.isFeatured ? 'text-2xl md:text-3xl mb-4' : 'text-xl mb-3'}
              font-bold text-gray-900 group-hover:text-green-700
              transition-colors duration-300 leading-snug line-clamp-3
            `}
          >
            {blog.title}
          </h3>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className={`text-gray-600 line-clamp-3 ${blog.isFeatured ? 'text-lg mb-8' : 'text-base mb-6'} flex-grow`}>
              {blog.excerpt}
            </p>
          )}

          {/* Author footer */}
          <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3">
              {blog.author_img ? (
                <img
                  src={blog.author_img}
                  alt={blog.author}
                  className="w-10 h-10 rounded-full object-cover shadow-sm"
                  onError={e => { e.target.style.display = 'none'; }}
                />
              ) : (
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#EAF4EF', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15 }}>
                  {blog.author?.charAt(0) || 'A'}
                </div>
              )}
              {blog.author && (
                <span className="text-sm font-bold text-gray-900">{blog.author}</span>
              )}
            </div>

            {/* Arrow */}
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-green-700 group-hover:text-white transition-all duration-300">
              <FontAwesomeIcon icon={faArrowRight} className="transform group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>

        </div>
      </article>
    </Link>
  );
}