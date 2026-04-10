import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faClock } from '@fortawesome/free-solid-svg-icons';

export default function Blog() {
  const blogs = [
    {
      id: 1,
      isFeatured: true, // This flag makes the first post larger
      title: "Into the Mangroves: A Guide to the Sundarbans",
      excerpt: "Discover the thrill of tracking the Royal Bengal Tiger and navigating the serene, misty rivers of the world's largest mangrove forest. A complete guide to preparing for the wild.",
      image: "https://i.ibb.co.com/N6LG9xNp/19899.jpg",
      category: "Wilderness",
      date: "Oct 12, 2025",
      readTime: "5 min read",
      author: "Nayeem Islam",
      authorImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      slug: "/blogs/sundarbans-guide"
    },
    {
      id: 2,
      isFeatured: false,
      title: "Top 5 Hidden Waterfalls in Sylhet You Must Visit",
      excerpt: "Skip the crowded spots and explore these untouched, crystal-clear waterfalls hidden deep within the tea gardens.",
      image: "https://i.ibb.co.com/G4s2z73j/41413.jpg",
      category: "Adventure",
      date: "Oct 28, 2025",
      readTime: "4 min",
      author: "Sarah J.",
      authorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      slug: "/blogs/sylhet-waterfalls"
    },
    {
      id: 3,
      isFeatured: false,
      title: "A Culinary Journey Through Old Dhaka's Streets",
      excerpt: "From Haji Biryani to Bakarkhani, dive into the rich Mughal heritage of Dhaka's bustling food scene.",
      image: "https://i.ibb.co.com/B51QQ7Dh/813.jpg",
      category: "Culture",
      date: "Nov 05, 2025",
      readTime: "6 min",
      author: "David M.",
      authorImg: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=150&auto=format&fit=crop",
      slug: "/blogs/old-dhaka-food"
    },
    {
      id: 4,
      isFeatured: true, // This flag makes the first post larger
      title: "Into the Mangroves: A Guide to the Sundarbans",
      excerpt: "Discover the thrill of tracking the Royal Bengal Tiger and navigating the serene, misty rivers of the world's largest mangrove forest. A complete guide to preparing for the wild.",
      image: "https://i.ibb.co.com/B51QQ7Dh/813.jpg",
      category: "Wilderness",
      date: "Oct 12, 2025",
      readTime: "5 min read",
      author: "Nayeem Islam",
      authorImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      slug: "/blogs/sundarbans-guide"
    },
    {
      id: 5,
      isFeatured: false,
      title: "Top 5 Hidden Waterfalls in Sylhet You Must Visit",
      excerpt: "Skip the crowded spots and explore these untouched, crystal-clear waterfalls hidden deep within the tea gardens.",
      image: "https://i.ibb.co.com/G4s2z73j/41413.jpg",
      category: "Adventure",
      date: "Oct 28, 2025",
      readTime: "4 min",
      author: "Sarah J.",
      authorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      slug: "/blogs/sylhet-waterfalls"
    },
    {
      id: 6,
      isFeatured: false,
      title: "A Culinary Journey Through Old Dhaka's Streets",
      excerpt: "From Haji Biryani to Bakarkhani, dive into the rich Mughal heritage of Dhaka's bustling food scene.",
      image: "https://i.ibb.co.com/B51QQ7Dh/813.jpg",
      category: "Culture",
      date: "Nov 05, 2025",
      readTime: "6 min",
      author: "David M.",
      authorImg: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=150&auto=format&fit=crop",
      slug: "/blogs/old-dhaka-food"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-0.5 bg-amber-500"></span>
              <span className="text-sm font-bold tracking-widest text-green-800 uppercase">
                Travel Journal
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Inspiring Stories & <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500">
                Local Guides
              </span>
            </h2>
          </div>
          
          <Link href="/blogs">
            <button className="group flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-900 hover:border-green-700 hover:bg-green-700 hover:text-white px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-sm hover:shadow-lg">
              Explore All Articles
              <FontAwesomeIcon 
                icon={faArrowRight} 
                className="transition-transform duration-300 group-hover:translate-x-1" 
              />
            </button>
          </Link>
        </div>

        {/* Editorial Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link 
              href={blog.slug} 
              key={blog.id} 
              className={`block group ${blog.isFeatured ? 'lg:col-span-2' : 'lg:col-span-1'}`}
            >
              <article className={`bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 transition-all duration-500 h-full flex flex-col ${blog.isFeatured ? 'md:flex-row' : ''} transform group-hover:-translate-y-1`}>
                
                {/* Image Section */}
                <div className={`relative overflow-hidden ${blog.isFeatured ? 'md:w-1/2 aspect-square md:aspect-auto' : 'w-full aspect-[4/3]'}`}>
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Glassmorphism Category Badge */}
                  <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">
                    {blog.category}
                  </div>
                </div>

                {/* Content Section */}
                <div className={`flex flex-col flex-grow ${blog.isFeatured ? 'md:w-1/2 p-8 md:p-12 justify-center' : 'p-8'}`}>
                  
                  {/* Meta (Read Time & Date) */}
                  <div className="flex items-center gap-3 text-xs text-amber-600 font-bold tracking-wide uppercase mb-4">
                    <span>{blog.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faClock} />
                      {blog.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`${blog.isFeatured ? 'text-2xl md:text-3xl mb-4' : 'text-xl mb-3'} font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300 leading-snug line-clamp-3`}>
                    {blog.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className={`text-gray-600 line-clamp-3 ${blog.isFeatured ? 'text-lg mb-8' : 'text-base mb-6'} flex-grow`}>
                    {blog.excerpt}
                  </p>

                  {/* Author & Read More Footer */}
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <img 
                        src={blog.authorImg} 
                        alt={blog.author} 
                        className="w-10 h-10 rounded-full object-cover shadow-sm"
                      />
                      <span className="text-sm font-bold text-gray-900">{blog.author}</span>
                    </div>
                    
                    {/* Minimalist Arrow */}
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-green-700 group-hover:text-white transition-all duration-300">
                      <FontAwesomeIcon icon={faArrowRight} className="transform group-hover:rotate-45 transition-transform duration-300" />
                    </div>
                  </div>

                </div>
              </article>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}