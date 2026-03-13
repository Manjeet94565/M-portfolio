import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const NAME = "Manjeet Varun";
const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    items: [
      { name: "HTML5", icon: "🌐" },
      { name: "CSS3", icon: "🎨" },
      { name: "JavaScript", icon: "📜" },
      { name: "TypeScript", icon: "🔤" },
      { name: "React", icon: "⚛️" },
      { name: "Angular", icon: "🔧" },
      { name: "Bootstrap", icon: "🅱️" }
    ]
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: "⚡" },
      { name: "Express", icon: "🚀" },
      { name: "MongoDB", icon: "🐘" },
      { name: "MySQL", icon: "🗄️" },
      { name: "Python", icon: "🐍" },
      { name: "Flask", icon: "🍶" },
      { name: "Java", icon: "☕" },
      { name: "C", icon: "⚙️" },
      { name: "Firebase", icon: "🔥" }
    ]
  },
  {
    title: "Tools & Platforms",
    items: [
      { name: "Git", icon: "🌿" },
      { name: "GitHub", icon: "📂" },
      { name: "VS Code", icon: "🧑‍💻" },
      { name: "Figma", icon: "🎨" },
      { name: "Android", icon: "🤖" }
    ]
  }
];

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

export default function Skills() {
  const canvasRef = useRef(null);
  const width = useWindowWidth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
      *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      html, body { background: #060a10; overflow-x: hidden; }
      @keyframes fu { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes skillFloat { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-8px) rotate(2deg); } }
      @keyframes skillGlow { 0%, 100% { box-shadow: 0 10px 30px rgba(0,229,204,0.3); } 50% { box-shadow: 0 20px 50px rgba(0,229,204,0.5); } }
      @keyframes menuSlide { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

      .nav-link { position: relative; color: rgba(255,255,255,0.4); text-decoration: none; font-size: 13px; letter-spacing: 0.3px; transition: color 0.25s; cursor: pointer; font-family: 'Outfit', sans-serif; background: none; border: none; padding: 0; }
      .nav-link::after { content: ''; position: absolute; bottom: -3px; left: 0; width: 0; height: 1px; background: #00e5cc; transition: width 0.3s; }
      .nav-link:hover { color: #fff; }
      .nav-link:hover::after { width: 100%; }
      .nav-link.active { color: #00e5cc; }
      .nav-link.active::after { width: 100%; }

      .nav-link-mobile { display: block; width: 100%; text-align: left; color: rgba(255,255,255,0.6); text-decoration: none; font-size: 16px; padding: 14px 0; border: none; border-bottom: 1px solid rgba(255,255,255,0.06); font-family: 'Outfit', sans-serif; transition: color 0.2s; cursor: pointer; background: none; }
      .nav-link-mobile:hover { color: #00e5cc; }

      .skill-item { background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); border: 1px solid rgba(0,229,204,0.2); border-radius: 20px; padding: 24px; text-align: center; transition: all 0.4s ease; cursor: pointer; position: relative; overflow: hidden; }
      .skill-item:hover { transform: translateY(-12px) scale(1.05); background: rgba(0,229,204,0.08); border-color: #00e5cc; animation: skillGlow 1.5s ease-in-out infinite; }
      .skill-icon { font-size: clamp(48px, 8vw, 72px); margin-bottom: 12px; display: block; filter: drop-shadow(0 4px 12px rgba(0,229,204,0.3)); transition: filter 0.3s; }
      .skill-item:hover .skill-icon { filter: drop-shadow(0 8px 24px rgba(0,229,204,0.6)); }
      .skill-name { font-size: 16px; font-weight: 600; color: #fff; letter-spacing: 1px; text-transform: uppercase; }

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

    class Star {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.r = Math.random() * 1.5 + 0.5;
        this.a = Math.random() * 0.6 + 0.2;
        this.ts = 0.006 + Math.random() * 0.01;
        this.td = 1;
      }
      tick() { this.a += this.ts * this.td; if (this.a > 0.8 || this.a < 0.1) this.td *= -1; }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(0,229,204,${this.a})`; ctx.fill(); }
    }

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      stars = Array.from({ length: 150 }, () => new Star());
    }

    function loop() {
      ctx.fillStyle = 'rgba(6, 10, 16, 0.95)';
      ctx.fillRect(0, 0, W, H);
      stars.forEach(s => { s.tick(); s.draw(); });
      animId = requestAnimationFrame(loop);
    }

    resize(); loop();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const fuAnim = (i) => ({
    opacity: 0,
    animation: `fu 0.8s ease forwards ${0.15 + i * 0.1}s`
  });

  const navLinks = ["Home", "About", "Skills", "Experience", "Project", "Contact"];

  return (
    <div style={{
      background: "#060a10",
      minHeight: "100vh",
      fontFamily: "'Outfit', sans-serif",
      color: "#fff",
      position: "relative",
      overflow: "hidden"
    }}>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />

      {/* Orbs */}
      <div style={{ position: "fixed", width: isMobile ? 280 : 520, height: isMobile ? 280 : 520, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,229,204,0.06) 0%,transparent 70%)", top: isMobile ? -120 : -220, right: isMobile ? -80 : 120, zIndex: 1, pointerEvents: "none", filter: "blur(100px)" }} />
      <div style={{ position: "fixed", width: isMobile ? 200 : 420, height: isMobile ? 200 : 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,200,100,0.04) 0%,transparent 70%)", bottom: "10%", left: isMobile ? -80 : 180, zIndex: 1, pointerEvents: "none", filter: "blur(90px)", animation: "gf3 12s ease-in-out infinite" }} />
      <div style={{ position: "fixed", width: isMobile ? 220 : 380, height: isMobile ? 220 : 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,200,255,0.05) 0%,transparent 70%)", top: "25%", right: "15%", zIndex: 1, pointerEvents: "none", filter: "blur(80px)" }} />

      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: isMobile ? "12px 20px" : isTablet ? "12px 32px" : "12px 48px",
        background: "rgba(0,0,0,0.9)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,229,204,0.2)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#00e5cc,#00b8a0)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "#000", letterSpacing: "-0.5px" }}>MV</div>
          {!isMobile && <span style={{ fontWeight: 600, fontSize: 17, color: "#fff" }}>{NAME}</span>}
        </div>

        {!isMobile && (
          <div style={{ display: "flex", gap: isTablet ? 20 : 32 }}>
            {navLinks.map(l => (
              <Link key={l} to={l === "Home" ? "/" : `/${l.toLowerCase()}`} className="nav-link" style={{ fontSize: isTablet ? 13 : 14 }}>{l}</Link>
            ))}
          </div>
        )}

        {isMobile && (
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(6px,6px)" : "none", background: "rgba(255,255,255,0.9)" }} />
            <span style={{ opacity: menuOpen ? 0 : 1, background: "rgba(255,255,255,0.9)" }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(6px,-6px)" : "none", background: "rgba(255,255,255,0.9)" }} />
          </button>
        )}

        {isMobile && menuOpen && (
          <div className="mobile-menu">
            {navLinks.map(l => (
              <Link key={l} to={l === "Home" ? "/" : `/${l.toLowerCase()}`} className="nav-link-mobile" onClick={() => setMenuOpen(false)}>{l}</Link>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section style={{
        padding: isMobile ? "60px 24px" : isTablet ? "80px 40px" : "100px 64px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        zIndex: 10
      }}>
        <div style={{ ...fuAnim(0), maxWidth: 1200, width: "100%" }}>
          <h1 style={{
            ...fuAnim(0),
            fontWeight: 800,
            fontSize: isMobile ? "clamp(36px,10vw,64px)" : isTablet ? "clamp(48px,8vw,72px)" : "clamp(60px,7vw,88px)",
            lineHeight: 1.1,
            letterSpacing: "-2px",
            marginBottom: 24,
            background: "linear-gradient(135deg, #00e5cc 0%, #fff 50%, #00e5cc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Skills &amp; Technologies
          </h1>
          <div style={{ width: 80, height: 4, background: "linear-gradient(90deg,#00e5cc,#00b8a0)", borderRadius: 2, margin: "0 auto 48px" }} />
        </div>

        <div style={{ ...fuAnim(1), width: "100%", maxWidth: 1400 }}>
          {SKILL_CATEGORIES.map((category, catIndex) => (
            <div key={category.title} style={{ marginBottom: 48 }}>
              <h2 style={{
                fontSize: isMobile ? 20 : 24,
                fontWeight: 700,
                marginBottom: 18,
                letterSpacing: 0.5,
                color: "#00e5cc"
              }}>{category.title}</h2>
              <div className="skills-grid" style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(5, 1fr)",
                gap: isMobile ? 20 : isTablet ? 28 : 36,
                maxWidth: 1200,
                margin: "0 auto"
              }}>
                {category.items.map((skill, index) => {
                  const animationIndex = catIndex * 10 + index;
                  return (
                    <div key={skill.name} className="skill-item" style={{ animationDelay: `${animationIndex * 0.05}s` }}>
                      <span className="skill-icon" aria-label={skill.name}>{skill.icon}</span>
                      <div className="skill-name">{skill.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p style={{ ...fuAnim(2), mt: 60, maxWidth: 600, fontSize: 18, color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
          Proficient in modern web technologies with hands-on experience across the full stack.
        </p>
      </section>

      <Footer />
    </div>
  );
}
