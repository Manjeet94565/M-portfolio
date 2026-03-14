import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const NAME = "Manjeet Varun";
const ABOUT_TEXT = "I'm a passionate full-stack developer with a love for creating innovative web experiences. My journey in tech started with a curiosity for how things work, and it has evolved into a career where I blend creativity with technical expertise to build solutions that matter.";
const QUALIFICATION = "B.Tech -  Dr. APJ Abdul Kalam University";
const INTERESTS = ["Video Editing", "Photography", "Gaming", "YouTube Content Creation"];

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

export default function About() {
  const canvasRef = useRef(null);
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
      html { scroll-behavior: smooth; }
      html, body { background: #060a10; overflow-x: hidden; }
      @keyframes fu { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
      @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      @keyframes menuSlide { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulseRing { 0%,100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.06); } }

      .nav-link { position: relative; color: rgba(255,255,255,0.4); text-decoration: none; font-size: 13px; letter-spacing: 0.3px; transition: color 0.25s; cursor: pointer; font-family: 'Outfit', sans-serif; background: none; border: none; padding: 0; }
      .nav-link::after { content: ''; position: absolute; bottom: -3px; left: 0; width: 0; height: 1px; background: #00e5cc; transition: width 0.3s; }
      .nav-link:hover { color: #fff; }
      .nav-link:hover::after { width: 100%; }

      .nav-link-mobile { display: block; width: 100%; text-align: left; color: rgba(255,255,255,0.6); text-decoration: none; font-size: 16px; padding: 14px 0; border: none; border-bottom: 1px solid rgba(255,255,255,0.06); font-family: 'Outfit', sans-serif; transition: color 0.2s; cursor: pointer; background: none; }
      .nav-link-mobile:hover { color: #00e5cc; }

      .skill-tag { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; color: #00e5cc; letter-spacing: 1px; text-transform: uppercase; border: 1px solid rgba(0,229,204,0.25); padding: 8px 16px; border-radius: 6px; background: rgba(0,229,204,0.05); font-family: 'Outfit',sans-serif; margin: 4px; transition: all 0.25s; }
      .skill-tag:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,229,204,0.2); }

      .interest-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; transition: all 0.3s; }
      .interest-card:hover { transform: translateY(-4px); border-color: rgba(0,229,204,0.3); box-shadow: 0 8px 24px rgba(0,229,204,0.1); }

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
      stars = Array.from({ length: 120 }, () => new Star());
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      stars.forEach((s) => { s.tick(); s.draw(); });
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

  return (
    <div style={{
      background: "#060a10",
      minHeight: "100vh",
      fontFamily: "'Outfit', sans-serif",
      color: "#fff",
      position: "relative",
      overflowY: "auto",
      overflowX: "hidden",
    }}>
      {/* Canvas */}
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />

      {/* Orbs */}
      <div style={{ position: "fixed", width: isMobile ? 240 : 500, height: isMobile ? 240 : 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,200,200,0.05) 0%,transparent 65%)", top: isMobile ? -100 : -150, right: isMobile ? -80 : 100, zIndex: 1, pointerEvents: "none", filter: "blur(60px)" }} />
      <div style={{ position: "fixed", width: isMobile ? 160 : 350, height: isMobile ? 160 : 350, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,255,200,0.04) 0%,transparent 65%)", bottom: 0, left: isMobile ? -60 : 150, zIndex: 1, pointerEvents: "none", filter: "blur(60px)" }} />
      <div style={{ position: "fixed", width: isMobile ? 200 : 400, height: isMobile ? 200 : 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,100,150,0.03) 0%,transparent 65%)", top: "20%", left: isMobile ? -40 : -100, zIndex: 1, pointerEvents: "none", filter: "blur(80px)" }} />
      <div style={{ position: "fixed", width: isMobile ? 180 : 380, height: isMobile ? 180 : 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(150,100,255,0.04) 0%,transparent 65%)", bottom: "30%", right: isMobile ? -60 : -120, zIndex: 1, pointerEvents: "none", filter: "blur(70px)" }} />
      <div style={{ position: "fixed", width: isMobile ? 150 : 300, height: isMobile ? 150 : 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,200,100,0.03) 0%,transparent 65%)", top: "60%", left: "70%", zIndex: 1, pointerEvents: "none", filter: "blur(90px)" }} />

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
        padding: isMobile ? "40px 20px" : isTablet ? "60px 32px" : "80px 56px",
        display: "flex",
        flexDirection: "column",
      }}>
        <div style={{
          maxWidth: isDesktop ? "1200px" : "100%",
          margin: "0 auto",
        }}>
          {/* Title */}
          <div style={{ ...fuAnim(0), marginBottom: 40 }}>
            <h1 style={{
              fontWeight: 700,
              fontSize: isMobile ? "clamp(32px,8vw,50px)" : isTablet ? "clamp(40px,6vw,60px)" : "clamp(48px,5vw,72px)",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              marginBottom: 16,
              background: "linear-gradient(135deg, #00e5cc, #00b8a0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              About Me
            </h1>
            <div style={{ width: 60, height: 3, background: "linear-gradient(135deg,#00e5cc,#00b8a0)", borderRadius: 2 }} />
          </div>

          {/* About Text */}
          <div style={{
            ...fuAnim(1),
            display: "grid",
            gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
            gap: isDesktop ? 60 : 40,
            alignItems: "start",
            marginBottom: 60,
          }}>
            {/* Left Side - Photo */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <div className="profile-photo" style={{
                width: isMobile ? 250 : isTablet ? 300 : 350,
                height: isMobile ? 250 : isTablet ? 300 : 350,
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
              }}>
                <img
                  src="/assets/photomain.jpeg" // Using your photo from public/assets/
                  alt="Manjeet Varun"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </div>

            {/* Right Side - About & Qualification */}
            <div>
              <h2 style={{
                fontSize: isMobile ? 24 : 28,
                fontWeight: 600,
                color: "#00e5cc",
                marginBottom: 20,
              }}>
                About Me
              </h2>

              <p style={{
                fontSize: isMobile ? 16 : 18,
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.8,
                marginBottom: 30,
              }}>
                {ABOUT_TEXT}
              </p>

              <div style={{
                background: "rgba(0,229,204,0.05)",
                border: "1px solid rgba(0,229,204,0.2)",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: 30,
              }}>
                <h3 style={{
                  fontSize: isMobile ? 18 : 20,
                  fontWeight: 600,
                  color: "#00e5cc",
                  marginBottom: 10,
                }}>
                  🎓 EDUCATION
                </h3>
                <p style={{
                  fontSize: isMobile ? 16 : 18,
                  color: "rgba(255,255,255,0.9)",
                  fontWeight: 500,
                }}>
                  {QUALIFICATION}
                </p>
              </div>

              <p style={{
                fontSize: isMobile ? 16 : 18,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.8,
              }}>
                Beyond coding, I'm passionate about video editing, photography, and creating content on YouTube.
                I believe in continuous learning and staying curious about the ever-evolving world of technology.
              </p>
            </div>
          </div>

          {/* Interests Section */}
          <div style={{ ...fuAnim(2) }}>

            <h3 style={{
              fontSize: isMobile ? 24 : 28,
              fontWeight: 600,
              color: "#00e5cc",
              marginBottom: 30,
              textAlign: "center",
            }}>
              Interests & Hobbies
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(4, 1fr)",
              gap: 20,
            }}>
              {INTERESTS.map((interest) => (
                <div key={interest} className="interest-card">
                  <div style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: 12,
                  }}>
                    {interest}
                  </div>
                  <div style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.5,
                  }}>
                    {interest === "Video Editing" && "Creating compelling visual stories and content"}
                    {interest === "Photography" && "Capturing moments and exploring visual creativity"}
                    {interest === "Gaming" && "Exploring virtual worlds and strategic gameplay"}
                    {interest === "YouTube Content Creation" && "Sharing knowledge and entertaining audiences"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}