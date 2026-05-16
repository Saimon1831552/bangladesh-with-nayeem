"use client";

import React, { useState } from 'react';

const sections = [
  {
    icon: '🛎️',
    title: 'Introduction',
    body: `Travel should feel safe, comfortable, and stress-free — both online and during your journey in Bangladesh.

When you contact Bangladesh with Naim, book a tour, or browse the website, certain personal information may be collected to help provide a smooth and personalized travel experience.

We are committed to protecting your privacy and never misusing your personal information.`,
  },
  {
    icon: '📋',
    title: 'Information We Collect',
    body: `To provide the best possible travel experience, we may collect:`,
    list: [
      'Your name, email address, and phone number when you contact us or make a booking',
      'Passport information only when required for permits, hotel reservations, or transportation arrangements',
      'Payment information processed securely through trusted third-party payment providers',
      'Travel preferences, arrival dates, group size, and special requests',
      'Basic website usage information through cookies and analytics tools to improve website performance',
    ],
  },
  {
    icon: '⚙️',
    title: 'How Your Information Is Used',
    body: `Your information helps us create a safe, smooth, and personalized travel experience.\n\nWe may use your information to:`,
    list: [
      'Confirm tour bookings and reservations',
      'Arrange transportation, accommodations, and local experiences',
      'Communicate important travel updates and itineraries',
      'Provide support before, during, and after your journey',
      'Improve our website, services, and traveler experience',
      'Respond to inquiries and customer support requests',
    ],
    footer: 'We never sell, rent, or trade your personal information to outside companies or third parties.',
  },
  {
    icon: '🛡️',
    title: 'Data Security',
    body: `Protecting your information is important to us.`,
    list: [
      'All payments are processed through secure and encrypted payment platforms',
      'Bangladesh with Naim does not store your debit or credit card information',
      'Personal information is stored securely and accessed only when necessary',
      'Reasonable security measures are used to protect your information from unauthorized access or misuse',
    ],
    footer: 'While no online system can guarantee complete security, we continuously work to keep your information protected.',
  },
  {
    icon: '🍪',
    title: 'Cookies',
    body: `Our website may use cookies and analytics tools to improve user experience, website performance, and visitor insights.\n\nCookies help us understand:`,
    list: [
      'Which pages visitors enjoy most',
      'How travelers interact with the website',
      'Ways to improve website speed and usability',
    ],
    footer: 'You can disable cookies at any time in your browser settings, though some website features may not function properly without them.',
  },
  {
    icon: '🌐',
    title: 'Third-Party Services',
    body: `To provide smooth travel services, we may work with trusted third-party providers such as:`,
    list: [
      'Payment gateways',
      'Hotel booking services',
      'Transportation providers',
      'Website analytics tools',
    ],
    footer: 'Each third-party service operates under its own privacy policy and security practices.',
  },
  {
    icon: '🧑‍💼',
    title: 'Your Rights',
    body: `You have the right to:`,
    list: [
      'Request access to the personal information we hold about you',
      'Ask for corrections to inaccurate information',
      'Request deletion of your personal information when legally possible',
      'Unsubscribe from promotional emails or updates at any time',
    ],
    footer: 'For privacy-related requests, please contact us directly through our website contact page.',
  },
  {
    icon: '🗄️',
    title: 'Data Retention',
    body: `We keep booking-related information only as long as necessary for legal, operational, and customer service purposes.\n\nWhen personal information is no longer required, it is safely deleted or removed from our systems.`,
  },
  {
    icon: '📅',
    title: 'Updates to This Privacy Policy',
    body: `This Privacy Policy may be updated from time to time to reflect service improvements, legal changes, or website updates.\n\nThe latest version will always be available on our website with the updated effective date.`,
  },
];

