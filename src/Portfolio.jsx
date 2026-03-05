import { useState, useEffect, useRef } from "react";

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;1,9..40,300&display=swap";
document.head.appendChild(fontLink);

const T = {
  bg: "#05070f", bg2: "#080b14", surface: "#0c1120", surfaceHi: "#111828",
  border: "rgba(255,255,255,0.10)", borderHi: "rgba(255,255,255,0.18)",
  cyan: "#00e5ff", blue: "#60a5fa", violet: "#c084fc",
  pink: "#f472b6", emerald: "#10e8a0", amber: "#fcd34d",
  text: "#f4f9ff", sub: "#c8daf0", muted: "#7a9ab8",
};

const SKILLS = [
  { name: "React",              level: 88, cat: "Frontend"  },
  { name: "JavaScript",         level: 90, cat: "Frontend"  },
  { name: "HTML / CSS",         level: 92, cat: "Frontend"  },
  { name: "Tailwind CSS",       level: 85, cat: "Frontend"  },
  { name: "Node.js",            level: 80, cat: "Backend"   },
  { name: "Python",             level: 85, cat: "Backend"   },
  { name: "Java",               level: 76, cat: "Backend"   },
  { name: "PostgreSQL / MySQL", level: 75, cat: "Backend"   },
  { name: "Firebase",           level: 78, cat: "Backend"   },
  { name: "Flutter",            level: 72, cat: "Mobile"    },
  { name: "React Native",       level: 70, cat: "Mobile"    },
  { name: "TensorFlow / Keras", level: 70, cat: "AI & ML"   },
  { name: "PyTorch",            level: 65, cat: "AI & ML"   },
  { name: "OpenCV",             level: 68, cat: "AI & ML"   },
  { name: "Arduino / ESP32",    level: 74, cat: "Embedded"  },
  { name: "Raspberry Pi",       level: 70, cat: "Embedded"  },
];

const RADAR_AXES = [
  { label: "Frontend", key: "Frontend", color: T.cyan    },
  { label: "Backend",  key: "Backend",  color: T.violet  },
  { label: "AI & ML",  key: "AI & ML",  color: T.emerald },
  { label: "Embedded", key: "Embedded", color: T.amber   },
];

const PROJECTS = [
  {
    num:"001", cat:"Mobile", title:"Sales Management App",
    desc:"Real-time field sales tracker for managers — live GPS tracking of sales executives, call log monitoring, and deal pipeline records. Built for teams operating across multiple regions.",
    tags:["Flutter","Firebase","Real-time","GPS"], color: T.pink,
  },
  {
    num:"002", cat:"Mobile", title:"CRM App",
    desc:"Smart CRM with OCR-powered ID scanning to auto-categorise and add contacts to the database. Supports fully offline manual entry with timestamps, syncing seamlessly once reconnected.",
    tags:["Flutter","Firebase","OCR","Offline-first"], color: T.pink,
  },
  {
    num:"003", cat:"Mobile", title:"Remote Education Platform",
    desc:"Bridges the education gap for girls and remote communities — AI-powered career guidance, mentor matchmaking, and scholarship discovery. Built to work in low-connectivity environments.",
    tags:["React Native","Supabase","AI","Mentorship"], color: T.pink,
  },
  {
    num:"004", cat:"Mobile", title:"PlateLink",
    desc:"Reduces food waste by connecting canteens with surplus food to nearby NGOs via a driver network. ML models predict food shelf life for NGOs and optimal daily quantities for canteens based on historical data and festivals.",
    tags:["React Native","Firebase","ML","Food-tech"], color: T.pink,
  },
  {
    num:"005", cat:"Web", title:"Amazon Price Tracker",
    desc:"Paste any Amazon product link and let it do the work — scrapes live pricing on a cron schedule, builds a price history, and tells you the best time to buy based on trend analysis. No more overpaying.",
    tags:["Vite","JavaScript","Tailwind CSS","Cron","Web Scraping"], color: T.cyan,
  },
  {
    num:"006", cat:"Web", title:"Air Canvas",
    desc:"Draw in mid-air without touching a screen. Uses computer vision via MediaPipe to track hand landmarks in real time through a webcam, translating finger movements into brush strokes. Supports colour switching, adjustable nib size, and an eraser — all controlled by gestures.",
    tags:["Python","MediaPipe","OpenCV","Computer Vision","Real-time"], color: T.cyan,
  },
  {
    num:"007", cat:"Web", title:"This Portfolio",
    desc:"Designed and built from scratch — a dark, minimal portfolio with a chromatic custom cursor, animated hero, radar skill chart, spotlight project viewer, and smooth scroll reveals. Single-file React, deployed on Netlify.",
    tags:["React","Tailwind CSS","SVG Animation","Vite","Netlify"], color: T.cyan,
  },
  {
    num:"008", cat:"AI & ML", title:"ASL Sign Language Converter",
    desc:"Real-time American Sign Language recognition system that translates hand gestures into alphabets using computer vision. Trained a custom CNN on ASL gesture datasets with MediaPipe for hand landmark detection, achieving high accuracy across all 26 letters.",
    tags:["Python","OpenCV","MediaPipe","CNN","TensorFlow"], color: T.emerald,
  },
  {
    num:"009", cat:"AI & ML", title:"Hybrid Wildlife Detection System",
    badge:"Internship Project",
    desc:"Built during an internship under Dr. Natarajan Balasubramanian — a multi-model pipeline for detecting and tracking wild animals in dense forest environments. Combines YOLOv10-CBAM for deep feature extraction, a Temporal Transformer for sequence-aware detection, and Kalman Tracking for smooth real-time movement prediction. Handles occlusion, low-light, and dynamic backgrounds.",
    tags:["Python","YOLOv10","Transformers","Kalman Filter","OpenCV","Deep Learning"], color: T.emerald,
  },
  {
    num:"010", cat:"Hardware", title:"Gesture Controlled Car",
    desc:"A glove-mounted MPU-6050 gyroscope reads tilt angles in real time and wirelessly transmits movement commands to an Arduino-controlled RC car. Tilt forward to accelerate, sideways to steer — no buttons, no joystick, just your hand.",
    tags:["Arduino","MPU-6050","Gyroscope","Wireless","C++"], color: T.amber,
  },
  {
    num:"011", cat:"Hardware", title:"Potentiometer-Based Smart Safe",
    desc:"Replaced the standard relay mechanism of a metallic safe with a potentiometer combination lock driven by Arduino and stepper motors. The result is a significantly more secure system — supporting longer, harder-to-crack passcodes compared to a traditional dial safe — while eliminating the mechanical failure points of the original relay.",
    tags:["Arduino","Stepper Motors","Potentiometer","C++","Electronics"], color: T.amber,
  },
  {
    num:"012", cat:"Hardware", title:"Robotic Arm",
    desc:"A robotic arm that mirrors human hand movements in real time. MPU-6050 gyroscope sensors on a glove capture finger and wrist angles, which are processed by a Raspberry Pi and translated into precise servo motor commands via a servo driver board — replicating the full range of motion of a human hand.",
    tags:["Raspberry Pi","Servo Motors","MPU-6050","Servo Driver","Python","C++"], color: T.amber,
  },
];

