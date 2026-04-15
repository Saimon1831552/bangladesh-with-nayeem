"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft, faChevronRight, faXmark,
  faImages, faExpand,
} from '@fortawesome/free-solid-svg-icons';

const ALL_IMAGES = [
  { src: "https://images.unsplash.com/photo-1587222318667-31212ce2828d?q=80&w=1400&auto=format&fit=crop", label: "Sundarbans Safari",  country: "Khulna"     },
  { src: "https://i.ibb.co.com/V08Hr3cP/0e6e0e79-db11-4a30-9292-a201d3995d4c.jpg",                      label: "Mangrove Forest",   country: "Bagerhat"   },
  { src: "https://i.ibb.co.com/0jhY9sWZ/Whats-App-Image-2026-03-29-at-9-35-28-PM.jpg",                  label: "Heritage Walk",     country: "Dhaka"      },
  { src: "https://i.ibb.co.com/BVKwKB7H/Whats-App-Image-2026-03-29-at-9-35-29-PM-1.jpg",               label: "Tea Gardens",       country: "Sylhet"     },
  { src: "https://i.ibb.co.com/JYcT3J5/Whats-App-Image-2026-03-29-at-9-35-29-PM.jpg",                  label: "Wildlife",          country: "Sundarbans" },
  { src: "https://i.ibb.co.com/mrfDMSzs/Whats-App-Image-2026-03-29-at-9-35-30-PM.jpg",                 label: "Street Food",       country: "Old Dhaka"  },
  { src: "https://i.ibb.co.com/Rtr7wd0/Whats-App-Image-2026-03-29-at-9-35-31-PM.jpg",                  label: "Boat Journey",      country: "Barisal"    },
];

const PREVIEW = ALL_IMAGES.slice(0, 6);
const EXTRA   = ALL_IMAGES.length - 6;

// Row 1: big-med-small  (7fr 3fr 2fr)
const ROW1 = [
  { idx: 0, cols: '7fr 3fr 2fr', height: 420 },
];
// Row 2: small-med-big  (2fr 3fr 7fr)
const ROW2 = [
  { idx: 3, cols: '2fr 3fr 7fr', height: 310 },
];

