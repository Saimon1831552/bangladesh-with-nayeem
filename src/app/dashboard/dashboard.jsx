"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, ADMIN_EMAILS } from "@/auth/firebase";

// ── Google Font injection ─────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --font-display: 'Playfair Display', Georgia, serif;
      --font-body: 'Plus Jakarta Sans', system-ui, sans-serif;
      --ink: #0D0D0D;
      --ink-2: #3D3D3D;
      --ink-3: #7A7A7A;
      --ink-4: #B0B0B0;
      --surface: #FFFFFF;
      --surface-2: #F7F6F3;
      --surface-3: #F0EEE9;
      --border: #E8E5DF;
      --border-2: #D4D0C8;
      --accent: #1A6B4A;
      --accent-2: #22885E;
      --accent-soft: #EAF4EF;
      --accent-text: #0F4A32;
      --amber: #C47A1A;
      --amber-soft: #FDF4E3;
      --violet: #5B3FBE;
      --violet-soft: #F0ECFA;
      --rose: #C0344A;
      --rose-soft: #FDEEF1;
      --blue: #1A5FA8;
      --blue-soft: #EBF3FC;
      --sidebar-bg: #0D1117;
      --sidebar-border: rgba(255,255,255,0.07);
      --sidebar-text: rgba(255,255,255,0.5);
      --sidebar-text-active: #FFFFFF;
      --sidebar-hover: rgba(255,255,255,0.05);
      --sidebar-active: rgba(26,107,74,0.25);
      --sidebar-accent: #1A6B4A;
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --radius-xl: 20px;
      --radius-2xl: 24px;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04);
      --shadow-md: 0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04);
      --shadow-lg: 0 12px 40px rgba(0,0,0,0.12);
    }
    html, body { height: 100%; overflow: hidden; }
    body { font-family: var(--font-body); color: var(--ink); background: var(--surface-2); -webkit-font-smoothing: antialiased; }
    input, select, textarea, button { font-family: var(--font-body); }

    /* When admin panel is active, the fixed overlay covers everything.
       Also hide Next.js / CRA layout children so they don't bleed through. */
    body.admin-panel-active { overflow: hidden !important; }

    /* Target Next.js app router layout wrappers */
    body.admin-panel-active > #__next > *:not([data-admin-portal]),
    body.admin-panel-active > div:not([data-admin-root]):not([data-admin-portal]) {
      visibility: hidden !important;
      pointer-events: none !important;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border-2); border-radius: 99px; }

    /* Animations */
    @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
    @keyframes popIn  { from { opacity:0; transform:scale(.96) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }
    @keyframes slideRight { from { opacity:0; transform:translateX(-12px); } to { opacity:1; transform:translateX(0); } }
    @keyframes toastIn { from { opacity:0; transform:translateY(16px) scale(.97); } to { opacity:1; transform:translateY(0) scale(1); } }
    @keyframes spin { to { transform:rotate(360deg); } }
    @keyframes shimmer { 0%,100%{opacity:1} 50%{opacity:.4} }

    .anim-fade-up { animation: fadeUp 0.35s ease both; }
    .anim-pop    { animation: popIn  0.25s cubic-bezier(.34,1.4,.64,1) both; }
    .anim-slide  { animation: slideRight 0.3s ease both; }

    /* Form elements */
    .inp {
      width:100%; padding:10px 14px; background:var(--surface);
      border:1.5px solid var(--border); border-radius:var(--radius-md);
      font-size:14px; color:var(--ink); outline:none; transition:border-color .15s,box-shadow .15s;
    }
    .inp:focus { border-color:var(--accent); box-shadow:0 0 0 3px rgba(26,107,74,.1); }
    .inp::placeholder { color:var(--ink-4); }
    select.inp { background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%237A7A7A' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 10px center; padding-right:34px; appearance:none; cursor:pointer; }
    textarea.inp { resize:vertical; min-height:88px; }

    /* Toggle */
    .toggle-wrap { position:relative; width:44px; height:24px; flex-shrink:0; }
    .toggle-wrap input { opacity:0; width:0; height:0; position:absolute; }
    .toggle-track { position:absolute; inset:0; background:#D4D0C8; border-radius:99px; transition:background .2s; cursor:pointer; }
    .toggle-wrap input:checked + .toggle-track { background:var(--accent); }
    .toggle-thumb { position:absolute; top:3px; left:3px; width:18px; height:18px; background:#fff; border-radius:50%; box-shadow:0 1px 4px rgba(0,0,0,.15); transition:transform .2s; pointer-events:none; }
    .toggle-wrap input:checked ~ .toggle-thumb { transform:translateX(20px); }

    /* Table hover */
    .tbl-row:hover { background:var(--surface-2); }
    .tbl-row .row-actions { opacity:0; transition:opacity .15s; }
    .tbl-row:hover .row-actions { opacity:1; }

    /* Nav active bar */
    .nav-link { position:relative; transition:all .15s; }
    .nav-link.active::before { content:''; position:absolute; left:0; top:50%; transform:translateY(-50%); width:3px; height:60%; background:var(--sidebar-accent); border-radius:0 3px 3px 0; }

    /* Stat card accent bar */
    .stat-bar { height:3px; border-radius:99px; margin-bottom:18px; }

    /* Image hover scale */
    .img-hover { transition:transform .4s ease; }
    .gallery-card:hover .img-hover { transform:scale(1.06); }

    /* Button variants */
    .btn { display:inline-flex; align-items:center; gap:7px; padding:9px 18px; border-radius:var(--radius-md); font-size:13.5px; font-weight:600; cursor:pointer; transition:all .15s; border:none; }
    .btn-primary { background:var(--accent); color:#fff; box-shadow:0 2px 8px rgba(26,107,74,.25); }
    .btn-primary:hover { background:var(--accent-2); transform:translateY(-1px); box-shadow:0 4px 14px rgba(26,107,74,.3); }
    .btn-ghost { background:var(--surface-3); color:var(--ink-2); border:1.5px solid var(--border); }
    .btn-ghost:hover { background:var(--surface-2); border-color:var(--border-2); }
    .btn-danger { background:var(--rose-soft); color:var(--rose); border:1.5px solid #f5c2cb; }
    .btn-danger:hover { background:#fbd4da; }
    .btn-icon { width:34px; height:34px; padding:0; display:inline-flex; align-items:center; justify-content:center; border-radius:var(--radius-sm); background:var(--surface); border:1.5px solid var(--border); color:var(--ink-3); cursor:pointer; transition:all .15s; }
    .btn-icon:hover { border-color:var(--border-2); color:var(--ink); background:var(--surface-2); }
    .btn-icon.edit:hover { background:var(--accent-soft); border-color:#b2d9c6; color:var(--accent); }
    .btn-icon.del:hover  { background:var(--rose-soft);   border-color:#f5c2cb;  color:var(--rose); }

    /* Badge */
    .badge { display:inline-flex; align-items:center; padding:3px 10px; border-radius:99px; font-size:11.5px; font-weight:600; letter-spacing:.01em; }

    /* Search wrapper */
    .search-wrap { position:relative; }
    .search-wrap svg { position:absolute; left:12px; top:50%; transform:translateY(-50%); pointer-events:none; }
    .search-wrap input { padding-left:38px; }

    /* Section fade stagger */
    .stagger > * { animation:fadeUp .3s ease both; }
    .stagger > *:nth-child(1){animation-delay:.02s}
    .stagger > *:nth-child(2){animation-delay:.06s}
    .stagger > *:nth-child(3){animation-delay:.10s}
    .stagger > *:nth-child(4){animation-delay:.14s}
    .stagger > *:nth-child(5){animation-delay:.18s}
    .stagger > *:nth-child(6){animation-delay:.22s}
  `}</style>
);

// ── API layer (unchanged from original) ──────────────────────────────────────
const FORCE_MOCK_API = false;
const API_BASE = "https://bangladesh-with-nayeem-production.up.railway.app/api";

let mockStorage = {
  tours: [
    { id:1, slug:"sylhet-tea-gardens", title:"Sylhet Tea Gardens & Waterfalls", image_url:"https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=400&q=80", location:"Sylhet, Bangladesh", duration:"2 Days, 1 Night", group_size:"2 - 8 People", price:180.00, rating:4.8, review_count:89, tour_type:"multiday,day" },
    { id:2, slug:"sundarbans-safari", title:"Sundarbans Wildlife Safari", image_url:"https://images.unsplash.com/photo-1610369888494-dfc5bc796e95?w=400&q=80", location:"Khulna, Bangladesh", duration:"3 Days, 2 Nights", group_size:"4 - 12 People", price:250.00, rating:4.9, review_count:142, tour_type:"adventure,multiday" },
  ],
  blogs: [
    { id:1, slug:"/blogs/sylhet-guide", title:"A Complete Guide to Sylhet", excerpt:"Discover the lush green tea gardens and serene waterfalls.", image_url:"https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=400&q=80", category:"Travel Tips", publish_date:"2026-04-10", read_time:"5 min read", author:"Jane Doe", author_img:"https://i.pravatar.cc/150?u=jane", is_featured:1 },
  ],
  reviews: [
    { id:1, tour_id:1, tour_name:"Sylhet Tea Gardens & Waterfalls", name:"John Smith", country:"USA", initials:"JS", color_hex:"#115E59", bg_hex:"#CCFBF1", review_date:"April 2026", rating:5, title:"Amazing experience!", body:"The tea gardens were absolutely breathtaking. Highly recommend this tour to anyone.", helpful_votes:12, is_verified:1 },
  ],
  gallery: [
    { id:1, tour_id:1, image_url:"https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=400&q=80", alt_text:"Sylhet tea gardens view", tour_title:"Sylhet Tea Gardens & Waterfalls", uploaded_at:new Date().toISOString() },
  ],
};

const parseQuery = (url) => { const [path,qs]=url.split('?'); return {path, params:new URLSearchParams(qs||'')}; };

const mockApi = {
  get: async (url) => new Promise(resolve => setTimeout(() => {
    const {path,params}=parseQuery(url); const resource=path.split('/')[1];
    let data=[...(mockStorage[resource]||[])];
    if(resource==='gallery') data=data.map(g=>{const t=mockStorage.tours.find(x=>x.id===g.tour_id);return{...g,tour_title:t?t.title:null};});
    if(resource==='tours'&&params.get('tour_type')) data=data.filter(d=>d.tour_type?.includes(params.get('tour_type')));
    if(resource==='tours'&&params.get('location')) data=data.filter(d=>d.location?.toLowerCase().includes(params.get('location').toLowerCase()));
    if(resource==='blogs'&&params.get('category')) data=data.filter(d=>d.category===params.get('category'));
    if(resource==='blogs'&&params.get('featured')) data=data.filter(d=>String(d.is_featured)===(params.get('featured')==='true'?'1':'0'));
    if(resource==='reviews'&&params.get('rating')) data=data.filter(d=>String(d.rating)===params.get('rating'));
    if(resource==='reviews'&&params.get('verified')) data=data.filter(d=>String(d.is_verified)==='1');
    if(resource==='gallery'&&params.get('tour_id')) data=data.filter(d=>String(d.tour_id)===params.get('tour_id'));
    resolve({success:true,data,count:data.length});
  },200)),
  post: async (url,body) => new Promise(resolve => setTimeout(()=>{const resource=parseQuery(url).path.split('/')[1];const newItem={id:Date.now(),...body,uploaded_at:new Date().toISOString()};mockStorage[resource]=[newItem,...mockStorage[resource]];resolve({success:true,data:newItem});},200)),
  put: async (url,body) => new Promise(resolve => setTimeout(()=>{const parts=parseQuery(url).path.split('/');const resource=parts[1];const id=Number(parts[2]);const index=mockStorage[resource].findIndex(item=>item.id===id);if(index>-1){mockStorage[resource][index]={...mockStorage[resource][index],...body};resolve({success:true,data:mockStorage[resource][index]});}else{resolve({success:false,message:"Record not found"});}},200)),
  delete: async (url) => new Promise(resolve => setTimeout(()=>{const parts=parseQuery(url).path.split('/');const resource=parts[1];const id=Number(parts[2]);mockStorage[resource]=mockStorage[resource].filter(item=>item.id!==id);resolve({success:true});},200)),
};

const safeFetch = async (method,path,body=null) => {
  if(FORCE_MOCK_API) return mockApi[method.toLowerCase()](path,body);
  try {
    const options={method,headers:{"Content-Type":"application/json"},...(body&&{body:JSON.stringify(body)})};
    const res=await fetch(`${API_BASE}${path}`,options);
    if(!res.ok){const e=await res.json().catch(()=>({}));return{success:false,message:e.message||`HTTP ${res.status}`};}
    return await res.json();
  } catch(err) {
    console.warn(`Falling back to Mock API for ${path}:`,err.message);
    return mockApi[method.toLowerCase()](path,body);
  }
};

const api = {
  get:(p)=>safeFetch('GET',p),
  post:(p,b)=>safeFetch('POST',p,b),
  put:(p,b)=>safeFetch('PUT',p,b),
  patch:(p,b)=>safeFetch('PATCH',p,b),
  delete:(p)=>safeFetch('DELETE',p),
};

// ── SVG Icon system ───────────────────────────────────────────────────────────
const Ico = ({ d, size=16, stroke=1.75, fill="none", className="", style={} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
    strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d={d}/>
  </svg>
);
const P = {
  home:    "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  tours:   "M3 12h18M3 6h18M3 18h7 M16 18l2 2 4-4",
  blogs:   "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  reviews: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  gallery: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  plus:    "M12 5v14M5 12h14",
  edit:    "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:   "M3 6h18M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2",
  search:  "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0",
  close:   "M18 6L6 18M6 6l12 12",
  check:   "M20 6L9 17l-5-5",
  map:     "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  refresh: "M23 4v6h-6M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
  star:    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  arrow:   "M7 17L17 7M7 7h10v10",
  grid:    "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
  list:    "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  clock:   "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z M12 6v6l4 2",
  user:    "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  bell:    "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  globe:   "M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
};

// ── Design tokens ─────────────────────────────────────────────────────────────
const BADGE_MAP = {
  teal:   { bg:"var(--accent-soft)", color:"var(--accent-text)", border:"#b2d9c6" },
  amber:  { bg:"var(--amber-soft)",  color:"#7A4A00",            border:"#f5d98a" },
  violet: { bg:"var(--violet-soft)", color:"#3B2490",            border:"#c4b5f4" },
  rose:   { bg:"var(--rose-soft)",   color:"var(--rose)",        border:"#f5c2cb" },
  blue:   { bg:"var(--blue-soft)",   color:"var(--blue)",        border:"#aecbee" },
  gray:   { bg:"var(--surface-3)",   color:"var(--ink-2)",       border:"var(--border)" },
};

// ── Primitive Components ──────────────────────────────────────────────────────
const Badge = ({ children, color="teal" }) => {
  const t = BADGE_MAP[color] || BADGE_MAP.gray;
  return (
    <span className="badge" style={{ background:t.bg, color:t.color, border:`1px solid ${t.border}` }}>
      {children}
    </span>
  );
};

const Spinner = () => (
  <div style={{ width:18, height:18, border:"2.5px solid var(--border)", borderTopColor:"var(--accent)", borderRadius:"50%", animation:"spin 0.7s linear infinite" }} />
);

const EmptyState = ({ label }) => (
  <div style={{ padding:"48px 24px", textAlign:"center", background:"var(--surface-2)", borderRadius:"var(--radius-lg)", border:"1.5px dashed var(--border)" }}>
    <div style={{ width:44, height:44, background:"var(--surface-3)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", color:"var(--ink-4)" }}>
      <Ico d={P.search} size={20} />
    </div>
    <p style={{ fontSize:14, color:"var(--ink-3)", fontWeight:500 }}>{label}</p>
  </div>
);

// ── Toast ─────────────────────────────────────────────────────────────────────
const Toast = ({ msg, type, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  const ok = type === "success";
  return (
    <div style={{
      position:"fixed", bottom:28, right:28, zIndex:9999,
      display:"flex", alignItems:"center", gap:12,
      padding:"14px 20px", borderRadius:"var(--radius-lg)",
      background:"var(--sidebar-bg)", color:"#fff",
      boxShadow:"0 20px 60px rgba(0,0,0,.25)", animation:"toastIn .3s ease both",
      border:`1px solid ${ok?"rgba(26,107,74,.4)":"rgba(192,52,74,.4)"}`,
      fontSize:14, fontWeight:500, minWidth:260,
    }}>
      <div style={{ width:30, height:30, borderRadius:"50%", background:ok?"rgba(26,107,74,.25)":"rgba(192,52,74,.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:ok?"#4ade80":"#f87171" }}>
        <Ico d={ok?P.check:P.close} size={14} stroke={2.5} />
      </div>
      <span style={{ flex:1 }}>{msg}</span>
      <button onClick={onClose} style={{ background:"transparent", border:"none", color:"rgba(255,255,255,.4)", cursor:"pointer", padding:4, display:"flex" }}>
        <Ico d={P.close} size={14} />
      </button>
    </div>
  );
};

// ── Confirm Dialog ────────────────────────────────────────────────────────────
const ConfirmDialog = ({ msg, onConfirm, onCancel }) => (
  <div style={{ position:"fixed", inset:0, zIndex:1100, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(13,13,13,.5)", backdropFilter:"blur(6px)", padding:16 }}>
    <div className="anim-pop" style={{ background:"var(--surface)", borderRadius:"var(--radius-2xl)", boxShadow:"var(--shadow-lg)", width:"100%", maxWidth:380, padding:32, border:"1px solid var(--border)" }}>
      <div style={{ width:56, height:56, borderRadius:"var(--radius-lg)", background:"var(--rose-soft)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", color:"var(--rose)" }}>
        <Ico d={P.trash} size={26} />
      </div>
      <h3 style={{ textAlign:"center", fontFamily:"var(--font-display)", fontSize:20, fontWeight:700, color:"var(--ink)", marginBottom:8 }}>Are you sure?</h3>
      <p style={{ textAlign:"center", fontSize:14, color:"var(--ink-3)", lineHeight:1.6, marginBottom:28 }}>{msg}</p>
      <div style={{ display:"flex", gap:10 }}>
        <button className="btn btn-ghost" style={{ flex:1, justifyContent:"center" }} onClick={onCancel}>Cancel</button>
        <button className="btn btn-danger" style={{ flex:1, justifyContent:"center" }} onClick={onConfirm}>Delete</button>
      </div>
    </div>
  </div>
);

// ── Modal ─────────────────────────────────────────────────────────────────────
const Modal = ({ title, onClose, children, wide }) => (
  <div style={{ position:"fixed", inset:0, zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(13,13,13,.5)", backdropFilter:"blur(6px)", padding:16 }}>
    <div className="anim-pop" style={{ background:"var(--surface)", borderRadius:"var(--radius-2xl)", boxShadow:"var(--shadow-lg)", width:"100%", maxWidth:wide?740:540, maxHeight:"78vh", display:"flex", flexDirection:"column", border:"1px solid var(--border)" }}>
      <div style={{ display:"flex", alignItems:"center", padding:"20px 24px", borderBottom:"1px solid var(--border)", flexShrink:0 }}>
        <h3 style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:700, color:"var(--ink)", flex:1 }}>{title}</h3>
        <button className="btn-icon" onClick={onClose}><Ico d={P.close} size={16} /></button>
      </div>
      <div style={{ padding:24, overflowY:"auto", flex:1 }}>{children}</div>
    </div>
  </div>
);

// ── Field wrapper ─────────────────────────────────────────────────────────────
const Field = ({ label, required, children }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
    <label style={{ fontSize:12, fontWeight:700, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".06em" }}>
      {label}{required && <span style={{ color:"var(--rose)", marginLeft:3 }}>*</span>}
    </label>
    {children}
  </div>
);

// ── Grid helper ───────────────────────────────────────────────────────────────
const Grid = ({ cols=2, gap=16, children, style={} }) => (
  <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap, ...style }}>{children}</div>
);

// ── SearchBar ─────────────────────────────────────────────────────────────────
const SearchBar = ({ value, onChange, placeholder, children }) => (
  <div style={{ display:"flex", flexWrap:"wrap", gap:10, alignItems:"center", marginBottom:18 }}>
    <div className="search-wrap" style={{ flex:1, minWidth:220 }}>
      <Ico d={P.search} size={16} style={{ color:"var(--ink-4)" }} />
      <input className="inp" value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{ paddingLeft:38 }} />
    </div>
    {children}
  </div>
);

// ── Table ─────────────────────────────────────────────────────────────────────
const Table = ({ cols, rows, onEdit, onDelete, renderCell }) => (
  <div style={{ background:"var(--surface)", borderRadius:"var(--radius-xl)", border:"1px solid var(--border)", overflow:"hidden", boxShadow:"var(--shadow-sm)" }}>
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13.5 }}>
        <thead>
          <tr style={{ background:"var(--surface-2)", borderBottom:"1px solid var(--border)" }}>
            {cols.map(c => (
              <th key={c} style={{ padding:"12px 18px", textAlign:"left", fontSize:11, fontWeight:700, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".07em", whiteSpace:"nowrap" }}>{c}</th>
            ))}
            <th style={{ padding:"12px 18px", textAlign:"right", fontSize:11, fontWeight:700, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".07em" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={cols.length+1} style={{ padding:"52px 24px", textAlign:"center", color:"var(--ink-4)", fontSize:14, fontWeight:500 }}>No records found.</td></tr>
          ) : rows.map(row => (
            <tr key={row.id} className="tbl-row" style={{ borderTop:"1px solid var(--border)", transition:"background .12s" }}>
              {renderCell(row)}
              <td style={{ padding:"12px 18px", textAlign:"right" }}>
                <div className="row-actions" style={{ display:"inline-flex", gap:6 }}>
                  <button className="btn-icon edit" onClick={()=>onEdit(row)} title="Edit"><Ico d={P.edit} size={14} /></button>
                  <button className="btn-icon del"  onClick={()=>onDelete(row)} title="Delete"><Ico d={P.trash} size={14} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ title, icon, onAdd, count, loading, onRefresh, extra, children, addButtonText="Add New" }) {
  return (
    <div className="stagger" style={{ display:"flex", flexDirection:"column", gap:20 }}>
      {/* Header */}
      <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:14, background:"var(--surface)", borderRadius:"var(--radius-xl)", border:"1px solid var(--border)", padding:"18px 22px", boxShadow:"var(--shadow-sm)" }}>
        <div style={{ width:44, height:44, borderRadius:"var(--radius-md)", background:"var(--accent-soft)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--accent)", flexShrink:0 }}>
          <Ico d={icon} size={20} />
        </div>
        <div style={{ flex:1 }}>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:700, color:"var(--ink)", lineHeight:1.1 }}>{title}</h2>
          <p style={{ fontSize:13, color:"var(--ink-3)", marginTop:2 }}>{loading ? "Syncing…" : `${count} record${count!==1?"s":""}`}</p>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
          {extra}
          <button className="btn-icon" onClick={onRefresh} title="Refresh" style={{ color:loading?"var(--accent)":"var(--ink-3)" }}>
            {loading ? <Spinner /> : <Ico d={P.refresh} size={16} />}
          </button>
          <button className="btn btn-primary" onClick={onAdd}>
            <Ico d={P.plus} size={14} stroke={2.5} />
            {addButtonText}
          </button>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

// ── TOURS SECTION ─────────────────────────────────────────────────────────────
const TOUR_DEFAULTS = { slug:"", title:"", overview:"", image_url:"", location:"", duration:"", group_size:"", price:"", rating:"", review_count:"", tour_type:"", highlights:"[]", why_choose:"[]", itinerary:"[]", trip_note:"", faq:"[]", isFeatured:0 };

function ToursSection({ toast }) {
  const [data,setData]=useState([]); const [search,setSearch]=useState(""); const [filterType,setFilterType]=useState(""); const [filterLoc,setFilterLoc]=useState("");
  const [modal,setModal]=useState(null); const [form,setForm]=useState(TOUR_DEFAULTS); const [confirm,setConfirm]=useState(null); const [loading,setLoading]=useState(false);

  const load = useCallback(async()=>{
    setLoading(true);
    try{ let q="/tours?"; if(filterType)q+=`tour_type=${filterType}&`; if(filterLoc)q+=`location=${filterLoc}&`; const res=await api.get(q); setData(res.data||[]); }
    finally{setLoading(false);}
  },[filterType,filterLoc]);

  useEffect(()=>{load();},[load]);
  const filtered=data.filter(r=>r.title?.toLowerCase().includes(search.toLowerCase())||r.location?.toLowerCase().includes(search.toLowerCase()));
  
  const openAdd=()=>{setForm(TOUR_DEFAULTS);setModal("add");};
  
  const openEdit=(r)=>{
    // Parse JSON safely for the textareas if the API returned them as objects/arrays
    let hl = r.highlights;
    let it = r.itinerary;
    let wc = r.why_choose;
    let fq = r.faq;
    if (typeof hl === 'object' && hl !== null) hl = JSON.stringify(hl, null, 2);
    if (typeof it === 'object' && it !== null) it = JSON.stringify(it, null, 2);
    if (typeof wc === 'object' && wc !== null) wc = JSON.stringify(wc, null, 2);
    if (typeof fq === 'object' && fq !== null) fq = JSON.stringify(fq, null, 2);

    setForm({
      ...r,
      highlights: hl || "[]",
      itinerary: it || "[]",
      why_choose: wc || "[]",
      faq: fq || "[]",
      overview: r.overview || "",
      trip_note: r.trip_note || "",
    });
    setModal("edit");
  };

  const save=async()=>{
    // Validate JSON before sending to backend
    let parsedHighlights = [];
    let parsedItinerary = [];
    let parsedWhyChoose = [];
    let parsedFaq = [];
    try {
      parsedHighlights = JSON.parse(form.highlights || "[]");
      parsedItinerary = JSON.parse(form.itinerary || "[]");
      parsedWhyChoose = JSON.parse(form.why_choose || "[]");
      parsedFaq = JSON.parse(form.faq || "[]");
    } catch(e) {
      toast("Invalid JSON format in one of the JSON fields", "error");
      return;
    }

    const body={
      ...form,
      price:form.price?Number(form.price):null,
      rating:form.rating?Number(form.rating):null,
      review_count:Number(form.review_count)||0,
      isFeatured:form.isFeatured?1:0,
      highlights: parsedHighlights,
      itinerary: parsedItinerary,
      why_choose: parsedWhyChoose,
      faq: parsedFaq,
      overview: form.overview || null,
      trip_note: form.trip_note || null,
    };

    const res=modal==="add"?await api.post("/tours",body):await api.put(`/tours/${form.id}`,body);
    if(res.success){toast("Tour saved successfully","success");setModal(null);load();}else toast(res.message||"Failed to save","error");
  };

  const remove=async()=>{
    const res=await api.delete(`/tours/${confirm.id}`);
    if(res.success){toast("Tour deleted","success");load();}else toast(res.message||"Failed","error");
    setConfirm(null);
  };
  const f=(k)=>(e)=>setForm(p=>({...p,[k]:e.target.value}));
  const tourTypes=["day","multiday","holiday","adventure","cultural"];

  return (
    <Section title="Tours" icon={P.tours} onAdd={openAdd} count={data.length} loading={loading} onRefresh={load} addButtonText="New Tour">
      <SearchBar value={search} onChange={setSearch} placeholder="Search by name or destination…">
        <select className="inp" value={filterType} onChange={e=>setFilterType(e.target.value)} style={{width:"auto",minWidth:140}}>
          <option value="">All Types</option>
          {tourTypes.map(t=><option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
        </select>
        <input className="inp" value={filterLoc} onChange={e=>setFilterLoc(e.target.value)} placeholder="Location filter" style={{width:160}} />
      </SearchBar>

      <Table
        cols={["Tour","Destination","Details","Price","Rating","Type"]}
        rows={filtered} onEdit={openEdit} onDelete={setConfirm}
        renderCell={r=>(
          <>
            <td style={{padding:"14px 18px"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                {r.image_url
                  ?<img src={r.image_url} alt="" style={{width:48,height:48,borderRadius:"var(--radius-md)",objectFit:"cover",flexShrink:0,border:"1px solid var(--border)"}} onError={e=>{e.target.style.display="none"}} />
                  :<div style={{width:48,height:48,borderRadius:"var(--radius-md)",background:"var(--surface-3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:"var(--ink-4)"}}><Ico d={P.tours} size={18}/></div>
                }
                <div>
                  <p style={{fontWeight:700,color:"var(--ink)",fontSize:14,marginBottom:3}}>{r.title}</p>
                  <code style={{fontSize:11,background:"var(--surface-3)",color:"var(--ink-3)",padding:"1px 6px",borderRadius:4}}>{r.slug}</code>
                </div>
              </div>
            </td>
            <td style={{padding:"14px 18px"}}>
              <span style={{display:"flex",alignItems:"center",gap:5,fontSize:13,color:"var(--ink-2)"}}>
                <Ico d={P.map} size={13} style={{color:"var(--accent)",flexShrink:0}} />{r.location}
              </span>
            </td>
            <td style={{padding:"14px 18px",fontSize:12.5,color:"var(--ink-3)"}}>
              <div style={{marginBottom:3}}><span style={{fontWeight:600,color:"var(--ink-2)"}}>Time: </span>{r.duration}</div>
              <div><span style={{fontWeight:600,color:"var(--ink-2)"}}>Size: </span>{r.group_size}</div>
            </td>
            <td style={{padding:"14px 18px"}}><span style={{fontWeight:800,fontSize:16,color:"var(--ink)"}}>{r.price?`$${r.price}`:"—"}</span></td>
            <td style={{padding:"14px 18px"}}>
              {r.rating
                ?<span style={{display:"inline-flex",alignItems:"center",gap:5,background:"var(--amber-soft)",color:"var(--amber)",fontWeight:700,fontSize:13,padding:"4px 10px",borderRadius:99,border:"1px solid #f5d98a"}}>
                   <Ico d={P.star} size={12} fill="#C47A1A" stroke={0}/>{r.rating} <span style={{fontWeight:400,color:"#a06020",fontSize:11}}>({r.review_count})</span>
                 </span>
                :<span style={{color:"var(--ink-4)"}}>—</span>
              }
            </td>
            <td style={{padding:"14px 18px"}}>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {r.isFeatured ? <Badge color="amber">Featured</Badge> : null}
                {r.tour_type?.split(",").filter(Boolean).map(t=><Badge key={t} color="teal">{t.trim()}</Badge>)}
              </div>
            </td>
          </>
        )}
      />

      {modal&&(
        <Modal title={modal==="add"?"Create New Tour":"Edit Tour"} onClose={()=>setModal(null)} wide>
          <Grid cols={2} gap={16}>
            <Field label="URL Slug" required><input className="inp" value={form.slug} onChange={f("slug")} placeholder="e.g. sylhet-tea-gardens" /></Field>
            <Field label="Tour Title" required><input className="inp" value={form.title} onChange={f("title")} placeholder="Awesome Tour Name" /></Field>
            <Field label="Destination"><input className="inp" value={form.location} onChange={f("location")} placeholder="City, Country" /></Field>
            <Field label="Duration"><input className="inp" value={form.duration} onChange={f("duration")} placeholder="2 Days, 1 Night" /></Field>
            <Field label="Group Size"><input className="inp" value={form.group_size} onChange={f("group_size")} placeholder="2 - 8 People" /></Field>
            <Field label="Price (USD)"><input type="number" className="inp" value={form.price} onChange={f("price")} placeholder="0.00" /></Field>
            <Field label="Rating"><input type="number" step=".1" min="0" max="5" className="inp" value={form.rating} onChange={f("rating")} placeholder="4.8" /></Field>
            <Field label="Review Count"><input type="number" className="inp" value={form.review_count} onChange={f("review_count")} placeholder="0" /></Field>
            <Field label="Categories (comma-separated)"><input className="inp" value={form.tour_type} onChange={f("tour_type")} placeholder="multiday, holiday, day" /></Field>
            <Field label="Cover Image URL"><input className="inp" value={form.image_url} onChange={f("image_url")} placeholder="https://…" /></Field>
            
            <div style={{gridColumn:"1/-1"}}><Field label="Overview"><textarea className="inp" rows={3} value={form.overview} onChange={f("overview")} placeholder="A short paragraph describing this tour to potential visitors..." /></Field></div>
            <div style={{gridColumn:"1/-1"}}><Field label="Highlights (JSON Array)"><textarea className="inp" rows={3} value={form.highlights} onChange={f("highlights")} placeholder='["See the mountains", "Enjoy local food"]' /></Field></div>
            <div style={{gridColumn:"1/-1"}}><Field label="Why Choose Us (JSON Array)"><textarea className="inp" rows={3} value={form.why_choose} onChange={f("why_choose")} placeholder='["Expert local guides", "Small group sizes", "All-inclusive pricing"]' /></Field></div>
            <div style={{gridColumn:"1/-1"}}><Field label="Itinerary (JSON Array)"><textarea className="inp" rows={4} value={form.itinerary} onChange={f("itinerary")} placeholder='[{"day": 1, "title": "Arrival", "desc": "Settle into the hotel."}]' /></Field></div>
            <div style={{gridColumn:"1/-1"}}><Field label="FAQ (JSON Array)"><textarea className="inp" rows={4} value={form.faq} onChange={f("faq")} placeholder='[{"question": "What is included?", "answer": "All meals and transport are included."}]' /></Field></div>
            <div style={{gridColumn:"1/-1"}}><Field label="Trip Note"><textarea className="inp" rows={3} value={form.trip_note} onChange={f("trip_note")} placeholder="Any special notes, warnings, or requirements for this trip..." /></Field></div>

            <div style={{gridColumn:"1/-1",background:"var(--amber-soft)",border:"1px solid #f5d98a",borderRadius:"var(--radius-md)",padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                <p style={{fontWeight:700,fontSize:14,color:"var(--ink)"}}>Feature this tour</p>
                <p style={{fontSize:12,color:"var(--ink-3)",marginTop:2}}>Featured tours appear prominently on the homepage</p>
              </div>
              <label className="toggle-wrap">
                <input type="checkbox" checked={!!form.isFeatured} onChange={e=>setForm(p=>({...p,isFeatured:e.target.checked?1:0}))} />
                <div className="toggle-track"></div>
                <div className="toggle-thumb"></div>
              </label>
            </div>

          </Grid>
          <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:24,paddingTop:20,borderTop:"1px solid var(--border)"}}>
            <button className="btn btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>{modal==="add"?"Create Tour":"Save Changes"}</button>
          </div>
        </Modal>
      )}
      {confirm&&<ConfirmDialog msg={`Delete the tour "${confirm.title}"? This cannot be undone.`} onConfirm={remove} onCancel={()=>setConfirm(null)} />}
    </Section>
  );
}

// ── BLOGS SECTION ─────────────────────────────────────────────────────────────
const BLOG_DEFAULTS={slug:"",title:"",excerpt:"",image_url:"",category:"",publish_date:"",read_time:"",author:"",author_img:"",is_featured:0};
const BLOG_CATS=["Wilderness","Adventure","Culture","Food","Travel Tips","Wildlife"];

function BlogsSection({toast}){
  const [data,setData]=useState([]); const [search,setSearch]=useState(""); const [filterCat,setFilterCat]=useState(""); const [filterFeatured,setFilterFeatured]=useState("");
  const [modal,setModal]=useState(null); const [form,setForm]=useState(BLOG_DEFAULTS); const [confirm,setConfirm]=useState(null); const [loading,setLoading]=useState(false);

  const load=useCallback(async()=>{
    setLoading(true);
    try{let q="/blogs?";if(filterCat)q+=`category=${filterCat}&`;if(filterFeatured)q+=`featured=${filterFeatured}&`;const res=await api.get(q);setData(res.data||[]);}
    finally{setLoading(false);}
  },[filterCat,filterFeatured]);

  useEffect(()=>{load();},[load]);
  const filtered=data.filter(r=>r.title?.toLowerCase().includes(search.toLowerCase())||r.author?.toLowerCase().includes(search.toLowerCase()));
  const openAdd=()=>{setForm(BLOG_DEFAULTS);setModal("add");};
  const openEdit=(r)=>{setForm({...r,publish_date:r.publish_date?.split("T")[0]||""});setModal("edit");};
  const save=async()=>{
    const body={...form,is_featured:form.is_featured?1:0};
    const res=modal==="add"?await api.post("/blogs",body):await api.put(`/blogs/${form.id}`,body);
    if(res.success){toast("Article saved","success");setModal(null);load();}else toast(res.message||"Failed","error");
  };
  const remove=async()=>{
    const res=await api.delete(`/blogs/${confirm.id}`);
    if(res.success){toast("Article deleted","success");load();}else toast(res.message||"Failed","error");
    setConfirm(null);
  };
  const f=(k)=>(e)=>setForm(p=>({...p,[k]:e.target.value}));

  return (
    <Section title="Blog Articles" icon={P.blogs} onAdd={openAdd} count={data.length} loading={loading} onRefresh={load} addButtonText="Write Post">
      <SearchBar value={search} onChange={setSearch} placeholder="Search by title or author…">
        <select className="inp" value={filterCat} onChange={e=>setFilterCat(e.target.value)} style={{width:"auto",minWidth:150}}>
          <option value="">All Categories</option>
          {BLOG_CATS.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
        <select className="inp" value={filterFeatured} onChange={e=>setFilterFeatured(e.target.value)} style={{width:"auto"}}>
          <option value="">All Posts</option>
          <option value="true">Featured Only</option>
        </select>
      </SearchBar>

      <Table
        cols={["Article","Category","Author","Published","Read Time","Status"]}
        rows={filtered} onEdit={openEdit} onDelete={setConfirm}
        renderCell={r=>(
          <>
            <td style={{padding:"14px 18px",maxWidth:320}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                {r.image_url
                  ?<img src={r.image_url} alt="" style={{width:64,height:44,borderRadius:"var(--radius-sm)",objectFit:"cover",flexShrink:0,border:"1px solid var(--border)"}} onError={e=>e.target.style.display="none"}/>
                  :<div style={{width:64,height:44,borderRadius:"var(--radius-sm)",background:"var(--surface-3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:"var(--ink-4)"}}><Ico d={P.blogs} size={18}/></div>
                }
                <div>
                  <p style={{fontWeight:700,color:"var(--ink)",fontSize:13.5,lineHeight:1.3,marginBottom:3}}>{r.title}</p>
                  <p style={{fontSize:12,color:"var(--ink-3)",overflow:"hidden",display:"-webkit-box",WebkitLineClamp:1,WebkitBoxOrient:"vertical"}}>{r.excerpt}</p>
                </div>
              </div>
            </td>
            <td style={{padding:"14px 18px"}}><Badge color="blue">{r.category||"Uncategorized"}</Badge></td>
            <td style={{padding:"14px 18px"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                {r.author_img
                  ?<img src={r.author_img} alt="" style={{width:28,height:28,borderRadius:"50%",objectFit:"cover",border:"2px solid var(--border)"}} onError={e=>e.target.style.display="none"}/>
                  :<div style={{width:28,height:28,borderRadius:"50%",background:"var(--accent-soft)",color:"var(--accent)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:11}}>{r.author?.charAt(0)||"A"}</div>
                }
                <span style={{fontSize:13.5,fontWeight:500,color:"var(--ink-2)"}}>{r.author}</span>
              </div>
            </td>
            <td style={{padding:"14px 18px",fontSize:13,color:"var(--ink-2)",whiteSpace:"nowrap"}}>{r.publish_date?.split("T")[0]||<span style={{color:"var(--ink-4)"}}>Draft</span>}</td>
            <td style={{padding:"14px 18px",fontSize:13,color:"var(--ink-3)",whiteSpace:"nowrap"}}>{r.read_time}</td>
            <td style={{padding:"14px 18px"}}>{r.is_featured?<Badge color="amber">Featured</Badge>:<span style={{color:"var(--ink-4)"}}>—</span>}</td>
          </>
        )}
      />

      {modal&&(
        <Modal title={modal==="add"?"Write Blog Post":"Edit Blog Post"} onClose={()=>setModal(null)} wide>
          <Grid cols={2} gap={16}>
            <Field label="Article Title" required><input className="inp" value={form.title} onChange={f("title")} placeholder="Eye-catching headline…" /></Field>
            <Field label="URL Slug" required><input className="inp" value={form.slug} onChange={f("slug")} placeholder="my-post" /></Field>
            <Field label="Category">
              <select className="inp" value={form.category} onChange={f("category")}>
                <option value="">Select category</option>
                {BLOG_CATS.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Publish Date"><input type="date" className="inp" value={form.publish_date} onChange={f("publish_date")} /></Field>
            <Field label="Author Name"><input className="inp" value={form.author} onChange={f("author")} placeholder="Jane Doe" /></Field>
            <Field label="Read Time"><input className="inp" value={form.read_time} onChange={f("read_time")} placeholder="5 min read" /></Field>
            <div style={{gridColumn:"1/-1"}}><Field label="Cover Image URL"><input className="inp" value={form.image_url} onChange={f("image_url")} placeholder="https://…" /></Field></div>
            <div style={{gridColumn:"1/-1"}}><Field label="Author Avatar URL"><input className="inp" value={form.author_img} onChange={f("author_img")} placeholder="https://…" /></Field></div>
            <div style={{gridColumn:"1/-1"}}><Field label="Excerpt"><textarea className="inp" rows={3} value={form.excerpt} onChange={f("excerpt")} placeholder="Brief summary for the preview card…" /></Field></div>
            <div style={{gridColumn:"1/-1",background:"var(--amber-soft)",border:"1px solid #f5d98a",borderRadius:"var(--radius-md)",padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                <p style={{fontWeight:700,fontSize:14,color:"var(--ink)"}}>Feature this post</p>
                <p style={{fontSize:12,color:"var(--ink-3)",marginTop:2}}>Featured posts appear at the top of the blog page</p>
              </div>
              <label className="toggle-wrap">
                <input type="checkbox" checked={!!form.is_featured} onChange={e=>setForm(p=>({...p,is_featured:e.target.checked?1:0}))} />
                <div className="toggle-track"></div>
                <div className="toggle-thumb"></div>
              </label>
            </div>
          </Grid>
          <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:24,paddingTop:20,borderTop:"1px solid var(--border)"}}>
            <button className="btn btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>{modal==="add"?"Publish Post":"Save Update"}</button>
          </div>
        </Modal>
      )}
      {confirm&&<ConfirmDialog msg={`Delete the article "${confirm.title}"?`} onConfirm={remove} onCancel={()=>setConfirm(null)} />}
    </Section>
  );
}

// ── REVIEWS SECTION ───────────────────────────────────────────────────────────
const REVIEW_DEFAULTS={tour_id:"",tour_name:"",name:"",country:"",initials:"",color_hex:"#0F766E",bg_hex:"#CCFBF1",review_date:"",rating:5,title:"",body:"",helpful_votes:"",is_verified:0};

function ReviewsSection({toast}){
  const [data,setData]=useState([]); const [search,setSearch]=useState(""); const [filterRating,setFilterRating]=useState(""); const [filterVerified,setFilterVerified]=useState("");
  const [modal,setModal]=useState(null); const [form,setForm]=useState(REVIEW_DEFAULTS); const [confirm,setConfirm]=useState(null); const [loading,setLoading]=useState(false);

  const load=useCallback(async()=>{
    setLoading(true);
    try{let q="/reviews?";if(filterRating)q+=`rating=${filterRating}&`;if(filterVerified)q+=`verified=${filterVerified}&`;const res=await api.get(q);setData(res.data||[]);}
    finally{setLoading(false);}
  },[filterRating,filterVerified]);

  useEffect(()=>{load();},[load]);
  const filtered=data.filter(r=>r.name?.toLowerCase().includes(search.toLowerCase())||r.tour_name?.toLowerCase().includes(search.toLowerCase())||r.title?.toLowerCase().includes(search.toLowerCase()));
  const openAdd=()=>{setForm(REVIEW_DEFAULTS);setModal("add");};
  const openEdit=(r)=>{setForm({...r});setModal("edit");};
  const save=async()=>{
    const body={...form,tour_id:form.tour_id?Number(form.tour_id):null,rating:Number(form.rating)||5,helpful_votes:Number(form.helpful_votes)||0,is_verified:form.is_verified?1:0};
    const res=modal==="add"?await api.post("/reviews",body):await api.put(`/reviews/${form.id}`,body);
    if(res.success){toast("Review saved","success");setModal(null);load();}else toast(res.message||"Failed","error");
  };
  const remove=async()=>{
    const res=await api.delete(`/reviews/${confirm.id}`);
    if(res.success){toast("Review deleted","success");load();}else toast(res.message||"Failed","error");
    setConfirm(null);
  };
  const f=(k)=>(e)=>setForm(p=>({...p,[k]:e.target.value}));
  const Stars=({n,size=13})=>[...Array(5)].map((_,i)=><Ico key={i} d={P.star} size={size} stroke={0} fill={i<n?"#C47A1A":"#E0DDD8"} />);

  return (
    <Section title="Customer Reviews" icon={P.reviews} onAdd={openAdd} count={data.length} loading={loading} onRefresh={load} addButtonText="Add Review">
      <SearchBar value={search} onChange={setSearch} placeholder="Search by name, tour, or keywords…">
        <select className="inp" value={filterRating} onChange={e=>setFilterRating(e.target.value)} style={{width:"auto",minWidth:140}}>
          <option value="">Any Rating</option>
          {[5,4,3,2,1].map(r=><option key={r} value={r}>{r} Stars</option>)}
        </select>
        <select className="inp" value={filterVerified} onChange={e=>setFilterVerified(e.target.value)} style={{width:"auto"}}>
          <option value="">All Reviews</option>
          <option value="true">Verified Only</option>
        </select>
      </SearchBar>

      <Table
        cols={["Reviewer","Tour","Rating","Review","Date","Helpful","Status"]}
        rows={filtered} onEdit={openEdit} onDelete={setConfirm}
        renderCell={r=>(
          <>
            <td style={{padding:"14px 18px"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:38,height:38,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,flexShrink:0,background:r.bg_hex||"#EAF3DE",color:r.color_hex||"#3B6D11",border:"2px solid rgba(255,255,255,.8)",boxShadow:"0 1px 4px rgba(0,0,0,.08)"}}>{r.initials}</div>
                <div><p style={{fontWeight:700,fontSize:14,color:"var(--ink)"}}>{r.name}</p><p style={{fontSize:12,color:"var(--ink-3)"}}>{r.country||"—"}</p></div>
              </div>
            </td>
            <td style={{padding:"14px 18px",fontSize:13,color:"var(--accent-text)",fontWeight:500,maxWidth:150}}><span style={{display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.tour_name||<span style={{color:"var(--ink-4)"}}>—</span>}</span></td>
            <td style={{padding:"14px 18px"}}><div style={{display:"flex",gap:2}}><Stars n={r.rating}/></div></td>
            <td style={{padding:"14px 18px",maxWidth:220}}>
              <p style={{fontWeight:700,fontSize:13.5,color:"var(--ink)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.title}</p>
              <p style={{fontSize:12,color:"var(--ink-3)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginTop:2}}>{r.body}</p>
            </td>
            <td style={{padding:"14px 18px",fontSize:13,color:"var(--ink-2)",whiteSpace:"nowrap"}}>{r.review_date}</td>
            <td style={{padding:"14px 18px",fontSize:13,fontWeight:600,color:"var(--ink-2)"}}>{r.helpful_votes}</td>
            <td style={{padding:"14px 18px"}}>{r.is_verified?<Badge color="teal">Verified</Badge>:<Badge color="gray">Unverified</Badge>}</td>
          </>
        )}
      />

      {modal&&(
        <Modal title={modal==="add"?"Add Review":"Edit Review"} onClose={()=>setModal(null)} wide>
          <Grid cols={3} gap={16} style={{marginBottom:20,paddingBottom:20,borderBottom:"1px solid var(--border)"}}>
            <div style={{background:"var(--surface-2)",borderRadius:"var(--radius-lg)",padding:20,display:"flex",flexDirection:"column",alignItems:"center",gap:12,border:"1px solid var(--border)"}}>
              <p style={{fontSize:11,fontWeight:700,color:"var(--ink-3)",textTransform:"uppercase",letterSpacing:".06em"}}>Avatar Preview</p>
              <div style={{width:72,height:72,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:24,background:form.bg_hex,color:form.color_hex,boxShadow:"var(--shadow-md)"}}>{form.initials||"A"}</div>
              <Grid cols={2} gap={8} style={{width:"100%"}}>
                <div style={{textAlign:"center"}}>
                  <label style={{fontSize:10,fontWeight:700,color:"var(--ink-3)",textTransform:"uppercase",letterSpacing:".06em",display:"block",marginBottom:5}}>Text</label>
                  <input type="color" value={form.color_hex} onChange={f("color_hex")} style={{width:"100%",height:32,border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",cursor:"pointer",padding:2}} />
                </div>
                <div style={{textAlign:"center"}}>
                  <label style={{fontSize:10,fontWeight:700,color:"var(--ink-3)",textTransform:"uppercase",letterSpacing:".06em",display:"block",marginBottom:5}}>BG</label>
                  <input type="color" value={form.bg_hex} onChange={f("bg_hex")} style={{width:"100%",height:32,border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",cursor:"pointer",padding:2}} />
                </div>
              </Grid>
            </div>
            <div style={{gridColumn:"2/-1"}}>
              <Grid cols={2} gap={14}>
                <Field label="Customer Name" required><input className="inp" value={form.name} onChange={f("name")} placeholder="Sarah Mitchell" /></Field>
                <Field label="Initials (Max 3)"><input className="inp" value={form.initials} onChange={f("initials")} placeholder="SM" maxLength={3} /></Field>
                <Field label="Country"><input className="inp" value={form.country} onChange={f("country")} placeholder="United Kingdom" /></Field>
                <Field label="Rating" required>
                  <select className="inp" value={form.rating} onChange={f("rating")}>
                    {[5,4,3,2,1].map(r=><option key={r} value={r}>{r} Star{r!==1?"s":""}</option>)}
                  </select>
                </Field>
              </Grid>
            </div>
          </Grid>
          <Grid cols={2} gap={16}>
            <Field label="Tour Name"><input className="inp" value={form.tour_name} onChange={f("tour_name")} placeholder="Which tour?" /></Field>
            <Grid cols={2} gap={12}>
              <Field label="Tour ID"><input type="number" className="inp" value={form.tour_id} onChange={f("tour_id")} placeholder="ID" /></Field>
              <Field label="Helpful Votes"><input type="number" className="inp" value={form.helpful_votes} onChange={f("helpful_votes")} placeholder="0" /></Field>
            </Grid>
            <div style={{gridColumn:"1/-1"}}><Field label="Date"><input className="inp" value={form.review_date} onChange={f("review_date")} placeholder="April 2026" /></Field></div>
            <div style={{gridColumn:"1/-1"}}><Field label="Headline"><input className="inp" value={form.title} onChange={f("title")} placeholder="Summarize the experience…" /></Field></div>
            <div style={{gridColumn:"1/-1"}}><Field label="Full Review"><textarea className="inp" rows={4} value={form.body} onChange={f("body")} placeholder="Write the full review here…" /></Field></div>
            <div style={{gridColumn:"1/-1",background:"var(--accent-soft)",border:"1px solid #b2d9c6",borderRadius:"var(--radius-md)",padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                <p style={{fontWeight:700,fontSize:14,color:"var(--ink)"}}>Verified Purchase</p>
                <p style={{fontSize:12,color:"var(--ink-3)",marginTop:2}}>Adds a verified badge indicating a confirmed booking</p>
              </div>
              <label className="toggle-wrap">
                <input type="checkbox" checked={!!form.is_verified} onChange={e=>setForm(p=>({...p,is_verified:e.target.checked?1:0}))} />
                <div className="toggle-track"></div>
                <div className="toggle-thumb"></div>
              </label>
            </div>
          </Grid>
          <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:24,paddingTop:20,borderTop:"1px solid var(--border)"}}>
            <button className="btn btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>Save Review</button>
          </div>
        </Modal>
      )}
      {confirm&&<ConfirmDialog msg={`Remove review by "${confirm.name}"?`} onConfirm={remove} onCancel={()=>setConfirm(null)} />}
    </Section>
  );
}

// ── GALLERY SECTION ───────────────────────────────────────────────────────────
const GALLERY_DEFAULTS={tour_id:"",image_url:"",alt_text:""};

function GallerySection({toast}){
  const [data,setData]=useState([]); const [search,setSearch]=useState(""); const [filterTour,setFilterTour]=useState(""); const [viewMode,setViewMode]=useState("grid");
  const [modal,setModal]=useState(null); const [form,setForm]=useState(GALLERY_DEFAULTS); const [confirm,setConfirm]=useState(null); const [loading,setLoading]=useState(false);

  const load=useCallback(async()=>{
    setLoading(true);
    try{let q="/gallery?";if(filterTour)q+=`tour_id=${filterTour}&`;const res=await api.get(q);setData(res.data||[]);}
    finally{setLoading(false);}
  },[filterTour]);

  useEffect(()=>{load();},[load]);
  const filtered=data.filter(r=>r.alt_text?.toLowerCase().includes(search.toLowerCase())||r.tour_title?.toLowerCase().includes(search.toLowerCase()));
  const openAdd=()=>{setForm(GALLERY_DEFAULTS);setModal("add");};
  const openEdit=(r)=>{setForm({...r});setModal("edit");};
  const save=async()=>{
    const body={...form,tour_id:form.tour_id?Number(form.tour_id):null};
    const res=modal==="add"?await api.post("/gallery",body):await api.put(`/gallery/${form.id}`,body);
    if(res.success){toast("Image saved","success");setModal(null);load();}else toast(res.message||"Failed","error");
  };
  const remove=async()=>{
    const res=await api.delete(`/gallery/${confirm.id}`);
    if(res.success){toast("Image deleted","success");load();}else toast(res.message||"Failed","error");
    setConfirm(null);
  };
  const f=(k)=>(e)=>setForm(p=>({...p,[k]:e.target.value}));

  const ViewToggle = () => (
    <div style={{display:"flex",gap:4,background:"var(--surface-3)",padding:4,borderRadius:"var(--radius-sm)",border:"1px solid var(--border)"}}>
      {[["grid",P.grid],["list",P.list]].map(([v,icon])=>(
        <button key={v} onClick={()=>setViewMode(v)} style={{width:30,height:28,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:6,border:"none",background:viewMode===v?"var(--surface)":"transparent",color:viewMode===v?"var(--ink)":"var(--ink-3)",cursor:"pointer",boxShadow:viewMode===v?"var(--shadow-sm)":"none",transition:"all .15s"}}>
          <Ico d={icon} size={13}/>
        </button>
      ))}
    </div>
  );

  return (
    <Section title="Media Gallery" icon={P.gallery} onAdd={openAdd} count={data.length} loading={loading} onRefresh={load} addButtonText="Upload Image" extra={<ViewToggle/>}>
      <SearchBar value={search} onChange={setSearch} placeholder="Search by description or tour…">
        <input className="inp" value={filterTour} onChange={e=>setFilterTour(e.target.value)} placeholder="Tour ID…" style={{width:120,textAlign:"center",fontFamily:"monospace"}} />
      </SearchBar>

      {viewMode==="grid"?(
        filtered.length===0
          ?<EmptyState label="No matching images found." />
          :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:16}}>
            {filtered.map(r=>(
              <div key={r.id} className="gallery-card" style={{borderRadius:"var(--radius-xl)",overflow:"hidden",aspectRatio:"4/3",position:"relative",background:"var(--surface-3)",border:"1px solid var(--border)",boxShadow:"var(--shadow-sm)"}}>
                <img src={r.image_url} alt={r.alt_text} className="img-hover" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} onError={e=>{e.target.src="";e.target.style.display="none";}} />
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(13,13,13,.85) 0%,rgba(13,13,13,.1) 50%,transparent 100%)",opacity:0,transition:"opacity .2s"}} className="gallery-overlay">
                  <div style={{position:"absolute",bottom:0,left:0,right:0,padding:14,transform:"translateY(6px)",transition:"transform .2s"}} className="gallery-content">
                    <p style={{color:"#fff",fontSize:13,fontWeight:700,marginBottom:3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.alt_text||"Untitled"}</p>
                    {r.tour_title&&<p style={{color:"rgba(255,255,255,.6)",fontSize:11,marginBottom:10,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.tour_title}</p>}
                    <div style={{display:"flex",gap:6}}>
                      <button onClick={()=>openEdit(r)} style={{flex:1,padding:"6px 0",background:"rgba(255,255,255,.15)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,.2)",borderRadius:"var(--radius-sm)",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer"}}>Edit</button>
                      <button onClick={()=>setConfirm(r)} style={{flex:1,padding:"6px 0",background:"rgba(192,52,74,.7)",backdropFilter:"blur(8px)",border:"none",borderRadius:"var(--radius-sm)",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer"}}>Delete</button>
                    </div>
                  </div>
                </div>
                <div style={{position:"absolute",top:10,left:10,background:"rgba(13,13,13,.7)",backdropFilter:"blur(6px)",color:"#fff",fontSize:10,fontFamily:"monospace",fontWeight:700,padding:"2px 7px",borderRadius:5}}>#{r.id}</div>
                <style>{`.gallery-card:hover .gallery-overlay{opacity:1}.gallery-card:hover .gallery-content{transform:translateY(0)}`}</style>
              </div>
            ))}
          </div>
      ):(
        <Table
          cols={["ID","Preview","Description","Tour Link","Uploaded"]}
          rows={filtered} onEdit={openEdit} onDelete={setConfirm}
          renderCell={r=>(
            <>
              <td style={{padding:"14px 18px",fontFamily:"monospace",fontSize:12,color:"var(--ink-4)"}}>{r.id}</td>
              <td style={{padding:"14px 18px"}}><img src={r.image_url} alt={r.alt_text} style={{width:72,height:48,borderRadius:"var(--radius-md)",objectFit:"cover",border:"1px solid var(--border)"}} onError={e=>e.target.style.display="none"} /></td>
              <td style={{padding:"14px 18px",fontWeight:600,fontSize:13.5,color:"var(--ink)",maxWidth:280,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.alt_text||<em style={{color:"var(--ink-4)",fontWeight:400}}>No description</em>}</td>
              <td style={{padding:"14px 18px"}}>{r.tour_title?<Badge color="teal">{r.tour_title}</Badge>:<span style={{color:"var(--ink-4)"}}>—</span>}</td>
              <td style={{padding:"14px 18px",fontSize:13,color:"var(--ink-3)",whiteSpace:"nowrap"}}>{r.uploaded_at?.split("T")[0]}</td>
            </>
          )}
        />
      )}

      {modal&&(
        <Modal title={modal==="add"?"Upload New Image":"Edit Image"} onClose={()=>setModal(null)}>
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div style={{background:"var(--surface-2)",border:"1.5px dashed var(--border-2)",borderRadius:"var(--radius-lg)",padding:16,minHeight:160,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
              {form.image_url
                ?<img src={form.image_url} alt="Preview" style={{width:"100%",maxHeight:200,objectFit:"cover",borderRadius:"var(--radius-md)"}} onError={e=>e.target.style.display="none"} />
                :<div style={{textAlign:"center",color:"var(--ink-4)"}}>
                   <Ico d={P.gallery} size={32} style={{marginBottom:8,opacity:.4}} />
                   <p style={{fontSize:13,fontWeight:500}}>Image preview</p>
                 </div>
              }
            </div>
            <Field label="Image Source URL" required><input className="inp" value={form.image_url} onChange={f("image_url")} placeholder="https://…" /></Field>
            <Field label="Description (Alt Text)"><input className="inp" value={form.alt_text} onChange={f("alt_text")} placeholder="Lush green tea gardens in Sylhet" /></Field>
            <Field label="Linked Tour ID"><input type="number" className="inp" value={form.tour_id} onChange={f("tour_id")} placeholder="Optional tour ID" /></Field>
          </div>
          <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:24,paddingTop:20,borderTop:"1px solid var(--border)"}}>
            <button className="btn btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>Save Image</button>
          </div>
        </Modal>
      )}
      {confirm&&<ConfirmDialog msg="Delete this image? This will break any links on the frontend." onConfirm={remove} onCancel={()=>setConfirm(null)} />}
    </Section>
  );
}

// ── STAT CARD ─────────────────────────────────────────────────────────────────
const STAT_COLORS = {
  teal:   { bar:"var(--accent)", soft:"var(--accent-soft)", text:"var(--accent)" },
  violet: { bar:"var(--violet)", soft:"var(--violet-soft)", text:"var(--violet)" },
  amber:  { bar:"var(--amber)",  soft:"var(--amber-soft)",  text:"var(--amber)" },
  rose:   { bar:"var(--rose)",   soft:"var(--rose-soft)",   text:"var(--rose)" },
};

const StatCard = ({ label, value, icon, color, delta }) => {
  const c = STAT_COLORS[color] || STAT_COLORS.teal;
  return (
    <div style={{ background:"var(--surface)", borderRadius:"var(--radius-xl)", border:"1px solid var(--border)", padding:"20px 22px", boxShadow:"var(--shadow-sm)", overflow:"hidden", position:"relative" }}>
      <div className="stat-bar" style={{ background:c.bar, width:36 }} />
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
        <div>
          <p style={{ fontSize:12, fontWeight:700, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".07em", marginBottom:8 }}>{label}</p>
          <p style={{ fontFamily:"var(--font-display)", fontSize:34, fontWeight:900, color:"var(--ink)", lineHeight:1, letterSpacing:-1 }}>{value}</p>
          {delta&&<p style={{fontSize:12,color:"var(--ink-3)",marginTop:6}}>{delta}</p>}
        </div>
        <div style={{ width:44, height:44, borderRadius:"var(--radius-md)", background:c.soft, display:"flex", alignItems:"center", justifyContent:"center", color:c.text, flexShrink:0 }}>
          <Ico d={icon} size={20} />
        </div>
      </div>
    </div>
  );
};

// ── DASHBOARD HOME ────────────────────────────────────────────────────────────
function DashboardHome({ stats }) {
  const Stars=({n})=>[...Array(5)].map((_,i)=><Ico key={i} d={P.star} size={11} stroke={0} fill={i<n?"#C47A1A":"#E0DDD8"}/>);
  return (
    <div className="stagger" style={{ display:"flex", flexDirection:"column", gap:24 }}>

      {/* Hero */}
      <div style={{ position:"relative", overflow:"hidden", background:"var(--sidebar-bg)", borderRadius:"var(--radius-2xl)", padding:"36px 40px", color:"#fff" }}>
        {/* Geometric accents */}
        <div style={{position:"absolute",top:-40,right:-40,width:220,height:220,borderRadius:"50%",border:"40px solid rgba(26,107,74,.25)",pointerEvents:"none"}} />
        <div style={{position:"absolute",bottom:-30,right:120,width:120,height:120,borderRadius:"50%",border:"24px solid rgba(255,255,255,.04)",pointerEvents:"none"}} />
        <div style={{position:"absolute",top:20,right:180,width:6,height:6,borderRadius:"50%",background:"rgba(26,107,74,.6)",pointerEvents:"none"}} />
        <div style={{position:"absolute",top:60,right:100,width:3,height:3,borderRadius:"50%",background:"rgba(255,255,255,.3)",pointerEvents:"none"}} />

        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(26,107,74,.25)", border:"1px solid rgba(26,107,74,.4)", borderRadius:99, padding:"4px 12px", fontSize:12, fontWeight:600, color:"#6ee7b7", marginBottom:16 }}>
            <Ico d={P.globe} size={12} /> System Administrator
          </div>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:38, fontWeight:900, lineHeight:1.1, marginBottom:10, letterSpacing:-1 }}>
            Welcome back, <span style={{ color:"#4ade80" }}>Nayeem</span> 👋
          </h1>
          <p style={{ fontSize:15, color:"rgba(255,255,255,.55)", maxWidth:500, lineHeight:1.6, fontWeight:500 }}>
            Manage your travel platform — tours, articles, reviews and media from one centralized hub.
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
        <StatCard label="Active Tours"    value={stats.tours}   icon={P.tours}   color="teal"   delta="Total packages" />
        <StatCard label="Published Blogs" value={stats.blogs}   icon={P.blogs}   color="violet" delta="Articles" />
        <StatCard label="User Reviews"    value={stats.reviews} icon={P.reviews} color="amber"  delta="Customer feedback" />
        <StatCard label="Gallery Assets"  value={stats.gallery} icon={P.gallery} color="rose"   delta="Media files" />
      </div>

      {/* Lower panels */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>

        {/* Recent tours */}
        <div style={{ background:"var(--surface)", borderRadius:"var(--radius-xl)", border:"1px solid var(--border)", padding:"22px 24px", boxShadow:"var(--shadow-sm)" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
            <h3 style={{ fontFamily:"var(--font-display)", fontSize:17, fontWeight:700, color:"var(--ink)", display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ width:32, height:32, borderRadius:"var(--radius-sm)", background:"var(--accent-soft)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--accent)" }}>
                <Ico d={P.tours} size={15} />
              </span>
              Recent Tours
            </h3>
            <button style={{ fontSize:12, fontWeight:700, color:"var(--accent)", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
              View all <Ico d={P.arrow} size={13} stroke={2.5} />
            </button>
          </div>
          {stats.recentTours?.length===0
            ?<EmptyState label="No tours available" />
            :<div style={{display:"flex",flexDirection:"column",gap:6}}>
               {stats.recentTours?.slice(0,4).map(t=>(
                 <div key={t.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:"var(--radius-md)",transition:"background .12s",cursor:"default"}} onMouseEnter={e=>e.currentTarget.style.background="var(--surface-2)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                   {t.image_url
                     ?<img src={t.image_url} alt="" style={{width:52,height:40,borderRadius:"var(--radius-sm)",objectFit:"cover",border:"1px solid var(--border)",flexShrink:0}} onError={e=>e.target.style.display="none"}/>
                     :<div style={{width:52,height:40,borderRadius:"var(--radius-sm)",background:"var(--surface-3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:"var(--ink-4)"}}><Ico d={P.tours} size={16}/></div>
                   }
                   <div style={{flex:1,minWidth:0}}>
                     <p style={{fontWeight:700,fontSize:13.5,color:"var(--ink)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.title}</p>
                     <p style={{fontSize:12,color:"var(--ink-3)",display:"flex",alignItems:"center",gap:4,marginTop:1}}>
                       <Ico d={P.map} size={11} style={{color:"var(--accent)",flexShrink:0}}/>{t.location}
                     </p>
                   </div>
                   <div style={{textAlign:"right",flexShrink:0}}>
                     <p style={{fontFamily:"var(--font-display)",fontWeight:900,fontSize:16,color:"var(--ink)"}}>{t.price?`$${t.price}`:"—"}</p>
                     {t.rating&&<p style={{fontSize:11,fontWeight:700,color:"var(--amber)",marginTop:1}}>★ {t.rating}</p>}
                   </div>
                 </div>
               ))}
             </div>
          }
        </div>

        {/* Recent reviews */}
        <div style={{ background:"var(--surface)", borderRadius:"var(--radius-xl)", border:"1px solid var(--border)", padding:"22px 24px", boxShadow:"var(--shadow-sm)" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
            <h3 style={{ fontFamily:"var(--font-display)", fontSize:17, fontWeight:700, color:"var(--ink)", display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ width:32, height:32, borderRadius:"var(--radius-sm)", background:"var(--amber-soft)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--amber)" }}>
                <Ico d={P.reviews} size={15} />
              </span>
              Latest Feedback
            </h3>
            <button style={{ fontSize:12, fontWeight:700, color:"var(--accent)", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
              View all <Ico d={P.arrow} size={13} stroke={2.5} />
            </button>
          </div>
          {stats.recentReviews?.length===0
            ?<EmptyState label="No reviews yet" />
            :<div style={{display:"flex",flexDirection:"column",gap:10}}>
               {stats.recentReviews?.slice(0,3).map(r=>(
                 <div key={r.id} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"12px 14px",borderRadius:"var(--radius-md)",background:"var(--surface-2)",border:"1px solid var(--border)"}}>
                   <div style={{width:36,height:36,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:12,background:r.bg_hex||"#EAF3DE",color:r.color_hex||"#3B6D11",flexShrink:0,border:"2px solid rgba(255,255,255,.8)"}}>{r.initials}</div>
                   <div style={{flex:1,minWidth:0}}>
                     <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,marginBottom:2}}>
                       <p style={{fontWeight:700,fontSize:13.5,color:"var(--ink)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.name}</p>
                       <div style={{display:"flex",gap:1,flexShrink:0}}>{[...Array(5)].map((_,i)=><Ico key={i} d={P.star} size={11} stroke={0} fill={i<r.rating?"#C47A1A":"#E0DDD8"}/>)}</div>
                     </div>
                     <p style={{fontSize:13,fontWeight:600,color:"var(--ink-2)",marginBottom:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.title}</p>
                     <p style={{fontSize:12,color:"var(--ink-3)",lineHeight:1.5,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{r.body}</p>
                   </div>
                 </div>
               ))}
             </div>
          }
        </div>

      </div>
    </div>
  );
}

// ── NAV CONFIG ────────────────────────────────────────────────────────────────
const NAV = [
  { id:"dashboard", label:"Overview",  icon:P.home    },
  { id:"tours",     label:"Tours",     icon:P.tours   },
  { id:"blogs",     label:"Articles",  icon:P.blogs   },
  { id:"reviews",   label:"Reviews",   icon:P.reviews },
  { id:"gallery",   label:"Gallery",   icon:P.gallery },
];

export default function AdminDashboardPage() {
  const [active, setActive] = useState("dashboard");
  const [stats, setStats] = useState({ tours:0, blogs:0, reviews:0, gallery:0, recentTours:[], recentReviews:[] });
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const showToast = useCallback((msg, type="success") => setToast({ msg, type }), []);
  const router = useRouter();

  // ── Auth guard: redirect to login if not admin ────────────────────────────
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (!user || !ADMIN_EMAILS.includes(user.email)) {
        router.replace("/dashboard/login");
      }
    });
    return unsub;
  }, [router]);


  // Escape the parent site layout (header/footer) by tagging <body>
  useEffect(() => {
    document.body.classList.add("admin-panel-active");
    // Also directly hide common Next.js/site layout wrappers
    const selectors = [
      "nav", "header:not(.admin-header)", "footer:not(.admin-footer)",
      "[class*='navbar']", "[class*='Navbar']",
      "[class*='site-header']", "[class*='site-footer']",
      "[class*='layout-header']", "[class*='layout-footer']",
    ];
    const hidden = [];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        // Only hide elements that are ancestors or siblings of the dashboard, not inside it
        if (!el.closest("[data-admin-root]")) {
          hidden.push({ el, display: el.style.display });
          el.style.setProperty("display", "none", "important");
        }
      });
    });
    return () => {
      document.body.classList.remove("admin-panel-active");
      hidden.forEach(({ el, display }) => { el.style.display = display; });
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const [tours, blogs, reviews, gallery] = await Promise.all([
          api.get("/tours"), api.get("/blogs"), api.get("/reviews"), api.get("/gallery"),
        ]);
        setStats({
          tours:   tours.count   || tours.data?.length   || 0,
          blogs:   blogs.count   || blogs.data?.length   || 0,
          reviews: reviews.count || reviews.data?.length || 0,
          gallery: gallery.count || gallery.data?.length || 0,
          recentTours:   tours.data   || [],
          recentReviews: reviews.data || [],
        });
      } catch { showToast("Error loading data", "error"); }
    })();
  }, [showToast, active]);

  const SECTION_LABELS = { dashboard:"Overview", tours:"Tours", blogs:"Articles", reviews:"Reviews", gallery:"Gallery" };

  return (
    <>
      <FontLoader />
      <div data-admin-root="true" style={{ position:"fixed", inset:0, zIndex:9999, display:"flex", overflow:"hidden", background:"var(--surface-2)", fontFamily:"var(--font-body)" }}>

        {/* ── Sidebar ── */}
        <aside style={{ width: sidebarOpen ? 240 : 68, background:"var(--sidebar-bg)", display:"flex", flexDirection:"column", flexShrink:0, borderRight:"1px solid var(--sidebar-border)", transition:"width .22s ease", overflow:"hidden" }}>

          {/* Brand */}
          <div style={{ padding:"20px 16px 16px", borderBottom:"1px solid var(--sidebar-border)", display:"flex", alignItems:"center", gap:12, flexShrink:0, minHeight:68 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,var(--accent),#0D4A30)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Ico d={P.globe} size={18} style={{ color:"#6ee7b7" }} />
            </div>
            {sidebarOpen && (
              <div style={{ overflow:"hidden" }}>
                <div style={{ fontFamily:"var(--font-display)", fontSize:16, fontWeight:700, color:"#fff", whiteSpace:"nowrap" }}>Admin Panel</div>
              </div>
            )}
          </div>

          {/* Nav */}
          <nav style={{ flex:1, padding:"12px 8px", overflowY:"auto", overflowX:"hidden" }}>
            {sidebarOpen && <p style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,.2)", letterSpacing:".1em", textTransform:"uppercase", padding:"8px 10px 6px" }}>Main</p>}
            {NAV.map(n => {
              const isActive = active === n.id;
              return (
                <button key={n.id} className={`nav-link${isActive?" active":""}`}
                  onClick={() => setActive(n.id)}
                  style={{ display:"flex", alignItems:"center", gap:12, width:"100%", padding:sidebarOpen?"10px 12px":"10px", borderRadius:"var(--radius-md)", border:"none", cursor:"pointer", marginBottom:2, background:isActive?"var(--sidebar-active)":"transparent", color:isActive?"var(--sidebar-text-active)":"var(--sidebar-text)", fontWeight:isActive?700:500, fontSize:13.5, transition:"all .15s", textAlign:"left", whiteSpace:"nowrap", overflow:"hidden" }}
                  onMouseEnter={e => { if(!isActive) e.currentTarget.style.background="var(--sidebar-hover)"; e.currentTarget.style.color="rgba(255,255,255,.8)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background=isActive?"var(--sidebar-active)":"transparent"; e.currentTarget.style.color=isActive?"var(--sidebar-text-active)":"var(--sidebar-text)"; }}
                >
                  <Ico d={n.icon} size={18} style={{ flexShrink:0, opacity:isActive?1:.7 }} />
                  {sidebarOpen && <span>{n.label}</span>}
                  {isActive && sidebarOpen && <span style={{ marginLeft:"auto", width:6, height:6, borderRadius:"50%", background:"var(--sidebar-accent)", flexShrink:0 }} />}
                </button>
              );
            })}
          </nav>

          {/* Footer user + sign out */}
          <div style={{ padding:"14px 12px", borderTop:"1px solid var(--sidebar-border)", display:"flex", alignItems:"center", gap:10, flexShrink:0, overflow:"hidden" }}>
            <div style={{ width:34, height:34, borderRadius:"50%", background:"rgba(26,107,74,.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, color:"#6ee7b7", flexShrink:0 }}>N</div>
            {sidebarOpen && (
              <div style={{ overflow:"hidden", flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#fff", whiteSpace:"nowrap" }}>Nayeem Islam</div>
                <div style={{ fontSize:11, color:"var(--sidebar-text)", whiteSpace:"nowrap" }}>Administrator</div>
              </div>
            )}
            <button
              onClick={() => signOut(auth)}
              title="Sign Out"
              style={{ width:30, height:30, borderRadius:8, background:"rgba(192,52,74,0.15)", border:"1px solid rgba(192,52,74,0.25)", color:"#f87171", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"background .15s" }}
              onMouseEnter={e => e.currentTarget.style.background="rgba(192,52,74,0.3)"}
              onMouseLeave={e => e.currentTarget.style.background="rgba(192,52,74,0.15)"}
            >
              <Ico d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9" size={14} />
            </button>
          </div>
        </aside>

        {/* ── Main area ── */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

          {/* Topbar */}
          <header style={{ height:58, background:"var(--surface)", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", padding:"0 24px", gap:14, flexShrink:0, boxShadow:"var(--shadow-sm)" }}>
            <button onClick={()=>setSidebarOpen(s=>!s)} style={{ width:34, height:34, borderRadius:"var(--radius-sm)", background:"var(--surface-2)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"var(--ink-3)", flexShrink:0 }}>
              <Ico d={P.list} size={16} />
            </button>
            <div style={{ flex:1 }}>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:700, color:"var(--ink)", lineHeight:1 }}>{SECTION_LABELS[active]}</h2>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <button style={{ width:34, height:34, borderRadius:"var(--radius-sm)", background:"var(--surface-2)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"var(--ink-3)", position:"relative" }}>
                <Ico d={P.bell} size={16} />
                <span style={{ position:"absolute", top:7, right:7, width:6, height:6, borderRadius:"50%", background:"var(--rose)" }} />
              </button>
              <div style={{ width:34, height:34, borderRadius:"50%", background:"var(--accent-soft)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, color:"var(--accent)" }}>N</div>
            </div>
          </header>

          {/* Scrollable content */}
          <main style={{ flex:1, overflowY:"auto", padding:24 }}>
            <div className="anim-fade-up" key={active}>
              {active==="dashboard" && <DashboardHome stats={stats} />}
              {active==="tours"     && <ToursSection   toast={showToast} />}
              {active==="blogs"     && <BlogsSection   toast={showToast} />}
              {active==="reviews"   && <ReviewsSection toast={showToast} />}
              {active==="gallery"   && <GallerySection toast={showToast} />}
            </div>
          </main>
        </div>

      </div>

      {toast && <div data-admin-portal="true"><Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)} /></div>}
    </>
  );
}