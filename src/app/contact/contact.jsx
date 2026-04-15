"use client";

import React, { useState } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '', mobile: '', email: '', country: '',
    tour: '', date: '', subject: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .ct-wrap { font-family: 'DM Sans', sans-serif; background: #f8f6f1; padding: 72px 32px 80px; }
        @media(max-width:640px){ .ct-wrap { padding: 48px 20px 64px; } }
        .ct-inner { max-width: 1100px; margin: 0 auto; }
        .ct-eyebrow { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .16em; color: #d97706; margin-bottom: 10px; }
        .ct-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 700; color: #1c1c1a; line-height: 1.05; margin-bottom: 14px; }
        .ct-title em { color: #15803d; font-style: italic; }
        .ct-subtitle { font-size: 15px; color: #777; line-height: 1.75; max-width: 540px; margin-bottom: 56px; }

        .ct-grid { display: grid; grid-template-columns: 1fr 1.55fr; border-radius: 28px; overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.10); }
        @media(max-width:900px){ .ct-grid { grid-template-columns: 1fr; } }

        /* LEFT */
        .ct-left { background: #1c1c1a; padding: 52px 44px; display: flex; flex-direction: column; }
        @media(max-width:640px){ .ct-left { padding: 40px 28px; } }
        .ct-left-title { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 8px; }
        .ct-left-title em { color: #d97706; font-style: italic; }
        .ct-left-sub { font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.7; margin-bottom: 40px; }
        .ct-info-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .13em; color: #d97706; margin-bottom: 10px; }
        .ct-info-block { margin-bottom: 30px; }
        .ct-info-item { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 10px; }
        .ct-info-icon { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; }
        .ct-info-text { display: flex; flex-direction: column; gap: 2px; }
        .ct-info-main { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.85); }
        .ct-info-hint { font-size: 11px; color: rgba(255,255,255,0.35); }
        .ct-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 24px 0; }
        .ct-hours-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .ct-hours-key { font-size: 12px; color: rgba(255,255,255,0.45); }
        .ct-hours-val { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.8); }
        .ct-online-pill { display: inline-flex; align-items: center; gap: 7px; background: rgba(21,128,61,0.15); border: 1px solid rgba(21,128,61,0.3); border-radius: 99px; padding: 7px 16px; font-size: 11px; font-weight: 600; color: #4ade80; margin-top: 28px; width: fit-content; }
        .ct-pulse { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; animation: ct-pulse 2s ease-in-out infinite; }
        @keyframes ct-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        /* RIGHT */
        .ct-right { background: #fff; padding: 52px 48px; }
        @media(max-width:640px){ .ct-right { padding: 40px 28px; } }
        .ct-form-title { font-family: 'Cormorant Garamond', serif; font-size: 1.75rem; font-weight: 700; color: #1c1c1a; margin-bottom: 5px; }
        .ct-form-sub { font-size: 13px; color: #aaa; margin-bottom: 32px; }
        .ct-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
        @media(max-width:640px){ .ct-row { grid-template-columns: 1fr; } }
        .ct-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
        .ct-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: #999; }
        .ct-label span { color: #d97706; }
        .ct-input { width: 100%; padding: 13px 16px; border: 1.5px solid #ede9e0; border-radius: 12px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #1c1c1a; background: #faf9f7; outline: none; transition: border-color .2s, background .2s; appearance: none; }
        .ct-input:focus { border-color: #15803d; background: #fff; }
        .ct-input::placeholder { color: #d0ccc4; }
        .ct-textarea { resize: vertical; min-height: 118px; line-height: 1.65; }
        .ct-select-wrap { position: relative; }
        .ct-select-wrap::after { content: '▾'; position: absolute; right: 14px; top: 50%; transform: translateY(-50%); font-size: 11px; color: #aaa; pointer-events: none; }
        .ct-submit-row { display: flex; gap: 12px; margin-top: 6px; }
        .ct-submit-btn { flex: 1; padding: 15px; border-radius: 14px; background: #1c1c1a; border: none; color: #fff; font-size: 15px; font-weight: 600; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: background .2s, transform .15s, box-shadow .2s; letter-spacing: .02em; }
        .ct-submit-btn:hover { background: #15803d; transform: translateY(-2px); box-shadow: 0 10px 28px rgba(21,128,61,0.28); }
        .ct-wa-btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 15px 22px; border-radius: 14px; background: #25D366; border: none; color: #fff; font-size: 14px; font-weight: 600; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: background .2s, transform .15s; text-decoration: none; white-space: nowrap; }
        .ct-wa-btn:hover { background: #1aab53; transform: translateY(-2px); }
        .ct-privacy { font-size: 11px; color: #ccc; margin-top: 14px; line-height: 1.65; text-align: center; }
        .ct-success { text-align: center; padding: 48px 24px; }
        .ct-success-icon { font-size: 48px; margin-bottom: 16px; }
        .ct-success-title { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 700; color: #1c1c1a; margin-bottom: 8px; }
        .ct-success-msg { font-size: 14px; color: #888; line-height: 1.75; }
      `}</style>

      <div className="ct-wrap">
        <div className="ct-inner">
          <div className="ct-eyebrow">Get in Touch</div>
          <h1 className="ct-title">Private Tour <em>Enquiries</em><br />& Support</h1>
          <p className="ct-subtitle">
            Whether you're planning your first visit to Bangladesh or finalising the details of your private tour, we'd love to hear from you. Share your ideas and we'll craft a journey that fits you perfectly.
          </p>

          <div className="ct-grid">

            {/* LEFT PANEL */}
            <div className="ct-left">
              <div className="ct-left-title">We're here<br /><em>to help</em></div>
              <p className="ct-left-sub">We respond promptly and clearly, so you always know your next step.</p>

              <div className="ct-info-block">
                <div className="ct-info-label">WhatsApp</div>
                <div className="ct-info-item">
                  <div className="ct-info-icon">💬</div>
                  <div className="ct-info-text">
                    <span className="ct-info-main">+880 1601-652669</span>
                    <span className="ct-info-hint">Fastest response · on-tour support</span>
                  </div>
                </div>
              </div>

              <div className="ct-info-block">
                <div className="ct-info-label">Email</div>
                <div className="ct-info-item">
                  <div className="ct-info-icon">✉️</div>
                  <div className="ct-info-text">
                    <span className="ct-info-main">info@bangladeshwithnayeem.com</span>
                    <span className="ct-info-hint">Bookings & payment confirmations</span>
                  </div>
                </div>
              </div>

              <div className="ct-info-block">
                <div className="ct-info-label">Corporate Office</div>
                <div className="ct-info-item">
                  <div className="ct-info-icon">📍</div>
                  <div className="ct-info-text">
                    <span className="ct-info-main">172, Sher-E-Bangla Road</span>
                    <span className="ct-info-hint">Khulna 9100, Bangladesh</span>
                  </div>
                </div>
              </div>

              <div className="ct-divider" />

              <div className="ct-info-label">Office Hours</div>
              <div className="ct-hours-row">
                <span className="ct-hours-key">Daily response</span>
                <span className="ct-hours-val">09:00 – 19:00</span>
              </div>
              <div className="ct-hours-row">
                <span className="ct-hours-key">Timezone</span>
                <span className="ct-hours-val">BST (UTC+6)</span>
              </div>
              <div className="ct-hours-row">
                <span className="ct-hours-key">Response time</span>
                <span className="ct-hours-val">Within 24 hrs</span>
              </div>

              <div className="ct-online-pill">
                <span className="ct-pulse" />
                Currently online & accepting enquiries
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="ct-right">
              {submitted ? (
                <div className="ct-success">
                  <div className="ct-success-icon">✅</div>
                  <div className="ct-success-title">Message Sent!</div>
                  <p className="ct-success-msg">
                    Thank you for reaching out. Our team will get back to you within 24 hours.<br />
                    For urgent matters, WhatsApp us directly.
                  </p>
                </div>
              ) : (
                <>
                  <div className="ct-form-title">Send me a message</div>
                  <p className="ct-form-sub">Fill in the details below and we'll get back to you within 24 hours.</p>

                  <form onSubmit={submit}>
                    <div className="ct-row">
                      <div className="ct-group">
                        <label className="ct-label">Full Name <span>*</span></label>
                        <input className="ct-input" type="text" name="name" placeholder="Your Full Name" value={form.name} onChange={handle} required />
                      </div>
                      <div className="ct-group">
                        <label className="ct-label">Mobile <span>*</span></label>
                        <input className="ct-input" type="tel" name="mobile" placeholder="+1 234 567 8900" value={form.mobile} onChange={handle} required />
                      </div>
                    </div>

                    <div className="ct-row">
                      <div className="ct-group">
                        <label className="ct-label">Email <span>*</span></label>
                        <input className="ct-input" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handle} required />
                      </div>
                      <div className="ct-group">
                        <label className="ct-label">Country <span>*</span></label>
                        <input className="ct-input" type="text" name="country" placeholder="According to Passport" value={form.country} onChange={handle} required />
                      </div>
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
                      <div className="ct-group">
                        <label className="ct-label">Preferred Date</label>
                        <input className="ct-input" type="date" name="date" value={form.date} onChange={handle} />
                      </div>
                    </div>

                    <div className="ct-group">
                      <label className="ct-label">Subject <span>*</span></label>
                      <input className="ct-input" type="text" name="subject" placeholder="Topic of your enquiry" value={form.subject} onChange={handle} required />
                    </div>

                    <div className="ct-group">
                      <label className="ct-label">Message</label>
                      <textarea className="ct-input ct-textarea" name="message" placeholder="Tell us about your travel plans, group size, special requests..." value={form.message} onChange={handle} />
                    </div>

                    <div className="ct-submit-row">
                      <button type="submit" className="ct-submit-btn">Send Enquiry</button>
                      <a
                        href="https://wa.me/8801601652669"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ct-wa-btn"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
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
    </>
  );
}