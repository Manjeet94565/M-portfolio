import { useEffect, useRef, useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_ITEMS = ["Home", "About", "Skills", "Experience", "Project", "Contact"];

const STATS = [
  { num: "2+", label: "Years Experience" },
  { num: "4+", label: "Internships\n(Virtual / Unpaid)" },
  { num: "20+", label: "Projects Shipped" },
];

const EXPERIENCES = [
  {
    id: "CS",
    title: "Web Developing Internship",
    company: "Code Soft",
    location: "Virtual Internship",
    period: "Sep 2024",
    points: [
      "Designed and developed a responsive Web UI using HTML, CSS, and JavaScript, ensuring clean layout, smooth user flow, and modern design standards.",
      "Collaborated in a real-world development environment, delivering the assigned UI task on time with attention to detail, usability, and consistency.",
    ],
  },
  {
    id: "DL",
    title: "Web Developing Virtual Internship",
    company: "Deloitte",
    location: "Virtual Internship",
    period: "Virtual / Unpaid",
    points: [
      "Completed Deloitte's virtual internship program focused on web development, working on real-world style tasks involving UI design and problem-solving.",
      "Gained hands-on experience with industry-level standards, improving frontend development, responsiveness, and clean code practices, and earned a verified certificate.",
    ],
  },
];

const EDUCATION = [
  {
    icon: "🎓",
    degree: "B.Tech – Computer Science",
    school: "AKTU University, Lucknow",
    year: "2022 – 2026",
  },
  {
    icon: "🏫",
    degree: "Class XII – Science (PCM)",
    school: "Kendriya Vidyalaya, Meerut",
    year: "2021 – 2022",
  },
];

// ─── Hooks ──────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

// ─── StarCanvas ─────────────────────────────────────────────────────────────

function StarCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let stars = [];
    let W, H;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function init() {
      stars = Array.from({ length: 140 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.3 + 0.2,
        a: Math.random() * 0.55 + 0.1,
        speed: Math.random() * 0.22 + 0.04,
        drift: (Math.random() - 0.5) * 0.06,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,255,255,${s.a})`;
        ctx.fill();
        s.y -= s.speed;
        s.x += s.drift;
        if (s.y < -2) { s.y = H + 2; s.x = Math.random() * W; }
        if (s.x < -2 || s.x > W + 2) s.x = Math.random() * W;
      });
      animId = requestAnimationFrame(draw);
    }

    resize(); init(); draw();
    window.addEventListener("resize", () => { resize(); init(); });
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed", top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 0, pointerEvents: "none",
      }}
    />
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const width = useWindowWidth();
  const isMobile = width < 768;

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: isMobile ? "14px 20px" : "16px 56px",
      background: "rgba(6,13,13,0.85)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(0,212,200,0.15)",
    }}>
      {/* Logo */}
      <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#f0fafa", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem" }}>
        <div style={{
          width: 34, height: 34, background: "#00d4c8", borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.76rem", fontWeight: 800, color: "#060d0d", flexShrink: 0,
        }}>MV</div>
        {!isMobile && "Manjeet Varun"}
      </a>

      {/* Desktop links */}
      {!isMobile && (
        <ul style={{ listStyle: "none", display: "flex", gap: 28, margin: 0, padding: 0 }}>
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <a
                href="#"
                style={{
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  color: item === "Experience" ? "#f0fafa" : "#5e8080",
                  borderBottom: item === "Experience" ? "2px solid #00d4c8" : "none",
                  paddingBottom: item === "Experience" ? 2 : 0,
                  transition: "color 0.2s",
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Mobile hamburger */}
      {isMobile && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#00d4c8", fontSize: "1.4rem", padding: 4,
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      )}

      {/* Mobile dropdown */}
      {isMobile && menuOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "rgba(6,13,13,0.97)",
          borderBottom: "1px solid rgba(0,212,200,0.15)",
          padding: "12px 0",
        }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block", padding: "11px 24px",
                textDecoration: "none", fontSize: "0.9rem",
                color: item === "Experience" ? "#00d4c8" : "#a0b8b8",
              }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── ExpCard ─────────────────────────────────────────────────────────────────

function ExpCard({ data, delay }) {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState(false);
  const width = useWindowWidth();
  const isMobile = width < 640;

  return (
    <div
      ref={ref}
      style={{
        position: "relative", marginBottom: 44,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-22px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {/* timeline dot */}
      <div style={{
        position: "absolute", left: -37, top: 22,
        width: 12, height: 12, borderRadius: "50%",
        background: hovered ? "#00d4c8" : "#060d0d",
        border: "2.5px solid #00d4c8",
        boxShadow: hovered ? "0 0 18px #00d4c8" : "0 0 10px rgba(0,212,200,0.3)",
        transition: "background 0.3s, box-shadow 0.3s",
      }} />

      {/* Card */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "rgba(12,21,21,0.92)",
          border: `1px solid ${hovered ? "rgba(0,212,200,0.4)" : "rgba(0,212,200,0.15)"}`,
          borderRadius: 16,
          padding: isMobile ? "22px 18px" : "28px 30px",
          transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered ? "0 16px 48px rgba(0,212,200,0.07),0 4px 16px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {/* Card header */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "flex-start",
          justifyContent: "space-between",
          gap: 12, marginBottom: 16,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flex: 1 }}>
            {/* Icon */}
            <div style={{
              width: 46, height: 46, borderRadius: 11, flexShrink: 0,
              background: "rgba(0,212,200,0.1)",
              border: "1px solid rgba(0,212,200,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Syne',sans-serif", fontWeight: 800,
              fontSize: "0.95rem", color: "#00d4c8",
            }}>
              {data.id}
            </div>
            {/* Meta */}
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: isMobile ? "1rem" : "1.1rem", fontWeight: 700, marginBottom: 3, color: "#f0fafa" }}>
                {data.title}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#00d4c8", fontWeight: 500, marginBottom: 2 }}>
                {data.company}
              </div>
              <div style={{ fontSize: "0.76rem", color: "#5e8080" }}>
                🌐 {data.location}
              </div>
            </div>
          </div>
          {/* Period badge */}
          <div style={{
            fontSize: "0.7rem", fontWeight: 600, padding: "4px 12px",
            borderRadius: 20, border: "1px solid #ff7043",
            color: "#ff7043", background: "rgba(255,112,67,0.1)",
            whiteSpace: "nowrap", letterSpacing: "0.04em",
            alignSelf: isMobile ? "flex-start" : "flex-start",
            marginLeft: isMobile ? 58 : 0,
          }}>
            {data.period}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(0,212,200,0.15)", marginBottom: 16 }} />

        {/* Points */}
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, margin: 0, padding: 0 }}>
          {data.points.map((pt, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: isMobile ? "0.82rem" : "0.875rem", color: "#b8d4d4", lineHeight: 1.65 }}>
              <span style={{ color: "#00d4c8", flexShrink: 0, marginTop: 2 }}>▹</span>
              {pt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── EduCard ─────────────────────────────────────────────────────────────────

function EduCard({ data, delay }) {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState(false);
  const width = useWindowWidth();
  const isMobile = width < 640;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(12,21,21,0.92)",
        border: `1px solid ${hovered ? "rgba(0,212,200,0.35)" : "rgba(0,212,200,0.15)"}`,
        borderRadius: 16,
        padding: isMobile ? "22px 18px" : "26px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, border-color 0.3s`,
      }}
    >
      <div style={{ fontSize: "1.8rem", marginBottom: 12 }}>{data.icon}</div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.98rem", fontWeight: 700, marginBottom: 6, color: "#f0fafa" }}>
        {data.degree}
      </div>
      <div style={{ fontSize: "0.84rem", color: "#00d4c8", marginBottom: 4 }}>{data.school}</div>
      <div style={{ fontSize: "0.75rem", color: "#5e8080" }}>{data.year}</div>
    </div>
  );
}

