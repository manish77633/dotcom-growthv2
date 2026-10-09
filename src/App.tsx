import { useEffect, useRef, useState, type FormEvent } from "react";
import brandLogo from "./brand-logo.svg?inline";
import brandLogoLight from "./brand-logo-light.svg?inline";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";

const photo = (id: number, width = 1600, height = 1000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${width}&h=${height}`;

const images = {
  hero: photo(7495291, 2100, 1150),
  about: photo(8279236, 1000, 1260),
  commerce: photo(7857532, 1300, 960),
  estate: photo(27459248, 1000, 760),
  edtech: photo(4132435, 1000, 760),
  insightOne: photo(7693218, 1000, 720),
  insightTwo: photo(5717760, 1000, 720),
  insightThree: photo(7793730, 1000, 720),
  cta: photo(5324992, 1300, 1150),
};

type PhotoKind = "people" | "chart" | "funnel" | "place";

function LineArt({ kind }: { kind: PhotoKind }) {
  const shapes = {
    people: (
      <>
        <circle cx="240" cy="165" r="54" /><circle cx="560" cy="165" r="54" />
        <path d="M100 425c0-92 55-154 140-154s140 62 140 154M420 425c0-92 55-154 140-154s140 62 140 154M135 470h530" />
      </>
    ),
    chart: (
      <>
        <path d="M105 410V105M105 410h590M145 340l115-79 103 31 108-107 92 27 105-94" />
        <circle cx="145" cy="340" r="8" /><circle cx="471" cy="185" r="8" /><circle cx="668" cy="118" r="8" />
        <path d="M183 410v-61m108 61v-93m108 93V286m108 124V240m108 170V188" />
      </>
    ),
    funnel: (
      <>
        <path d="M150 120h500l-72 92H222zM222 240h356l-77 92H299zM299 360h202l-101 95z" />
        <path d="M400 455v50m-50 0h100" />
      </>
    ),
    place: (
      <>
        <path d="M160 470V140h480v330M110 470h580" />
        <path d="M220 205h82v82h-82zm139 0h82v82h-82zm139 0h82v82h-82zM220 335h82v82h-82zm139 0h82v82h-82zm139 0h82v82h-82z" />
      </>
    ),
  };
  return (
    <div className="image-fallback" role="img" aria-label="Editorial line illustration">
      <svg viewBox="0 0 800 600" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {shapes[kind]}
      </svg>
    </div>
  );
}

function EditorialImage({
  src,
  alt,
  kind = "people",
  eager = false,
  className = "",
}: {
  src: string;
  alt: string;
  kind?: PhotoKind;
  eager?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`editorial-image ${className}`}>
      {failed ? (
        <LineArt kind={kind} />
      ) : (
        <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)} />
      )}
    </div>
  );
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? "brand-light" : ""}`} href="#top" aria-label="DotCom Growth home">
      <img className="brand-logo" src={light ? brandLogoLight : brandLogo} alt="dotcom Growth" />
    </a>
  );
}

function SocialIcon({ platform }: { platform: "linkedin" | "facebook" }) {
  return platform === "linkedin" ? (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
      <path d="M5.2 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.5 9h3.4v11H3.5V9Zm5.4 0h3.3v1.5c.5-.9 1.6-1.7 3.3-1.7 3.6 0 4.3 2.3 4.3 5.3V20h-3.5v-5.3c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V20H8.9V9Z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V21h3.4Z" />
    </svg>
  );
}

function Pill({
  children,
  href,
  tone = "blue",
  arrow = true,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  tone?: "blue" | "dark" | "outline" | "light";
  arrow?: boolean;
  onClick?: () => void;
}) {
  const content = <>{children}{arrow && <ArrowUpRight size={16} strokeWidth={1.8} />}</>;
  const className = `pill pill-${tone}`;
  if (href) return <a className={className} href={href} onClick={onClick}>{content}</a>;
  return <button className={className} type="button" onClick={onClick}>{content}</button>;
}

function SectionTag({ n, children }: { n: string; children: React.ReactNode }) {
  return <p className="section-tag" data-reveal><span>{n}</span><span className="tag-slash">/</span>{children}</p>;
}

