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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .pp-page { font-family:'DM Sans',sans-serif; background:#f8f6f1; }

        /* ── Hero ── */
        .pp-hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #0d3320 0%, #14532d 50%, #1a6b3a 100%);
          padding: 80px 40px 96px;
          text-align: center;
        }
        @media(max-width:640px){ .pp-hero { padding: 60px 20px 80px; } }

        /* Decorative geometric shapes — NO blur */
        .pp-hero-shape-1 {
          position: absolute; top: -60px; left: -60px;
          width: 280px; height: 280px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.06);
          pointer-events: none;
        }
        .pp-hero-shape-2 {
          position: absolute; top: 20px; left: 20px;
          width: 160px; height: 160px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.04);
          pointer-events: none;
        }
        .pp-hero-shape-3 {
          position: absolute; bottom: -80px; right: -80px;
          width: 320px; height: 320px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.05);
          pointer-events: none;
        }
        .pp-hero-shape-4 {
          position: absolute; bottom: 20px; right: 20px;
          width: 180px; height: 180px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.04);
          pointer-events: none;
        }
        /* Grid pattern overlay */
        .pp-hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        /* Top accent bar */
        .pp-hero-accent-bar {
          position: absolute; top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #d97706 0%, #fbbf24 50%, #d97706 100%);
        }
        /* Corner decorations */
        .pp-hero-corner-tl {
          position: absolute; top: 24px; left: 24px;
          width: 40px; height: 40px; pointer-events: none;
          border-top: 2px solid rgba(217,119,6,0.5);
          border-left: 2px solid rgba(217,119,6,0.5);
        }
        .pp-hero-corner-tr {
          position: absolute; top: 24px; right: 24px;
          width: 40px; height: 40px; pointer-events: none;
          border-top: 2px solid rgba(217,119,6,0.5);
          border-right: 2px solid rgba(217,119,6,0.5);
        }
        .pp-hero-corner-bl {
          position: absolute; bottom: 24px; left: 24px;
          width: 40px; height: 40px; pointer-events: none;
          border-bottom: 2px solid rgba(217,119,6,0.5);
          border-left: 2px solid rgba(217,119,6,0.5);
        }
        .pp-hero-corner-br {
          position: absolute; bottom: 24px; right: 24px;
          width: 40px; height: 40px; pointer-events: none;
          border-bottom: 2px solid rgba(217,119,6,0.5);
          border-right: 2px solid rgba(217,119,6,0.5);
        }

        .pp-hero-inner { position: relative; z-index: 1; max-width: 780px; margin: 0 auto; }

        /* Shield icon */
        .pp-hero-icon-wrap {
          display: inline-flex; align-items: center; justify-content: center;
          width: 80px; height: 80px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 24px;
          margin-bottom: 24px;
          font-size: 36px;
        }

        .pp-hero-label {
          display: inline-flex; align-items: center; gap: 10px;
          margin-bottom: 20px;
        }
        .pp-hero-label-line { width: 32px; height: 1.5px; background: #d97706; }
        .pp-hero-label-text {
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: #d97706;
        }
        .pp-hero-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 900; color: #fff;
          line-height: 1.08; letter-spacing: -0.02em;
          margin-bottom: 20px;
        }
        .pp-hero-title-accent {
          background: linear-gradient(90deg, #86efac 0%, #fde68a 60%, #86efac 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: pp-shimmer 3s linear infinite;
          font-style: italic;
          display: block;
        }
        @keyframes pp-shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }

        .pp-hero-desc {
          font-size: clamp(14px, 2vw, 16px);
          color: rgba(255,255,255,0.65);
          line-height: 1.85; max-width: 600px; margin: 0 auto 32px;
        }
        .pp-hero-desc a { color: #fde68a; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }

        /* Stats bar inside hero */
        .pp-hero-stats {
          display: inline-flex; align-items: center; gap: 0;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px;
          padding: 16px 32px;
          margin-top: 8px;
        }
        .pp-hero-stat { padding: 0 24px; text-align: center; }
        .pp-hero-stat + .pp-hero-stat { border-left: 1px solid rgba(255,255,255,0.12); }
        .pp-hero-stat-val { font-size: 22px; font-weight: 800; color: #fff; line-height: 1; margin-bottom: 4px; }
        .pp-hero-stat-lbl { font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; }

        /* Sharp wave divider at bottom */
        .pp-hero-wave {
          position: absolute; bottom: -1px; left: 0; right: 0;
          pointer-events: none;
        }

        /* ── Body ── */
        .pp-body { max-width: 860px; margin: 0 auto; padding: 60px 32px 80px; }
        @media(max-width:640px){ .pp-body { padding: 40px 20px 64px; } }

        /* Intro card */
        .pp-intro {
          background: #fff;
          border: 1px solid #ede9e0;
          border-radius: 24px;
          padding: 32px 36px;
          margin-bottom: 40px;
          box-shadow: 0 4px 24px rgba(0,0,0,.05);
          position: relative;
          overflow: hidden;
        }
        .pp-intro::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #1a5c35, #d97706);
        }
        .pp-intro p { font-size: 15px; color: #555; line-height: 1.85; margin-bottom: 12px; }
        .pp-intro p:last-child { margin-bottom: 0; }
        .pp-intro a { color: #15803d; font-weight: 600; text-underline-offset: 3px; }

        /* Section heading */
        .pp-section-head {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 20px;
        }
        .pp-section-head-line {
          width: 28px; height: 2px;
          background: linear-gradient(90deg, #d97706, #fbbf24);
          border-radius: 1px;
          flex-shrink: 0;
        }
        .pp-section-head-text {
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.14em;
          color: #d97706;
        }

        /* Accordion */
        .pp-accordion { display: flex; flex-direction: column; gap: 10px; margin-bottom: 48px; }
        .pp-acc-item {
          background: #fff;
          border: 1px solid #ede9e0;
          border-radius: 20px;
          overflow: hidden;
          transition: border-color .2s, box-shadow .2s, transform .2s;
        }
        .pp-acc-item:hover { box-shadow: 0 8px 32px rgba(0,0,0,.07); transform: translateY(-1px); }
        .pp-acc-item.open {
          border-color: #b6dfa0;
          box-shadow: 0 8px 32px rgba(21,128,61,.08);
        }
        .pp-acc-btn {
          width: 100%; display: flex; align-items: center;
          justify-content: space-between; gap: 16px;
          padding: 20px 24px; background: none; border: none;
          cursor: pointer; font-family: 'DM Sans', sans-serif; text-align: left;
        }
        .pp-acc-btn-left { display: flex; align-items: center; gap: 14px; }
        .pp-acc-icon-wrap {
          width: 44px; height: 44px; border-radius: 14px;
          background: #f0f8f4;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
          transition: background .2s, transform .2s;
          border: 1px solid #e0f0e8;
        }
        .pp-acc-item.open .pp-acc-icon-wrap {
          background: #15803d;
          transform: scale(1.05);
          border-color: #15803d;
        }
        .pp-acc-title {
          font-size: 15.5px; font-weight: 700; color: #1c1a16; line-height: 1.3;
        }
        .pp-acc-chevron {
          width: 32px; height: 32px; border-radius: 50%;
          background: #f4f1eb;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; color: #aaa; flex-shrink: 0;
          transition: transform .3s cubic-bezier(.34,1.56,.64,1), background .2s, color .2s;
        }
        .pp-acc-item.open .pp-acc-chevron {
          transform: rotate(180deg);
          background: #d1fae5;
          color: #15803d;
        }
        .pp-acc-body { padding: 0 24px 24px 82px; }
        @media(max-width:480px){ .pp-acc-body { padding: 0 20px 20px; } }
        .pp-acc-text { font-size: 14px; color: #666; line-height: 1.85; white-space: pre-line; margin-bottom: 14px; }
        .pp-acc-list {
          list-style: none; padding: 0; margin: 0 0 14px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .pp-acc-list li {
          display: flex; align-items: flex-start; gap: 12px;
          font-size: 14px; color: #555; line-height: 1.7;
        }
        .pp-acc-list li::before {
          content: '';
          width: 6px; height: 6px; border-radius: 50%;
          background: #15803d; flex-shrink: 0; margin-top: 8px;
        }
        .pp-acc-footer {
          font-size: 13px; color: #888; line-height: 1.75;
          font-style: italic;
          background: #f8fbf9;
          border: 1px solid #d1fae5;
          border-radius: 10px;
          padding: 12px 16px;
          margin-top: 8px;
        }

        /* Trust card */
        .pp-trust {
          background: linear-gradient(135deg, #1a5c35 0%, #14532d 100%);
          border-radius: 24px;
          padding: 36px 40px;
          margin-bottom: 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .pp-trust::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .pp-trust-inner { position: relative; z-index: 1; }
        .pp-trust-icon {
          width: 64px; height: 64px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          font-size: 28px;
          margin: 0 auto 16px;
        }
        .pp-trust h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.6rem; font-weight: 700; color: #fff; margin-bottom: 12px;
        }
        .pp-trust p { font-size: 14.5px; color: rgba(255,255,255,.65); line-height: 1.85; max-width: 500px; margin: 0 auto; }

        /* Contact card */
        .pp-contact {
          background: #fff;
          border-radius: 24px;
          border: 1px solid #ede9e0;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,.05);
        }
        .pp-contact-head {
          background: #1c1a1a;
          padding: 20px 32px;
          display: flex; align-items: center; gap: 12px;
        }
        .pp-contact-head h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 18px; font-weight: 700; color: #fff;
        }
        .pp-contact-head p { font-size: 13px; color: rgba(255,255,255,.4); margin-top: 2px; }
        .pp-contact-body {
          padding: 24px 32px;
          display: flex; flex-wrap: wrap; gap: 14px;
        }
        .pp-contact-link {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 20px;
          border-radius: 14px;
          background: #f8f6f1;
          border: 1px solid #ede9e0;
          text-decoration: none;
          transition: all .2s;
          flex: 1; min-width: 220px;
        }
        .pp-contact-link:hover {
          background: #edf7f1;
          border-color: #b6dfa0;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(21,128,61,.1);
        }
        .pp-contact-link-icon {
          width: 40px; height: 40px; border-radius: 12px;
          background: #1a5c35;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0;
        }
        .pp-contact-link-text { font-size: 13.5px; font-weight: 600; color: #1c1a16; }
        .pp-contact-link-sub { font-size: 11.5px; color: #9a9280; margin-top: 1px; }

        /* Badge */
        .pp-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 99px;
          padding: 8px 20px;
          font-size: 12px; font-weight: 700;
          color: #4ade80;
          margin-top: 24px;
        }
        .pp-badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #4ade80;
          animation: pp-pulse 2s ease-in-out infinite;
        }
        @keyframes pp-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.85)} }
      `}</style>

      <div className="pp-page">

        {/* ── Hero ── */}
        <div className="pp-hero">
          {/* Decorative elements — no blur */}
          <div className="pp-hero-accent-bar" />
          <div className="pp-hero-shape-1" />
          <div className="pp-hero-shape-2" />
          <div className="pp-hero-shape-3" />
          <div className="pp-hero-shape-4" />
          <div className="pp-hero-grid" />
          <div className="pp-hero-corner-tl" />
          <div className="pp-hero-corner-tr" />
          <div className="pp-hero-corner-bl" />
          <div className="pp-hero-corner-br" />

          <div className="pp-hero-inner">
            {/* Icon */}
            <div className="pp-hero-icon-wrap">🔐</div>

            {/* Label */}
            <div className="pp-hero-label">
              <span className="pp-hero-label-line" />
              <span className="pp-hero-label-text">Privacy Policy</span>
              <span className="pp-hero-label-line" />
            </div>

            <h1 className="pp-hero-title">
              Your Privacy Matters
              <span className="pp-hero-title-accent">Travel with Full Confidence</span>
            </h1>

            <p className="pp-hero-desc">
              At{' '}
              <a href="https://www.bangladeshwithnaim.com" target="_blank" rel="noopener noreferrer">
                Bangladesh with Naim
              </a>
              , trust is the foundation of every journey. Your personal information is handled with care, respect, and complete responsibility.
            </p>

            {/* Stats */}
            <div className="pp-hero-stats">
              <div className="pp-hero-stat">
                <div className="pp-hero-stat-val">100%</div>
                <div className="pp-hero-stat-lbl">Secure</div>
              </div>
              <div className="pp-hero-stat">
                <div className="pp-hero-stat-val">0</div>
                <div className="pp-hero-stat-lbl">Data Sold</div>
              </div>
              <div className="pp-hero-stat">
                <div className="pp-hero-stat-val">24/7</div>
                <div className="pp-hero-stat-lbl">Protected</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="pp-badge">
                <span className="pp-badge-dot" />
                Your data is safe with us
              </div>
            </div>
          </div>

          {/* Sharp wave SVG divider — NO blur */}
          <svg className="pp-hero-wave" viewBox="0 0 1440 56" preserveAspectRatio="none" style={{ height: 56 }}>
            <path d="M0,56 L0,28 Q180,0 360,20 Q540,40 720,16 Q900,-8 1080,18 Q1260,44 1440,22 L1440,56 Z" fill="#f8f6f1" />
          </svg>
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
              By using our website or booking a tour, you agree to the practices outlined below. We recommend reading through each section to fully understand how we keep your data safe.
            </p>
          </div>

          {/* Section label */}
          <div className="pp-section-head">
            <span className="pp-section-head-line" />
            <span className="pp-section-head-text">Policy Sections</span>
            <span className="pp-section-head-line" />
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
                      {s.footer && <p className="pp-acc-footer">💡 {s.footer}</p>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Trust card */}
          <div className="pp-trust">
            <div className="pp-trust-inner">
              <div className="pp-trust-icon">🤝</div>
              <h3>Travel with Trust</h3>
              <p>
                At Bangladesh with Naim, privacy is treated with the same care and respect as every journey we create.
                Because meaningful travel begins with trust, transparency, and genuine human connection.
              </p>
            </div>
          </div>

          {/* Contact card */}
          <div className="pp-contact">
            <div className="pp-contact-head">
              <div>
                <h3>Have a Privacy Question?</h3>
                <p>Reach out directly — we're always here to help.</p>
              </div>
            </div>
            <div className="pp-contact-body">
              <a href="mailto:info@bangladeshwithnaim.com" className="pp-contact-link">
                <div className="pp-contact-link-icon">✉️</div>
                <div>
                  <div className="pp-contact-link-text">info@bangladeshwithnaim.com</div>
                  <div className="pp-contact-link-sub">Email us anytime</div>
                </div>
              </a>
              <a href="https://wa.me/8801602717233" target="_blank" rel="noopener noreferrer" className="pp-contact-link">
                <div className="pp-contact-link-icon">💬</div>
                <div>
                  <div className="pp-contact-link-text">WhatsApp: 01602717233</div>
                  <div className="pp-contact-link-sub">Fastest response</div>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}