function GalleryCell({ img, idx, height, isLast, onOpen, onOpenFull }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative', overflow: 'hidden', borderRadius: 18,
        height, cursor: 'pointer', background: '#111',
        flex: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => isLast && EXTRA > 0 ? onOpenFull() : onOpen(idx)}
    >
      <img
        src={img.src}
        alt={img.label}
        loading={idx === 0 ? 'eager' : 'lazy'}
        style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          transition: 'transform 0.7s cubic-bezier(.25,.46,.45,.94)',
          transform: hovered ? 'scale(1.09)' : 'scale(1)',
        }}
      />

      {/* Always-on subtle bottom vignette */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 90,
        background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Full hover gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s',
        pointerEvents: 'none',
      }} />

      {/* Expand icon top-right */}
      {!isLast && (
        <div style={{
          position: 'absolute', top: 14, right: 14, zIndex: 3,
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 11,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scale(1)' : 'scale(0.65)',
          transition: 'all 0.3s cubic-bezier(.34,1.56,.64,1)',
        }}>
          <FontAwesomeIcon icon={faExpand} />
        </div>
      )}

      {/* Bottom label */}
      {!isLast && (
        <div style={{
          position: 'absolute', bottom: 16, left: 18, zIndex: 3,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 0.35s ease',
          pointerEvents: 'none',
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
            {img.label}
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 3, letterSpacing: '0.06em' }}>
            📍 {img.country}
          </div>
        </div>
      )}

      {/* +N overlay on last cell */}
      {isLast && EXTRA > 0 && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3,
          background: hovered ? 'rgba(8,8,7,0.80)' : 'rgba(8,8,7,0.68)',
          backdropFilter: 'blur(5px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 8, transition: 'background 0.3s', borderRadius: 18,
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '4.5rem', fontWeight: 700, color: '#fff', lineHeight: 1,
          }}>+{EXTRA}</div>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)',
            textTransform: 'uppercase', letterSpacing: '0.15em',
          }}>More Photos</div>
          <div style={{
            marginTop: 8, display: 'flex', alignItems: 'center', gap: 7,
            background: '#d97706', borderRadius: 99, padding: '9px 20px',
            fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '0.03em',
            transform: hovered ? 'translateY(-2px) scale(1.04)' : 'translateY(0) scale(1)',
            transition: 'transform 0.25s cubic-bezier(.34,1.56,.64,1)',
            boxShadow: hovered ? '0 8px 20px rgba(217,119,6,0.4)' : 'none',
          }}>
            <FontAwesomeIcon icon={faImages} style={{ fontSize: 11 }} />
            View Full Gallery
          </div>
        </div>
      )}

      {/* Border glow */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 18, zIndex: 4,
        border: hovered ? '1.5px solid rgba(255,255,255,0.14)' : '1.5px solid transparent',
        transition: 'border-color 0.35s', pointerEvents: 'none',
      }} />
    </div>
  );
}

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [fullOpen,    setFullOpen]    = useState(false);

  const openLb   = useCallback(i  => { setLightboxIdx(i); document.body.style.overflow = 'hidden'; }, []);
  const closeLb  = useCallback(()  => { setLightboxIdx(null); document.body.style.overflow = ''; }, []);
  const navLb    = useCallback(d   => setLightboxIdx(p => (p + d + ALL_IMAGES.length) % ALL_IMAGES.length), []);
  const openFull = useCallback(()  => { setFullOpen(true);  document.body.style.overflow = 'hidden'; }, []);
  const closeFull= useCallback(()  => { setFullOpen(false); document.body.style.overflow = ''; }, []);
  const fromFull = useCallback(i   => { setFullOpen(false); openLb(i); }, [openLb]);

  useEffect(() => {
    const h = e => {
      if (lightboxIdx !== null) {
        if (e.key === 'ArrowRight') navLb(1);
        if (e.key === 'ArrowLeft')  navLb(-1);
        if (e.key === 'Escape')     closeLb();
      } else if (fullOpen && e.key === 'Escape') closeFull();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [lightboxIdx, fullOpen, navLb, closeLb, closeFull]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,700;1,300;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .gl { background: linear-gradient(150deg, #090907 0%, #0c0e0a 60%, #08090a 100%); padding: 100px 40px 80px; position: relative; overflow: hidden; font-family: 'DM Sans', sans-serif; }
        .gl::before { content:''; position:absolute; top:-250px; left:-180px; width:650px; height:650px; background:radial-gradient(circle, rgba(21,128,61,0.08) 0%, transparent 68%); pointer-events:none; }
        .gl::after  { content:''; position:absolute; bottom:-180px; right:-120px; width:550px; height:550px; background:radial-gradient(circle, rgba(217,119,6,0.07) 0%, transparent 68%); pointer-events:none; }
        .gl-in { max-width: 1300px; margin: 0 auto; position: relative; z-index: 1; }

        /* Header */
        .gl-hd { display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 48px; margin-bottom: 56px; }
        .gl-ey { display: inline-flex; align-items: center; gap: 12px; margin-bottom: 18px; }
        .gl-ey-ln { width: 36px; height: 1.5px; background: linear-gradient(90deg, #d97706, #fbbf24); border-radius: 1px; }
        .gl-ey-tx { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .22em; color: #d97706; }
        .gl-h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.8rem, 4.5vw, 4.4rem); font-weight: 700; color: #fff; line-height: 1.01; margin-bottom: 16px; }
        .gl-h2 em { font-style: italic; font-weight: 300; color: #4ade80; }
        .gl-desc { font-size: 14px; color: rgba(255,255,255,0.32); line-height: 1.9; max-width: 360px; }
        .gl-sc { display: flex; align-items: center; gap: 0; }
        .gl-st { text-align: right; padding: 0 24px; }
        .gl-st:first-child { padding-left: 0; }
        .gl-stn { font-family: 'Cormorant Garamond', serif; font-size: 2.6rem; font-weight: 700; color: #fff; line-height: 1; }
        .gl-stl { font-size: 10px; text-transform: uppercase; letter-spacing: .12em; color: rgba(255,255,255,0.26); margin-top: 3px; }
        .gl-sdiv { width: 1px; height: 44px; background: rgba(255,255,255,0.08); }

        /* Grid rows */
        .gl-rows { display: flex; flex-direction: column; gap: 12px; }
        .gl-row { display: grid; gap: 12px; }

        /* Footer */
        .gl-ft { display: flex; align-items: center; justify-content: space-between; margin-top: 28px; flex-wrap: wrap; gap: 16px; }
        .gl-ft-note { font-size: 12px; color: rgba(255,255,255,0.2); letter-spacing: .05em; }
        .gl-ft-note b { color: rgba(255,255,255,0.42); font-weight: 600; }
        .gl-fbtns { display: flex; gap: 10px; flex-wrap: wrap; }
        .gl-btn-p { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; border-radius: 99px; background: #fff; color: #090907; font-size: 13px; font-weight: 700; border: none; cursor: pointer; transition: all .22s; font-family: 'DM Sans', sans-serif; }
        .gl-btn-p:hover { background: #d97706; color: #fff; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(217,119,6,0.32); }
        .gl-btn-g { display: inline-flex; align-items: center; gap: 7px; padding: 13px 22px; border-radius: 99px; background: transparent; border: 1px solid rgba(255,255,255,0.13); color: rgba(255,255,255,0.48); font-size: 13px; font-weight: 600; cursor: pointer; transition: all .22s; font-family: 'DM Sans', sans-serif; }
        .gl-btn-g:hover { border-color: rgba(255,255,255,0.35); color: #fff; }

        /* Full Gallery */
        @keyframes glFadeIn { from{opacity:0} to{opacity:1} }
        .fg { position: fixed; inset: 0; z-index: 9998; background: #060605; display: flex; flex-direction: column; animation: glFadeIn .28s ease; }
        .fg-hd { flex-shrink: 0; padding: 22px 40px; border-bottom: 1px solid rgba(255,255,255,0.07); display: flex; align-items: center; justify-content: space-between; }
        .fg-ttl { font-family: 'Cormorant Garamond', serif; font-size: 1.75rem; font-weight: 700; color: #fff; }
        .fg-ttl em { color: #d97706; font-style: italic; }
        .fg-meta { font-size: 11px; color: rgba(255,255,255,0.25); margin-top: 3px; letter-spacing: .07em; }
        .fg-cls { width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: #fff; font-size: 15px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s; }
        .fg-cls:hover { background: rgba(255,255,255,0.14); transform: rotate(90deg); }
        .fg-bd { flex: 1; overflow-y: auto; padding: 32px 40px 40px; }
        .fg-bd::-webkit-scrollbar { width: 4px; }
        .fg-bd::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 2px; }
        .fg-mason { columns: 3; column-gap: 14px; }
        .fg-itm { break-inside: avoid; margin-bottom: 14px; position: relative; border-radius: 16px; overflow: hidden; cursor: pointer; background: #111; }
        .fg-itm img { width: 100%; height: auto; display: block; transition: transform .55s ease; }
        .fg-itm:hover img { transform: scale(1.06); }
        .fg-ihov { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%); opacity: 0; transition: opacity .35s; display: flex; flex-direction: column; justify-content: flex-end; padding: 18px; }
        .fg-itm:hover .fg-ihov { opacity: 1; }
        .fg-ilbl { font-size: 13px; font-weight: 700; color: #fff; letter-spacing: .07em; text-transform: uppercase; transform: translateY(8px); transition: transform .3s; }
        .fg-icnt { font-size: 10px; color: rgba(255,255,255,0.5); margin-top: 3px; transform: translateY(8px); transition: transform .3s .04s; }
        .fg-itm:hover .fg-ilbl,
        .fg-itm:hover .fg-icnt { transform: translateY(0); }
        .fg-num { position: absolute; top: 12px; left: 12px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 3px 9px; font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.4); }
        .fg-ico { position: absolute; top: 12px; right: 12px; width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14); color: #fff; font-size: 11px; display: flex; align-items: center; justify-content: center; opacity: 0; transform: scale(0.8); transition: all .25s; }
        .fg-itm:hover .fg-ico { opacity: 1; transform: scale(1); }

        /* Lightbox */
        .lb { position: fixed; inset: 0; z-index: 9999; background: rgba(3,3,2,0.98); backdrop-filter: blur(32px); display: flex; align-items: center; justify-content: center; animation: glFadeIn .2s ease; }
        .lb-top { position: absolute; top: 0; left: 0; right: 0; display: flex; align-items: center; justify-content: space-between; padding: 22px 30px; }
        .lb-ctr { font-size: 11px; color: rgba(255,255,255,0.3); letter-spacing: .14em; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07); padding: 6px 14px; border-radius: 99px; font-family: 'DM Sans', sans-serif; }
        .lb-cls { width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.09); color: #fff; font-size: 15px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s; }
        .lb-cls:hover { background: rgba(255,255,255,0.14); transform: rotate(90deg); }
        .lb-img { max-width: 86vw; max-height: 78vh; object-fit: contain; border-radius: 14px; display: block; box-shadow: 0 32px 80px rgba(0,0,0,0.7); }
        .lb-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 52px; height: 52px; border-radius: 50%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.09); color: #fff; font-size: 17px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .22s; }
        .lb-nav:hover { background: rgba(255,255,255,0.16); transform: translateY(-50%) scale(1.08); }
        .lb-bot { position: absolute; bottom: 0; left: 0; right: 0; display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 0 30px 22px; }
        .lb-lrow { display: flex; align-items: center; gap: 8px; }
        .lb-lbl { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.38); letter-spacing: .12em; text-transform: uppercase; }
        .lb-lcnt { font-size: 10px; color: rgba(255,255,255,0.22); }
        .lb-thumbs { display: flex; gap: 7px; max-width: 88vw; overflow-x: auto; padding: 2px; }
        .lb-thumbs::-webkit-scrollbar { display: none; }
        .lb-th { width: 46px; height: 30px; border-radius: 7px; object-fit: cover; opacity: .3; cursor: pointer; border: 2px solid transparent; transition: all .2s; flex-shrink: 0; }
        .lb-th:hover { opacity: .6; }
        .lb-th.on { opacity: 1; border-color: #d97706; }

        @media(max-width:960px){ .gl { padding: 72px 24px 60px; } .gl-hd { grid-template-columns: 1fr; } .fg-hd { padding: 18px 24px; } .fg-bd { padding: 20px 24px 28px; } .fg-mason { columns: 2; } }
        @media(max-width:600px){ .gl-row { grid-template-columns: 1fr !important; } .fg-mason { columns: 1; } }
      `}</style>

      <section className="gl">
        <div className="gl-in">

          {/* Header */}
          <div className="gl-hd">
            <div>
              <div className="gl-ey">
                <span className="gl-ey-ln" />
                <span className="gl-ey-tx">Tourist Gallery</span>
                <span className="gl-ey-ln" />
              </div>
              <h2 className="gl-h2">Memories made in<br /><em>Beautiful Bangladesh</em></h2>
              <p className="gl-desc">Private tours for those who seek authenticity, wonder, and stories worth telling for a lifetime.</p>
            </div>
            <div className="gl-sc">
              {[
                { n: '4k+',  l: 'Travellers' },
                { n: '4.9★', l: 'Avg Rating' },
                { n: '100%', l: 'Private'    },
              ].map((s, i) => (
                <React.Fragment key={s.l}>
                  {i > 0 && <div className="gl-sdiv" />}
                  <div className="gl-st">
                    <div className="gl-stn">{s.n}</div>
                    <div className="gl-stl">{s.l}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Two-Row Grid */}
          <div className="gl-rows">

            {/* ROW 1 — big | med | small */}
            <div className="gl-row" style={{ gridTemplateColumns: '7fr 3fr 2fr' }}>
              {[0, 1, 2].map(idx => (
                <GalleryCell key={idx} img={PREVIEW[idx]} idx={idx} height={420} isLast={false} onOpen={openLb} onOpenFull={openFull} />
              ))}
            </div>

            {/* ROW 2 — small | med | big (last has +N) */}
            <div className="gl-row" style={{ gridTemplateColumns: '2fr 3fr 7fr' }}>
              {[3, 4, 5].map(idx => (
                <GalleryCell key={idx} img={PREVIEW[idx]} idx={idx} height={310} isLast={idx === 5} onOpen={openLb} onOpenFull={openFull} />
              ))}
            </div>

          </div>

          {/* Footer */}
          <div className="gl-ft">
            <div className="gl-ft-note">Showing <b>6</b> of <b>{ALL_IMAGES.length}</b> photos</div>
            <div className="gl-fbtns">
              <button className="gl-btn-p" onClick={openFull}>
                <FontAwesomeIcon icon={faImages} style={{ fontSize: 13 }} />
                View Full Gallery
              </button>
              <button className="gl-btn-g">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Full Gallery Modal */}
      {fullOpen && (
        <div className="fg">
          <div className="fg-hd">
            <div>
              <div className="fg-ttl">Photo <em>Gallery</em></div>
              <div className="fg-meta">{ALL_IMAGES.length} photos · click any image to expand</div>
            </div>
            <button className="fg-cls" onClick={closeFull}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="fg-bd">
            <div className="fg-mason">
              {ALL_IMAGES.map((img, i) => (
                <div key={i} className="fg-itm" onClick={() => fromFull(i)}>
                  <img src={img.src} alt={img.label} loading="lazy" />
                  <div className="fg-ihov">
                    <div className="fg-ilbl">{img.label}</div>
                    <div className="fg-icnt">📍 {img.country}</div>
                  </div>
                  <div className="fg-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="fg-ico"><FontAwesomeIcon icon={faExpand} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="lb" onClick={closeLb}>
          <div className="lb-top">
            <div className="lb-ctr">{lightboxIdx + 1} / {ALL_IMAGES.length}</div>
            <button className="lb-cls" onClick={closeLb}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <button className="lb-nav" style={{ left: 20 }} onClick={e => { e.stopPropagation(); navLb(-1); }}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <img
            className="lb-img"
            src={ALL_IMAGES[lightboxIdx].src}
            alt={ALL_IMAGES[lightboxIdx].label}
            onClick={e => e.stopPropagation()}
          />

          <button className="lb-nav" style={{ right: 20 }} onClick={e => { e.stopPropagation(); navLb(1); }}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>

          <div className="lb-bot" onClick={e => e.stopPropagation()}>
            <div className="lb-lrow">
              <span className="lb-lbl">{ALL_IMAGES[lightboxIdx].label}</span>
              <span className="lb-lcnt">· {ALL_IMAGES[lightboxIdx].country}</span>
            </div>
            <div className="lb-thumbs">
              {ALL_IMAGES.map((img, i) => (
                <img key={i} className={`lb-th ${i === lightboxIdx ? 'on' : ''}`}
                  src={img.src} alt={img.label} onClick={() => setLightboxIdx(i)} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}