const navItems = [
  ["Services", "#services"],
  ["Brand", "#brand"],
  ["Our system", "#system"],
  ["Work", "#work"],
  ["About", "#about"],
  ["Insights", "#insights"],
] as const;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcement, setAnnouncement] = useState(true);
  return (
    <>
      {announcement && (
        <div className="announcement">
          <div className="announcement-inner container">
            <span className="announcement-dot" aria-hidden="true" />
            <span>Enterprise scale. Agency speed. Revenue focus.</span>
            <a href="#approach">The DotCom Growth approach <ArrowUpRight size={13} /></a>
            <button type="button" aria-label="Dismiss announcement" onClick={() => setAnnouncement(false)}><X size={16} /></button>
          </div>
        </div>
      )}
      <header className="site-header" id="top">
        <div className="header-inner container">
          <Brand />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map(([name, href]) => <a key={name} href={href}>{name}</a>)}
          </nav>
          <div className="header-actions">
            <a className="header-contact" href="mailto:dotcomgrowth2020@gmail.com">Contact</a>
            <Pill href="#contact" tone="dark">Get started</Pill>
          </div>
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map(([name, href]) => <a key={name} href={href} onClick={() => setMenuOpen(false)}>{name}<ArrowUpRight size={18} /></a>)}
            <a href="#contact" onClick={() => setMenuOpen(false)}>Get started<ArrowUpRight size={18} /></a>
          </nav>
        )}
      </header>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-typography container">
        <div className="hero-eyebrow" data-reveal>
          <span className="live-dot" />
          <span>Strategy / Technology / Performance</span>
        </div>
        <h1 id="hero-title" data-reveal><span>DotCom Growth</span><span className="brand-fullstop">.</span><HeroSparkles /></h1>
        <p className="hero-statement" data-reveal>Growth that shows up <em>in your revenue.</em></p>
        <p className="hero-description" data-reveal>
          We design and build growth infrastructure that compounds. Enterprise-level capability, specialist teams,
          and an agency built to move at the speed of your business.
        </p>
        <div className="hero-actions" data-reveal>
          <Pill href="#contact">Talk to an expert</Pill>
          <Pill href="#system" tone="outline" arrow={false}>Explore our approach <ArrowDown size={16} /></Pill>
        </div>
      </div>
      <div className="hero-media" data-reveal>
        <EditorialImage src={images.hero} alt="A team of business professionals in a collaborative strategy meeting" kind="people" eager className="hero-photograph" />
        <div className="hero-photo-shade" aria-hidden="true" />
        <svg className="hero-signal" viewBox="0 0 1200 470" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path d="M-20 400 C190 390 275 338 420 350 S650 285 790 300 S1000 152 1230 112" stroke="rgba(255,255,255,.72)" strokeWidth="1.2" />
          <circle cx="420" cy="350" r="5" fill="#fff" /><circle cx="790" cy="300" r="5" fill="#fff" /><circle cx="1050" cy="169" r="5" fill="#fff" />
        </svg>
      </div>
      <div className="hero-caption container">
        <span>01 / The point of view</span>
        <p>Growth is not a channel. It is a connected system.</p>
        <a href="#about" aria-label="Scroll to about section"><ArrowDown size={19} strokeWidth={1.5} /></a>
      </div>
    </section>
  );
}