const EXPERIENCE = [
  {
    role: "Software Developer Intern",
    company: "Alfaleus Technology · IIT Hyderabad",
    period: "2024",
    desc: "Built and shipped 2 Flutter apps currently live in production — a real-time sales management platform with live GPS tracking and call log monitoring, and a CRM app with OCR-powered ID scanning and offline-first data sync. Worked directly within a startup environment at IIT Hyderabad.",
  },
  {
    role: "Summer Research Intern",
    company: "VIT Chennai",
    period: "Summer 2023",
    desc: "Conducted research on drone-based object detection using YOLOv5, focusing on aerial surveillance and real-time tracking. Gained hands-on experience in computer vision pipelines, model training, and deploying detection systems on drone hardware.",
  },
];

// ── Custom Cursor ─────────────────────────────────────────────────────────────
function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos   = useRef({ x: -200, y: -200 });
  const ring  = useRef({ x: -200, y: -200 });
  const state = useRef({ hover: false, click: false });

  useEffect(() => {
    const onMove  = e => { pos.current = { x: e.clientX, y: e.clientY }; };
    const onDown  = () => { state.current.click = true; };
    const onUp    = () => { state.current.click = false; };

    const attach = () => {
      document.querySelectorAll("a,button,[data-hover]").forEach(el => {
        el.addEventListener("mouseenter", () => { state.current.hover = true; });
        el.addEventListener("mouseleave", () => { state.current.hover = false; });
      });
    };
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    let hue = 185, raf;
    const tick = () => {
      hue = (hue + 0.5) % 360;
      const col = `hsl(${hue},100%,65%)`;
      const { hover, click } = state.current;

      if (dotRef.current) {
        dotRef.current.style.left = pos.current.x + "px";
        dotRef.current.style.top  = pos.current.y + "px";
        const ds = click ? 0.4 : hover ? 2.4 : 1;
        dotRef.current.style.transform = `translate(-50%,-50%) scale(${ds})`;
        dotRef.current.style.background = col;
        dotRef.current.style.boxShadow = `0 0 ${hover ? 20 : 8}px ${col}aa`;
      }

      ring.current.x += (pos.current.x - ring.current.x) * 0.09;
      ring.current.y += (pos.current.y - ring.current.y) * 0.09;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top  = ring.current.y + "px";
        const rs = click ? 0.65 : hover ? 1.7 : 1;
        ringRef.current.style.transform = `translate(-50%,-50%) scale(${rs})`;
        ringRef.current.style.borderColor = col + "55";
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position:"fixed", width:9, height:9, borderRadius:"50%",
        background:T.cyan, pointerEvents:"none", zIndex:9999,
        transition:"transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s",
        mixBlendMode:"screen",
      }}/>
      <div ref={ringRef} style={{
        position:"fixed", width:40, height:40, borderRadius:"50%",
        border:"1.5px solid", borderColor:T.cyan+"55",
        pointerEvents:"none", zIndex:9998,
        transition:"transform 0.4s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s",
      }}/>
    </>
  );
}