// ─── SectionTitle ────────────────────────────────────────────────────────────

function SectionTitle({ number, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36 }}>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.3rem,3vw,1.7rem)", fontWeight: 800, whiteSpace: "nowrap", margin: 0, color: "#f0fafa" }}>
        <span style={{ color: "#00d4c8" }}>{number}</span> {children}
      </h2>
      <div style={{ flex: 1, height: 1, background: "rgba(0,212,200,0.15)" }} />
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ExperiencePage() {
  const [showBtn, setShowBtn] = useState(false);
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  useEffect(() => {
    const handler = () => setShowBtn(window.scrollY > 300);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const hPad = isMobile ? "0 16px" : isTablet ? "0 32px" : "0 24px";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #060d0d; overflow-x: hidden; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes fadeUp { to { opacity:1; transform:translateY(0); } }
        a { transition: color 0.2s; }
        a:hover { color: #f0fafa !important; }
      `}</style>

      <div style={{ background: "#060d0d", color: "#f0fafa", fontFamily: "'DM Sans',sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
        <StarCanvas />
        <Navbar />

        <main style={{ position: "relative", zIndex: 1, paddingTop: isMobile ? 80 : 100, paddingBottom: 80 }}>

          {/* ── PAGE HEADER ── */}
          <header style={{ textAlign: "center", padding: isMobile ? "40px 20px 48px" : "56px 20px 64px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: "1px solid #00d4c8", color: "#00d4c8",
              fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em",
              textTransform: "uppercase", padding: "5px 14px",
              borderRadius: 4, marginBottom: 20,
            }}>
              <div style={{ width: 6, height: 6, background: "#00d4c8", borderRadius: "50%", animation: "blink 1.4s infinite", flexShrink: 0 }} />
              My Journey
            </div>

            <h1 style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: isMobile ? "2.4rem" : isTablet ? "3.8rem" : "clamp(2.6rem,6.5vw,5rem)",
              fontWeight: 800, lineHeight: 1.07, letterSpacing: "-0.03em",
            }}>
              Work <span style={{ color: "#00d4c8" }}>Experience</span>
              <br />
              &amp; <span style={{ color: "#ff7043" }}>Growth</span>
            </h1>

            <p style={{
              marginTop: 16, fontSize: isMobile ? "0.88rem" : "0.95rem",
              color: "#5e8080", maxWidth: 440,
              marginLeft: "auto", marginRight: "auto", lineHeight: 1.75,
            }}>
              From first lines of code to real-world internships — here's the story so far.
            </p>
          </header>

          {/* ── STATS ── */}
          <div style={{
            display: "flex", justifyContent: "center",
            gap: isMobile ? 28 : 52, flexWrap: "wrap",
            margin: "0 auto 68px", padding: "0 20px",
          }}>
            {STATS.map((s, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center", minWidth: isMobile ? 80 : 100,
                  opacity: 0, transform: "translateY(18px)",
                  animation: `fadeUp 0.6s ease ${0.1 + i * 0.12}s forwards`,
                }}
              >
                <div style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: isMobile ? "2.2rem" : "2.8rem",
                  fontWeight: 800, color: "#00d4c8", lineHeight: 1,
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontSize: isMobile ? "0.65rem" : "0.73rem",
                  color: "#5e8080", marginTop: 6,
                  letterSpacing: "0.07em", textTransform: "uppercase",
                  whiteSpace: "pre-line",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── CONTENT WRAP ── */}
          <div style={{ maxWidth: 880, margin: "0 auto", padding: hPad }}>

            {/* Work History */}
            <SectionTitle number="01.">Work History</SectionTitle>

            <div style={{ position: "relative", paddingLeft: isMobile ? 28 : 44, marginBottom: 72 }}>
              {/* vertical line */}
              <div style={{
                position: "absolute",
                left: isMobile ? 8 : 14,
                top: 0, bottom: 0, width: 2,
                background: "linear-gradient(to bottom, #00d4c8, #ff7043, transparent)",
              }} />
              {EXPERIENCES.map((exp, i) => (
                <ExpCard key={exp.id} data={exp} delay={i * 100} />
              ))}
            </div>

            {/* Education */}
            <SectionTitle number="02.">Education</SectionTitle>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)",
              gap: isMobile ? 14 : 20,
              marginBottom: 60,
            }}>
              {EDUCATION.map((edu, i) => (
                <EduCard key={i} data={edu} delay={i * 120} />
              ))}
            </div>

          </div>
        </main>

        {/* ── SCROLL TO TOP ── */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed", bottom: 28, right: 24,
            width: isMobile ? 38 : 42, height: isMobile ? 38 : 42,
            borderRadius: "50%", background: "#00d4c8",
            color: "#060d0d", border: "none",
            fontSize: "1rem", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 18px rgba(0,212,200,0.3)",
            opacity: showBtn ? 1 : 0,
            pointerEvents: showBtn ? "all" : "none",
            transition: "opacity 0.3s",
            zIndex: 99,
          }}
        >
          ↑
        </button>
      </div>
    </>
  );
}