function HeroSparkles() {
  return <span className="hero-sparkles" aria-hidden="true">{Array.from({ length: 32 }, (_, i) => {
    const x = 5 + ((i * 37 + 13) % 90);
    const y = 16 + ((i * 29 + 7) % 64);
    return <i key={i} className={i % 9 === 0 ? "spark-star" : ""} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${-(i % 7) * .8}s`, opacity: .25 + (i % 4) * .1 }} />;
  })}</span>;
}

const logoGroups = [
  ["InsuranceDekho", "Unstop", "Wooden Street", "Suti", "UpMarket"],
  ["Tredu", "Chordia's", "InsuranceDekho", "Unstop", "Wooden Street"],
  ["Suti", "UpMarket", "Tredu", "Chordia's", "InsuranceDekho"],
];

function ClientStrip() {
  const [groupIndex, setGroupIndex] = useState(0);
  const [crossfading, setCrossfading] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let fadeTimer: number;
    const cycle = window.setInterval(() => {
      setCrossfading(true);
      fadeTimer = window.setTimeout(() => { setGroupIndex((index) => (index + 1) % logoGroups.length); setCrossfading(false); }, 600);
    }, 4200);
    return () => { window.clearInterval(cycle); window.clearTimeout(fadeTimer); };
  }, []);
  return (
    <section className="client-strip" aria-label="Selected client brands">
      <div className="container">
        <p className="client-strip-label" data-reveal>Selected brands from the DotCom Growth portfolio</p>
        <div className={`client-list ${crossfading ? "is-crossfading" : ""}`} aria-label="Selected client brands">
          {[groupIndex, (groupIndex + 1) % logoGroups.length].map((index, layer) => (
            <div className={`client-layer client-layer-${layer}`} key={layer} aria-hidden={layer === 1}>
              {logoGroups[index].map((client, slot) => <span role="img" aria-label={client} key={`${slot}-${client}`}>{client}</span>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const principles = [
  ["01", "Data-driven strategy", "Start with the business problem, not a channel recommendation."],
  ["02", "Technology meets creative", "Unite the stack, the story, and the people running both."],
  ["03", "Long-term partnership", "Build an engine that compounds rather than restarting every quarter."],
];

function About() {
  return (
    <section className="about-section section-pad" id="about">
      <div className="container about-layout">
        <div className="about-image-wrap" data-reveal>
          <EditorialImage src={images.about} alt="Strategist planning a campaign with notes in an office" kind="people" className="about-image" />
          <div className="image-index">DCG / PEOPLE BEHIND THE PROCESS</div>
        </div>
        <div className="about-copy">
          <SectionTag n="01">A different way to grow</SectionTag>
          <h2 data-reveal>Good marketing is only as strong as the <em>system behind it.</em></h2>
          <p className="section-intro" data-reveal>
            DotCom Growth brings strategy, creativity, technology and performance into the same room. We work with
            dedicated specialists, not generalists, to connect every effort to a commercial outcome.
          </p>
          <div className="principle-list">
            {principles.map(([number, title, description]) => (
              <div className="principle" key={title} data-reveal>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
                <ArrowUpRight size={19} strokeWidth={1.5} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type Capability = {
  number: string;
  label: string;
  title: string;
  description: string;
  services: string[];
};

const capabilities: Capability[] = [
  {
    number: "01",
    label: "Martech & transformation",
    title: "Build the infrastructure for what comes next.",
    description: "Connect the platforms, people and data that make growth possible. From CRM architecture to AI-powered automation, we make the complex work together.",
    services: ["Marketing automation", "CRM integration", "AI & MarTech", "Digital transformation", "Analytics & attribution"],
  },
  {
    number: "02",
    label: "Growth & performance",
    title: "Make every channel accountable to the pipeline.",
    description: "Paid media, B2B demand generation, SEO and conversion work as one commercial program. We optimize for qualified demand, not dashboards full of clicks.",
    services: ["Performance marketing", "Demand generation", "SEO & content", "Conversion rate optimization", "Revenue attribution"],
  },
  {
    number: "03",
    label: "Brand & creative",
    title: "Earn the attention, then deserve the trust.",
    description: "A distinctive position and thoughtful creative turn awareness into intent. We develop brand systems and content built for the way buyers actually decide.",
    services: ["Brand strategy", "Campaign creative", "Content marketing", "Social media", "Thought leadership"],
  },
];

function CapabilityArt({ active }: { active: number }) {
  if (active === 0) {
    return (
      <div className="capability-art art-martech" aria-hidden="true">
        <div className="art-halo art-halo-blue" /><div className="art-halo art-halo-mint" />
        <svg className="art-connectors" viewBox="0 0 590 390" fill="none" preserveAspectRatio="none">
          <path d="M55 105 C140 105 142 185 218 185 S320 185 365 185 S467 120 552 120" />
          <path d="M55 278 C140 278 142 185 218 185 S320 185 365 185 S467 277 552 277" />
        </svg>
        <span className="art-node art-node-a">01 / Data sources</span>
        <span className="art-node art-node-b">02 / Marketing stack</span>
        <span className="art-node art-node-c">03 / Intelligence</span>
        <span className="art-node art-node-d">04 / Revenue view</span>
        <span className="art-node art-node-e">CRM + automation</span>
        <span className="art-pulse" />
      </div>
    );
  }
  if (active === 1) {
    return (
      <div className="capability-art art-performance" aria-hidden="true">
        <div className="art-halo art-halo-coral" />
        <div className="chart-topline">DEMAND / PIPELINE / REVENUE</div>
        <svg viewBox="0 0 590 390" fill="none" preserveAspectRatio="xMidYMid meet">
          <path className="chart-grid" d="M42 80H555M42 157H555M42 234H555M42 311H555" />
          <path className="chart-line" d="M42 292 C107 295 116 266 167 259 S246 279 296 210 S385 240 432 151 S510 163 555 75" />
          <circle cx="296" cy="210" r="6" fill="#242424" /><circle cx="432" cy="151" r="6" fill="#242424" /><circle cx="555" cy="75" r="6" fill="#242424" />
          <path className="chart-axis" d="M42 330H555" />
        </svg>
        <div className="chart-footer"><span>FIRST TOUCH</span><span>QUALIFIED DEMAND</span><span>CLOSED REVENUE</span></div>
      </div>
    );
  }
  return (
    <div className="capability-art art-creative" aria-hidden="true">
      <div className="art-halo art-halo-gold" />
      <div className="creative-label">BRAND / POSITIONING / PRODUCTION</div>
      <div className="creative-type">Make it<br /><em>mean</em><br />something.</div>
      <div className="creative-rule"><span /><span /><span /></div>
    </div>
  );
}

const serviceImageNames = [
  ["marketing-automation", "crm-integration", "ai-martech", "digital-transformation", "analytics-attribution"],
  ["performance-marketing", "demand-generation", "seo-content", "conversion-optimization", "revenue-attribution"],
  ["brand-strategy", "campaign-creative", "content-marketing", "social-media", "thought-leadership"],
];
const serviceImages = import.meta.glob<string>("./assets/services/*.webp", { eager: true, query: "?inline", import: "default" });

function ServicePreviewArt({ index, group, alt }: { index: number; group: number; alt: string }) {
  const name = serviceImageNames[group][index];
  return <img src={serviceImages[`./assets/services/${name}.webp`]} alt={alt} loading="lazy" />;
}

function Services() {
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState<{ index: number; left: number; top: number; width: number; height: number; fromLeft: boolean } | null>(null);
  const [mobilePreview, setMobilePreview] = useState<number | null>(null);
  useEffect(() => { setPreview(null); setMobilePreview(null); }, [active]);
  const showPreview = (element: HTMLElement, index: number) => {
    if (window.matchMedia("(max-width: 900px)").matches) return;
    const rect = element.getBoundingClientRect();
    const width = Math.min(rect.width, window.innerWidth - 32);
    const fromLeft = index === 4 || rect.right + width + 18 > window.innerWidth;
    const proposed = fromLeft ? rect.left - width - 14 : rect.right + 14;
    setPreview({ index, left: Math.max(16, Math.min(window.innerWidth - width - 16, proposed)), top: Math.max(rect.height / 2 + 16, Math.min(window.innerHeight - rect.height / 2 - 16, rect.top + rect.height / 2)), width, height: rect.height, fromLeft });
  };
  const selected = capabilities[active];
  return (
    <section className="services-section section-pad" id="services">
      <div className="container">
        <div className="section-heading split-heading">
          <div>
            <SectionTag n="02">What we do</SectionTag>
            <h2 data-reveal>Three specialist arenas.<br /><em>One commercial outcome.</em></h2>
          </div>
          <p data-reveal>Technology is only valuable when it creates measurable business outcomes. Our teams build the infrastructure and the programs that make growth compound.</p>
        </div>
        <div className="capability-index" role="tablist" aria-label="Capability areas">
          {capabilities.map((capability, index) => (
            <button
              key={capability.number}
              className={`capability-index-item ${index === active ? "is-active" : ""}`}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls="capability-panel"
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") setActive((index + 1) % capabilities.length);
                if (event.key === "ArrowLeft") setActive((index + capabilities.length - 1) % capabilities.length);
              }}
            >
              <span className="capability-index-num">{capability.number}</span>
              <span className="capability-index-name">{capability.label}</span>
              <ArrowUpRight size={20} strokeWidth={1.5} />
            </button>
          ))}
        </div>
        <div className={`capability-panel capability-theme-${active}`} id="capability-panel" role="tabpanel" key={active}>
          <div className="capability-panel-copy">
            <p className="mini-label">{selected.number} / {selected.label}</p>
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
            <a className="text-action" href="#contact">Discuss this capability <ArrowUpRight size={17} /></a>
          </div>
          <CapabilityArt active={active} />
        </div>
        <div className="service-list-title"><span>What's inside the work</span><span>Dedicated expertise, no generalists</span></div>
        <div className="service-list">
          {selected.services.map((service, index) => (
            <button className="service-list-item" type="button" key={service} aria-label={`${service} image preview`} aria-expanded={mobilePreview === index} onMouseEnter={(event) => showPreview(event.currentTarget, index)} onMouseLeave={() => setPreview(null)} onFocus={(event) => showPreview(event.currentTarget, index)} onBlur={() => setPreview(null)} onClick={() => setMobilePreview((current) => current === index ? null : index)}><span>0{index + 1}</span><span>{service}</span><ArrowUpRight size={17} strokeWidth={1.4} /><span className={`service-mobile-preview ${mobilePreview === index ? "is-open" : ""}`}><ServicePreviewArt index={index} group={active} alt={`${service} visual`} /></span></button>
          ))}
        </div>
        <div className={`service-floating-preview ${preview ? "is-visible" : ""} ${preview?.fromLeft ? "from-left" : ""}`} style={{ left: preview?.left ?? 0, top: preview?.top ?? 0, width: preview?.width, height: preview?.height }} aria-hidden="true"><ServicePreviewArt index={preview?.index ?? 0} group={active} alt={selected.services[preview?.index ?? 0]} /></div>
      </div>
    </section>
  );
}

const brandWork = [
  { number: "01", title: "Be remembered.", copy: "Give buyers a clear reason to recognize and choose you.", image: images.insightOne, alt: "Team shaping a distinctive brand direction" },
  { number: "02", title: "Show up consistently.", copy: "Carry one strong idea across campaigns, content and channels.", image: images.insightTwo, alt: "Creative work brought together across channels" },
  { number: "03", title: "Turn interest into intent.", copy: "Connect the story people see with the next action they take.", image: images.insightThree, alt: "Digital content and customer experience" },
];

function BrandSection() {
  return (
    <section className="brand-section section-pad" id="brand" aria-labelledby="brand-heading">
      <div className="container">
        <div className="brand-section-head">
          <div>
            <SectionTag n="02A">Brand & creative</SectionTag>
            <h2 id="brand-heading" data-reveal>From first impression to <em>lasting preference.</em></h2>
          </div>
          <div className="brand-section-intro" data-reveal>
            <p>Brand work is most useful when it changes what people remember, trust and do next. These are the outcomes our creative work is built around.</p>
            <a className="text-action" href="#contact">Build your brand <ArrowUpRight size={17} /></a>
          </div>
        </div>
        <div className="brand-work-grid">
          {brandWork.map((item) => (
            <article className="brand-work-card" key={item.number} data-reveal>
              <div className="brand-work-image"><img src={item.image} alt={item.alt} loading="lazy" /></div>
              <div className="brand-work-meta"><span>{item.number} / THE OUTCOME</span><ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" /></div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const flowStages = [
  { short: "Discover", title: "Find the real constraint.", copy: "Audit the market, funnel, data and customer journey. The right answer starts with the right diagnosis." },
  { short: "Connect", title: "Make the stack speak.", copy: "Bring CRM, automation and attribution into one reliable operating layer, so decisions are made with the full picture." },
  { short: "Activate", title: "Turn strategy into demand.", copy: "Run performance media, search, creative and lifecycle programs as one connected commercial effort." },
  { short: "Prove", title: "Follow the revenue signal.", copy: "Keep optimizing the pipeline and the customer experience until growth shows up where it counts." },
];

function FlowDiagram({ active }: { active: number }) {
  return (
    <div className="flow-diagram" aria-label={`Current stage: ${flowStages[active].short}`}>
      <div className="flow-topline"><span>THE CONNECTED GROWTH ENGINE</span><span>LIVE SYSTEM / 01-04</span></div>
      <div className="flow-canvas">
        <div className="flow-soft-light" />
        <svg viewBox="0 0 700 280" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path className="flow-base" d="M58 143 C165 143 151 83 236 83 S309 186 388 186 S467 95 539 95 S613 143 665 143" />
          <path className="flow-trace" d="M58 143 C165 143 151 83 236 83 S309 186 388 186 S467 95 539 95 S613 143 665 143" pathLength="100" style={{ strokeDashoffset: 100 - (active + 1) * 25 }} />
        </svg>
        {flowStages.map((step, index) => (
          <div className={`flow-node flow-node-${index} ${index <= active ? "reached" : ""} ${index === active ? "current" : ""}`} key={step.short}>
            <span className="flow-node-circle">0{index + 1}</span>
            <span className="flow-node-label">{step.short}</span>
          </div>
        ))}
      </div>
      <div className="flow-reading" key={active}>
        <span>0{active + 1} / 04</span>
        <p>{flowStages[active].title}</p>
        <span>STRATEGY TO REVENUE</span>
      </div>
    </div>
  );
}

function GrowthEngine() {
  const [active, setActive] = useState(0);
  const stepsRef = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length) setActive(Number((visible[visible.length - 1].target as HTMLElement).dataset.stage));
    }, { rootMargin: "-36% 0px -40% 0px", threshold: 0 });
    stepsRef.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="system-section" id="system">
      <div className="container">
        <div className="system-heading">
          <SectionTag n="03">The growth engine</SectionTag>
          <h2 data-reveal>One connected system.<br /><em>Nothing lost between the lines.</em></h2>
          <p data-reveal>From first signal to closed revenue, the whole journey should make sense. Scroll through the system, or select a step to see how the pieces connect.</p>
        </div>
        <div className="system-layout">
          <div className="system-visual-col"><div className="system-sticky"><FlowDiagram active={active} /></div></div>
          <div className="system-chapters">
            {flowStages.map((stage, index) => (
              <button
                ref={(element) => { stepsRef.current[index] = element; }}
                key={stage.short}
                className={`system-chapter ${active === index ? "is-current" : ""}`}
                data-stage={index}
                type="button"
                aria-current={active === index ? "step" : undefined}
                onClick={() => setActive(index)}
              >
                <span className="system-chapter-number">0{index + 1} / 04</span>
                <span className="system-chapter-title">{stage.title}</span>
                <span className="system-chapter-copy">{stage.copy}</span>
                <ArrowUpRight size={19} strokeWidth={1.4} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
        <div className="system-foot"><span>NOT MORE ACTIVITY. MORE MOMENTUM.</span><a href="#contact">Build your growth engine <ArrowUpRight size={16} /></a></div>
      </div>
    </section>
  );
}

const steps = [
  ["01", "Discover", "Map the market, the stack and the real commercial constraint."],
  ["02", "Strategize", "Choose the right plays and define what success will mean."],
  ["03", "Build", "Connect data, CRM, automation and measurement."],
  ["04", "Activate", "Put media, search, creative and lifecycle in motion."],
  ["05", "Optimize", "Iterate on signal, conversion and pipeline quality."],
  ["06", "Scale", "Invest in what compounds and carry it into the next market."],
];

function Process() {
  return (
    <section className="process-section section-pad" id="approach">
      <div className="container">
        <div className="section-heading split-heading">
          <div><SectionTag n="04">How we work</SectionTag><h2 data-reveal>A disciplined path<br /><em>from intent to impact.</em></h2></div>
          <p data-reveal>Enterprise capability should not come with enterprise inertia. We move with purpose, and we keep the business objective visible at every stage.</p>
        </div>
        <div className="process-line" aria-hidden="true"><span /></div>
        <div className="process-grid">
          {steps.map(([number, title, copy]) => (
            <div className="process-step" key={number} data-reveal>
              <span className="process-number">{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudies() {
  return (
    <section className="work-section section-pad" id="work">
      <div className="container">
        <div className="section-heading split-heading">
          <div><SectionTag n="05">Selected work</SectionTag><h2 data-reveal>Proof belongs<br /><em>in the outcome.</em></h2></div>
          <p data-reveal>Different challenges, one standard: work that makes a measurable difference. Results below are published by DotCom Growth; imagery is illustrative.</p>
        </div>
        <div className="featured-case">
          <div className="case-image" data-reveal><EditorialImage src={images.commerce} alt="Team packing ecommerce orders at a small business workspace" kind="funnel" /></div>
          <div className="featured-case-copy" data-reveal>
            <span className="mini-label">E-COMMERCE / REVENUE GROWTH</span>
            <h3>From growth ambition to <em>EUR 1M in revenue.</em></h3>
            <p>An e-commerce brand scaled to EUR 1M in revenue in under 12 months. A focused commercial strategy, built to show up in the numbers that matter.</p>
            <div className="case-result"><span>EUR 1M</span><span>Revenue in under 12 months<br />as reported by DotCom Growth</span></div>
            <a className="text-action" href="https://dotcomgrowth.com/" target="_blank" rel="noreferrer">Explore work on the official site <ArrowUpRight size={17} /></a>
          </div>
        </div>
        <div className="secondary-cases">
          <div className="secondary-case" data-reveal>
            <EditorialImage src={images.estate} alt="Modern residential building facade representing real estate" kind="place" />
            <div className="secondary-case-meta"><span>REAL ESTATE / DIGITAL TRANSFORMATION</span><span>01 / 02</span></div>
            <h3>Rebuilding the operating layer for a real estate group.</h3>
            <p>Dual-tech stack, 360-degree delivery, and a more connected way of working.</p>
          </div>
          <div className="secondary-case" data-reveal>
            <EditorialImage src={images.edtech} alt="Learners working with laptops representing edtech" kind="people" />
            <div className="secondary-case-meta"><span>EDTECH / AUDIENCE + LEAD GEN</span><span>02 / 02</span></div>
            <h3>Turning an audience into an enrollment pipeline.</h3>
            <p>100K+ followers built from scratch, alongside a predictable enrollment pipeline, as reported by DotCom Growth.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const metrics = [
  { value: "$1M+", label: "REVENUE GROWTH", copy: "Driven for one client in under 12 months." },
  { value: "100K+", label: "AUDIENCE SCALE", copy: "Built from scratch for a mid-market brand." },
  { value: "350+", label: "ON-DEMAND TALENT", copy: "Engineers available for transformation work." },
  { value: "03", label: "SPECIALIST HUBS", copy: "Tech, performance and creative." },
];

function Proof() {
  return (
    <section className="proof-section section-pad" id="proof">
      <div className="container">
        <div className="proof-top"><SectionTag n="06">Signals of scale</SectionTag><span>Figures published by DotCom Growth</span></div>
        <h2 data-reveal>We measure what <em>moves the business.</em></h2>
        <div className="proof-grid">
          {metrics.map((metric) => (
            <div className="proof-item" key={metric.label} data-reveal>
              <strong>{metric.value}</strong><span>{metric.label}</span><p>{metric.copy}</p>
            </div>
          ))}
        </div>
        <div className="proof-outro"><span>THE POINT IS NOT MORE CLICKS.</span><span>THE POINT IS THE BOTTOM LINE.</span></div>
      </div>
    </section>
  );
}

const startingPoints = [
  { number: "01", title: "Find the constraint", copy: "We map the customer journey, funnel, data and current stack to see where momentum is being lost." },
  { number: "02", title: "Build the connection", copy: "We bring the right specialists together around a practical plan for technology, creative and performance." },
  { number: "03", title: "Improve what matters", copy: "We measure qualified demand and commercial outcomes, then keep refining the work around the signal." },
];

function StartingPoints() {
  return (
    <section className="starting-section section-pad" id="start">
      <div className="container starting-layout">
        <div className="starting-intro">
          <SectionTag n="07">Where to begin</SectionTag>
          <h2 data-reveal>Start with the <em>right question.</em></h2>
          <p data-reveal>Every business has a different constraint. Our first job is to find yours and make the next move clear.</p>
          <Pill href="#contact">Talk through your challenge</Pill>
        </div>
        <div className="starting-rows">
          {startingPoints.map((item) => <a href="#contact" className="starting-row" key={item.number} data-reveal><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div><ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" /></a>)}
        </div>
      </div>
    </section>
  );
}

type Article = {
  category: string;
  title: string;
  summary: string;
  image: string;
  topic: string;
};

const articles: Article[] = [
  {
    category: "01 / MARTECH",
    title: "Your growth problem might actually be a systems problem.",
    summary: "When campaign performance lives in one place and pipeline in another, even the right marketing decisions become hard to make. Start with the connective tissue.",
    image: images.insightOne,
    topic: "Technology + growth",
  },
  {
    category: "02 / DEMAND GENERATION",
    title: "What a more accountable B2B funnel looks like.",
    summary: "A useful demand engine is designed around buyer intent, qualification and a clear handoff to sales. It should show its work all the way to revenue.",
    image: images.insightTwo,
    topic: "B2B marketing",
  },
  {
    category: "03 / AI IN MARKETING",
    title: "Automation is useful. Connected intelligence is better.",
    summary: "AI has a role in growth when it removes friction, improves decisions and gives teams more time to do the work that requires judgment.",
    image: images.insightThree,
    topic: "AI + MarTech",
  },
];

function Insights() {
  const [openArticle, setOpenArticle] = useState<Article | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!openArticle) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpenArticle(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; previousFocus?.focus(); };
  }, [openArticle]);
  return (
    <section className="insights-section section-pad" id="insights">
      <div className="container">
        <div className="section-heading split-heading">
          <div><SectionTag n="08">From the desk</SectionTag><h2 data-reveal>Ideas worth <em>building on.</em></h2></div>
          <p data-reveal>Perspectives on the intersection of strategy, marketing and technology. These are editorial previews, not published articles.</p>
        </div>
        <div className="insights-grid">
          {articles.map((article) => (
            <button className="insight" type="button" key={article.title} onClick={() => setOpenArticle(article)} data-reveal>
              <EditorialImage src={article.image} alt={`Editorial image for ${article.topic}`} kind="chart" />
              <span className="insight-category">{article.category}</span>
              <span className="insight-title">{article.title}</span>
              <span className="insight-footer">EDITORIAL PREVIEW <ArrowUpRight size={18} strokeWidth={1.5} /></span>
            </button>
          ))}
        </div>
      </div>
      {openArticle && (
        <div className="article-modal-backdrop" role="presentation" onMouseDown={() => setOpenArticle(null)}>
          <div className="article-modal" role="dialog" aria-modal="true" aria-label={openArticle.title} onMouseDown={(event) => event.stopPropagation()}>
            <button ref={closeRef} className="modal-close" type="button" aria-label="Close article preview" onClick={() => setOpenArticle(null)}><X size={22} /></button>
            <span className="mini-label">{openArticle.category} / EDITORIAL PREVIEW</span>
            <h3>{openArticle.title}</h3>
            <p>{openArticle.summary}</p>
            <p>This is a topic preview, not a published DotCom Growth article. Want to discuss how it applies to your organization? Start a conversation with our team.</p>
            <Pill href="#contact" onClick={() => setOpenArticle(null)}>Talk about this</Pill>
          </div>
        </div>
      )}
    </section>
  );
}

const faqs = [
  ["What does DotCom Growth help businesses achieve?", "We design and build growth infrastructure that compounds: strategy, marketing technology, creative and performance programs tied to measurable commercial outcomes."],
  ["Which services do you provide?", "Our specialist teams cover marketing automation, digital transformation, demand generation, performance marketing, AI and MarTech, brand strategy, SEO and content, and CRM integration."],
  ["How do you measure growth?", "We focus on pipeline, revenue contribution and efficiency rather than impressions, likes or reach. Analytics and attribution are part of the infrastructure we build."],
  ["Do you work with B2B companies?", "Yes. B2B demand generation and connected sales-marketing systems are central to our work. We also work with e-commerce, B2C and other growth-focused organizations."],
  ["How does your growth process work?", "We discover the constraint, build the strategy and infrastructure, activate the right programs, and continuously optimize and scale what works."],
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="faq-section section-pad" id="faq">
      <div className="container faq-layout">
        <div className="faq-heading"><SectionTag n="09">Good questions</SectionTag><h2 data-reveal>Let's make it <em>clear.</em></h2><p data-reveal>Still thinking it through? We would rather have a useful conversation than make you fill in another form.</p><a className="text-action" href="mailto:dotcomgrowth2020@gmail.com">Ask us directly <ArrowUpRight size={17} /></a></div>
        <div className="faq-items">
          {faqs.map(([question, answer], index) => (
            <div className="faq-item" key={question} data-reveal>
              <button type="button" aria-expanded={open === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(open === index ? null : index)}>
                <span>{question}</span><ChevronDown size={21} className={open === index ? "rotated" : ""} />
              </button>
              <div className={`faq-answer ${open === index ? "is-open" : ""}`} id={`faq-answer-${index}`}>
                <div><p>{answer}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const [email, setEmail] = useState("");
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent("Growth consultation with DotCom Growth");
    const body = encodeURIComponent(`Hello DotCom Growth,\n\nI would like to discuss growth for my organization.\n\nMy email: ${email}\n\n`);
    window.location.href = `mailto:dotcomgrowth2020@gmail.com?subject=${subject}&body=${body}`;
  };
  return (
    <section className="contact-section" id="contact">
      <div className="contact-layout">
        <div className="contact-copy">
          <SectionTag n="10">The next move</SectionTag>
          <h2 data-reveal>Ready to build your next <em>growth engine?</em></h2>
          <p data-reveal>Tell us what you are trying to unlock. We will start with the right questions, then design a path to measurable business growth.</p>
          <form className="contact-form" onSubmit={onSubmit}>
            <label htmlFor="contact-email">Your work email</label>
            <div><input id="contact-email" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} required /><button type="submit" aria-label="Open email to start a conversation"><ArrowUpRight size={20} /></button></div>
          </form>
          <div className="contact-links"><a href="mailto:dotcomgrowth2020@gmail.com"><Mail size={16} /> dotcomgrowth2020@gmail.com</a><a href="tel:+919588207166"><Phone size={16} /> +91 95882 07166</a></div>
        </div>
        <EditorialImage src={images.cta} alt="Business team collaborating around a laptop in an office" kind="people" className="contact-photo" />
      </div>
    </section>
  );
}

const footerGroups = [
  { label: "SERVICES", links: [["MarTech & transformation", "#services"], ["Growth & performance", "#services"], ["Brand & creative", "#services"], ["AI & automation", "#services"]] },
  { label: "COMPANY", links: [["About", "#about"], ["Our system", "#system"], ["Selected work", "#work"], ["Get started", "#contact"]] },
  { label: "RESOURCES", links: [["Insights", "#insights"], ["Our approach", "#approach"], ["FAQ", "#faq"], ["Official site", "https://dotcomgrowth.com/"]] },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-about"><Brand light /><p>Enterprise scale. Agency speed. Revenue focus. Growth infrastructure built by specialists, for organizations ready to move.</p><span className="footer-location"><MapPin size={16} /> Jaipur, India</span></div>
          {footerGroups.map((group) => (
            <div className="footer-column" key={group.label}><h3>{group.label}</h3>{group.links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div>
          ))}
          <div className="footer-column footer-contact">
            <h3>CONTACT</h3>
            <a href="mailto:dotcomgrowth2020@gmail.com">dotcomgrowth2020@gmail.com</a>
            <a href="tel:+919588207166">+91 95882 07166</a>
            <a href="#contact">Start a conversation</a>
          </div>
        </div>
        <div className="footer-bottom"><span>Copyright {new Date().getFullYear()} DotCom Growth</span><span>Editorial photography via Pexels. Project imagery is illustrative.</span><div><a aria-label="DotCom Growth on LinkedIn" href="https://www.linkedin.com/company/dotcomgrowth/" target="_blank" rel="noreferrer"><SocialIcon platform="linkedin" /></a><a aria-label="DotCom Growth on Facebook" href="https://www.facebook.com/dotcomgrowth/" target="_blank" rel="noreferrer"><SocialIcon platform="facebook" /></a><a aria-label="Email DotCom Growth" href="mailto:dotcomgrowth2020@gmail.com"><Mail size={17} /></a></div></div>
      </div>
    </footer>
  );
}

function usePageMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    sections.forEach((section) => {
      if (!section.matches(".hero, .process-section")) return;
      const bg = document.createElement("div");
      bg.className = "bg";
      bg.setAttribute("aria-hidden", "true");
      bg.innerHTML = `<svg class="bg-wave bg-wave-one" viewBox="0 0 1200 180" preserveAspectRatio="none"><path d="M0 90C150 25 250 155 400 90S650 25 800 90s250 65 400 0"/></svg><svg class="bg-wave bg-wave-two" viewBox="0 0 1200 180" preserveAspectRatio="none"><path d="M0 110C160 170 240 35 400 110S640 170 800 110s240-75 400 0"/></svg><i class="bg-orb"></i><i class="bg-orb"></i><i class="bg-orb"></i>`;
      section.prepend(bg);
    });
    const wordTargets = Array.from(document.querySelectorAll<HTMLElement>("h1, h2"));
    wordTargets.forEach((heading) => {
      const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      while (walker.nextNode()) nodes.push(walker.currentNode as Text);
      let wordIndex = 0;
      nodes.forEach((node) => {
        const fragment = document.createDocumentFragment();
        const pieces = node.textContent?.split(/(\s+)/) ?? [];
        pieces.forEach((piece) => {
          if (!piece.trim()) { fragment.append(piece); return; }
          const mask = document.createElement("span");
          mask.className = "word-mask";
          const word = document.createElement("span");
          word.className = "word-rise";
          word.style.setProperty("--word-delay", `${wordIndex++ * 70}ms`);
          word.textContent = piece;
          mask.append(word);
          fragment.append(mask);
        });
        node.replaceWith(fragment);
      });
      heading.classList.add("split-words");
    });
    const cardTargets = document.querySelectorAll<HTMLElement>(".insight, .secondary-case, .voice-panel, .capability-panel");
    cardTargets.forEach((card, index) => card.classList.add(`hover-card`, `hover-v${index % 3 + 1}`));
    const revealTargets = document.querySelectorAll<HTMLElement>("[data-reveal], .insight, .secondary-case, .proof-item, .faq-item, .process-step, .service-list-item, .pill, .split-words");
    const siblingCounts = new Map<HTMLElement, number>();
    revealTargets.forEach((element) => {
      const parent = element.parentElement;
      if (!parent) return;
      const index = siblingCounts.get(parent) ?? 0;
      siblingCounts.set(parent, index + 1);
      element.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 90}ms`);
    });
    let cleanupObserver: (() => void) | undefined;
    if (!reduce && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          window.setTimeout(() => {
            (entry.target as HTMLElement).style.removeProperty("--reveal-delay");
            entry.target.classList.add("reveal-done");
          }, 1600);
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.15 });
      revealTargets.forEach((element) => observer.observe(element));
      cleanupObserver = () => observer.disconnect();
    } else {
      revealTargets.forEach((element) => element.classList.add("is-visible"));
    }

    let scheduled = false;
    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        document.documentElement.style.setProperty("--page-progress", String(window.scrollY / max));
        document.querySelector(".site-header")?.classList.toggle("scrolled", window.scrollY > 8);
        if (!reduce) {
          document.documentElement.style.setProperty("--hero-parallax", `${Math.min(window.scrollY * 0.06, 100)}px`);
          sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < window.innerHeight) section.style.setProperty("--py", `${Math.max(-24, Math.min(24, (window.innerHeight / 2 - rect.top) * .025))}px`);
          });
        }
        const track = document.querySelector<HTMLElement>(".process-line");
        if (track) {
          const rect = track.getBoundingClientRect();
          const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.8 - rect.top) / (window.innerHeight * 0.8)));
          track.style.setProperty("--line-progress", String(progress));
        }
        scheduled = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cleanupObserver?.(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
}

export default function App() {
  usePageMotion();
  return (
    <>
      <div className="page-progress" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <ClientStrip />
        <About />
        <Services />
        <BrandSection />
        <GrowthEngine />
        <Process />
        <CaseStudies />
        <Proof />
        <StartingPoints />
        <Insights />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
