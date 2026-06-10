import React from "react";
import styles from "./PremiumPackageWheel.module.css";

export type WheelItem = {
  key: string;
  label: string;
  angle: number;
  gradientId: string;
  icon: "bulb" | "wand" | "gear" | "book" | "chat" | "grid";
  calloutLines: string[];
  calloutAnchor: "start" | "end";
  calloutX: number;
  calloutY: number;
};

export interface PremiumPackageWheelProps {
  title?: string;
  subtitle?: string;
  items?: WheelItem[];
  className?: string;
}

const CENTER = { x: 650, y: 380 };
const VIEWBOX = "0 0 1300 760";
const NODE_ORBIT = 220;
const NODE_OUTER = 72;
const CENTER_RADIUS = 112;

const defaultItems: WheelItem[] = [
  { key: "tipy", label: "Tipy", angle: -90, gradientId: "tipy", icon: "bulb", calloutLines: ['Co dávat, co nedávat,', 'na co si dát pozor', 'a o co se naopak opřít'], calloutAnchor: "start", calloutX: 930, calloutY: 72 },
  { key: "triky", label: "Triky", angle: -30, gradientId: "triky", icon: "wand", calloutLines: ['Jak změnit nudné psaní', 'práce v rychlý a zábavný', 'proces :)'], calloutAnchor: "start", calloutX: 990, calloutY: 206 },
  { key: "metody", label: "Metody", angle: 30, gradientId: "metody", icon: "gear", calloutLines: ['Vysvětlené použití', 'nejčastějších a nejdůležitějších', 'metod výzkumu / praktické části'], calloutAnchor: "start", calloutX: 980, calloutY: 500 },
  { key: "navody", label: "Návody", angle: 90, gradientId: "navody", icon: "book", calloutLines: ['Na každou část práce dostanete', 'krok po kroku postup,', 'jak ji zpracovávat'], calloutAnchor: "start", calloutX: 930, calloutY: 652 },
  { key: "prompty", label: "Prompty", angle: 150, gradientId: "prompty", icon: "chat", calloutLines: ['Součástí jsou ty nejužitečnější', 'zadání pro AI, jak vygenerovat', 'naprosto cokoliv'], calloutAnchor: "end", calloutX: 320, calloutY: 520 },
  { key: "priklady", label: "Příklady", angle: 210, gradientId: "priklady", icon: "grid", calloutLines: ['Všechno je vysvětlené', 'na příkladech ze všech', 'možných oborů'], calloutAnchor: "end", calloutX: 300, calloutY: 168 },
 ];

function polarToCartesian(cx: number, cy: number, radius: number, angle: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
}

function createArcPath(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);
  const largeArcFlag = ((endAngle - startAngle + 360) % 360) > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

function geometry(item: WheelItem) {
  const pos = polarToCartesian(CENTER.x, CENTER.y, NODE_ORBIT, item.angle);
  const dx = CENTER.x - pos.x;
  const dy = CENTER.y - pos.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  return {
    pos,
    arrowStart: { x: pos.x + ux * NODE_OUTER, y: pos.y + uy * NODE_OUTER },
    arrowEnd: { x: CENTER.x - ux * CENTER_RADIUS, y: CENTER.y - uy * CENTER_RADIUS },
  };
}

function arrowShape(item: WheelItem) {
  const { arrowStart, arrowEnd } = geometry(item);
  const dx = arrowEnd.x - arrowStart.x;
  const dy = arrowEnd.y - arrowStart.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;

  const shaftWidth = 2.4;
  const shaftHalf = shaftWidth / 2;
  const headLength = 8;
  const headWidth = 5.6;
  const headHalf = headWidth / 2;

  const baseX = arrowEnd.x - ux * headLength;
  const baseY = arrowEnd.y - uy * headLength;

  const startLX = arrowStart.x + px * shaftHalf;
  const startLY = arrowStart.y + py * shaftHalf;
  const startRX = arrowStart.x - px * shaftHalf;
  const startRY = arrowStart.y - py * shaftHalf;

  const baseShaftLX = baseX + px * shaftHalf;
  const baseShaftLY = baseY + py * shaftHalf;
  const baseShaftRX = baseX - px * shaftHalf;
  const baseShaftRY = baseY - py * shaftHalf;

  const headLX = baseX + px * headHalf;
  const headLY = baseY + py * headHalf;
  const headRX = baseX - px * headHalf;
  const headRY = baseY - py * headHalf;

  const path = [
    `M ${startLX} ${startLY}`,
    `L ${baseShaftLX} ${baseShaftLY}`,
    `L ${headLX} ${headLY}`,
    `L ${arrowEnd.x} ${arrowEnd.y}`,
    `L ${headRX} ${headRY}`,
    `L ${baseShaftRX} ${baseShaftRY}`,
    `L ${startRX} ${startRY}`,
    'Z',
  ].join(' ');

  return { path };
}