// ── Stars ─────────────────────────────────────────────────────────────────────
function Stars() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    let stars = [], raf;
    const resize = () => {
      c.width = window.innerWidth; c.height = window.innerHeight;
      stars = Array.from({ length: 220 }, () => ({
        x: Math.random()*c.width, y: Math.random()*c.height,
        r: Math.random()*1.6+0.3, a: Math.random()*0.75+0.15,
        sp: Math.random()*0.004+0.001, ph: Math.random()*Math.PI*2,
        hue: [210, 190, 260, 180, 200][Math.floor(Math.random()*5)],
      }));
    };
    const draw = t => {
      ctx.clearRect(0, 0, c.width, c.height);
      stars.forEach(s => {
        const a = s.a*(0.5+0.5*Math.sin(t*s.sp*1000+s.ph));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fillStyle = `hsla(${s.hue},75%,85%,${a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(ts => draw(ts/1000));
    };
    resize(); draw(0);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }}/>;
}

// ── Aurora blobs ──────────────────────────────────────────────────────────────
function Aurora() {
  const blobs = [
    { top:"-18%", left:"20%",   w:1000, h:550, color:T.cyan,   op:0.13, anim:"drift1 16s ease-in-out infinite" },
    { top:"15%",  right:"-8%",  w:700,  h:700, color:T.violet, op:0.12, anim:"drift2 20s ease-in-out infinite" },
    { bottom:"5%",left:"-5%",   w:600,  h:480, color:T.emerald,op:0.10, anim:"drift3 18s ease-in-out infinite" },
    { top:"50%",  left:"35%",   w:500,  h:400, color:T.pink,   op:0.07, anim:"drift1 22s ease-in-out infinite reverse" },
  ];
  return (
    <div style={{ position:"fixed", inset:0, zIndex:1, pointerEvents:"none", overflow:"hidden" }}>
      {blobs.map((b,i) => {
        const hex = Math.round(b.op*255).toString(16).padStart(2,"0");
        return (
          <div key={i} style={{
            position:"absolute", top:b.top, bottom:b.bottom, left:b.left, right:b.right,
            width:b.w, height:b.h, borderRadius:"50%",
            background:`radial-gradient(ellipse,${b.color}${hex} 0%,transparent 65%)`,
            filter:"blur(70px)", animation:b.anim,
          }}/>
        );
      })}
    </div>
  );
}

// ── Radar Chart ───────────────────────────────────────────────────────────────
function RadarChart({ skills, animate }) {
  const S=280, CX=140, CY=140, R=100, N=RADAR_AXES.length;
  const [p, setP] = useState(0);
  const [rot, setRot] = useState(0);

  useEffect(() => {
    let r = requestAnimationFrame(function spin() { setRot(v=>v+0.28); r=requestAnimationFrame(spin); });
    return () => cancelAnimationFrame(r);
  }, []);

  useEffect(() => {
    if (!animate) return;
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const t = Math.min((ts-start)/1300, 1);
      const e = t<0.5 ? 2*t*t : -1+(4-2*t)*t;
      setP(e); if (t<1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [animate]);

  const pt = (i, frac) => {
    const a = (Math.PI*2*i)/N - Math.PI/2;
    return [CX+Math.cos(a)*R*frac, CY+Math.sin(a)*R*frac];
  };
  const catAvg = key => {
    const items = skills.filter(s=>s.cat===key);
    return items.length ? items.reduce((a,b)=>a+b.level,0)/items.length/100 : 0;
  };
  const dataPoints = RADAR_AXES.map((ax,i) => pt(i, catAvg(ax.key)*p));
  const poly = dataPoints.map((d,i)=>`${i===0?"M":"L"}${d[0]},${d[1]}`).join(" ")+" Z";

  return (
    <svg width={S} height={S} style={{ overflow:"visible" }}>
      <defs>
        <radialGradient id="rFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={T.cyan} stopOpacity="0.28"/>
          <stop offset="100%" stopColor={T.violet} stopOpacity="0.04"/>
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* spinning rings */}
      <circle cx={CX} cy={CY} r={R+26} fill="none" stroke={T.cyan} strokeWidth="1"
        strokeOpacity="0.14" strokeDasharray="3 10"
        transform={`rotate(${rot},${CX},${CY})`}/>
      <circle cx={CX} cy={CY} r={R+18} fill="none" stroke={T.violet} strokeWidth="0.8"
        strokeOpacity="0.1" strokeDasharray="2 16"
        transform={`rotate(${-rot*0.5},${CX},${CY})`}/>

      {/* grid */}
      {[0.25,0.5,0.75,1].map(lvl => (
        <polygon key={lvl}
          points={RADAR_AXES.map((_,i)=>pt(i,lvl).join(",")).join(" ")}
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      ))}

      {/* axes */}
      {RADAR_AXES.map((ax,i) => {
        const end = pt(i,1);
        return <g key={ax.key}>
          <line x1={CX} y1={CY} x2={end[0]} y2={end[1]} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
          <circle cx={end[0]} cy={end[1]} r="3.5" fill={ax.color} opacity="0.55"/>
        </g>;
      })}

      {/* data area */}
      <path d={poly} fill="url(#rFill)" stroke={T.cyan} strokeWidth="2.2"
        strokeLinejoin="round" filter="url(#glow)"/>

      {/* data dots */}
      {dataPoints.map((d,i) => (
        <circle key={i} cx={d[0]} cy={d[1]} r="5.5"
          fill={RADAR_AXES[i].color} stroke={T.bg} strokeWidth="2" filter="url(#glow)"/>
      ))}

      {/* labels */}
      {RADAR_AXES.map((ax,i) => {
        const [lx,ly] = pt(i, 1.32);
        return <text key={ax.key} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
          fontSize="10" fontFamily="Syne" fontWeight="700" fill={ax.color}
          style={{ letterSpacing:"0.12em", textTransform:"uppercase" }}>
          {ax.label}
        </text>;
      })}
    </svg>
  );
}

// ── Skill Pill ────────────────────────────────────────────────────────────────
function SkillPill({ name, color, index, visible }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "8px 14px", borderRadius: 999,
        border: `1px solid ${hov ? color + "70" : color + "22"}`,
        background: hov ? color + "14" : color + "07",
        cursor: "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.95)",
        transition: `opacity 0.5s ${index * 0.04}s, transform 0.5s ${index * 0.04}s,
                     border-color 0.25s, background 0.25s, box-shadow 0.25s`,
        boxShadow: hov ? `0 0 18px ${color}28, inset 0 0 12px ${color}0a` : "none",
        whiteSpace: "nowrap",
      }}>
      <div style={{
        width: 5, height: 5, borderRadius: "50%", flexShrink: 0,
        background: color,
        boxShadow: hov ? `0 0 8px ${color}` : "none",
        transition: "box-shadow 0.25s",
      }}/>
      <span style={{
        fontSize: 12, fontWeight: 500, letterSpacing: "0.03em",
        color: hov ? color : T.sub,
        transition: "color 0.25s",
      }}>{name}</span>
    </div>
  );
}

// ── useReveal ─────────────────────────────────────────────────────────────────
function useReveal(threshold=0.13) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

// ── Section ───────────────────────────────────────────────────────────────────
function Section({ id, tag, title, accent=T.cyan, children }) {
  const [ref, vis] = useReveal();
  return (
    <section id={id} ref={ref} style={{
      position:"relative", zIndex:2,
      maxWidth:1080, margin:"0 auto",
      padding:"clamp(4rem,8vw,7rem) clamp(1.5rem,6vw,4rem)",
      borderTop:`1px solid ${accent}25`,
    }}>
      <div style={{
        opacity:vis?1:0, transform:vis?"none":"translateY(22px)",
        transition:"opacity 0.7s, transform 0.7s", marginBottom:"2.8rem",
      }}>
        <p style={{ fontSize:11, letterSpacing:"0.24em", textTransform:"uppercase",
          color:accent, marginBottom:10, opacity:0.85 }}>{tag}</p>
        <h2 style={{
          fontFamily:"Syne", fontSize:"clamp(2rem,4vw,2.8rem)", fontWeight:700,
          letterSpacing:"-0.02em", marginBottom:14,
          background:`linear-gradient(135deg, ${T.text} 40%, ${accent} 100%)`,
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
        }}>{title}</h2>
        <div style={{ width:44, height:2, borderRadius:999,
          background:`linear-gradient(to right, ${accent}, transparent)` }}/>
      </div>
      {children}
    </section>
  );
}

// ── Circle Nav Button ─────────────────────────────────────────────────────────
function CircleBtn({ label, icon, href, color, delay, show }) {
  const [hov, setHov] = useState(false);
  const [rot, setRot] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (hov) {
      const spin = () => { setRot(v=>v+1.6); rafRef.current=requestAnimationFrame(spin); };
      rafRef.current = requestAnimationFrame(spin);
    } else cancelAnimationFrame(rafRef.current);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hov]);

  const size = "clamp(122px,14vw,158px)";
  return (
    <a href={href}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      onClick={e=>{ e.preventDefault(); document.querySelector(href)?.scrollIntoView({behavior:"smooth"}); }}
      style={{
        width:size, height:size, borderRadius:"50%",
        border:`1.5px solid ${hov?color+"75":color+"20"}`,
        background: hov?color+"13":color+"05",
        backdropFilter:"blur(16px)",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        gap:8, cursor:"none", textDecoration:"none", color:T.text,
        position:"relative", overflow:"hidden",
        boxShadow: hov?`0 0 55px ${color}30, 0 0 110px ${color}0e, inset 0 0 22px ${color}08`:"none",
        opacity: show?1:0,
        transform: show ? (hov?"translateY(-8px) scale(1.07)":"translateY(0) scale(1)") : "translateY(70px) scale(0.55)",
        transition:`opacity 0.8s ${delay}s cubic-bezier(0.34,1.56,0.64,1),
                   transform ${show?`0.9s ${delay}s cubic-bezier(0.34,1.56,0.64,1)`:"0.25s ease"},
                   border-color 0.3s, background 0.3s, box-shadow 0.3s`,
      }}>
      {/* spinning arc */}
      <svg style={{
        position:"absolute", inset:-1, width:"calc(100% + 2px)", height:"calc(100% + 2px)",
        opacity:hov?1:0, transition:"opacity 0.35s", transform:`rotate(${rot}deg)`,
      }} viewBox="0 0 100 100">
        <defs>
          <linearGradient id={`cg-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0"/>
            <stop offset="100%" stopColor={color} stopOpacity="1"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="49" fill="none"
          stroke={`url(#cg-${label})`} strokeWidth="2.5" strokeDasharray="55 260"/>
      </svg>
      {/* inner ring */}
      <div style={{
        position:"absolute", inset:10, borderRadius:"50%",
        border:`1px solid ${color}${hov?"28":"12"}`, transition:"border-color 0.3s",
      }}/>
      <span style={{
        fontSize:24, transition:"filter 0.3s, transform 0.3s",
        filter:hov?`drop-shadow(0 0 10px ${color})`:"none",
        transform:hov?"scale(1.15)":"scale(1)",
      }}>{icon}</span>
      <span style={{
        fontFamily:"Syne", fontSize:11, fontWeight:700,
        letterSpacing:"0.15em", textTransform:"uppercase",
        color:hov?color:T.sub, transition:"color 0.3s",
      }}>{label}</span>
    </a>
  );
}

// ── Projects Section — Spotlight Viewer ──────────────────────────────────────
const CAT_COLORS = { Mobile:T.pink, Web:T.cyan, "AI & ML":T.emerald, Hardware:T.amber };

function ProjectsSection({ projRef, projVis }) {
  const cats = Array.from(new Set(PROJECTS.map(p => p.cat)));
  const [active, setActive] = useState(cats[0]);
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(true);

  const filtered = PROJECTS.filter(p => p.cat === active);
  const current = filtered[idx] || filtered[0];
  const total = filtered.length;

  const switchCat = (cat) => { setActive(cat); setIdx(0); };

  const go = (newDir) => {
    if (animating) return;
    setDir(newDir);
    setAnimating(true);
    setVisible(false);
    setTimeout(() => {
      setIdx(i => (i + newDir + total) % total);
      setVisible(true);
      setAnimating(false);
    }, 260);
  };

  if (!current) return null;
  const col = CAT_COLORS[current.cat] || T.violet;

  return (
    <div ref={projRef}>
      {/* Filter tabs */}
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:"2.2rem"}}>
        {cats.map(cat => {
          const c = CAT_COLORS[cat] || T.violet;
          const isActive = active === cat;
          return (
            <button key={cat} onClick={() => switchCat(cat)} style={{
              padding:"7px 18px", borderRadius:999,
              border:`1px solid ${isActive ? c+"70" : T.border}`,
              background: isActive ? c+"18" : "transparent",
              color: isActive ? c : T.sub,
              fontFamily:"Syne", fontSize:11, fontWeight:700,
              letterSpacing:"0.12em", textTransform:"uppercase",
              cursor:"none", transition:"all 0.25s",
              boxShadow: isActive ? `0 0 20px ${c}22` : "none",
            }}
            onMouseEnter={e=>{ if(!isActive){e.currentTarget.style.borderColor=c+"40";e.currentTarget.style.color=c;}}}
            onMouseLeave={e=>{ if(!isActive){e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.sub;}}}>
              {cat}
            </button>
          );
        })}
      </div>

      {/* Spotlight card + nav */}
      <div style={{display:"grid", gridTemplateColumns:"44px 1fr 44px", gap:"1.2rem", alignItems:"center"}}>

        {/* Prev arrow */}
        <button onClick={() => go(-1)} disabled={total <= 1} style={{
          width:44, height:44, borderRadius:"50%",
          border:`1px solid ${total>1 ? col+"40" : T.border}`,
          background: total>1 ? col+"0c" : "transparent",
          color: total>1 ? col : T.muted,
          fontSize:18, cursor:"none", display:"flex", alignItems:"center", justifyContent:"center",
          transition:"all 0.25s", flexShrink:0,
        }}
        onMouseEnter={e=>{ if(total>1){e.currentTarget.style.background=col+"20";e.currentTarget.style.boxShadow=`0 0 20px ${col}25`;}}}
        onMouseLeave={e=>{ e.currentTarget.style.background=total>1?col+"0c":"transparent";e.currentTarget.style.boxShadow="none";}}>
          ‹
        </button>

        {/* Featured card */}
        <div style={{
          background: T.surface,
          border:`1px solid ${col}35`,
          borderRadius:20, padding:"2.4rem",
          position:"relative", overflow:"hidden",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0) scale(1)" : `translateX(${dir * 30}px) scale(0.98)`,
          transition:"opacity 0.25s ease, transform 0.25s ease",
          boxShadow:`0 0 60px ${col}0e, inset 0 0 40px ${col}05`,
          minHeight:260,
        }}>
          {/* top accent bar */}
          <div style={{position:"absolute",top:0,left:0,right:0,height:2,
            background:`linear-gradient(to right,${col},${col}00)`}}/>
          {/* bg glow */}
          <div style={{position:"absolute",top:-60,right:-60,width:220,height:220,borderRadius:"50%",
            background:`radial-gradient(${col}15,transparent 70%)`,pointerEvents:"none"}}/>

          {/* num + badge */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <span style={{fontFamily:"Syne",fontSize:11,color:col,letterSpacing:"0.2em",opacity:0.8}}>
              {current.num}
            </span>
            <span style={{fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",
              padding:"4px 12px",borderRadius:999,
              border:`1px solid ${col}35`,color:col,background:col+"0d"}}>
              {current.cat}
            </span>
          </div>

          <h3 style={{fontFamily:"Syne",fontSize:"clamp(1.2rem,2.5vw,1.6rem)",fontWeight:800,
            marginBottom:14,color:T.text,letterSpacing:"-0.01em"}}>{current.title}</h3>

          {current.badge && (
            <div style={{display:"inline-flex",alignItems:"center",gap:6,
              marginBottom:14,padding:"4px 12px",borderRadius:999,
              background:T.amber+"15", border:`1px solid ${T.amber}40`}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:T.amber,
                boxShadow:`0 0 6px ${T.amber}`}}/>
              <span style={{fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",
                color:T.amber,fontWeight:600}}>{current.badge}</span>
            </div>
          )}

          <p style={{fontSize:"0.93rem",color:T.sub,lineHeight:1.82,fontWeight:300,marginBottom:24,
            maxWidth:680}}>{current.desc}</p>

          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
            {current.tags.map(t => (
              <span key={t} style={{fontSize:11,letterSpacing:"0.06em",padding:"5px 13px",
                borderRadius:999, border:`1px solid ${col}35`,
                color:col, background:col+"0c"}}>{t}</span>
            ))}
          </div>
        </div>

        {/* Next arrow */}
        <button onClick={() => go(1)} disabled={total <= 1} style={{
          width:44, height:44, borderRadius:"50%",
          border:`1px solid ${total>1 ? col+"40" : T.border}`,
          background: total>1 ? col+"0c" : "transparent",
          color: total>1 ? col : T.muted,
          fontSize:18, cursor:"none", display:"flex", alignItems:"center", justifyContent:"center",
          transition:"all 0.25s", flexShrink:0,
        }}
        onMouseEnter={e=>{ if(total>1){e.currentTarget.style.background=col+"20";e.currentTarget.style.boxShadow=`0 0 20px ${col}25`;}}}
        onMouseLeave={e=>{ e.currentTarget.style.background=total>1?col+"0c":"transparent";e.currentTarget.style.boxShadow="none";}}>
          ›
        </button>
      </div>

      {/* Dot indicators */}
      <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:"1.4rem"}}>
        {filtered.map((_,i) => (
          <button key={i} onClick={()=>{setDir(i>idx?1:-1);setIdx(i);}} style={{
            width: i===idx ? 20 : 7, height:7, borderRadius:999,
            background: i===idx ? col : T.muted,
            border:"none", cursor:"none", padding:0,
            transition:"all 0.3s",
            boxShadow: i===idx ? `0 0 10px ${col}` : "none",
          }}/>
        ))}
      </div>
    </div>
  );
}


