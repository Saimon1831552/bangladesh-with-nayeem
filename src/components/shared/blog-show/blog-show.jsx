
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function BlogCard({ blog }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={blog.image_url}
          alt={blog.title}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          {blog.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        {/* Author + date */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-green-100">
            <Image
              src={blog.author_img}
              alt={blog.author}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <span className="text-sm font-semibold text-gray-600">{blog.author}</span>
          <span className="text-gray-300">·</span>
          <span className="text-sm text-gray-400">{formatDate(blog.publish_date)}</span>
        </div>

        {/* Title */}
        <h3 className="font-extrabold text-gray-900 text-lg mb-3 group-hover:text-green-700 transition-colors">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-500 text-sm leading-relaxed flex-grow line-clamp-3">
          {blog.excerpt?.trim()}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <FontAwesomeIcon icon={faClock} />
            {blog.read_time}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-bold text-green-700 group-hover:gap-3 transition-all">
            Read more <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogShow({ blogs = [] }) {
  const safeBlogs = Array.isArray(blogs) ? blogs.slice(0, 3) : [];

  if (safeBlogs.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-bold tracking-widest text-green-700 uppercase mb-3 block">
            From Our Blog
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Latest{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-green-500">
              Articles
            </span>
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Travel guides, local insights, and hidden gems — written by those who know Bangladesh best.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safeBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* View all */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/blogs"
            className="group flex items-center gap-3 bg-white border-2 border-green-700 text-green-800 hover:bg-green-700 hover:text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View all articles
            <FontAwesomeIcon icon={faArrowRight} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}