export default function PrivacyPolicy() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .pp-page { font-family:'DM Sans',sans-serif; background:#f8f6f1; }

        /* ── Hero ── */
        .pp-hero {
          position:relative; overflow:hidden;
          background:#14532d;
          padding:88px 40px 80px;
          text-align:center;
        }
        @media(max-width:640px){ .pp-hero { padding:64px 20px 60px; } }
        .pp-hero-blob-a { position:absolute; top:-60px; left:-60px; width:320px; height:320px; border-radius:50%; background:#bbf7d0; filter:blur(100px); opacity:.1; pointer-events:none; }
        .pp-hero-blob-b { position:absolute; bottom:-40px; right:-40px; width:260px; height:260px; border-radius:50%; background:#fde68a; filter:blur(90px); opacity:.1; pointer-events:none; }
        .pp-hero-grid { position:absolute; inset:0; pointer-events:none; background-image:linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px); background-size:48px 48px; }
        .pp-hero-inner { position:relative; z-index:1; max-width:760px; margin:0 auto; }
        .pp-hero-label { display:inline-flex; align-items:center; gap:10px; margin-bottom:20px; }
        .pp-hero-label-line { width:28px; height:1px; background:#d97706; }
        .pp-hero-label-text { font-size:11px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#d97706; }
        .pp-hero-title {
          font-family:'Playfair Display',Georgia,serif;
          font-size:clamp(2rem,5vw,3.6rem);
          font-weight:900; color:#fff;
          line-height:1.1; letter-spacing:-.02em;
          margin-bottom:20px;
        }
        .pp-hero-accent {
          background:linear-gradient(90deg,#86efac 0%,#fde68a 60%,#86efac 100%);
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation:pp-shimmer 3s linear infinite; font-style:italic;
        }
        @keyframes pp-shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .pp-hero-desc { font-size:clamp(14px,2vw,15.5px); color:rgba(255,255,255,.6); line-height:1.85; max-width:600px; margin:0 auto 28px; }
        .pp-hero-desc a { color:#fde68a; font-weight:600; text-decoration:underline; text-underline-offset:3px; }
        .pp-hero-desc a:hover { color:#fbbf24; }
        .pp-hero-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(21,128,61,.2); border:1px solid rgba(21,128,61,.35); border-radius:99px; padding:8px 18px; font-size:12px; font-weight:600; color:#4ade80; }
        .pp-hero-fade { position:absolute; bottom:0; left:0; right:0; height:56px; pointer-events:none; background:linear-gradient(to bottom,transparent,#f8f6f1); }

        /* ── Body ── */
        .pp-body { max-width:820px; margin:0 auto; padding:56px 32px 80px; }
        @media(max-width:640px){ .pp-body { padding:40px 20px 64px; } }

        /* Intro card */
        .pp-intro { background:#fff; border:1px solid #ede9e0; border-radius:20px; padding:32px 36px; margin-bottom:36px; box-shadow:0 2px 12px rgba(0,0,0,.04); }
        .pp-intro p { font-size:14.5px; color:#555; line-height:1.85; margin-bottom:12px; }
        .pp-intro p:last-child { margin-bottom:0; }
        .pp-intro a { color:#15803d; font-weight:600; text-underline-offset:3px; }

        /* Accordion */
        .pp-accordion { display:flex; flex-direction:column; gap:10px; margin-bottom:48px; }
        .pp-acc-item { background:#fff; border:1px solid #ede9e0; border-radius:18px; overflow:hidden; transition:box-shadow .2s; }
        .pp-acc-item:hover { box-shadow:0 6px 24px rgba(0,0,0,.07); }
        .pp-acc-item.open { border-color:#c6e4a8; box-shadow:0 6px 24px rgba(21,128,61,.08); }
        .pp-acc-btn { width:100%; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:20px 24px; background:none; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; text-align:left; }
        .pp-acc-btn-left { display:flex; align-items:center; gap:14px; }
        .pp-acc-icon-wrap { width:40px; height:40px; border-radius:12px; background:#EAF3DE; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; transition:background .2s; }
        .pp-acc-item.open .pp-acc-icon-wrap { background:#15803d; }
        .pp-acc-title { font-size:15px; font-weight:600; color:#1c1c1a; line-height:1.3; }
        .pp-acc-chevron { width:28px; height:28px; border-radius:50%; background:#f4f1eb; display:flex; align-items:center; justify-content:center; font-size:11px; color:#aaa; flex-shrink:0; transition:transform .25s, background .2s; }
        .pp-acc-item.open .pp-acc-chevron { transform:rotate(180deg); background:#EAF3DE; color:#15803d; }
        .pp-acc-body { padding:0 24px 24px 78px; }
        @media(max-width:480px){ .pp-acc-body { padding:0 20px 20px; } }
        .pp-acc-text { font-size:13.5px; color:#666; line-height:1.85; white-space:pre-line; margin-bottom:12px; }
        .pp-acc-list { list-style:none; padding:0; margin:0 0 12px; display:flex; flex-direction:column; gap:8px; }
        .pp-acc-list li { display:flex; align-items:flex-start; gap:10px; font-size:13.5px; color:#555; line-height:1.7; }
        .pp-acc-list li::before { content:''; width:6px; height:6px; border-radius:50%; background:#15803d; flex-shrink:0; margin-top:8px; }
        .pp-acc-footer { font-size:13px; color:#888; line-height:1.75; font-style:italic; border-top:1px solid #f0ece4; padding-top:12px; margin-top:4px; }

        /* Contact card */
        .pp-contact { background:#1c1c1a; border-radius:20px; padding:36px 40px; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:24px; }
        @media(max-width:640px){ .pp-contact { padding:28px 24px; } }
        .pp-contact-title { font-family:'Playfair Display',Georgia,serif; font-size:1.5rem; font-weight:700; color:#fff; margin-bottom:6px; }
        .pp-contact-sub { font-size:13px; color:rgba(255,255,255,.45); line-height:1.7; }
        .pp-contact-links { display:flex; flex-direction:column; gap:10px; }
        .pp-contact-link { display:flex; align-items:center; gap:10px; font-size:13.5px; font-weight:500; color:rgba(255,255,255,.8); text-decoration:none; }
        .pp-contact-link:hover { color:#4ade80; }
        .pp-contact-link-icon { width:32px; height:32px; border-radius:50%; background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1); display:flex; align-items:center; justify-content:center; font-size:13px; flex-shrink:0; }
      `}</style>

      <div className="pp-page">

        {/* ── Hero ── */}
        <div className="pp-hero">
          <div className="pp-hero-blob-a" />
          <div className="pp-hero-blob-b" />
          <div className="pp-hero-grid" />
          <div className="pp-hero-inner">
            <div className="pp-hero-label">
              <span className="pp-hero-label-line" />
              <span className="pp-hero-label-text">Privacy Policy</span>
              <span className="pp-hero-label-line" />
            </div>
            <h1 className="pp-hero-title">
              Your Privacy Matters —{' '}
              <span className="pp-hero-accent">Travel Bangladesh with Confidence</span>
            </h1>
            <p className="pp-hero-desc">
              At{' '}
              <a href="https://www.bangladeshwithnaim.com" target="_blank" rel="noopener noreferrer">
                Bangladesh with Naim
              </a>
              , trust is an important part of every journey. Your personal information is handled with care, respect, and responsibility.
            </p>
            <div className="pp-hero-badge">
              🔒 Your data is safe with us
            </div>
          </div>
          <div className="pp-hero-fade" />
        </div>

        {/* ── Body ── */}
        <div className="pp-body">

          {/* Intro card */}
          <div className="pp-intro">
            <p>
              This Privacy Policy explains how your information is collected, used, and protected when you interact with{' '}
              <a href="https://www.bangladeshwithnaim.com" target="_blank" rel="noopener noreferrer">Bangladesh with Naim</a>.
            </p>
            <p>
              By using our website or booking a tour, you agree to the practices outlined below.
            </p>
          </div>

          {/* Accordion sections */}
          <div className="pp-accordion">
            {sections.map((s, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className={`pp-acc-item ${isOpen ? 'open' : ''}`}>
                  <button className="pp-acc-btn" onClick={() => setOpen(isOpen ? null : i)}>
                    <div className="pp-acc-btn-left">
                      <div className="pp-acc-icon-wrap">{s.icon}</div>
                      <span className="pp-acc-title">{s.title}</span>
                    </div>
                    <div className="pp-acc-chevron">▼</div>
                  </button>
                  {isOpen && (
                    <div className="pp-acc-body">
                      {s.body && <p className="pp-acc-text">{s.body}</p>}
                      {s.list && (
                        <ul className="pp-acc-list">
                          {s.list.map((item, j) => <li key={j}>{item}</li>)}
                        </ul>
                      )}
                      {s.footer && <p className="pp-acc-footer">{s.footer}</p>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Travel with Trust */}
          <div style={{ background:'#EAF3DE', border:'1px solid #c6e4a8', borderRadius:20, padding:'28px 32px', marginBottom:32, textAlign:'center' }}>
            <div style={{ fontSize:28, marginBottom:12 }}>🤝</div>
            <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:'1.4rem', fontWeight:700, color:'#14532d', marginBottom:10 }}>
              Travel with Trust
            </h3>
            <p style={{ fontSize:14, color:'#3B6D11', lineHeight:1.85, maxWidth:520, margin:'0 auto' }}>
              At Bangladesh with Naim, privacy is treated with the same care and respect as every journey we create.
              Because meaningful travel begins with trust, transparency, and genuine human connection.
            </p>
          </div>

          {/* Contact card */}
          <div className="pp-contact">
            <div>
              <div className="pp-contact-title">Have a Privacy Question?</div>
              <div className="pp-contact-sub">Reach out directly — we're always here to help.</div>
            </div>
            <div className="pp-contact-links">
              <a href="mailto:info@bangladeshwithnaim.com" className="pp-contact-link">
                <div className="pp-contact-link-icon">✉️</div>
                info@bangladeshwithnaim.com
              </a>
              <a href="https://wa.me/8801602717233" target="_blank" rel="noopener noreferrer" className="pp-contact-link">
                <div className="pp-contact-link-icon">💬</div>
                WhatsApp: 01602717233
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}