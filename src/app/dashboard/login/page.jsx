"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, ADMIN_EMAILS } from "@/auth/firebase";

const Ico = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [showPw, setShowPw]   = useState(false);

  // If already logged in as admin → redirect straight to dashboard
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user && ADMIN_EMAILS.includes(user.email)) {
        router.replace("/dashboard");
      } else {
        setChecking(false);
      }
    });
    return unsub;
  }, [router]);

  const handleLogin = async () => {
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setError(""); setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (!ADMIN_EMAILS.includes(cred.user.email)) {
        await import("firebase/auth").then(m => m.signOut(auth));
        setError("Access denied. This account is not an admin.");
        setLoading(false);
        return;
      }
      router.replace("/dashboard");
    } catch (e) {
      setError(
        ["auth/invalid-credential", "auth/wrong-password", "auth/user-not-found"].includes(e.code)
          ? "Invalid email or password."
          : "Login failed. Please try again."
      );
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div style={styles.fullscreen}>
        <div style={styles.spinner} />
      </div>
    );
  }

  return (
    <div style={styles.fullscreen}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0D1117; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes popIn { from { opacity:0; transform:scale(.96) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }
        .login-card { animation: popIn 0.3s cubic-bezier(.34,1.4,.64,1) both; }
        .inp { width:100%; padding:11px 14px; background:rgba(255,255,255,0.06); border:1.5px solid rgba(255,255,255,0.1); border-radius:10px; font-size:14px; color:#fff; outline:none; transition:border-color .15s, box-shadow .15s; font-family:'Plus Jakarta Sans',sans-serif; }
        .inp:focus { border-color:#1A6B4A; box-shadow:0 0 0 3px rgba(26,107,74,.2); }
        .inp::placeholder { color:rgba(255,255,255,0.25); }
        .login-btn { width:100%; padding:13px; border-radius:10px; background:#1A6B4A; border:none; color:#fff; font-size:15px; font-weight:700; cursor:pointer; letter-spacing:.02em; transition:background .2s, transform .15s, box-shadow .2s; font-family:'Plus Jakarta Sans',sans-serif; display:flex; align-items:center; justify-content:center; gap:8px; }
        .login-btn:hover:not(:disabled) { background:#22885E; transform:translateY(-1px); box-shadow:0 8px 20px rgba(26,107,74,.35); }
        .login-btn:disabled { opacity:0.6; cursor:not-allowed; }
        .pw-toggle { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; color:rgba(255,255,255,0.35); display:flex; padding:4px; transition:color .15s; }
        .pw-toggle:hover { color:rgba(255,255,255,0.7); }
      `}</style>

      <div className="login-card" style={styles.card}>

        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ width:60, height:60, borderRadius:18, background:"linear-gradient(135deg,#1A6B4A,#0D4A30)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", boxShadow:"0 8px 24px rgba(26,107,74,0.4)" }}>
            <Ico d="M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" size={28} />
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, color:"#fff", marginBottom:6 }}>Admin Dashboard</h1>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.35)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Bangladesh With Naim</p>
        </div>

        {/* Form */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

          {/* Email */}
          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
            <label style={styles.label}>Email</label>
            <input
              className="inp"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
            <label style={styles.label}>Password</label>
            <div style={{ position:"relative" }}>
              <input
                className="inp"
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                autoComplete="current-password"
                style={{ paddingRight:44 }}
              />
              <button className="pw-toggle" onClick={() => setShowPw(s => !s)} tabIndex={-1}>
                <Ico d={showPw
                  ? "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24 M1 1l22 22"
                  : "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z"
                } size={16} />
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={styles.error}>
              <Ico d="M18 6L6 18M6 6l12 12" size={14} />
              {error}
            </div>
          )}

          {/* Submit */}
          <button className="login-btn" onClick={handleLogin} disabled={loading} style={{ marginTop:4 }}>
            {loading
              ? <><div style={{ width:16, height:16, borderRadius:"50%", border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", animation:"spin 0.7s linear infinite" }} /> Signing in…</>
              : "Sign In"
            }
          </button>
        </div>

        <p style={{ textAlign:"center", fontSize:11, color:"rgba(255,255,255,0.18)", marginTop:28, fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:".02em" }}>
          Only authorized admins can access this panel.
        </p>
      </div>
    </div>
  );
}

const styles = {
  fullscreen: {
    position:"fixed", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
    background:"#0D1117", fontFamily:"'Plus Jakarta Sans',sans-serif", padding:16,
  },
  card: {
    width:"100%", maxWidth:420,
    background:"#161B22",
    borderRadius:24,
    border:"1px solid rgba(255,255,255,0.08)",
    boxShadow:"0 24px 60px rgba(0,0,0,0.6)",
    padding:40,
  },
  label: {
    fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.4)",
    textTransform:"uppercase", letterSpacing:".08em",
  },
  error: {
    background:"rgba(192,52,74,0.15)", border:"1px solid rgba(192,52,74,0.3)",
    borderRadius:10, padding:"10px 14px", fontSize:13, color:"#f87171",
    display:"flex", alignItems:"center", gap:8,
  },
  spinner: {
    width:40, height:40, borderRadius:"50%",
    border:"3px solid rgba(26,107,74,0.3)", borderTopColor:"#1A6B4A",
    animation:"spin 0.8s linear infinite",
  },
};