function renderIcon(kind: WheelItem["icon"]) {
  switch (kind) {
    case "bulb":
      return <g className={styles.nodeIcon}><path d="M-14 -6a14 14 0 1 1 28 0c0 5-2.5 9-6.4 11.8-2 1.4-3.2 3.1-3.8 5.2h-7.6c-.6-2.1-1.8-3.8-3.8-5.2C-11.5 3-14 -1-14 -6Z"/><path d="M-6 16h12"/><path d="M-4 20h8"/></g>;
    case "wand":
      return <g className={styles.nodeIcon}><path d="M-12 12 12-12"/><path d="M4-16v8"/><path d="M0-12h8"/><path d="M-16-4v6"/><path d="M-19-1h6"/><path d="M10 2v6"/><path d="M7 5h6"/></g>;
    case "gear":
      return <g className={styles.nodeIcon}><circle cx="0" cy="0" r="10"/><path d="M0-18v4M0 14v4M18 0h-4M-14 0h-4M12.7-12.7l-2.8 2.8M-9.9 9.9l-2.8 2.8M12.7 12.7l-2.8-2.8M-9.9-9.9l-2.8-2.8"/></g>;
    case "book":
      return <g className={styles.nodeIcon}><path d="M-16-12h13c5 0 9 4 9 9v19h-15c-4 0-7 3-7 3V-3c0-5 4-9 9-9Z"/><path d="M16-12H3c-5 0-9 4-9 9v19H9c4 0 7 3 7 3V-3c0-5-4-9-9-9Z"/></g>;
    case "chat":
      return <g className={styles.nodeIcon}><path d="M-17-6c0-7 6-12 16-12s16 5 16 12-6 12-16 12h-5l-9 7 2-9c-2.6-2.1-4-5.1-4-10Z"/><path d="M-6-5h.1M0-5h.1M6-5h.1"/></g>;
    case "grid":
      return <g className={styles.nodeIcon}><rect x="-16" y="-16" width="12" height="12" rx="2"/><rect x="4" y="-16" width="12" height="12" rx="2"/><rect x="-16" y="4" width="12" height="12" rx="2"/><rect x="4" y="4" width="12" height="12" rx="2"/></g>;
  }
}

