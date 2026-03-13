import { Link } from "react-router-dom";

const NAV_LINKS = ["Home", "About", "Skills", "Experience", "Project", "Contact"];

export default function Footer() {
  return (
    <footer className="glowing-footer" style={{
      padding: "60px 24px 40px",
      background: "rgba(0,0,0,0.92)",
      borderTop: "1px solid rgba(0,229,204,0.2)",
      boxShadow: "0 -20px 40px rgba(0,229,204,0.1), inset 0 1px 0 rgba(0,229,204,0.08)",
      color: "rgba(255,255,255,0.85)",
      fontFamily: "'Outfit', sans-serif",
      position: "relative",
    }}>
      <div className="footer-glow" style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(circle at center bottom, rgba(0,229,204,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 32,
        position: "relative",
        zIndex: 1,
      }}> 
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#00e5cc", marginBottom: 12 }}>Manjeet Varun</h3>
          <p style={{ lineHeight: 1.8, color: "rgba(255,255,255,0.75)", marginBottom: 20 }}>
            Building clean, performant web apps with a focus on modern UI and smooth UX. Let&apos;s build something that scales.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <a
              href="https://www.linkedin.com"
              target="_blank" rel="noreferrer"
              style={{
                width: 40, height: 40, borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.16)",
                display: "grid", placeItems: "center",
                color: "rgba(255,255,255,0.75)",
                textDecoration: "none",
                transition: "all 0.25s",
                background: "rgba(255,255,255,0.02)"
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#00e5cc";
                e.target.style.background = "rgba(0,229,204,0.08)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.16)";
                e.target.style.background = "rgba(255,255,255,0.02)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank" rel="noreferrer"
              style={{
                width: 40, height: 40, borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.16)",
                display: "grid", placeItems: "center",
                color: "rgba(255,255,255,0.75)",
                textDecoration: "none",
                transition: "all 0.25s",
                background: "rgba(255,255,255,0.02)"
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#00e5cc";
                e.target.style.background = "rgba(0,229,204,0.08)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.16)";
                e.target.style.background = "rgba(255,255,255,0.02)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            <a
              href="https://wa.me/"
              target="_blank" rel="noreferrer"
              style={{
                width: 40, height: 40, borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.16)",
                display: "grid", placeItems: "center",
                color: "rgba(255,255,255,0.75)",
                textDecoration: "none",
                transition: "all 0.25s",
                background: "rgba(255,255,255,0.02)"
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#00e5cc";
                e.target.style.background = "rgba(0,229,204,0.08)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.16)";
                e.target.style.background = "rgba(255,255,255,0.02)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#00e5cc", marginBottom: 12 }}>Quick Links</h3>
          <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {NAV_LINKS.map((label) => (
              <Link
                key={label}
                to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                style={{
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  fontSize: 15,
                }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#00e5cc", marginBottom: 12 }}>Contact Info</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, color: "rgba(255,255,255,0.75)", fontSize: 15 }}>
            <span>manjeetvarun42@gmail.com</span>
            <span>+91 8476909305</span>
            <span>India</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 44, textAlign: "center", color: "rgba(255,255,255,0.45)", fontSize: 13 }}>
        © {new Date().getFullYear()} Manjeet Varun. All rights reserved.
      </div>
    </footer>
  );
}