// ══════════════════════════════════════════════════════════════════════════════
// App
// ══════════════════════════════════════════════════════════════════════════════
export default function Portfolio() {
  const [circlesOn, setCirclesOn] = useState(false);
  const [projRef,    projVis]    = useReveal();
  const [skillRef,   skillVis]   = useReveal();
  const [expRef,     expVis]     = useReveal();
  const [contactRef, contactVis] = useReveal();

  useEffect(() => {
    const t = setTimeout(() => setCirclesOn(true), 1600);
    return () => clearTimeout(t);
  }, []);

  const circles = [
    { label:"Projects", icon:"◈", href:"#projects", color:T.cyan,   delay:0    },
    { label:"Skills",   icon:"⬡", href:"#skills",   color:T.violet, delay:0.1  },
    { label:"Contact",  icon:"◎", href:"#contact",  color:T.emerald,delay:0.2  },
  ];

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:${T.bg};color:${T.text};font-family:'DM Sans',sans-serif;
             overflow-x:hidden;cursor:none;}
        ::selection{background:${T.cyan}28;color:${T.text};}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:${T.bg};}
        ::-webkit-scrollbar-thumb{background:${T.muted};border-radius:99px;}
        a{color:inherit;}

        @keyframes fadeUp{from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:none;}}
        @keyframes scrollPulse{0%,100%{transform:scaleY(1);opacity:.5;}50%{transform:scaleY(.35);opacity:.15;}}
        @keyframes drift1{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-45px,35px) scale(1.08);}}
        @keyframes drift2{0%,100%{transform:translate(0,0);}50%{transform:translate(35px,-55px);}}
        @keyframes drift3{0%,100%{transform:translate(0,0);}50%{transform:translate(55px,-30px);}}

        @media(max-width:680px){
          .about-grid,.skills-inner,.contact-inner{grid-template-columns:1fr!important;}
          .exp-row{grid-template-columns:1fr!important;}
          .exp-period{text-align:left!important;}
        }
      `}</style>

      <Cursor/>
      <Stars/>
      <Aurora/>

      {/* ── HERO ── */}
      <div style={{position:"relative",zIndex:2,minHeight:"100vh",
        display:"flex",flexDirection:"column",alignItems:"center",
        justifyContent:"center",padding:"clamp(1rem,3vw,2rem) 2rem",
        paddingBottom:"clamp(2rem,5vw,4rem)"}}>

        {/* hero glow */}
        <div style={{position:"absolute",top:"40%",left:"50%",transform:"translate(-50%,-50%)",
          width:900,height:350,borderRadius:"50%",pointerEvents:"none",
          background:`radial-gradient(ellipse,${T.cyan}18 0%,transparent 65%)`,
          filter:"blur(55px)"}}/>
        <div style={{position:"absolute",top:"60%",left:"30%",
          width:500,height:300,borderRadius:"50%",pointerEvents:"none",
          background:`radial-gradient(ellipse,${T.violet}12 0%,transparent 65%)`,
          filter:"blur(60px)"}}/>
        {/* ── Name + bio block ── */}
        <div style={{textAlign:"center",
          animation:"fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.3s both",
          position:"relative",zIndex:1,marginBottom:"clamp(1.2rem,3vw,2rem)"}}>

          <div style={{display:"flex",alignItems:"center",justifyContent:"center",
            gap:12,marginBottom:22}}>
            <div style={{width:32,height:1,
              background:`linear-gradient(to right,transparent,${T.cyan})`}}/>
            <p style={{fontSize:11,letterSpacing:"0.28em",textTransform:"uppercase",
              color:T.cyan,fontWeight:400}}>Software Engineer · VIT Chennai</p>
            <div style={{width:32,height:1,
              background:`linear-gradient(to left,transparent,${T.cyan})`}}/>
          </div>

          {/* Name split across two lines so long name looks intentional */}
          <h1 style={{
            fontFamily:"Syne",fontWeight:800,lineHeight:1,
            fontSize:"clamp(1.8rem,5vw,4rem)",letterSpacing:"-0.03em",
            background:`linear-gradient(145deg, #fff 10%, ${T.cyan} 48%, ${T.violet} 88%)`,
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
            marginBottom:20,
            filter:`drop-shadow(0 0 50px ${T.cyan}18)`,
          }}>
            Akaash Venkata<br/>
            <span style={{fontSize:"clamp(2.2rem,6vw,4.8rem)",letterSpacing:"-0.035em"}}>
              Peddhibhotla
            </span>
          </h1>

          <p style={{fontSize:"clamp(0.85rem,1.5vw,1rem)",lineHeight:1.75,
            color:T.sub,maxWidth:480,margin:"0 auto",fontWeight:300}}>
            CS undergrad at VIT Chennai, specialising in{" "}
            <span style={{color:T.text,fontWeight:400}}>AI & Robotics</span>
            {" "}— building real-time apps, exploring embedded systems, and bridging
            intelligent software with great user experiences.
          </p>
        </div>

        {/* ── Divider with "explore" label ── */}
        <div style={{
          display:"flex",alignItems:"center",gap:16,
          marginBottom:"clamp(1rem,2.5vw,2rem)",
          animation:"fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.9s both",
          opacity:0,
        }}>
          <div style={{width:"clamp(40px,8vw,80px)",height:1,
            background:`linear-gradient(to right,transparent,${T.cyan}50)`}}/>
          <span style={{fontSize:10,letterSpacing:"0.28em",textTransform:"uppercase",
            color:T.cyan,opacity:0.6,whiteSpace:"nowrap"}}>explore</span>
          <div style={{width:"clamp(40px,8vw,80px)",height:1,
            background:`linear-gradient(to left,transparent,${T.cyan}50)`}}/>
        </div>

        {/* ── 3 circles ── */}
        <div style={{display:"flex",gap:"clamp(1rem,3.5vw,2.5rem)",
          flexWrap:"wrap",justifyContent:"center",alignItems:"center",
          animation:"fadeUp 0.6s ease 1.1s both",opacity:0}}>
          {circles.map(c => <CircleBtn key={c.label} {...c} show={circlesOn}/>)}
        </div>

        {/* scroll hint */}
        <div style={{position:"absolute",bottom:24,
          display:"flex",flexDirection:"column",alignItems:"center",gap:8,
          opacity:circlesOn?0.7:0,transition:"opacity 1.2s 2.5s"}}>
          <span style={{fontSize:10,letterSpacing:"0.22em",textTransform:"uppercase",color:T.muted}}>scroll</span>
          <div style={{width:1,height:28,
            background:`linear-gradient(to bottom,${T.muted},transparent)`,
            animation:"scrollPulse 1.8s ease-in-out infinite"}}/>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <Section id="about" tag="01 — Who I Am" title="About Me" accent={T.cyan}>
        <div className="about-grid" style={{display:"grid",
          gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center"}}>
          <div>
            {["I'm a pre-final year Computer Science student at VIT Chennai, specialising in AI & Robotics — building at the intersection of software, intelligence, and hardware.",
              "I gravitate towards real-time applications: whether it's a responsive web platform or a cross-platform mobile app, I care about systems that feel instant and alive. Beyond the screen, I'm deeply into embedded systems and love bridging the gap between code and physical hardware.",
              "Machine learning and AI aren't just my specialisation — they're genuinely what excite me. I'm always looking for projects where smart systems meet great user experiences."]
              .map((txt,i)=>(
              <p key={i} style={{color:T.sub,lineHeight:1.88,fontWeight:400,
                fontSize:"0.98rem",marginBottom:16}}>{txt}</p>
            ))}
          </div>

          {/* Right side — info tiles */}
          <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
            {[
              { label:"Degree",      val:"B.Tech Computer Science",  icon:"◈", color:T.cyan    },
              { label:"Specialisation", val:"AI & Robotics",         icon:"✦", color:T.violet  },
              { label:"University",  val:"VIT Chennai",               icon:"⬡", color:T.emerald },
              { label:"Year",        val:"Pre-Final Year",            icon:"◎", color:T.amber   },
              { label:"Interests",   val:"Real-time Apps · Embedded Systems · ML", icon:"⬢", color:T.pink },
            ].map((item,i)=>(
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:"1rem",
                background:T.surface, border:`1px solid ${item.color}25`,
                borderRadius:12, padding:"0.9rem 1.2rem",
                transition:"all 0.3s", cursor:"none",
              }}
              onMouseEnter={e=>{
                e.currentTarget.style.borderColor=item.color+"55";
                e.currentTarget.style.transform="translateX(5px)";
                e.currentTarget.style.boxShadow=`0 0 20px ${item.color}15`;
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.borderColor=item.color+"25";
                e.currentTarget.style.transform="none";
                e.currentTarget.style.boxShadow="none";
              }}>
                <span style={{fontSize:16,color:item.color,
                  filter:`drop-shadow(0 0 6px ${item.color})`,flexShrink:0}}>{item.icon}</span>
                <div>
                  <div style={{fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",
                    color:item.color,opacity:0.8,marginBottom:2}}>{item.label}</div>
                  <div style={{fontSize:13,color:T.text,fontWeight:500}}>{item.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── PROJECTS ── */}
      <Section id="projects" tag="02 — What I've Built" title="Projects" accent={T.violet}>
        <ProjectsSection projRef={projRef} projVis={projVis}/>
      </Section>

      {/* ── SKILLS ── */}
      <Section id="skills" tag="03 — What I Know" title="Skills" accent={T.emerald}>
        {/* Radar centred on top */}
        <div ref={skillRef} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10,marginBottom:"3rem"}}>
          <RadarChart skills={SKILLS} animate={skillVis}/>
          <p style={{fontSize:11,color:T.muted,letterSpacing:"0.14em",textTransform:"uppercase"}}>
            Category Proficiency
          </p>
        </div>

        {/* Skill group cards */}
        <div ref={skillRef} style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"1.2rem"}}>
          {[
            { cat:"Frontend",  color:T.cyan,    icon:"⬡" },
            { cat:"Backend",   color:T.violet,  icon:"◈" },
            { cat:"Mobile",    color:T.pink,    icon:"◎" },
            { cat:"AI & ML",   color:T.emerald, icon:"✦" },
            { cat:"Embedded",  color:T.amber,   icon:"⬢" },
          ].map((group) => {
            const groupSkills = SKILLS.filter(s => s.cat === group.cat);
            return (
              <div key={group.cat} style={{
                background: T.surface,
                border: `1px solid ${group.color}35`,
                borderRadius: 16, padding: "1.4rem",
                position: "relative", overflow: "hidden",
                boxShadow: `0 0 30px ${group.color}0a, inset 0 0 20px ${group.color}05`,
              }}>
                {/* corner glow */}
                <div style={{
                  position:"absolute", top:-40, right:-40,
                  width:140, height:140, borderRadius:"50%",
                  background:`radial-gradient(${group.color}28,transparent 70%)`,
                  pointerEvents:"none",
                }}/>
                {/* category header */}
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                  <span style={{fontSize:14,color:group.color,
                    filter:`drop-shadow(0 0 6px ${group.color}80)`}}>{group.icon}</span>
                  <span style={{fontFamily:"Syne",fontSize:11,fontWeight:700,
                    letterSpacing:"0.16em",textTransform:"uppercase",color:group.color}}>
                    {group.cat}
                  </span>
                </div>
                {/* pills */}
                <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                  {groupSkills.map((s, i) => {
                    const globalIdx = SKILLS.findIndex(sk => sk.name === s.name);
                    return (
                      <SkillPill key={s.name} name={s.name}
                        color={group.color} index={globalIdx} visible={skillVis}/>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── EXPERIENCE ── */}
      <Section id="experience" tag="04 — Where I've Worked" title="Experience" accent={T.amber}>
        <div ref={expRef} style={{display:"flex",flexDirection:"column",gap:"1.2rem"}}>
          {EXPERIENCE.map((ex,i)=>(
            <div key={ex.role} className="exp-row"
              style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,
                padding:"1.8rem 2rem",display:"grid",
                gridTemplateColumns:"1fr auto",gap:"0.4rem 2rem",
                opacity:expVis?1:0,transform:expVis?"translateX(0)":"translateX(-28px)",
                transition:`opacity 0.6s ${i*0.14}s,transform 0.6s ${i*0.14}s,border-color 0.3s,box-shadow 0.3s`,
                cursor:"none", position:"relative", overflow:"hidden"}}
              onMouseEnter={e=>{
                e.currentTarget.style.borderColor=T.amber+"55";
                e.currentTarget.style.boxShadow=`0 0 40px ${T.amber}18, inset 0 0 20px ${T.amber}05`;
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.borderColor=T.border;
                e.currentTarget.style.boxShadow="none";
              }}>
              {/* left accent strip */}
              <div style={{position:"absolute",left:0,top:0,bottom:0,width:3,
                background:`linear-gradient(to bottom,${T.amber},${T.amber}00)`,
                borderRadius:"14px 0 0 14px"}}/>
              <div style={{paddingLeft:"0.5rem"}}>
                <div style={{fontFamily:"Syne",fontSize:"1.05rem",fontWeight:700,marginBottom:4,color:T.text}}>{ex.role}</div>
                <div style={{fontSize:"0.88rem",color:T.amber,letterSpacing:"0.03em",fontWeight:500}}>{ex.company}</div>
              </div>
              <div className="exp-period" style={{fontSize:12,color:T.muted,
                letterSpacing:"0.07em",whiteSpace:"nowrap",paddingTop:3,textAlign:"right"}}>{ex.period}</div>
              <p style={{fontSize:"0.9rem",color:T.sub,lineHeight:1.78,fontWeight:300,
                gridColumn:1,marginTop:8,paddingLeft:"0.5rem"}}>{ex.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CONTACT ── */}
      <Section id="contact" tag="05 — Let's Talk" title="Contact" accent={T.pink}>
        <div ref={contactRef} className="contact-inner"
          style={{background:T.surface,border:`1px solid ${T.pink}30`,borderRadius:22,
            padding:"clamp(2rem,5vw,3.5rem)",display:"grid",
            gridTemplateColumns:"1fr 1fr",gap:"3rem",alignItems:"center",
            opacity:contactVis?1:0,transform:contactVis?"none":"translateY(30px)",
            transition:"opacity 0.7s,transform 0.7s",
            boxShadow:`0 0 80px ${T.pink}12, inset 0 0 40px ${T.pink}05`}}>
          <div>
            <h3 style={{fontFamily:"Syne",fontSize:"1.6rem",fontWeight:700,lineHeight:1.2}}>
              Open to opportunities<br/>
              <span style={{color:T.pink,filter:`drop-shadow(0 0 14px ${T.pink}55)`}}>
                & collaborations.
              </span>
            </h3>
            <p style={{color:T.sub,lineHeight:1.78,fontSize:"0.93rem",fontWeight:300,marginTop:14}}>
              Whether it's a full-time role, freelance project, or just a chat about tech — my inbox is always open.
            </p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {[
              { icon:"✉",  label:"Email",    val:"akaashvp@gmail.com",                  href:"mailto:akaashvp@gmail.com",                                    c:T.cyan   },
              { icon:"☎",  label:"Phone",    val:"+91 86102 09653",                     href:"tel:+918610209653",                                            c:T.emerald},
              { icon:"in", label:"LinkedIn", val:"akaash-peddhibhotla",                 href:"https://www.linkedin.com/in/akaash-peddhibhotla-0a6925256/",   c:T.blue   },
              { icon:"⌥",  label:"GitHub",   val:"github.com/akaash2005",               href:"https://github.com/akaash2005",                                c:T.violet },
            ].map(lnk=>(
              <a key={lnk.label} href={lnk.href} target="_blank" rel="noreferrer"
                style={{display:"flex",alignItems:"center",gap:14,padding:"1rem 1.2rem",
                  border:`1px solid ${T.border}`,borderRadius:11,
                  textDecoration:"none",color:T.text,transition:"all 0.3s",cursor:"none"}}
                onMouseEnter={e=>{
                  e.currentTarget.style.borderColor=lnk.c+"45";
                  e.currentTarget.style.background=lnk.c+"0d";
                  e.currentTarget.style.transform="translateX(6px)";
                  e.currentTarget.style.boxShadow=`0 0 22px ${lnk.c}14`;
                }}
                onMouseLeave={e=>{
                  e.currentTarget.style.borderColor=T.border;
                  e.currentTarget.style.background="transparent";
                  e.currentTarget.style.transform="none";
                  e.currentTarget.style.boxShadow="none";
                }}>
                <span style={{fontSize:15,opacity:0.75}}>{lnk.icon}</span>
                <div>
                  <span style={{display:"block",fontSize:11,color:T.muted,
                    letterSpacing:"0.07em",marginBottom:1}}>{lnk.label}</span>
                  <span style={{fontSize:"0.9rem"}}>{lnk.val}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Section>

      <footer style={{position:"relative",zIndex:2,textAlign:"center",
        padding:"1.8rem",borderTop:`1px solid ${T.border}`,
        color:T.muted,fontSize:12,letterSpacing:"0.08em"}}>
        Designed & Built by{" "}
        <strong style={{color:T.text}}>Akaash Venkata Peddhibhotla</strong>
        &nbsp;·&nbsp;2025
      </footer>
    </>
  );
}
