import { useState, useEffect, useRef } from "react";

const architectureProjects = [
  {
    title: "Project Name",
    description: "Location — 2024. Brief description of the project, awards received, and your role as design lead.",
  },
  {
    title: "Project Name",
    description: "Location — 2023. Brief description of the project scope and design approach.",
  },
  {
    title: "Project Name",
    description: "Location — 2022. Brief description highlighting key design decisions.",
  },
];

const photographyWorks = [
  { title: "The Passenger", description: "Black & White on Paper — 36 × 50.3 cm. Awarded on 1x.", image: "/images/the-passenger.jpeg" },
];

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function PlaceholderImage({ label, aspect = "4/3" }) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: aspect,
        backgroundColor: "#f4f4f4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Courier New', monospace",
        fontSize: "12px",
        color: "#ccc",
        letterSpacing: "0.05em",
      }}
    >
      {label}
    </div>
  );
}

function HomePage({ onNavigate }) {
  const [entered, setEntered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  const sections = ["Architecture", "Photography", "About", "Contact"];

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "48px",
        padding: "0 32px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          opacity: entered ? 1 : 0,
          transform: entered ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 300,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#1a1a1a",
            margin: 0,
          }}
        >
          Taner Doger
        </h1>
        <div
          style={{
            width: "32px",
            height: "1px",
            backgroundColor: "#ccc",
            margin: "20px auto",
          }}
        />
        <p
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "clamp(10px, 1.2vw, 13px)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#aaa",
            margin: 0,
          }}
        >
          Architect & Photographer
        </p>
      </div>

      <nav
        style={{
          display: "flex",
          gap: "clamp(20px, 4vw, 48px)",
          flexWrap: "wrap",
          justifyContent: "center",
          opacity: entered ? 1 : 0,
          transform: entered ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
        }}
      >
        {sections.map((s, i) => (
          <span
            key={s}
            onClick={() => onNavigate(s)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(-1)}
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "clamp(11px, 1.3vw, 13px)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: hoveredIndex === i ? "#1a1a1a" : "#999",
              cursor: "pointer",
              transition: "color 0.3s ease",
              padding: "8px 0",
            }}
          >
            {s}
          </span>
        ))}
      </nav>
    </div>
  );
}

function BackButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        top: "24px",
        left: "32px",
        zIndex: 100,
        cursor: "pointer",
        fontFamily: "'Courier New', monospace",
        fontSize: "13px",
        letterSpacing: "0.1em",
        color: hovered ? "#1a1a1a" : "#bbb",
        transition: "color 0.3s ease",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <span style={{ fontSize: "18px", fontWeight: 300 }}>←</span>
    </div>
  );
}

