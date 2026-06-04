"use client";

import React, { useState } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '', mobile: '', email: '', country: '',
    tour: '', date: '', subject: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [openPolicy, setOpenPolicy] = useState(null);

  const handle = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const submit  = (e) => { e.preventDefault(); setSubmitted(true); };

  const policies = [
    {
      icon: '🌿',
      title: 'Refund Policy – Fair, Transparent & Travel-Friendly',
      body: `In Bangladesh with Naim, every trip is thoughtfully planned with care, time, and personal attention. Once your booking is confirmed, we begin preparing your journey — arranging guides, transport, stays, and local experiences to ensure everything runs smoothly.\n\nWe understand that plans can change. That's why our refund policy is designed to be fair and transparent, balancing flexibility for travelers while respecting the effort already invested in creating your experience. Refunds depend on the timing of cancellation and the level of arrangements completed.\n\nIf you ever need to make changes or cancel your trip, simply reach out — we're always here to help and find the best possible solution for you.`,
    },
    {
      icon: '🌿',
      title: 'Cancellation Policy – Flexible Changes, Fair Travel Terms',
      body: `We know that travel plans can shift. Our cancellation policy is designed to give you flexibility while ensuring that local partners, guides, and arrangements are respected. Cancellations made well in advance carry minimal or no charges. Short-notice cancellations may incur partial fees depending on commitments already made on your behalf. We always aim to find the fairest solution for every traveler.`,
    },
    {
      icon: '🌿',
      title: 'Responsible Travel – Explore Bangladesh with Respect, Care & Purpose',
      body: `We believe travel should leave a positive impact — on local communities, cultures, and environments. Every journey with Bangladesh with Naim is designed to respect local traditions, support local businesses, minimize environmental impact, and create meaningful connections between travelers and the people of Bangladesh. We ask all our guests to travel with curiosity, openness, and respect.`,
    },
    {
      icon: '🌿',
      title: 'Terms & Conditions – Clear Journeys, Honest Agreements, Smooth Travel',
      body: `Our terms and conditions are written to be clear, honest, and easy to understand. They cover booking confirmations, payment schedules, tour inclusions and exclusions, liability, personal responsibility, and what to expect throughout your journey. We believe in full transparency so there are never any surprises — just a smooth, well-organized travel experience from start to finish.`,
    },
  ];

  const faqs = [
    {
      q: 'How do I book a private tour with Bangladesh with Naim?',
      a: 'Simply reach out via the contact form on this page, WhatsApp, or email. Share your travel dates, group size, and interests — and we will create a personalized itinerary just for you.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept bank transfers, mobile banking (bKash, Nagad), and international payment methods. A deposit is required to confirm your booking, with the remainder due closer to your departure date.',
    },
    {
      q: 'Can I customize my tour itinerary?',
      a: 'Absolutely. Every journey is fully personalized. You choose the destinations, pace, accommodation style, and activities. We handle all the planning, logistics, and on-ground arrangements.',
    },
    {
      q: 'Is Bangladesh safe for international travelers?',
      a: 'Yes. Bangladesh is considerably safer for tourists than headlines often suggest. Naim personally accompanies every trip, ensuring your safety, comfort, and peace of mind throughout the journey.',
    },
    {
      q: 'What is the best time to visit Bangladesh?',
      a: 'November through March is the ideal travel window — mild temperatures, clear skies, and lush landscapes after the monsoon. This is also the best period for Sundarbans visits and river journeys.',
    },
    {
      q: 'Do I need a visa to visit Bangladesh?',
      a: "Most nationalities can obtain a visa on arrival at Dhaka's Hazrat Shahjalal International Airport. We recommend checking with the Bangladesh Embassy in your country for the latest requirements.",
    },
    {
      q: 'How far in advance should I book?',
      a: 'We recommend booking at least 2–4 weeks in advance, especially for Sundarbans tours which require forest entry permits. For peak season (December–February), earlier booking is advisable.',
    },
    {
      q: 'What is included in a typical private tour package?',
      a: 'Packages typically include private guided services, accommodation, local transport, select meals, and entry fees. Each package is customized, so inclusions vary — we provide a full breakdown before booking.',
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .ct-page { font-family: 'DM Sans', sans-serif; background: #f8f6f1; }

        /* ══════════════════════════════════
           HERO — reference design
           Deep green · no blur · corner brackets
           icon box · eyebrow · title + italic subtitle
           stats bar · safe pill · wave
        ══════════════════════════════════ */
        .ct-hero {
          position: relative;
          background: #0f3d22;
          overflow: hidden;
          padding: 88px 40px 0;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        @media(max-width:640px){ .ct-hero { padding: 70px 20px 0; } }

        /* faint radial circle decorations */
        .ct-hero::before {
          content: '';
          position: absolute; top: -100px; left: -100px;
          width: 400px; height: 400px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.05);
          pointer-events: none;
        }
        .ct-hero::after {
          content: '';
          position: absolute; bottom: 80px; right: -80px;
          width: 300px; height: 300px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.04);
          pointer-events: none;
        }

        /* corner brackets */
        .ct-corner { position: absolute; width: 34px; height: 34px; pointer-events: none; }
        .ct-corner-tl { top: 22px; left: 22px; border-top: 2px solid rgba(255,255,255,0.18); border-left: 2px solid rgba(255,255,255,0.18); }
        .ct-corner-tr { top: 22px; right: 22px; border-top: 2px solid rgba(255,255,255,0.18); border-right: 2px solid rgba(255,255,255,0.18); }
        .ct-corner-bl { bottom: 90px; left: 22px; border-bottom: 2px solid rgba(255,255,255,0.18); border-left: 2px solid rgba(255,255,255,0.18); }
        .ct-corner-br { bottom: 90px; right: 22px; border-bottom: 2px solid rgba(255,255,255,0.18); border-right: 2px solid rgba(255,255,255,0.18); }

        /* icon box */
        .ct-hero-icon {
          width: 80px; height: 80px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 22px;
          display: flex; align-items: center; justify-content: center;
          font-size: 36px;
          margin-bottom: 26px;
          position: relative; z-index: 2;
        }

        /* eyebrow with amber side lines */
        .ct-hero-eyebrow {
          display: flex; align-items: center; gap: 14px;
          justify-content: center;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #c8a84b;
          margin-bottom: 24px;
          position: relative; z-index: 2;
        }
        .ct-hero-eyebrow::before,
        .ct-hero-eyebrow::after {
          content: '';
          width: 52px; height: 1px;
          background: linear-gradient(to right, transparent, #c8a84b);
        }
        .ct-hero-eyebrow::after {
          background: linear-gradient(to left, transparent, #c8a84b);
        }

        /* main title */
        .ct-hero-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.4rem, 5.5vw, 4.6rem);
          font-weight: 900; color: #fff;
          line-height: 1.06; letter-spacing: -0.02em;
          margin-bottom: 10px;
          position: relative; z-index: 2;
        }

        /* italic green subtitle */
        .ct-hero-subtitle {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.8rem, 4vw, 3.6rem);
          font-weight: 700; font-style: italic;
          color: #6fcf47;
          line-height: 1.1;
          margin-bottom: 24px;
          position: relative; z-index: 2;
        }

        /* description */
        .ct-hero-desc {
          font-size: clamp(14px, 2vw, 15.5px);
          color: rgba(255,255,255,0.65);
          line-height: 1.85; max-width: 600px;
          margin: 0 auto 36px;
          position: relative; z-index: 2;
        }
        .ct-hero-desc a { color: #fde68a; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
        .ct-hero-desc a:hover { color: #fbbf24; }

        /* stats box */
        .ct-hero-stats {
          display: flex; align-items: stretch;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 18px;
          overflow: hidden;
          max-width: 460px; width: 100%;
          margin: 0 auto 28px;
          position: relative; z-index: 2;
        }
        .ct-hero-stat { flex: 1; padding: 20px 20px; text-align: center; }
        .ct-hero-stat + .ct-hero-stat { border-left: 1px solid rgba(255,255,255,0.10); }
        .ct-hero-stat-val {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.85rem; font-weight: 700; color: #fff;
          line-height: 1; margin-bottom: 6px;
        }
        .ct-hero-stat-lbl {
          font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.16em;
          color: rgba(255,255,255,0.42);
        }

        /* safe pill */
        .ct-safe-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 100px; padding: 10px 22px;
          font-size: 13px; font-weight: 600; color: #fff;
          margin-bottom: 52px;
          position: relative; z-index: 2;
        }
        .ct-safe-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #6fcf47; flex-shrink: 0;
          animation: ct-safe-pulse 2.4s ease-in-out infinite;
        }
        @keyframes ct-safe-pulse {
          0%,100%{ box-shadow: 0 0 0 0 rgba(111,207,71,0.4); }
          50%{ box-shadow: 0 0 0 6px rgba(111,207,71,0); }
        }

        /* wave bottom */
        .ct-hero-wave {
          position: relative; bottom: -1px;
          width: 100%; line-height: 0; z-index: 3;
        }
        .ct-hero-wave svg { display: block; width: 100%; }

        /* ── Form section ── */
        .ct-wrap { padding: 56px 32px 80px; }
        @media(max-width:640px){ .ct-wrap { padding: 40px 20px 60px; } }
        .ct-inner { max-width: 1100px; margin: 0 auto; }

        .ct-grid { display:grid; grid-template-columns:1fr 1.55fr; border-radius:28px; overflow:hidden; box-shadow:0 24px 64px rgba(0,0,0,.10); }
        @media(max-width:900px){ .ct-grid { grid-template-columns:1fr; } }

        .ct-left { background:#1c1c1a; padding:52px 44px; display:flex; flex-direction:column; }
        @media(max-width:640px){ .ct-left { padding:40px 28px; } }
        .ct-left-title { font-family:'Cormorant Garamond',serif; font-size:2rem; font-weight:700; color:#fff; line-height:1.2; margin-bottom:8px; }
        .ct-left-title em { color:#d97706; font-style:italic; }
        .ct-left-sub { font-size:13px; color:rgba(255,255,255,.4); line-height:1.7; margin-bottom:40px; }
        .ct-info-label { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.13em; color:#d97706; margin-bottom:10px; }
        .ct-info-block { margin-bottom:30px; }
        .ct-info-item { display:flex; align-items:flex-start; gap:12px; margin-bottom:10px; }
        .ct-info-icon { width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:14px; }
        .ct-info-text { display:flex; flex-direction:column; gap:2px; }
        .ct-info-main { font-size:13px; font-weight:500; color:rgba(255,255,255,.85); }
        .ct-info-hint { font-size:11px; color:rgba(255,255,255,.35); }
        .ct-divider { height:1px; background:rgba(255,255,255,.08); margin:24px 0; }
        .ct-hours-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
        .ct-hours-key { font-size:12px; color:rgba(255,255,255,.45); }
        .ct-hours-val { font-size:12px; font-weight:600; color:rgba(255,255,255,.8); }
        .ct-online-pill { display:inline-flex; align-items:center; gap:7px; background:rgba(21,128,61,.15); border:1px solid rgba(21,128,61,.3); border-radius:99px; padding:7px 16px; font-size:11px; font-weight:600; color:#4ade80; margin-top:28px; width:fit-content; }
        .ct-pulse { width:6px; height:6px; border-radius:50%; background:#4ade80; animation:ct-pulse 2s ease-in-out infinite; }
        @keyframes ct-pulse { 0%,100%{opacity:1} 50%{opacity:.3} }

        .ct-right { background:#fff; padding:52px 48px; }
        @media(max-width:640px){ .ct-right { padding:40px 28px; } }
        .ct-form-title { font-family:'Cormorant Garamond',serif; font-size:1.75rem; font-weight:700; color:#1c1c1a; margin-bottom:5px; }
        .ct-form-sub { font-size:13px; color:#aaa; margin-bottom:32px; }
        .ct-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px; }
        @media(max-width:640px){ .ct-row { grid-template-columns:1fr; } }
        .ct-group { display:flex; flex-direction:column; gap:6px; margin-bottom:14px; }
        .ct-label { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:#999; }
        .ct-label span { color:#d97706; }
        .ct-input { width:100%; padding:13px 16px; border:1.5px solid #ede9e0; border-radius:12px; font-size:14px; font-family:'DM Sans',sans-serif; color:#1c1c1a; background:#faf9f7; outline:none; transition:border-color .2s,background .2s; appearance:none; }
        .ct-input:focus { border-color:#15803d; background:#fff; }
        .ct-input::placeholder { color:#d0ccc4; }
        .ct-textarea { resize:vertical; min-height:118px; line-height:1.65; }
        .ct-select-wrap { position:relative; }
        .ct-select-wrap::after { content:'▾'; position:absolute; right:14px; top:50%; transform:translateY(-50%); font-size:11px; color:#aaa; pointer-events:none; }
        .ct-submit-row { display:flex; gap:12px; margin-top:6px; }
        .ct-submit-btn { flex:1; padding:15px; border-radius:14px; background:#1c1c1a; border:none; color:#fff; font-size:15px; font-weight:600; font-family:'DM Sans',sans-serif; cursor:pointer; transition:background .2s,transform .15s,box-shadow .2s; letter-spacing:.02em; }
        .ct-submit-btn:hover { background:#15803d; transform:translateY(-2px); box-shadow:0 10px 28px rgba(21,128,61,.28); }
        .ct-wa-btn { display:flex; align-items:center; justify-content:center; gap:8px; padding:15px 22px; border-radius:14px; background:#25D366; border:none; color:#fff; font-size:14px; font-weight:600; font-family:'DM Sans',sans-serif; cursor:pointer; transition:background .2s,transform .15s; text-decoration:none; white-space:nowrap; }
        .ct-wa-btn:hover { background:#1aab53; transform:translateY(-2px); }
        .ct-privacy { font-size:11px; color:#ccc; margin-top:14px; line-height:1.65; text-align:center; }
        .ct-success { text-align:center; padding:48px 24px; }
        .ct-success-icon { font-size:48px; margin-bottom:16px; }
        .ct-success-title { font-family:'Cormorant Garamond',serif; font-size:2rem; font-weight:700; color:#1c1c1a; margin-bottom:8px; }
        .ct-success-msg { font-size:14px; color:#888; line-height:1.75; }

        /* ── Policy accordion ── */
        .ct-section { max-width:1100px; margin:0 auto; padding:0 32px 0; }
        @media(max-width:640px){ .ct-section { padding:0 20px; } }
        .ct-section-label { display:inline-flex; align-items:center; gap:10px; margin-bottom:12px; }
        .ct-section-label-line { width:24px; height:1px; background:#d97706; }
        .ct-section-label-text { font-size:11px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#d97706; }
        .ct-section-title { font-family:'Playfair Display',Georgia,serif; font-size:clamp(1.6rem,3vw,2.4rem); font-weight:900; color:#1c1c1a; margin-bottom:8px; line-height:1.15; }
        .ct-section-desc { font-size:14px; color:#888; line-height:1.8; max-width:640px; margin-bottom:32px; }
        .ct-accordion { display:flex; flex-direction:column; gap:10px; margin-bottom:64px; }
        .ct-acc-item { background:#fff; border:1px solid #ede9e0; border-radius:16px; overflow:hidden; transition:box-shadow .2s; }
        .ct-acc-item:hover { box-shadow:0 4px 20px rgba(0,0,0,.06); }
        .ct-acc-btn { width:100%; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:20px 24px; background:none; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; text-align:left; }
        .ct-acc-btn-title { display:flex; align-items:center; gap:12px; font-size:14.5px; font-weight:600; color:#1c1c1a; line-height:1.4; }
        .ct-acc-icon { font-size:18px; flex-shrink:0; }
        .ct-acc-chevron { font-size:12px; color:#bbb; flex-shrink:0; transition:transform .25s; }
        .ct-acc-chevron.open { transform:rotate(180deg); }
        .ct-acc-body { padding:0 24px 22px 56px; font-size:13.5px; color:#666; line-height:1.85; white-space:pre-line; }

        /* ── FAQ ── */
        .ct-faq-intro { font-size:14px; color:#888; line-height:1.8; max-width:660px; margin-bottom:32px; }
        .ct-faq-item { background:#fff; border:1px solid #ede9e0; border-radius:16px; overflow:hidden; margin-bottom:10px; transition:box-shadow .2s; }
        .ct-faq-item:hover { box-shadow:0 4px 20px rgba(0,0,0,.06); }
        .ct-faq-btn { width:100%; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:18px 22px; background:none; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; text-align:left; }
        .ct-faq-q { font-size:14px; font-weight:600; color:#1c1c1a; line-height:1.4; }
        .ct-faq-chevron { font-size:12px; color:#bbb; flex-shrink:0; transition:transform .25s; }
        .ct-faq-chevron.open { transform:rotate(180deg); }
        .ct-faq-a { padding:0 22px 18px; font-size:13.5px; color:#666; line-height:1.8; }

        .ct-section-gap { height: 64px; }
        .ct-bottom-gap { height: 80px; }
      `}</style>

      <div className="ct-page">

        {/* ══════════════ HERO ══════════════ */}
        <div className="ct-hero">

          {/* corner brackets */}
          <div className="ct-corner ct-corner-tl" />
          <div className="ct-corner ct-corner-tr" />
          <div className="ct-corner ct-corner-bl" />
          <div className="ct-corner ct-corner-br" />

          {/* icon box */}
          <div className="ct-hero-icon">✉️</div>

          {/* eyebrow */}
          <div className="ct-hero-eyebrow">Get in Touch</div>

          {/* title */}
          <h1 className="ct-hero-title">Let's Plan Your</h1>

          {/* italic green subtitle */}
          <div className="ct-hero-subtitle">Bangladesh Journey</div>

          {/* description */}
          <p className="ct-hero-desc">
            Have questions, travel ideas, or ready to explore Bangladesh? Get in touch with{' '}
            <a href="https://www.bangladeshwithnaim.com" target="_blank" rel="noopener noreferrer">
              Bangladesh with Naim
            </a>{' '}
            to start planning your authentic travel experience. Every journey is personally
            arranged with care, local knowledge, and genuine hospitality.
          </p>

          {/* stats box */}
          <div className="ct-hero-stats">
            <div className="ct-hero-stat">
              <div className="ct-hero-stat-val">24h</div>
              <div className="ct-hero-stat-lbl">Response</div>
            </div>
            <div className="ct-hero-stat">
              <div className="ct-hero-stat-val">100%</div>
              <div className="ct-hero-stat-lbl">Personal</div>
            </div>
            <div className="ct-hero-stat">
              <div className="ct-hero-stat-val">Free</div>
              <div className="ct-hero-stat-lbl">Consultation</div>
            </div>
          </div>

          {/* safe pill */}
          <div className="ct-safe-pill">
            <span className="ct-safe-dot" />
            We respond within 24 hours
          </div>

          {/* wave */}
          <div className="ct-hero-wave">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#f8f6f1"/>
            </svg>
          </div>
        </div>

        {/* ══════════════ CONTACT FORM ══════════════ */}
        <div className="ct-wrap">
          <div className="ct-inner">
            <div className="ct-grid">

              {/* LEFT */}
              <div className="ct-left">
                <div className="ct-left-title">We're here<br /><em>to help</em></div>
                <p className="ct-left-sub">We respond promptly and clearly, so you always know your next step.</p>
                <div className="ct-info-block">
                  <div className="ct-info-label">WhatsApp</div>
                  <div className="ct-info-item">
                    <div className="ct-info-icon">💬</div>
                    <div className="ct-info-text">
                      <span className="ct-info-main">+880160-2717233</span>
                      <span className="ct-info-hint">Fastest response · on-tour support</span>
                    </div>
                  </div>
                </div>
                <div className="ct-info-block">
                  <div className="ct-info-label">Email</div>
                  <div className="ct-info-item">
                    <div className="ct-info-icon">✉️</div>
                    <div className="ct-info-text">
                      <span className="ct-info-main">info@bangladeshwithnaim.com</span>
                      <span className="ct-info-hint">Bookings & payment confirmations</span>
                    </div>
                  </div>
                </div>
                <div className="ct-info-block">
                  <div className="ct-info-label">Corporate Office</div>
                  <div className="ct-info-item">
                    <div className="ct-info-icon">📍</div>
                    <div className="ct-info-text">
                      <span className="ct-info-main">Uttara, Sector-09, House-2, Road-7/A</span>
                      <span className="ct-info-hint">Dhaka, 1230, Bangladesh</span>
                    </div>
                  </div>
                </div>
                <div className="ct-divider" />
                <div className="ct-info-label">Office Hours</div>
                <div className="ct-hours-row"><span className="ct-hours-key">Daily response</span><span className="ct-hours-val">09:00 – 19:00</span></div>
                <div className="ct-hours-row"><span className="ct-hours-key">Timezone</span><span className="ct-hours-val">BST (UTC+6)</span></div>
                <div className="ct-hours-row"><span className="ct-hours-key">Response time</span><span className="ct-hours-val">Within 24 hrs</span></div>
                <div className="ct-online-pill"><span className="ct-pulse" />Currently online & accepting enquiries</div>
              </div>

              {/* RIGHT */}
              <div className="ct-right">
                {submitted ? (
                  <div className="ct-success">
                    <div className="ct-success-icon">✅</div>
                    <div className="ct-success-title">Message Sent!</div>
                    <p className="ct-success-msg">Thank you for reaching out. Our team will get back to you within 24 hours.<br />For urgent matters, WhatsApp us directly.</p>
                  </div>
                ) : (
                  <>
                    <div className="ct-form-title">Send me a message</div>
                    <p className="ct-form-sub">Fill in the details below and we'll get back to you within 24 hours.</p>
                    <form onSubmit={submit}>
                      <div className="ct-row">
                        <div className="ct-group"><label className="ct-label">Full Name <span>*</span></label><input className="ct-input" type="text" name="name" placeholder="Your Full Name" value={form.name} onChange={handle} required /></div>
                        <div className="ct-group"><label className="ct-label">Mobile <span>*</span></label><input className="ct-input" type="tel" name="mobile" placeholder="+880160-2717233" value={form.mobile} onChange={handle} required /></div>
                      </div>
                      <div className="ct-row">
                        <div className="ct-group"><label className="ct-label">Email <span>*</span></label><input className="ct-input" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handle} required /></div>
                        <div className="ct-group"><label className="ct-label">Country <span>*</span></label><input className="ct-input" type="text" name="country" placeholder="According to Passport" value={form.country} onChange={handle} required /></div>
                      </div>
                      <div className="ct-row">
                        <div className="ct-group">
                          <label className="ct-label">Tour Interest</label>
                          <div className="ct-select-wrap">
                            <select className="ct-input" name="tour" value={form.tour} onChange={handle}>
                              <option value="">Select a tour...</option>
                              <option>Sundarbans Wildlife Safari</option>
                              <option>Sylhet Tea Gardens & Waterfalls</option>
                              <option>Old Dhaka Heritage Walk</option>
                              <option>Custom Private Tour</option>
                            </select>
                          </div>
                        </div>
                        <div className="ct-group"><label className="ct-label">Preferred Date</label><input className="ct-input" type="date" name="date" value={form.date} onChange={handle} /></div>
                      </div>
                      <div className="ct-group"><label className="ct-label">Subject <span>*</span></label><input className="ct-input" type="text" name="subject" placeholder="Topic of your enquiry" value={form.subject} onChange={handle} required /></div>
                      <div className="ct-group"><label className="ct-label">Message</label><textarea className="ct-input ct-textarea" name="message" placeholder="Tell us about your travel plans, group size, special requests..." value={form.message} onChange={handle} /></div>
                      <div className="ct-submit-row">
                        <button type="submit" className="ct-submit-btn">Send Enquiry</button>
                        <a href="https://wa.me/8801602717233" target="_blank" rel="noopener noreferrer" className="ct-wa-btn">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          WhatsApp
                        </a>
                      </div>
                      <p className="ct-privacy">🔒 Your information is kept private and never shared. We respond within 24 hours.</p>
                    </form>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* ══════════════ POLICIES ══════════════ */}
        <div className="ct-section">
          <div className="ct-section-gap" />
          <div className="ct-section-label">
            <span className="ct-section-label-line" />
            <span className="ct-section-label-text">Policies</span>
            <span className="ct-section-label-line" />
          </div>
          <h2 className="ct-section-title">Travel Policies & Guidelines</h2>
          <p className="ct-section-desc">Everything you need to know before and during your journey — clear, honest, and traveler-friendly.</p>

          <div className="ct-accordion">
            {policies.map((p, i) => (
              <div key={i} className="ct-acc-item">
                <button className="ct-acc-btn" onClick={() => setOpenPolicy(openPolicy === i ? null : i)}>
                  <span className="ct-acc-btn-title">
                    <span className="ct-acc-icon">{p.icon}</span>
                    {p.title}
                  </span>
                  <span className={`ct-acc-chevron ${openPolicy === i ? 'open' : ''}`}>▼</span>
                </button>
                {openPolicy === i && (
                  <div className="ct-acc-body">{p.body}</div>
                )}
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="ct-section-label">
            <span className="ct-section-label-line" />
            <span className="ct-section-label-text">FAQs</span>
            <span className="ct-section-label-line" />
          </div>
          <h2 className="ct-section-title">Everything You Need to Know Before You Travel</h2>
          <p className="ct-faq-intro">
            Quick answers to the most common questions about traveling with Bangladesh with Naim — from booking and payment to safety, customization, and on-trip support. If you don't find what you're looking for, feel free to reach out directly. We're always here to help.
          </p>

          {faqs.map((f, i) => (
            <div key={i} className="ct-faq-item">
              <button className="ct-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="ct-faq-q">{f.q}</span>
                <span className={`ct-faq-chevron ${openFaq === i ? 'open' : ''}`}>▼</span>
              </button>
              {openFaq === i && <div className="ct-faq-a">{f.a}</div>}
            </div>
          ))}

          <div className="ct-bottom-gap" />
        </div>

      </div>
    </>
  );
}