export default function PremiumPackageWheel({ title = "BALÍČKY", subtitle = "SOUČÁSTI", items = defaultItems, className }: PremiumPackageWheelProps) {
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
      <svg className={styles.svg} viewBox={VIEWBOX} role="img" aria-labelledby="wheelTitle wheelDesc" xmlns="http://www.w3.org/2000/svg">
        <title id="wheelTitle">Balíčky a jejich součásti</title>
        <desc id="wheelDesc">Prémiový kruhový diagram se šesti vnějšími prvky, šipkami do středu a vysvětlujícími popisky.</desc>
        <defs>
          <linearGradient id="bgPanel" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#eef3fb"/><stop offset="48%" stopColor="#e6edf8"/><stop offset="100%" stopColor="#dde6f5"/></linearGradient>
          <radialGradient id="ambientGlow" cx="50%" cy="48%" r="56%"><stop offset="0%" stopColor="rgba(255,255,255,.96)"/><stop offset="62%" stopColor="rgba(212,225,252,.22)"/><stop offset="100%" stopColor="rgba(212,225,252,0)"/></radialGradient>
          <linearGradient id="ringMain" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8e81ff"/><stop offset="22%" stopColor="#57c6d6"/><stop offset="46%" stopColor="#6c79ff"/><stop offset="70%" stopColor="#56c4d9"/><stop offset="100%" stopColor="#9f7cff"/></linearGradient>
          <linearGradient id="ringGlass" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="rgba(255,255,255,.95)"/><stop offset="100%" stopColor="rgba(255,255,255,.2)"/></linearGradient>
          <linearGradient id="tipy" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#cab8ff"/><stop offset="100%" stopColor="#726cf1"/></linearGradient>
          <linearGradient id="triky" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#a6c3ff"/><stop offset="100%" stopColor="#5f7af4"/></linearGradient>
          <linearGradient id="metody" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#a2def8"/><stop offset="100%" stopColor="#6390e8"/></linearGradient>
          <linearGradient id="navody" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#9ce6ea"/><stop offset="100%" stopColor="#55a8da"/></linearGradient>
          <linearGradient id="prompty" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#bea9ff"/><stop offset="100%" stopColor="#7b67ec"/></linearGradient>
          <linearGradient id="priklady" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#d8b7ef"/><stop offset="100%" stopColor="#a17adc"/></linearGradient>
          <radialGradient id="nodeGloss" cx="34%" cy="26%" r="74%"><stop offset="0%" stopColor="rgba(255,255,255,.86)"/><stop offset="46%" stopColor="rgba(255,255,255,.16)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/></radialGradient>
          <radialGradient id="centerFill" cx="50%" cy="34%" r="72%"><stop offset="0%" stopColor="#ffffff"/><stop offset="64%" stopColor="#f5f8ff"/><stop offset="100%" stopColor="#e8eef8"/></radialGradient>
          <filter id="shadowPanel" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="22" stdDeviation="30" floodColor="#7c8cc2" floodOpacity=".14"/></filter>
          <filter id="shadowNode" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#8292c6" floodOpacity=".18"/></filter>
          <filter id="glowNode" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#ffffff" floodOpacity=".24"/></filter>
          <filter id="glowRing" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#84b2ff" floodOpacity=".16"/></filter>
          <filter id="glowArrow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="1.4" floodColor="#8698cb" floodOpacity=".25"/></filter>
        </defs>

        <circle className={styles.ambient} cx="650" cy="380" r="286" />
        <circle className={styles.ringBase} cx="650" cy="380" r="215" />
        <circle className={styles.ringColor} cx="650" cy="380" r="215" />
        <circle className={styles.ringHighlight} cx="650" cy="380" r="215" />
        <circle className={styles.innerGuide} cx="650" cy="380" r="171" />

        <circle className={styles.centerDisc} cx="650" cy="380" r="112" />
        <ellipse className={styles.centerShine} cx="612" cy="334" rx="62" ry="38" />
        <circle className={styles.centerRing} cx="650" cy="380" r="94" />
        <text className={styles.centerTitle} x="650" y="370" textAnchor="middle">{title}</text>
        <text className={styles.centerSubtitle} x="650" y="404" textAnchor="middle">{subtitle}</text>

        {items.map((item) => {
          const { pos } = geometry(item);
          return (
            <g key={item.key} transform={`translate(${pos.x} ${pos.y})`}>
              <circle className={styles.nodeRing} r="72" />
              <circle className={styles.nodeBody} r="61" fill={`url(#${item.gradientId})`} />
              <circle className={styles.nodeShine} r="61" />
              <text className={styles.nodeLabel} x="0" y="2" textAnchor="middle">{item.label}</text>
            </g>
          );
        })}

        <g className={styles.arrowLayer} aria-hidden="true">
          {items.map((item) => {
            const { path } = arrowShape(item);
            return <path key={`arrow-${item.key}`} className={styles.arrowFill} d={path} />;
          })}
        </g>

        {items.map((item) => {
          const { pos } = geometry(item);
          const anchorX = item.calloutAnchor === "start" ? pos.x + NODE_OUTER * 0.98 : pos.x - NODE_OUTER * 0.98;
          const anchorY = pos.y + (item.label === "Tipy" || item.label === "Triky" || item.label === "Příklady" ? -NODE_OUTER * 0.55 : NODE_OUTER * 0.55);
          const midX = item.calloutAnchor === "start" ? anchorX + 34 : anchorX - 34;
          const endX = item.calloutAnchor === "start" ? item.calloutX - 18 : item.calloutX + 18;
          return (
            <g key={`callout-${item.key}`}>
              <path className={styles.calloutLine} d={`M ${anchorX} ${anchorY} L ${midX} ${anchorY} L ${endX} ${item.calloutY - 4}`} />
              <circle className={styles.calloutDot} cx={item.calloutAnchor === "start" ? item.calloutX - 10 : item.calloutX + 10} cy={item.calloutY - 3} r="3.6" />
              <text className={styles.calloutText} x={item.calloutX} y={item.calloutY} textAnchor={item.calloutAnchor}>
                {item.calloutLines.map((line, i) => <tspan key={line} x={item.calloutX} dy={i === 0 ? 0 : 16}>{line}</tspan>)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