function ArchitecturePage({ onBack }) {
  return (
    <div style={{ minHeight: "100vh", padding: "80px 32px 120px" }}>
      <BackButton onClick={onBack} />
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Courier New', monospace", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#999", marginBottom: "80px" }}>
            Architecture
          </h2>
        </FadeIn>
        {architectureProjects.map((project, i) => (
          <div key={i} style={{ marginBottom: "120px" }}>
            <FadeIn delay={i * 120}>
              <PlaceholderImage label={`Project ${i + 1}`} aspect={i % 2 === 0 ? "16/9" : "4/3"} />
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 400, marginTop: "24px", marginBottom: "8px", letterSpacing: "0.05em", color: "#1a1a1a" }}>
                {project.title}
              </h3>
              <p style={{ fontFamily: "'Courier New', monospace", fontSize: "13px", lineHeight: 1.9, color: "#888", maxWidth: "560px" }}>
                {project.description}
              </p>
            </FadeIn>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhotographyPage({ onBack }) {
  return (
    <div style={{ minHeight: "100vh", padding: "80px 32px 120px" }}>
      <BackButton onClick={onBack} />
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Courier New', monospace", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#999", marginBottom: "80px" }}>
            Photography
          </h2>
        </FadeIn>
        {photographyWorks.map((work, i) => (
          <div key={i} style={{ marginBottom: "120px" }}>
            <FadeIn delay={i * 120}>
              {work.image ? (
                <img
                  src={work.image}
                  alt={work.title}
                  style={{ width: "100%", display: "block", WebkitUserSelect: "none", userSelect: "none", pointerEvents: "none" }}
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
                />
              ) : (
                <PlaceholderImage label={work.title} aspect={work.aspect || "4/3"} />
              )}
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 400, marginTop: "24px", marginBottom: "8px", letterSpacing: "0.05em", color: "#1a1a1a" }}>
                {work.title}
              </h3>
              <p style={{ fontFamily: "'Courier New', monospace", fontSize: "13px", lineHeight: 1.9, color: "#888", maxWidth: "560px" }}>
                {work.description}
              </p>
            </FadeIn>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutPage({ onBack }) {
  return (
    <div style={{ minHeight: "100vh", padding: "80px 32px 120px" }}>
      <BackButton onClick={onBack} />
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Courier New', monospace", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#999", marginBottom: "80px" }}>
            About
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(18px, 2.5vw, 22px)", lineHeight: 2, color: "#444", fontWeight: 300, marginBottom: "28px" }}>
            Taner Doger is an architect and photographer based in Istanbul, Turkey. With over a decade of professional experience in architecture, he currently serves as Design Lead at Dome+Partners.
          </p>
        </FadeIn>
        <FadeIn delay={200}>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(18px, 2.5vw, 22px)", lineHeight: 2, color: "#444", fontWeight: 300, marginBottom: "28px" }}>
            His photographic work explores the interplay between structure and light, often captured in black and white. His images are curated through 1x.com and available as limited edition prints on Saatchi Art.
          </p>
        </FadeIn>
        <FadeIn delay={300}>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(18px, 2.5vw, 22px)", lineHeight: 2, color: "#444", fontWeight: 300 }}>
            He holds a Bachelor of Architecture from Karadeniz Technical University (2014). His work is driven by a deep attention to form, materiality, and the quiet moments found in urban landscapes.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}

function ContactPage({ onBack }) {
  const [emailHover, setEmailHover] = useState(false);
  const links = [
    { label: "Saatchi Art", href: "https://www.saatchiart.com/en-tr/account/artworks/2940953" },
    { label: "1x", href: "https://1x.com" },
    { label: "Instagram", href: "#" },
  ];
  const [hoveredLink, setHoveredLink] = useState(-1);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 32px" }}>
      <BackButton onClick={onBack} />
      <FadeIn>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Courier New', monospace", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#999", marginBottom: "60px" }}>
            Contact
          </h2>
          <a
            href="mailto:hello@tanerdoger.com"
            onMouseEnter={() => setEmailHover(true)}
            onMouseLeave={() => setEmailHover(false)}
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(20px, 3.5vw, 36px)", fontWeight: 300, letterSpacing: "0.08em", color: "#1a1a1a", textDecoration: "none", borderBottom: `1px solid ${emailHover ? "#1a1a1a" : "#ddd"}`, paddingBottom: "4px", transition: "border-color 0.3s ease" }}
          >
            hello@tanerdoger.com
          </a>
          <div style={{ marginTop: "48px", display: "flex", gap: "32px", justifyContent: "center", flexWrap: "wrap" }}>
            {links.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredLink(i)}
                onMouseLeave={() => setHoveredLink(-1)}
                style={{ fontFamily: "'Courier New', monospace", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: hoveredLink === i ? "#1a1a1a" : "#aaa", textDecoration: "none", transition: "color 0.3s ease" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

export default function Portfolio() {
  const [page, setPage] = useState("home");
  const [transitioning, setTransitioning] = useState(false);

  const navigate = (target) => {
    setTransitioning(true);
    setTimeout(() => {
      setPage(target);
      window.scrollTo(0, 0);
      setTransitioning(false);
    }, 300);
  };

  const goHome = () => navigate("home");

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        color: "#1a1a1a",
        backgroundColor: "#fff",
        minHeight: "100vh",
        opacity: transitioning ? 0 : 1,
        transition: "opacity 0.3s ease",
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
    >
      {page === "home" && <HomePage onNavigate={navigate} />}
      {page === "Architecture" && <ArchitecturePage onBack={goHome} />}
      {page === "Photography" && <PhotographyPage onBack={goHome} />}
      {page === "About" && <AboutPage onBack={goHome} />}
      {page === "Contact" && <ContactPage onBack={goHome} />}
    </div>
  );
}
