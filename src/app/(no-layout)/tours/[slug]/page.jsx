"use client";

import React, { useRef, useState, useEffect, use } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHandPointRight } from "react-icons/fa6";
import {
  faLocationDot, faClock, faUserGroup, faCheck, faXmark,
  faChevronLeft, faStar, faCalendarDays, faShieldHalved, faRoute,
  faLeaf, faWater, faBinoculars, faTriangleExclamation,
  faTag, faCircleInfo, faArrowRotateLeft, faMagnifyingGlass,
  faBolt, faXmark as faClose, faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';


const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api`;

async function fetchTour(slug) {
  const res = await fetch(`${API_BASE}/tours/${slug}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Tour not found (${res.status})`);
  const json = await res.json();
  return json.data;
}
async function fetchGallery(tourId) {
  try { const res = await fetch(`${API_BASE}/gallery?tour_id=${tourId}`, { cache: 'no-store' }); if (!res.ok) return []; const json = await res.json(); return json.data || []; } catch { return []; }
}
async function fetchReviews(tourId) {
  try { const res = await fetch(`${API_BASE}/reviews?tour_id=${tourId}`, { cache: 'no-store' }); if (!res.ok) return []; const json = await res.json(); return json.data || []; } catch { return []; }
}



const parsePrice  = (p) => { if (!p) return 0; if (typeof p === 'number') return p; return parseFloat(String(p).replace(/[^0-9.]/g, '')) || 0; };
const formatPrice = (p) => { if (!p) return '—'; if (typeof p === 'number') return `$${p}`; return String(p).startsWith('$') ? p : `$${p}`; };
function parseJsonField(val) { if (Array.isArray(val)) return val; if (typeof val === 'string') { try { return JSON.parse(val); } catch { return []; } } return []; }
function parseJsonObj(val)   { if (val && typeof val === 'object' && !Array.isArray(val)) return val; if (typeof val === 'string') { try { const p = JSON.parse(val); return p && typeof p === 'object' ? p : null; } catch { return null; } } return null; }
function getHighlights(tour)    { return Array.isArray(parseJsonField(tour.highlights))  ? parseJsonField(tour.highlights)  : []; }
function getWhyChoose(tour)     { return Array.isArray(parseJsonField(tour.why_choose))  ? parseJsonField(tour.why_choose)  : []; }
function getFaq(tour)           { return Array.isArray(parseJsonField(tour.faq))         ? parseJsonField(tour.faq)         : []; }
function getQuickView(tour)     { return parseJsonObj(tour.quick_view); }
function getPricePackages(tour) { return Array.isArray(parseJsonField(tour.price_packages)) ? parseJsonField(tour.price_packages) : []; }

function buildItinerary(tour) {
  const parsed = parseJsonField(tour.itinerary);
  if (parsed.length > 0) return parsed;
  const dayMatch = (tour.duration || '1 Day').match(/(\d+)\s*day/i);
  const days = dayMatch ? parseInt(dayMatch[1]) : 1;
  const cols = ['#d97706','#15803d','#1d4ed8','#7c3aed','#b91c1c'];
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1, color: cols[i % cols.length],
    title: i === 0 ? 'Arrival & Orientation' : i === days-1 ? 'Farewell & Departure' : `Exploration Day ${i+1}`,
    desc: `Day ${i+1} of your ${tour.title} experience. Your expert guide will lead you through the highlights.`,
  }));
}
function buildStats(tour) {
  const s = [];
  if (tour.duration)   s.push({ icon: faClock,        label: 'Duration',    value: tour.duration });
  if (tour.group_size) s.push({ icon: faUserGroup,    label: 'Group Size',  value: tour.group_size });
  s.push({ icon: faLeaf,         label: 'Meals',       value: 'Included' });
  s.push({ icon: faShieldHalved, label: 'Security',    value: 'Expert Guide' });
  return s;
}

// ── Booking Form Modal ────────────────────────────────────────────────────────
function BookingModal({ tour, priceFmt, onClose }) {
  const [step, setStep] = useState(1); // 1 = form, 2 = success
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    title: 'Mr', fullName: '', nationality: '', email: '',
    whatsapp: '', people: '2', startDate: '', tourType: 'shared',
    source: '', message: '',
  });
  const completion = (() => {
    const fields = ['fullName','nationality','email','people','startDate'];
    const filled = fields.filter(f => form[f]);
    return Math.round((filled.length / fields.length) * 100);
  })();

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!agreed) return;
    setStep(2);
  };

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <>
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap');
        .bk-overlay { position:fixed; inset:0; z-index:9999; background:rgba(10,10,8,.7); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; padding:16px; }
        .bk-modal { background:#fff; border-radius:28px; width:100%; max-width:520px; max-height:92vh; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 32px 80px rgba(0,0,0,.25); }
        .bk-header { background:#1c1c1a; padding:22px 28px; display:flex; align-items:center; justify-content:space-between; flex-shrink:0; }
        .bk-header-title { font-family: 'Open Sans', sans-serif; font-size:1.45rem; font-weight:700; color:#fff; line-height:1.2; }
        .bk-header-sub { font-size:12px; color:rgba(255,255,255,.45); margin-top:3px; }
        .bk-tour-pill { display:inline-flex; align-items:center; gap:6px; background:rgba(217,119,6,.2); border:1px solid rgba(217,119,6,.4); color:#d97706; font-size:11px; font-weight:700; padding:5px 12px; border-radius:99px; margin-top:8px; }
        .bk-close { width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,.1); border:none; color:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:background .2s; }
        .bk-close:hover { background:rgba(255,255,255,.2); }

        .bk-progress-bar { height:3px; background:#ede9e0; flex-shrink:0; }
        .bk-progress-fill { height:100%; background:linear-gradient(to right,#d97706,#15803d); transition:width .4s ease; }
        .bk-progress-label { padding:8px 28px 0; font-size:11px; color:#999; font-weight:600; display:flex; justify-content:space-between; flex-shrink:0; }

        .bk-body { padding:24px 28px 28px; overflow-y:auto; flex:1; }
        .bk-section-label { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.12em; color:#d97706; margin-bottom:14px; display:flex; align-items:center; gap:8px; }
        .bk-section-icon { width:28px; height:28px; border-radius:8px; background:#fef3c7; display:flex; align-items:center; justify-content:center; font-size:14px; flex-shrink:0; }
        .bk-sep { height:1px; background:#f0ece4; margin:20px 0; }
        .bk-row2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        @media(max-width:480px){ .bk-row2 { grid-template-columns:1fr; } }
        .bk-group { display:flex; flex-direction:column; gap:5px; margin-bottom:14px; }
        .bk-group:last-child { margin-bottom:0; }
        .bk-label { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:#999; }
        .bk-label span { color:#d97706; }
        .bk-input { width:100%; padding:12px 14px; border:1.5px solid #ede9e0; border-radius:12px; font-size:13.5px; font-family:'DM Sans',sans-serif; color:#1c1c1a; background:#faf9f7; outline:none; transition:border-color .2s,background .2s; appearance:none; }
        .bk-input:focus { border-color:#15803d; background:#fff; }
        .bk-input::placeholder { color:#ccc; }
        .bk-select-wrap { position:relative; }
        .bk-select-wrap::after { content:'▾'; position:absolute; right:12px; top:50%; transform:translateY(-50%); font-size:11px; color:#aaa; pointer-events:none; }
        .bk-textarea { resize:vertical; min-height:90px; line-height:1.65; }

        .bk-radio-group { display:flex; flex-direction:column; gap:10px; }
        .bk-radio-option { display:flex; align-items:flex-start; gap:12px; padding:14px 16px; border:1.5px solid #ede9e0; border-radius:14px; cursor:pointer; transition:border-color .2s,background .2s; }
        .bk-radio-option:hover { border-color:#d97706; }
        .bk-radio-option.selected { border-color:#15803d; background:#f0fdf4; }
        .bk-radio-option input { margin-top:3px; accent-color:#15803d; flex-shrink:0; }
        .bk-radio-label { font-size:13.5px; font-weight:600; color:#1c1c1a; margin-bottom:2px; }
        .bk-radio-hint { font-size:12px; color:#999; }

        .bk-agree { display:flex; align-items:flex-start; gap:10px; padding:14px 16px; background:#fffbeb; border:1px solid #fde68a; border-radius:12px; margin-top:4px; }
        .bk-agree input { margin-top:3px; accent-color:#d97706; flex-shrink:0; cursor:pointer; }
        .bk-agree-text { font-size:12.5px; color:#555; line-height:1.65; }
        .bk-agree-text a { color:#15803d; font-weight:600; }

        .bk-submit { width:100%; padding:15px; border-radius:14px; background:#1c1c1a; border:none; color:#fff; font-size:15px; font-weight:700; font-family:'DM Sans',sans-serif; cursor:pointer; transition:background .2s,transform .15s,box-shadow .2s; letter-spacing:.03em; display:flex; align-items:center; justify-content:center; gap:10px; margin-top:20px; }
        .bk-submit:hover:not(:disabled) { background:#15803d; transform:translateY(-2px); box-shadow:0 12px 28px rgba(21,128,61,.28); }
        .bk-submit:disabled { opacity:.45; cursor:not-allowed; }
        .bk-secure { font-size:11px; color:#bbb; text-align:center; margin-top:12px; display:flex; align-items:center; justify-content:center; gap:6px; }

        .bk-success { display:flex; flex-direction:column; align-items:center; text-align:center; padding:48px 32px; }
        .bk-success-icon { width:80px; height:80px; border-radius:50%; background:#f0fdf4; display:flex; align-items:center; justify-content:center; font-size:36px; margin-bottom:20px; }
        .bk-success-title { font-family: 'Open Sans', sans-serif; font-size:2rem; font-weight:700; color:#1c1c1a; margin-bottom:10px; }
        .bk-success-msg { font-size:14px; color:#777; line-height:1.8; max-width:360px; }
        .bk-success-btn { margin-top:28px; padding:13px 32px; border-radius:14px; background:#1c1c1a; border:none; color:#fff; font-size:14px; font-weight:700; font-family:'DM Sans',sans-serif; cursor:pointer; transition:background .2s; }
        .bk-success-btn:hover { background:#15803d; }
      `}</style>

      <div className="bk-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="bk-modal">

          {/* Header */}
          <div className="bk-header">
            <div>
              <div className="bk-header-title">Reserve Your Spot</div>
              <div className="bk-tour-pill">📍 {tour.title}</div>
            </div>
            <button className="bk-close" onClick={onClose}>
              <FontAwesomeIcon icon={faClose} size="sm" />
            </button>
          </div>

          {step === 1 && (
            <>
              {/* Progress */}
              <div className="bk-progress-bar">
                <div className="bk-progress-fill" style={{ width: `${completion}%` }} />
              </div>
              <div className="bk-progress-label">
                <span>Form completion</span>
                <span>{completion}%</span>
              </div>

              {/* Form */}
              <div className="bk-body">
                <form onSubmit={submit}>

                  {/* ── YOUR DETAILS ── */}
                  <div className="bk-section-label">
                    <div className="bk-section-icon">👤</div>
                    Your Details
                  </div>

                  {/* Title radio */}
                  <div className="bk-group">
                    <label className="bk-label">Please Select a Title</label>
                    <div style={{ display:'flex', gap:16, marginTop:2 }}>
                      {['Mr','Ms'].map(t => (
                        <label key={t} style={{ display:'flex', alignItems:'center', gap:6, fontSize:13.5, fontWeight:500, color:'#333', cursor:'pointer' }}>
                          <input type="radio" name="title" value={t} checked={form.title===t} onChange={handle} style={{ accentColor:'#15803d' }} />
                          {t}.
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="bk-group">
                    <label className="bk-label">Full Name <span>*</span></label>
                    <input className="bk-input" name="fullName" value={form.fullName} onChange={handle} placeholder="Your full name" required />
                  </div>

                  <div className="bk-row2">
                    <div className="bk-group">
                      <label className="bk-label">Nationality <span>*</span></label>
                      <input className="bk-input" name="nationality" value={form.nationality} onChange={handle} placeholder="According to Passport" required />
                    </div>
                    <div className="bk-group">
                      <label className="bk-label">Email Address <span>*</span></label>
                      <input className="bk-input" type="email" name="email" value={form.email} onChange={handle} placeholder="you@example.com" required />
                    </div>
                  </div>

                  <div className="bk-group">
                    <label className="bk-label">WhatsApp / Phone <span style={{ color:'#bbb', fontWeight:400 }}>(Optional)</span></label>
                    <div style={{ position:'relative' }}>
                      <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', fontSize:12, color:'#bbb', fontWeight:600, pointerEvents:'none' }}>+</span>
                      <input className="bk-input" name="whatsapp" value={form.whatsapp} onChange={handle} placeholder="Include country code" style={{ paddingLeft:22 }} />
                    </div>
                    <span style={{ fontSize:11, color:'#bbb' }}>Only used if we cannot reach you by email.</span>
                  </div>

                  <div className="bk-sep" />

                  {/* ── TOUR DETAILS ── */}
                  <div className="bk-section-label">
                    <div className="bk-section-icon" style={{ background:'#ede9ff' }}>🗓️</div>
                    Tour Details
                  </div>

                  <div className="bk-row2">
                    <div className="bk-group">
                      <label className="bk-label">Number of People <span>*</span></label>
                      <div className="bk-select-wrap">
                        <select className="bk-input" name="people" value={form.people} onChange={handle} required>
                          {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
                            <option key={n} value={n}>{n} {n===1?'Person':'People'}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="bk-group">
                      <label className="bk-label">Preferred Start Date <span>*</span></label>
                      <input className="bk-input" type="date" name="startDate" value={form.startDate} onChange={handle} required />
                    </div>
                  </div>

                  {/* Tour Type */}
                  <div className="bk-group">
                    <label className="bk-label">Tour Type</label>
                    <div className="bk-radio-group">
                      <label className={`bk-radio-option ${form.tourType==='shared'?'selected':''}`}>
                        <input type="radio" name="tourType" value="shared" checked={form.tourType==='shared'} onChange={handle} />
                        <div>
                          <div className="bk-radio-label">Other Can Join <span style={{ fontSize:11, color:'#15803d', fontWeight:700 }}>(Reduced Regular Price)</span></div>
                          <div className="bk-radio-hint">Share the experience with other travelers at a lower rate</div>
                        </div>
                      </label>
                      <label className={`bk-radio-option ${form.tourType==='private'?'selected':''}`}>
                        <input type="radio" name="tourType" value="private" checked={form.tourType==='private'} onChange={handle} />
                        <div>
                          <div className="bk-radio-label">Private Tour <span style={{ fontSize:11, color:'#d97706', fontWeight:700 }}>(More Expensive)</span></div>
                          <div className="bk-radio-hint">Exclusive tour just for your group, fully tailored</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* How did you find us */}
                  <div className="bk-group" style={{ marginTop:14 }}>
                    <label className="bk-label">How did you find us?</label>
                    <div className="bk-select-wrap">
                      <select className="bk-input" name="source" value={form.source} onChange={handle}>
                        <option value="">Select an option...</option>
                        <option>Google Search</option>
                        <option>Instagram</option>
                        <option>Facebook</option>
                        <option>YouTube</option>
                        <option>Friend / Referral</option>
                        <option>TripAdvisor</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="bk-group">
                    <label className="bk-label">Your Message / Special Requests</label>
                    <textarea className="bk-input bk-textarea" name="message" value={form.message} onChange={handle} placeholder="Any special requirements, dietary needs, or questions..." />
                  </div>

                  {/* Agree */}
                  <label className="bk-agree">
                    <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                    <span className="bk-agree-text">
                      I have read and accept the{' '}
                      <a href="/contact#policies" target="_blank" rel="noopener noreferrer">cancellation & booking policy</a>.{' '}
                      <span style={{ color:'#d97706', fontWeight:600 }}>Required before submitting your booking request.</span>
                    </span>
                  </label>
                  {!agreed && <p style={{ fontSize:11, color:'#d97706', marginTop:6, textAlign:'center' }}>Complete all required fields + accept policy to continue</p>}

                  <button type="submit" className="bk-submit" disabled={!agreed}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Send Booking Request
                  </button>

                  <div className="bk-secure">
                    <FontAwesomeIcon icon={faShieldHalved} />
                    Secure & private — your data is never shared
                  </div>
                </form>
              </div>
            </>
          )}

          {step === 2 && (
            <div className="bk-success">
              <div className="bk-success-icon">✅</div>
              <div className="bk-success-title">Booking Request Sent!</div>
              <p className="bk-success-msg">
                Thank you, <strong>{form.fullName}</strong>! Your booking request for <strong>{tour.title}</strong> has been received.
                We'll get back to you within 24 hours via email or WhatsApp.
              </p>
              <button className="bk-success-btn" onClick={onClose}>Close</button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

// ── Skeleton / Error / FAQ (unchanged) ───────────────────────────────────────
function PageSkeleton() {
  return (
    <>
      <style>{`@keyframes skShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}.sk{background:linear-gradient(90deg,#e8e4da 25%,#f0ece2 50%,#e8e4da 75%);background-size:200% 100%;animation:skShimmer 1.4s ease infinite;border-radius:12px;}`}</style>
      <div style={{ height:'92vh' }} className="sk" />
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'64px 40px', display:'grid', gridTemplateColumns:'1fr 380px', gap:60 }}>
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {[90,40,60,200,300].map((h,i) => <div key={i} className="sk" style={{ height:h }} />)}
        </div>
        <div className="sk" style={{ height:480, borderRadius:28 }} />
      </div>
    </>
  );
}
function ErrorPage({ msg }) {
  return (
    <div style={{ minHeight:'80vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:40, textAlign:'center' }}>
      <FontAwesomeIcon icon={faTriangleExclamation} style={{ fontSize:48, color:'#ef4444', marginBottom:20 }} />
      <h2 style={{ fontSize:24, fontWeight:700, color:'#333', marginBottom:8 }}>Tour Not Found</h2>
      <p style={{ color:'#888', marginBottom:28 }}>{msg}</p>
      <Link href="/tours" style={{ padding:'12px 28px', borderRadius:12, background:'#16a34a', color:'#fff', fontWeight:700, fontSize:15, textDecoration:'none' }}>← Back to Tours</Link>
    </div>
  );
}
function FaqSection({ faqItems }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="faq-section">
      <div className="section-eyebrow">Got Questions?</div>
      <div className="section-title" style={{ fontSize:'1.8rem', marginBottom:20 }}>Frequently Asked</div>
      {faqItems.map((item,i) => (
        <div key={i} className="faq-item">
          <button className="faq-question" onClick={() => setOpenIdx(openIdx===i?null:i)}>
            <span>{item.question||item.q||item}</span>
            <FontAwesomeIcon icon={faChevronLeft} className="faq-chevron" style={{ transform:openIdx===i?'rotate(-90deg)':'rotate(90deg)' }} />
          </button>
          {openIdx===i && <div className="faq-answer" dangerouslySetInnerHTML={{ __html:item.answer||item.a||'' }} />}
        </div>
      ))}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function TourDetails({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [tour,      setTour]      = useState(null);
  const [gallery,   setGallery]   = useState([]);
  const [reviews,   setReviews]   = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [showBook,  setShowBook]  = useState(false);
  const heroRef = useRef(null);
  const navRef  = useRef(null);

  useEffect(() => { document.body.classList.add('hide-layout'); return () => { document.body.classList.remove('hide-layout'); }; }, []);

  useEffect(() => {
    const ids = ['overview','highlights','itinerary','price','inclusion','trip-note','why-naim','faq'];
    const OFFSET = 60;
    const onScroll = () => {
      let active = ids[0];
      for (const id of ids) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= OFFSET) active = id; }
      if (!navRef.current) return;
      navRef.current.querySelectorAll('a').forEach(a => { const isActive = a.getAttribute('href')===`#${active}`; a.classList.toggle('nav-active', isActive); if (isActive) a.scrollIntoView({ behavior:'smooth', inline:'nearest', block:'nearest' }); });
    };
    window.addEventListener('scroll', onScroll, { passive:true }); onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true);
      try {
        const tourData = await fetchTour(slug);
        setTour(tourData);
        const [g, r] = await Promise.all([fetchGallery(tourData.id), fetchReviews(tourData.id)]);
        setGallery(g); setReviews(r);
      } catch (err) { setError(err.message); }
      finally { setLoading(false); }
    })();
  }, [slug]);

  useEffect(() => {
    const hero = heroRef.current; if (!hero) return;
    const fn = () => { hero.style.transform = `translateY(${window.scrollY*0.3}px)`; };
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  if (loading) return <PageSkeleton />;
  if (error||!tour) return <ErrorPage msg={error||'Tour data unavailable.'} />;

  const parseArr = (v) => { if (Array.isArray(v)) return v.filter(Boolean); if (typeof v==='string') { try { const p=JSON.parse(v); return Array.isArray(p)?p.filter(Boolean):[]; } catch { return []; } } return []; };
  const tourGalleryImgs = parseArr(tour.gallery_img);
  const galleryApiImgs  = gallery.map(g => g.image_url).filter(Boolean);
  const images = tourGalleryImgs.length>0 ? tourGalleryImgs : galleryApiImgs.length>0 ? galleryApiImgs : tour.image_url ? [tour.image_url] : ['https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=2000&q=80'];

  const includedItems  = parseArr(tour.included);
  const excludedItems  = parseArr(tour.excluded);
  const priceNum       = parsePrice(tour.price);
  const priceFmt       = formatPrice(tour.price);
  const stats          = buildStats(tour);
  const itinerary      = buildItinerary(tour);
  const highlights     = getHighlights(tour);
  const whyChoose      = getWhyChoose(tour);
  const faqItems       = getFaq(tour);
  const quickView      = getQuickView(tour);
  const pricePackages  = getPricePackages(tour);
  const tripNote       = tour.trip_note||'';
  const rating         = tour.rating||0;
  const fullStars      = Math.floor(rating);
  const typeTags       = (tour.tour_type||'').split(',').map(t=>t.trim()).filter(Boolean);

  const qvRows = quickView ? [
    { icon:'📍', key:'Locations:',         val:quickView.location    },
    { icon:'🕐', key:'Tour Duration:',      val:quickView.duration    },
    { icon:'🏛️', key:'Tour Attractions:',   val:quickView.attractions },
    { icon:'📅', key:'Best Time To Visit:', val:quickView.best_time   },
  ].filter(r=>r.val) : [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .page-wrap{font-family: 'Open Sans', sans-serif; background:#f8f6f1;min-height:100vh;color:#1c1c1c;}
        .display-font{font-family: 'Open Sans', sans-serif;}
        .hero{position:relative;height:92vh;overflow:hidden;}
        .hero-img-wrap{position:absolute;inset:0;overflow:hidden;}
        .hero-img{width:100%;height:110%;object-fit:cover;}
        .hero-gradient{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,8,0.92) 0%,rgba(10,10,8,0.45) 45%,rgba(10,10,8,0.1) 100%);}
        .hero-top{position:absolute;top:0;left:0;right:0;padding:28px 40px;display:flex;justify-content:space-between;align-items:center;z-index:10;}
        .back-btn{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.1);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.2);color:#fff;padding:10px 20px;border-radius:100px;font-size:13px;font-weight:600;text-decoration:none;transition:background 0.2s;letter-spacing:0.02em;}
        .back-btn:hover{background:rgba(255,255,255,0.22);}
        .top-rated{display:flex;align-items:center;gap:6px;background:#d97706;color:#fff;padding:10px 18px;border-radius:100px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;}
        .thumb-strip{position:absolute;right:40px;bottom:120px;display:flex;flex-direction:column;gap:10px;z-index:20;}
        .thumb{width:64px;height:48px;border-radius:10px;object-fit:cover;cursor:pointer;border:2px solid transparent;opacity:0.55;transition:opacity 0.25s,border-color 0.25s,transform 0.2s;}
        .thumb.active{opacity:1;border-color:#d97706;transform:scale(1.08);}
        .thumb:hover{opacity:0.85;}
        .hero-content{position:absolute;bottom:0;left:0;right:0;padding:0 40px 56px;z-index:10;max-width:820px;}
        .hero-tags{display:flex;gap:10px;margin-bottom:18px;flex-wrap:wrap;}
        .hero-tag{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,0.08);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.15);color:#d97706;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;padding:8px 14px;border-radius:8px;}
        .hero-title{font-family: 'Montserrat', sans-serif; font-size:clamp(3rem,6vw,5.5rem);font-weight:700;color:#fff;line-height:1.05;margin-bottom:16px;letter-spacing:-0.01em;}
        .hero-title em{color:#d97706;font-style:italic;}
        .hero-sub{color:rgba(255,255,255,0.75);font-size:16px;font-weight:400;line-height:1.7;max-width:560px;}
        .stars-row{display:flex;align-items:center;gap:6px;margin-bottom:14px;}
        .star-icon{color:#d97706;font-size:13px;}
        .rating-text{font-size:13px;font-weight:600;color:#fff;}
        .review-text{font-size:12px;color:rgba(255,255,255,0.5);}
        .img-counter{position:absolute;bottom:56px;right:40px;font-size:12px;color:rgba(255,255,255,0.5);font-weight:500;letter-spacing:0.08em;z-index:10;}
        .main{max-width:1280px;margin:0 auto;padding:64px 40px 80px;display:grid;grid-template-columns:1fr 380px;gap:60px;align-items:start;}
        @media(max-width:1024px){.main{grid-template-columns:1fr;}}
        @media(max-width:640px){.main{padding:40px 20px 60px;}.hero-content{padding:0 20px 40px;}.hero-top{padding:20px;}.thumb-strip{display:none;}}
        .right-col{position:sticky;top:62px;display:flex;flex-direction:column;gap:24px;align-self:start;}
        @media(max-width:1024px){.right-col{position:static;top:auto;}}
        .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:48px;}
        @media(max-width:640px){.stats-grid{grid-template-columns:repeat(2,1fr);}}
        .stat-card{background:#fff;border:1px solid #ede9e0;border-radius:20px;padding:24px 16px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px;transition:transform 0.2s,box-shadow 0.2s;cursor:default;}
        .stat-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,0.07);}
        .stat-icon-wrap{width:48px;height:48px;border-radius:50%;background:#f0faf4;display:flex;align-items:center;justify-content:center;}
        .stat-label{font-size:10px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:0.1em;}
        .stat-value{font-size:14px;font-weight:700;color:#1c1c1c;}
        .section-eyebrow{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:#d97706;margin-bottom:8px;}
        .section-title{font-family: 'Montserrat', sans-serif; font-size:2.2rem;font-weight:700;color:#1c1c1c;line-height:1.1;margin-bottom:24px;}
        .section-block{margin-bottom:52px;}
        .section-block:last-child{margin-bottom:0;}
        .overview-block{background:#fff;border:1px solid #ede9e0;border-radius:28px;padding:40px;}
        .overview-block p{font-size:16px;line-height:1.85;color:#555;margin-bottom:16px;text-align:justify;}
        .overview-block p:last-child{margin-bottom:0;}
        .highlights-list{padding-left:0;margin:0;display:flex;flex-direction:column;gap:12px;}
        .highlights-list li{font-size:15.5px;color:#555;line-height:1.6;display:flex;align-items:flex-start;gap:10px;list-style:none;text-align:justify;}
        .highlight-icon{color:#d97706;margin-top:3px;flex-shrink:0;}
        .timeline{display:flex;flex-direction:column;gap:0;position:relative;}
        .timeline::before{content:'';position:absolute;left:23px;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,#d97706,#15803d);border-radius:2px;}
        .timeline-item{display:flex;gap:24px;padding-bottom:28px;position:relative;}
        .timeline-item:last-child{padding-bottom:0;}
        .day-bubble{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;color:#fff;flex-shrink:0;z-index:2;border:3px solid #f8f6f1;}
        .timeline-card{background:#fff;border:1px solid #ede9e0;border-radius:20px;padding:28px;flex:1;transition:transform 0.2s,box-shadow 0.2s;}
        .timeline-card:hover{transform:translateX(6px);box-shadow:0 8px 28px rgba(0,0,0,0.07);}
        .timeline-card h3{font-family: 'Open Sans', sans-serif; font-size:1.35rem;font-weight:700;color:#1c1c1c;margin-bottom:8px;}
        .timeline-card p{font-size:16px;line-height:1.75;color:#666;text-align:justify;}
        .day-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#d97706;margin-bottom:4px;}
        .inc-exc-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
        @media(max-width:640px){.inc-exc-grid{grid-template-columns:1fr;}}
        .inc-card{background:#fff;border:1px solid #d1fae5;border-radius:24px;padding:32px;position:relative;overflow:hidden;}
        .exc-card{background:#fff;border:1px solid #fee2e2;border-radius:24px;padding:32px;position:relative;overflow:hidden;}
        .corner-blob{position:absolute;top:-20px;right:-20px;width:100px;height:100px;border-radius:50%;opacity:0.5;}
        .inc-card h3,.exc-card h3{font-family:'Cormorant Garamond',serif;font-size:1.35rem;font-weight:700;color:#1c1c1c;margin-bottom:20px;position:relative;z-index:1;}
        .inc-list,.exc-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:14px;position:relative;z-index:1;}
        .inc-list li,.exc-list li{display:flex;align-items:flex-start;gap:12px;font-size:14px;color:#444;font-weight:400;line-height:1.5;text-align:justify;}
        .check-dot{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;font-size:10px;}
        .why-grid{display:flex;flex-direction:column;gap:12px;}
        .why-card{background:#fff;border:1px solid #ede9e0;border-radius:16px;padding:20px 24px;display:flex;align-items:flex-start;gap:14px;transition:transform 0.2s,box-shadow 0.2s;}
        .why-card:hover{transform:translateX(6px);box-shadow:0 8px 28px rgba(0,0,0,0.07);}
        .why-text{font-size:14.5px;color:#444;line-height:1.65;font-weight:400;text-align:justify;}
        .trip-note-box{background:#fffbeb;border:1px solid #fde68a;border-radius:20px;padding:28px 32px;}
        .trip-note-header{display:flex;align-items:center;gap:10px;margin-bottom:16px;}
        .trip-note-icon{font-size:16px;color:#b45309;flex-shrink:0;}
        .trip-note-title{font-size:14px;font-weight:700;color:#92400e;}
        .trip-note-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px;}
        .trip-note-list li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#555;line-height:1.7;text-align:justify;}
        .trip-note-bullet{width:6px;height:6px;border-radius:50%;background:#d97706;flex-shrink:0;margin-top:8px;}

        /* ── Price card ── */
        .price-offers-box{background:#fff;border:1px solid #ede9e0;border-radius:28px;padding:36px;}
        .price-italic-tagline{font-family: 'Open Sans', sans-serif; font-style:italic;font-size:1.05rem;color:#15803d;margin:20px 0;font-weight:600;}
        .price-divider{height:1px;background:#ede9e0;margin:20px 0;}
        .price-sub-heading{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:700;color:#1c1c1c;margin-bottom:12px;}
        .price-bullet-list{list-style:none;padding:0;margin:0 0 4px;display:flex;flex-direction:column;gap:9px;}
        .price-bullet-list li{display:flex;align-items:flex-start;gap:10px;font-size:13.5px;color:#555;line-height:1.6;text-align:justify;}
        .price-bullet-dot{width:6px;height:6px;border-radius:50%;background:#d97706;flex-shrink:0;margin-top:7px;}
        .contact-link{color:#15803d;font-weight:700;text-decoration:none;}
        .contact-link:hover{text-decoration:underline;}

        /* ── Book Now Button in price card ── */
        .book-now-btn{
          width:100%; padding:16px; border-radius:16px;
          background:#1c1c1a; border:none; color:#fff;
          font-size:16px; font-weight:700; font-family:'DM Sans',sans-serif;
          cursor:pointer; letter-spacing:.04em;
          display:flex; align-items:center; justify-content:center; gap:10px;
          transition:background .2s,transform .15s,box-shadow .2s;
          margin-top:24px;
        }
        .book-now-btn:hover{background:#d97706;transform:translateY(-2px);box-shadow:0 12px 28px rgba(217,119,6,.3);}
        .book-now-sub{font-size:12px;color:#999;text-align:center;margin-top:10px;display:flex;align-items:center;justify-content:center;gap:5px;}

        /* ── Quick View / packages ── */
        .qv-section-label{font-size:13px;font-weight:700;color:#1d4ed8;margin-bottom:12px;display:flex;align-items:center;gap:6px;}
        .qv-bar{background:linear-gradient(135deg,#dbeafe 0%,#eff6ff 100%);border:1px solid #bfdbfe;border-radius:16px;padding:20px 24px;display:grid;grid-template-columns:1fr 1fr;gap:14px 32px;margin-bottom:28px;}
        @media(max-width:640px){.qv-bar{grid-template-columns:1fr;gap:10px;padding:16px 18px;}}
        .qv-row{display:flex;align-items:flex-start;gap:10px;font-size:13.5px;color:#1e3a5f;line-height:1.5;}
        .qv-icon{width:28px;height:28px;border-radius:8px;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 1px 4px rgba(0,0,0,.08);font-size:14px;}
        .qv-key{font-weight:700;color:#1d4ed8;margin-right:4px;white-space:nowrap;}
        .pkg-section-label{font-size:13px;font-weight:700;color:#1d4ed8;margin-bottom:12px;}
        .pkg-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px;}
        @media(max-width:900px){.pkg-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:500px){.pkg-grid{grid-template-columns:1fr 1fr;}}
        .pkg-card{background:#fff;border:1.5px solid #ede9e0;border-radius:18px;padding:20px 14px;text-align:center;position:relative;overflow:hidden;transition:border-color .2s,box-shadow .2s,transform .2s;}
        .pkg-card:hover{border-color:#1d4ed8;box-shadow:0 8px 24px rgba(29,78,216,.12);transform:translateY(-3px);}
        .pkg-card.best-value{border-color:#15803d;background:linear-gradient(160deg,#f0fdf4 0%,#fff 100%);}
        .pkg-card.best-value::before{content:'Best Value';position:absolute;top:10px;right:-24px;background:#15803d;color:#fff;font-size:9px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:3px 30px;transform:rotate(45deg);}
        .pkg-num{font-size:10px;font-weight:700;color:#1d4ed8;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:5px;}
        .pkg-label{font-family: 'Open Sans', sans-serif; font-size:1rem;font-weight:700;color:#1c1c1c;margin-bottom:3px;line-height:1.2;}
        .pkg-pax{font-size:11px;color:#999;margin-bottom:10px;}
        .pkg-price{font-family: 'Open Sans', sans-serif; font-size:2rem;font-weight:700;color:#1d4ed8;line-height:1;margin-bottom:2px;}
        .pkg-card.best-value .pkg-price{color:#15803d;}
        .pkg-unit{font-size:10px;color:#bbb;}
        .pkg-note{font-size:11px;color:#999;margin-top:6px;}
        .review-card{background:#fff;border:1px solid #ede9e0;border-radius:20px;padding:28px;margin-bottom:14px;}
        .review-card:last-child{margin-bottom:0;}
        .review-avatar{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;flex-shrink:0;}

        /* ── Right col quick info card ── */
        .info-card{background:#fff;border:1px solid #ede9e0;border-radius:24px;padding:28px;box-shadow:0 2px 12px rgba(0,0,0,.04);}
        .info-card-title{font-family: 'Open Sans', sans-serif; font-size:1.25rem;font-weight:700;color:#1c1c1a;margin-bottom:18px;}
        .info-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #f0ece4;font-size:13.5px;}
        .info-row:last-child{border-bottom:none;padding-bottom:0;}
        .info-row-key{color:#999;font-weight:500;}
        .info-row-val{color:#1c1c1a;font-weight:700;text-align:right;}
        .info-book-btn{width:100%;padding:15px;border-radius:14px;background:#d97706;border:none;color:#fff;font-size:15px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;margin-top:20px;transition:background .2s,transform .15s,box-shadow .2s;letter-spacing:.03em;}
        .info-book-btn:hover{background:#b45309;transform:translateY(-2px);box-shadow:0 12px 28px rgba(217,119,6,.3);}

        /* ── FAQ ── */
        .faq-section{margin-bottom:0;}
        .faq-item{background:#fff;border:1px solid #ede9e0;border-radius:16px;margin-bottom:10px;overflow:hidden;transition:box-shadow 0.2s;}
        .faq-item:last-child{margin-bottom:0;}
        .faq-item:hover{box-shadow:0 6px 20px rgba(0,0,0,.06);}
        .faq-question{width:100%;background:none;border:none;text-align:left;padding:18px 22px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;gap:16px;}
        .faq-question span{font-size:14px;font-weight:600;color:#1c1c1c;line-height:1.5;}
        .faq-chevron{font-size:12px;color:#d97706;flex-shrink:0;transition:transform 0.25s ease;}
        .faq-answer{padding:0 22px 18px;font-size:13.5px;color:#666;line-height:1.8;text-align:justify;}

        /* ── Section Nav ── */
        .section-nav{position:sticky;top:0;z-index:999;background:rgba(248,246,241,0.98);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:2px solid #ede9e0;box-shadow:0 2px 16px rgba(0,0,0,0.07);}
        .section-nav-inner{max-width:1280px;margin:0 auto;padding:0 40px;display:flex;align-items:center;overflow-x:auto;scrollbar-width:none;}
        .section-nav-inner::-webkit-scrollbar{display:none;}
        .section-nav-inner a{flex-shrink:0;display:block;padding:14px 15px;font-size:11.5px;font-weight:600;color:#666;text-decoration:none;letter-spacing:0.04em;text-transform:uppercase;border-bottom:2px solid transparent;margin-bottom:-2px;transition:color 0.2s,border-color 0.2s;white-space:nowrap;}
        .section-nav-inner a:hover,.section-nav-inner a.nav-active{color:#d97706;border-bottom-color:#d97706;}
        @media(max-width:640px){.section-nav-inner{padding:0 12px;}.section-nav-inner a{padding:12px 10px;font-size:10px;}}
        #overview,#highlights,#itinerary,#price,#inclusion,#why-naim,#trip-note,#faq{scroll-margin-top:54px;}

        @keyframes fadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
        .fade-up{animation:fadeUp 0.7s ease both;}
        .fade-up-1{animation-delay:0.1s;}
        .fade-up-2{animation-delay:0.25s;}
        .fade-up-3{animation-delay:0.4s;}
      `}</style>

      {/* Booking modal */}
      {showBook && <BookingModal tour={tour} priceFmt={priceFmt} onClose={() => setShowBook(false)} />}

      <div className="page-wrap">

        {/* HERO */}
        <div id="hero" className="hero">
          <div className="hero-img-wrap">
            <img ref={heroRef} className="hero-img" src={images[activeImg]} alt={tour.title}
              onError={e => { e.target.src='https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=2000&q=80'; }} />
          </div>
          <div className="hero-gradient" />
          <div className="hero-top">
            <Link href="/tours" className="back-btn"><FontAwesomeIcon icon={faChevronLeft} /> Back to Tours</Link>
            {rating>=4.5 && <div className="top-rated"><FontAwesomeIcon icon={faStar} /> Top Rated</div>}
          </div>
          {images.length>1 && (
            <div className="thumb-strip">
              {images.slice(0,5).map((src,i) => (
                <img key={i} src={src} alt="" className={`thumb ${activeImg===i?'active':''}`} onClick={() => setActiveImg(i)} onError={e => { e.target.style.display='none'; }} />
              ))}
            </div>
          )}
          {images.length>1 && <div className="img-counter">{activeImg+1} / {images.length}</div>}
          <div className="hero-content">
            {/* <div className="stars-row fade-up fade-up-1">
              {[1,2,3,4,5].map(i => <FontAwesomeIcon key={i} icon={faStar} className="star-icon" style={{ color:i<=fullStars?'#d97706':'rgba(255,255,255,0.25)' }} />)}
              <span className="rating-text">{rating}</span>
              <span className="review-text">· {tour.review_count} reviews</span>
            </div> */}
            {/* <div className="hero-tags fade-up fade-up-1">
              <span className="hero-tag"><FontAwesomeIcon icon={faLocationDot} /> {tour.location}</span>
              {typeTags.slice(0,2).map(t => <span key={t} className="hero-tag"><FontAwesomeIcon icon={faRoute} /> {t}</span>)}
            </div> */}
            <h1 className="hero-title fade-up fade-up-2">
              {tour.title.includes(' ')
                ? <>{tour.title.split(' ').slice(0,Math.ceil(tour.title.split(' ').length/2)).join(' ')}<br /><em>{tour.title.split(' ').slice(Math.ceil(tour.title.split(' ').length/2)).join(' ')}</em></>
                : tour.title}
            </h1>
            <p className="hero-sub fade-up fade-up-3">{`Journey through ${tour.location} on this exclusive private tour, crafted for travelers who demand comfort, authenticity, and unforgettable memories.`}</p>
          </div>
        </div>

        {/* SECTION NAV */}
        <nav className="section-nav">
          <div ref={navRef} className="section-nav-inner">
            <a href="#overview">Overview</a>
            <a href="#highlights">Tour Highlights</a>
            <a href="#itinerary">Itinerary</a>
            <a href="#price">Tour Price</a>
            <a href="#inclusion">Inclusion / Exclusion</a>
            <a href="#trip-note">Trip Note</a>
            <a href="#faq">FAQ</a>
            <a href="#why-naim">Why Book With Naim?</a>
            <a href="#" onClick={e => { e.preventDefault(); setShowBook(true); }} style={{ color:'#d97706', fontWeight:700 }}>Booking Now</a>
          </div>
        </nav>

        {/* MAIN */}
        <div className="main">

          {/* ── LEFT COLUMN ── */}
          <div>
            {qvRows.length>0 && (
                  <>
                    <div className="qv-section-label">🔍 Quick View on Details</div>
                    <div className="qv-bar">
                      {qvRows.map((r,i) => (
                        <div key={i} className="qv-row">
                          <div className="qv-icon">{r.icon}</div>
                          <div><span className="qv-key">{r.key}</span><span>{r.val}</span></div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

            {/* Overview */}
            <div id="overview" className="section-block">
              <div className="overview-block">
                {/* <div className="section-eyebrow">About This Tour</div> */}
                <div className="section-title">Experience Overview</div>
                <div className="text-justify" dangerouslySetInnerHTML={{ __html: tour.overview||`Embark on an unforgettable journey to ${tour.location}. This private tour is meticulously designed to give you an intimate, authentic experience while maintaining premium comfort.` }} />
              </div>
            </div>

            {/* Highlights */}
            {highlights.length>0 && (
              <div id="highlights" className="section-block">
                <div className="section-eyebrow">What You'll See</div>
                <div className="section-title">Tour Highlights</div>
                <ul className="highlights-list">
                  {highlights.map((h,i) => (
                    <li key={i}><span className="highlight-icon"><FaHandPointRight /></span><span dangerouslySetInnerHTML={{ __html:h }} /></li>
                  ))}
                </ul>
              </div>
            )}

            {/* Itinerary */}
            <div id="itinerary" className="section-block">
              <div className="section-eyebrow">Day by Day</div>
              <div className="section-title">Tour Itinerary</div>
              <div className="timeline">
                {itinerary.map(item => (
                  <div key={item.day} className="timeline-item">
                    <div className="day-bubble" style={{ background:item.color }}>{item.day}</div>
                    <div className="timeline-card">
                      {/* <div className="day-label">{item.day>1?`Day ${item.day}`:'Day'}</div> */}
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Offers */}
            <div id="price" className="section-block">
              <div className="section-eyebrow">Pricing</div>
              <div className="section-title">Tour Price &amp; Offers</div>
              <div className="price-offers-box">

                

                {pricePackages.length>0 ? (
                  <>
                    <div className="pkg-section-label">💲 Price Details</div>
                    <div className="pkg-grid">
                      {pricePackages.map((pkg,i) => (
                        <div key={i} className={`pkg-card${i===0?' best-value':''}`}>
                          <div className="pkg-num">({i+1})</div>
                          <div className="pkg-label">{pkg.label}</div>
                          <div className="pkg-pax">{pkg.pax}</div>
                          <div className="pkg-price">${pkg.price_usd}</div>
                          <div className="pkg-unit">USD / person</div>
                          {pkg.note && <div className="pkg-note">{pkg.note}</div>}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize:13, fontWeight:700, color:'#15803d', background:'#f0faf4', border:'1px solid #bbf7d0', borderRadius:8, padding:'8px 14px', marginBottom:20 }}>
                    🔒 {tour.title} – from <strong>{priceFmt} USD</strong> per person
                  </div>
                )}

                <p className="price-italic-tagline">Your Day, Your Way – A Fully Tailored Tour for Ultimate Experience</p>
                <div className="price-divider" />
                <div className="price-sub-heading"><FontAwesomeIcon icon={faBolt} style={{ fontSize:14, color:'#d97706' }} /> Special Offer</div>
                <ul className="price-bullet-list">
                  <li><span className="price-bullet-dot" /><span><strong>Early-Bird Deals:</strong> Save <strong>flat 10%</strong> when you book 60+ days in advance.</span></li>
                  <li><span className="price-bullet-dot" /><span><strong>Multi-Tour Bonus:</strong> Book 1+ days and receive a handicraft souvenir.</span></li>
                  <li><span className="price-bullet-dot" /><span><strong>Free Airport Transfer:</strong> Complimentary transfers with any multi-day tour.</span></li>
                </ul>
                <div className="price-divider" />
                <div className="price-sub-heading"><FontAwesomeIcon icon={faTag} style={{ fontSize:14, color:'#d97706' }} /> Fair Pricing Promise</div>
                <ul className="price-bullet-list">
                  <li><span className="price-bullet-dot" /><span><strong>Transparent Inclusions:</strong> All entry fees, rickshaw &amp; boat rides included.</span></li>
                  <li><span className="price-bullet-dot" /><span><strong>No Surprise Costs:</strong> No "factory" visits or shopping commissions—ever.</span></li>
                </ul>
                <div className="price-divider" />
                <div className="price-sub-heading"><FontAwesomeIcon icon={faArrowRotateLeft} style={{ fontSize:14, color:'#d97706' }} /> Free Rescheduling &amp; Cancellation</div>
                <ul className="price-bullet-list">
                  <li><span className="price-bullet-dot" /><span><strong>Complimentary Rescheduling:</strong> Change your date up to 72 hours before the tour.</span></li>
                  <li><span className="price-bullet-dot" /><span><strong>Fair Cancellation:</strong> Full refund if cancelled 30+ days before; see <a href="/contact#policies" className="contact-link">cancellation policy.</a></span></li>
                </ul>
                <div className="price-divider" />
                <div className="price-sub-heading"><FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize:14, color:'#d97706' }} /> Fixed Departures or B2B Tours?</div>
                <p style={{ fontSize:13.5, color:'#555', lineHeight:1.7, marginTop:4 }}>
                  We offer fixed-departure group tours and bespoke B2B packages.{' '}
                  <a href="/contact" className="contact-link">Get in touch</a> to discuss your requirements.
                </p>

                {/* ── Book Now button inside price card ── */}
                <button className="book-now-btn" onClick={() => setShowBook(true)}>
                  📅 Book This Tour Now
                </button>
                <div className="book-now-sub">
                  <FontAwesomeIcon icon={faShieldHalved} style={{ fontSize:11 }} />
                  Free cancellation · No payment required today
                </div>
              </div>
            </div>

            {/* Included / Excluded */}
            <div id="inclusion" className="section-block">
              <div className="section-eyebrow">What's Covered</div>
              <div className="section-title">Inclusions &amp; Exclusions</div>
              <div className="inc-exc-grid">
                <div className="inc-card">
                  <div className="corner-blob" style={{ background:'#d1fae5' }} />
                  <h3>What's Included</h3>
                  <ul className="inc-list">
                    {(includedItems.length>0?includedItems:['English-speaking expert guide','All meals & mineral water','Private accommodation','All permits & entrance fees']).map((item,i) => (
                      <li key={i}><span className="check-dot" style={{ background:'#dcfce7', color:'#16a34a' }}><FontAwesomeIcon icon={faCheck} /></span><span dangerouslySetInnerHTML={{ __html:item }} /></li>
                    ))}
                  </ul>
                </div>
                <div className="exc-card">
                  <div className="corner-blob" style={{ background:'#fee2e2' }} />
                  <h3>What's Excluded</h3>
                  <ul className="exc-list">
                    {(excludedItems.length>0?excludedItems:['International flights','Personal expenses & tipping','Travel insurance']).map((item,i) => (
                      <li key={i}><span className="check-dot" style={{ background:'#fee2e2', color:'#ef4444' }}><FontAwesomeIcon icon={faXmark} /></span><span dangerouslySetInnerHTML={{ __html:item }} /></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Trip Note */}
            {tripNote && (
              <div id="trip-note" className="section-block">
                <div className="section-eyebrow">Important</div>
                <div className="section-title">Trip Note</div>
                <div className="trip-note-box">
                  <div className="trip-note-header">
                    <FontAwesomeIcon icon={faCircleInfo} className="trip-note-icon" />
                    <span className="trip-note-title">Please read before booking</span>
                  </div>
                  <ul className="trip-note-list">
                    {(() => {
                      const raw = tripNote.trim();
                      const items = raw.includes('<strong>')
                        ? raw.split(/(?=<strong>)/).map(s=>s.trim()).filter(s=>s.length>0)
                        : raw.split(/(?<=[.!?])\s+/).filter(s=>s.trim().length>4);
                      return items.map((item,i) => (
                        <li key={i}><span className="trip-note-bullet" /><span dangerouslySetInnerHTML={{ __html:item.trim() }} /></li>
                      ));
                    })()}
                  </ul>
                </div>
              </div>
            )}

            {/* Why Choose Us */}
            {whyChoose.length>0 && (
              <div id="why-naim" className="section-block">
                <div className="section-eyebrow">Our Promise</div>
                <div className="section-title">Why Book This Tour With Naim?</div>
                <div className="why-grid">
                  {whyChoose.map((item,i) => (
                    <div key={i} className="why-card"><span className="why-text" dangerouslySetInnerHTML={{ __html:item }} /></div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {reviews.length>0 && (
              <div className="section-block">
                <div className="section-eyebrow">What Travelers Say</div>
                <div className="section-title">Guest Reviews</div>
                {reviews.map(r => (
                  <div key={r.id} className="review-card">
                    <div style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
                      <div className="review-avatar" style={{ background:r.bg_hex||'#EAF3DE', color:r.color_hex||'#3B6D11' }}>{r.initials||r.name?.charAt(0)||'A'}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
                          <div>
                            <span style={{ fontWeight:700, fontSize:15, color:'#1c1c1c' }}>{r.name}</span>
                            {r.country && <span style={{ fontSize:12, color:'#999', marginLeft:8 }}>{r.country}</span>}
                          </div>
                          <div style={{ display:'flex', gap:2 }}>
                            {[1,2,3,4,5].map(i => <FontAwesomeIcon key={i} icon={faStar} style={{ fontSize:12, color:i<=r.rating?'#d97706':'#e5e7eb' }} />)}
                          </div>
                        </div>
                        {r.title && <p style={{ fontWeight:600, fontSize:14, color:'#333', marginBottom:6 }}>{r.title}</p>}
                        <p style={{ fontSize:14, color:'#666', lineHeight:1.7, textAlign:'justify' }}>{r.body}</p>
                        <p style={{ fontSize:11, color:'#bbb', marginTop:8 }}>{r.review_date}{r.is_verified?' · ✓ Verified':''}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="right-col">

            {/* Quick info card replacing booking widget */}
            <div className="info-card">
              <div className="info-card-title">Tour Summary</div>
              {[
                { key:'Starting From', val: priceFmt+' / person' },
                { key:'Duration',      val: tour.duration||'—' },
                { key:'Group Size',    val: tour.group_size||'—' },
                { key:'Location',      val: tour.location||'—' },
                { key:'Rating',        val: rating ? `⭐ ${rating} (${tour.review_count} reviews)` : '—' },
                { key:'Tour Type',     val: typeTags.join(', ')||'—' },
              ].map(({ key, val }) => (
                <div key={key} className="info-row">
                  <span className="info-row-key">{key}</span>
                  <span className="info-row-val">{val}</span>
                </div>
              ))}
              <button className="info-book-btn" onClick={() => setShowBook(true)}>
                📅 Book This Tour
              </button>
              <div style={{ fontSize:11, color:'#bbb', textAlign:'center', marginTop:10, display:'flex', alignItems:'center', justifyContent:'center', gap:5 }}>
                <FontAwesomeIcon icon={faShieldHalved} style={{ fontSize:10 }} />
                Free cancellation · No payment today
              </div>
            </div>

            {/* FAQ */}
            {faqItems.length>0 && (
              <div id="faq">
                <FaqSection faqItems={faqItems} />
              </div>
            )}

          </div>

        </div>
      </div>
    </>
  );
}


// export async function generateMetadata({ params }) {
//   const { slug } = await params;
//   const tour = await getTour(slug);
//   return { title: tour.name };
// }
