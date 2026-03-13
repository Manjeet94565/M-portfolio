import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const NAME = "Manjeet Varun";
const ROLES = [
  "Full Stack Developer",
  "Video Editor",
  "Designer   ",
  "Photographer    ",
  "YouTuber    ",
  "Gamer    ",
];
const BIO =
  "I turn complex ideas into seamless, high-impact web experiences — building modern, scalable and lightning-fast applications that make a difference.";

function useTypewriter(roles) {
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const pauseRef = useRef(false);

  useEffect(() => {
    if (pauseRef.current) return;
    const current = roles[roleIdx];
    const speed = deleting ? 50 : 100;
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = charIdx + 1;
        setText(current.slice(0, next));
        if (next === current.length) {
          pauseRef.current = true;
          setTimeout(() => { pauseRef.current = false; setDeleting(true); }, 1500);
        } else { setCharIdx(next); }
      } else {
        const next = charIdx - 1;
        setText(current.slice(0, next));
        if (next === 0) {
          setDeleting(false);
          setRoleIdx((r) => (r + 1) % roles.length);
          setCharIdx(0);
        } else { setCharIdx(next); }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, roleIdx, roles]);

  return text;
}

const LIGHTNING_CURSOR = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='48' viewBox='0 0 30 50'><polygon points='18,0 5,26 15,26 9,50 26,17 15,17' fill='%23ffe033' stroke='%23f5c400' stroke-width='1.2'/></svg>`;

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

export default function Home() {
  const canvasRef = useRef(null);
  const typedRole = useTypewriter(ROLES);
  const width = useWindowWidth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
      *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { background: #060a10; overflow-x: hidden; }
      @keyframes fu { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
      @keyframes cheekGlow { 0%,100% { opacity: 0.75; box-shadow: 0 0 6px rgba(255,80,80,0.4); } 50% { opacity: 1; box-shadow: 0 0 16px rgba(255,80,80,0.75); } }
      @keyframes pikaFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      @keyframes boltPulse { 0%,100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.18); } }
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes spinR { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      @keyframes gf1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-50px,-40px); } }
      @keyframes gf2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px,50px); } }
      @keyframes gf3 { 0%,100% { transform: scale(1); } 50% { transform: scale(1.5); } }
      @keyframes menuSlide { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

      .nav-link { position: relative; color: rgba(255,255,255,0.4); text-decoration: none; font-size: 13px; letter-spacing: 0.3px; transition: color 0.25s; cursor: pointer; font-family: 'Outfit', sans-serif; background: none; border: none; padding: 0; }
      .nav-link::after { content: ''; position: absolute; bottom: -3px; left: 0; width: 0; height: 1px; background: #00e5cc; transition: width 0.3s; }
      .nav-link:hover { color: #fff; }
      .nav-link:hover::after { width: 100%; }

      .nav-link-mobile { display: block; width: 100%; text-align: left; color: rgba(255,255,255,0.6); text-decoration: none; font-size: 16px; padding: 14px 0; border: none; border-bottom: 1px solid rgba(255,255,255,0.06); font-family: 'Outfit', sans-serif; transition: color 0.2s; cursor: pointer; background: none; }
      .nav-link-mobile:hover { color: #00e5cc; }

      .sc-btn { width: 38px; height: 38px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.25s; background: rgba(255,255,255,0.03); }
      .sc-btn:hover { border-color: #00e5cc; background: rgba(0,229,204,0.08); }
      .sc-btn:hover svg { fill: #00e5cc; }

      .b1 { padding: 12px 28px; background: linear-gradient(135deg,#00b8a0,#0097a7); border: none; border-radius: 50px; color: #fff; font-family: 'Outfit',sans-serif; font-size: 15px; font-weight: 500; cursor: pointer; transition: all 0.25s; white-space: nowrap; }
      .b1:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,200,180,0.3); }
      .b2 { padding: 12px 28px; background: transparent; border: 1.5px solid rgba(255,255,255,0.18); border-radius: 50px; color: rgba(255,255,255,0.7); font-family: 'Outfit',sans-serif; font-size: 15px; cursor: pointer; transition: all 0.25s; white-space: nowrap; }
      .b2:hover { border-color: rgba(255,255,255,0.45); color: #fff; }

      .tag-pill { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #00e5cc; letter-spacing: 2px; text-transform: uppercase; border: 1px solid rgba(0,229,204,0.25); padding: 6px 14px; border-radius: 4px; background: rgba(0,229,204,0.05); font-family: 'Outfit',sans-serif; min-height: 32px; }
      .cursor-blink { display: inline-block; width: 2px; height: 13px; background: #00e5cc; margin-left: 2px; animation: blink 1s step-end infinite; vertical-align: middle; }

      .pika-cheek-l { animation: cheekGlow 2s ease-in-out infinite; }
      .pika-cheek-r { animation: cheekGlow 2s ease-in-out infinite 0.3s; }
      .pika-wrap { animation: pikaFloat 3s ease-in-out infinite; display: flex; flex-direction: column; align-items: center; position: relative; z-index: 5; filter: drop-shadow(0 0 15px rgba(255,255,0,0.6)) drop-shadow(0 0 30px rgba(255,255,0,0.3)); }
      .bolt { animation: boltPulse 1.8s ease-in-out infinite; }
      .ring1 { animation: spin 22s linear infinite; position: absolute; border-radius: 50%; border: 1px solid rgba(0,229,204,0.08); }
      .ring2 { animation: spinR 30s linear infinite; position: absolute; border-radius: 50%; border: 1px dashed rgba(255,220,0,0.07); }
      .orb1 { animation: gf1 14s ease-in-out infinite; }
      .orb2 { animation: gf2 18s ease-in-out infinite; }
      .orb3 { animation: gf3 11s ease-in-out infinite; }

      .hamburger { display: flex; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
      .hamburger span { display: block; width: 22px; height: 2px; background: rgba(255,255,255,0.7); border-radius: 2px; transition: all 0.3s; }
      .mobile-menu { position: absolute; top: 100%; left: 0; right: 0; background: #000; border-bottom: 1px solid rgba(0,229,204,0.1); padding: 8px 24px 20px; z-index: 100; animation: menuSlide 0.25s ease; backdrop-filter: blur(20px); }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let stars = [];
    let W, H;
    let ss = { active: false, timer: 4000, prog: 0, x: 0, y: 0, alpha: 0 };

    class Star {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.r = Math.random() * 1.3 + 0.2;
        this.a = Math.random() * 0.5 + 0.1;
        this.ts = 0.008 + Math.random() * 0.012;
        this.td = 1;
      }
      tick() { this.a += this.ts * this.td; if (this.a > 0.65 || this.a < 0.05) this.td *= -1; }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${this.a})`; ctx.fill(); }
    }

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      stars = Array.from({ length: 160 }, () => new Star());
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      stars.forEach((s) => { s.tick(); s.draw(); });
      ss.timer -= 16;
      if (!ss.active && ss.timer <= 0) {
        ss.x = Math.random() * W * 0.6;
        ss.y = Math.random() * H * 0.3;
        ss.alpha = 1; ss.active = true; ss.prog = 0;
      }
      if (ss.active) {
        ss.prog += 7;
        const angle = Math.PI / 5;
        const x2 = ss.x + Math.cos(angle) * ss.prog;
        const y2 = ss.y + Math.sin(angle) * ss.prog;
        const grd = ctx.createLinearGradient(ss.x, ss.y, x2, y2);
        grd.addColorStop(0, "rgba(255,255,255,0)");
        grd.addColorStop(1, `rgba(180,255,240,${ss.alpha})`);
        ctx.beginPath(); ctx.moveTo(ss.x, ss.y); ctx.lineTo(x2, y2);
        ctx.strokeStyle = grd; ctx.lineWidth = 1.5; ctx.stroke();
        ss.alpha -= 0.018;
        if (ss.alpha <= 0) { ss.active = false; ss.timer = 5000 + Math.random() * 7000; }
      }
      animId = requestAnimationFrame(loop);
    }

    resize(); loop();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  const fuAnim = (i) => ({
    opacity: 0,
    animation: `fu 0.7s ease forwards ${0.1 + i * 0.1}s`,
  });

  const navLinks = ["Home", "About", "Skills", "Experience", "Project", "Contact"];
  const pikaScale = isMobile ? 0.6 : isTablet ? 0.78 : 1;
  const pikaContainerH = isMobile ? 300 : isTablet ? 400 : 560;
  const ringSize1 = Math.round(300 * pikaScale);
  const ringSize2 = Math.round(230 * pikaScale);

  return (
    <div style={{
      background: "#060a10",
      minHeight: "100vh",
      fontFamily: "'Outfit', sans-serif",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
      cursor: `url("${LIGHTNING_CURSOR}") 10 0, auto`,
    }}>
      {/* Canvas */}
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />

      {/* Orbs */}
      <div className="orb1" style={{ position: "fixed", width: isMobile ? 280 : 600, height: isMobile ? 280 : 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,200,200,0.07) 0%,transparent 65%)", bottom: isMobile ? -100 : -200, right: isMobile ? -60 : 80, zIndex: 1, pointerEvents: "none", filter: "blur(80px)" }} />
      <div className="orb2" style={{ position: "fixed", width: isMobile ? 180 : 400, height: isMobile ? 180 : 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,255,200,0.05) 0%,transparent 65%)", top: 0, left: isMobile ? -60 : 200, zIndex: 1, pointerEvents: "none", filter: "blur(80px)" }} />
      <div className="orb3" style={{ position: "fixed", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,200,0,0.04) 0%,transparent 65%)", top: "30%", right: "28%", zIndex: 1, pointerEvents: "none", filter: "blur(80px)" }} />

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: isMobile ? "7px 16px" : isTablet ? "8px 24px" : "8px 40px",
        borderBottom: "0.5px solid rgba(255,255,255,0.07)",
        background: "#000",
        backdropFilter: "blur(16px)",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#00e5cc,#00b8a0)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#000", letterSpacing: "-0.5px", flexShrink: 0 }}>MV</div>
          {!isMobile && <span style={{ fontWeight: 600, fontSize: isTablet ? 15 : 16, color: "#fff" }}>{NAME}</span>}
        </div>

        {/* Desktop + Tablet Nav Links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: isTablet ? 18 : 28 }}>
            {navLinks.map((l) => (
              <Link key={l} to={l === "Home" ? "/" : `/${l.toLowerCase()}`} className="nav-link" style={{ fontSize: isTablet ? 12 : 13 }}>{l}</Link>
            ))}
          </div>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        )}

        {/* Mobile Dropdown */}
        {isMobile && menuOpen && (
          <div className="mobile-menu">
            {navLinks.map((l) => (
              <Link key={l} to={l === "Home" ? "/" : `/${l.toLowerCase()}`} className="nav-link-mobile" onClick={() => setMenuOpen(false)}>{l}</Link>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{
        position: "relative", zIndex: 10,
        display: "grid",
        gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
        alignItems: "center",
        minHeight: "calc(100vh - 49px)",
        padding: isMobile ? "36px 20px 60px" : isTablet ? "36px 32px 60px" : "0 56px",
        gap: isDesktop ? 40 : 0,
      }}>

        {/* LEFT */}
        <div style={{
          display: "flex", flexDirection: "column",
          alignItems: isMobile || isTablet ? "center" : "flex-start",
          textAlign: isMobile || isTablet ? "center" : "left",
          paddingLeft: isDesktop ? 20 : 0,
        }}>
          <div style={{ ...fuAnim(0), marginBottom: 20 }}>
            <span className="tag-pill">
              {typedRole}<span className="cursor-blink" />
            </span>
          </div>

          <div style={{ ...fuAnim(1), fontSize: isMobile ? 22 : 28, fontWeight: 400, color: "rgba(255,255,255,0.7)", marginBottom: 6 }}>
            <span style={{ color: "#4fc3f7", fontWeight: 500 }}>Hello,</span>{" "}
            <span style={{ color: "#ffab76" }}>I'm</span>
          </div>

          <h1 style={{
            ...fuAnim(2),
            fontWeight: 700,
            fontSize: isMobile ? "clamp(38px,10vw,60px)" : isTablet ? "clamp(42px,7vw,70px)" : "clamp(46px,6vw,80px)",
            lineHeight: 1.05,
            letterSpacing: "-1.5px",
            marginBottom: 18,
          }}>
            {NAME}
          </h1>

          <p style={{
            ...fuAnim(3),
            fontSize: isMobile ? 16 : 18,
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.85,
            maxWidth: isMobile ? "100%" : 440,
            fontWeight: 400,
            marginBottom: 30,
          }}>
            {BIO}
          </p>

          <div style={{
            ...fuAnim(4),
            display: "flex", gap: 12, marginBottom: 30,
            flexWrap: "wrap",
            justifyContent: isMobile || isTablet ? "center" : "flex-start",
          }}>
            <button className="b1">View My Work</button>
            <button className="b2">My Resume</button>
          </div>

          <div style={{
            ...fuAnim(5),
            display: "flex", gap: 12,
            justifyContent: isMobile || isTablet ? "center" : "flex-start",
          }}>
            <div className="sc-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(255,255,255,0.45)" style={{ transition: "fill 0.25s" }}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <div className="sc-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(255,255,255,0.45)" style={{ transition: "fill 0.25s" }}>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </div>
            <div className="sc-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(255,255,255,0.45)" style={{ transition: "fill 0.25s" }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* RIGHT — Pikachu */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
          height: pikaContainerH,
          marginTop: isMobile || isTablet ? 16 : 0,
        }}>
          <div className="ring1" style={{ width: ringSize1, height: ringSize1, top: "50%", left: "50%", marginTop: -ringSize1 / 2, marginLeft: -ringSize1 / 2 }} />
          <div className="ring2" style={{ width: ringSize2, height: ringSize2, top: "50%", left: "50%", marginTop: -ringSize2 / 2, marginLeft: -ringSize2 / 2 }} />
          <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: Math.round(260 * pikaScale), height: Math.round(70 * pikaScale), background: "radial-gradient(ellipse,rgba(0,229,204,0.12) 0%,transparent 70%)", borderRadius: "50%" }} />

          <div style={{ transform: `scale(${pikaScale})`, transformOrigin: "center center" }}>
            <div className="pika-wrap">
              <div style={{ display: "flex", gap: 80, marginBottom: -18, position: "relative", zIndex: 2 }}>
                {["-12deg", "12deg"].map((rot, i) => (
                  <div key={i} style={{ width: 36, height: 58, background: "#f5c400", borderRadius: "50% 50% 30% 30%", transform: `rotate(${rot})`, position: "relative" }}>
                    <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 14, height: 32, background: "#1a0a00", borderRadius: "50% 50% 30% 30%" }} />
                  </div>
                ))}
              </div>
              <div style={{ width: 160, height: 140, background: "radial-gradient(circle at 40% 35%,#ffe033,#f5c400)", borderRadius: "50% 50% 45% 45%", position: "relative", zIndex: 3, boxShadow: "0 0 30px rgba(255,200,0,0.18)" }}>
                {[{ left: 30 }, { right: 30 }].map((pos, i) => (
                  <div key={i} style={{ position: "absolute", top: 38, ...pos, width: 22, height: 24, background: "#1a0a00", borderRadius: "50%", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 4, right: 4, width: 7, height: 7, background: "rgba(255,255,255,0.9)", borderRadius: "50%" }} />
                  </div>
                ))}
                <div style={{ position: "absolute", top: 68, left: "50%", transform: "translateX(-50%)", width: 10, height: 7, background: "#dd4455", borderRadius: "50%" }} />
                <div style={{ position: "absolute", top: 76, left: "50%", transform: "translateX(-50%)", width: 22, height: 10, borderBottom: "3px solid #aa3333", borderRadius: "0 0 50% 50%" }} />
                <div className="pika-cheek-l" style={{ position: "absolute", top: 62, left: 14, width: 30, height: 20, background: "rgba(255,100,100,0.75)", borderRadius: "50%" }} />
                <div className="pika-cheek-r" style={{ position: "absolute", top: 62, right: 14, width: 30, height: 20, background: "rgba(255,100,100,0.75)", borderRadius: "50%" }} />
              </div>
              <div style={{ width: 130, height: 110, background: "radial-gradient(circle at 40% 30%,#ffe033,#f5c400)", borderRadius: "45% 45% 40% 40%", position: "relative", zIndex: 2, marginTop: -8 }}>
                <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", width: 70, height: 55, background: "rgba(255,240,180,0.55)", borderRadius: "50%" }} />
                <div style={{ position: "absolute", left: -18, top: 10, width: 26, height: 38, background: "#f5c400", borderRadius: "50% 50% 40% 40%", transform: "rotate(20deg)" }} />
                <div style={{ position: "absolute", right: -18, top: 10, width: 26, height: 38, background: "#f5c400", borderRadius: "50% 50% 40% 40%", transform: "rotate(-20deg)" }} />
                <div style={{ position: "absolute", right: -32, bottom: 20, width: 28, height: 48, background: "#f5c400", borderRadius: "50% 50% 30% 30%", transform: "rotate(38deg)", zIndex: 1 }}>
                  <div style={{ position: "absolute", top: -10, left: -4, width: 20, height: 22, background: "#f5c400", borderRadius: "50%", transform: "rotate(-20deg)" }} />
                </div>
                <div className="bolt" style={{ position: "absolute", right: -52, top: -20, zIndex: 10 }}>
                  <svg width="30" height="50" viewBox="0 0 30 50" fill="none" style={{ filter: "drop-shadow(0 0 7px #ffe033)" }}>
                    <polygon points="18,0 5,26 15,26 9,50 26,17 15,17" fill="#ffe033" stroke="#f5c400" strokeWidth="1" />
                  </svg>
                </div>
              </div>
              <div style={{ display: "flex", gap: 22, marginTop: -4, position: "relative", zIndex: 2 }}>
                <div style={{ width: 36, height: 30, background: "#f5c400", borderRadius: "30% 30% 50% 50%" }} />
                <div style={{ width: 36, height: 30, background: "#f5c400", borderRadius: "30% 30% 50% 50%" }} />
              </div>
            </div>
          </div>

          {isDesktop && (
            <div style={{ position: "absolute", bottom: 10, right: 10, display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 6, opacity: 0.13 }}>
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} style={{ width: 3, height: 3, borderRadius: "50%", background: "#00e5cc" }} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}