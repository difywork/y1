import styles from "./PackageOrbit.module.css";

/**
 * Editable data for the six orbit nodes.
 * Change label, gradient id, icon, or coordinates here.
 */
const nodes = [
  { label: "Tipy", x: 500, y: 172, gradient: "nodeTipy", icon: "list" },
  { label: "Triky", x: 784, y: 336, gradient: "nodeTriky", icon: "magic" },
  { label: "Metody", x: 784, y: 664, gradient: "nodeMetody", icon: "target" },
  { label: "Návody", x: 500, y: 828, gradient: "nodeNavody", icon: "book" },
  { label: "Prompty", x: 216, y: 664, gradient: "nodePrompty", icon: "chat" },
  { label: "Příklady", x: 216, y: 336, gradient: "nodePriklady", icon: "file" },
];

const arrows = [
  "M500 225 L500 350",
  "M738 363 L630 425",
  "M738 637 L630 575",
  "M500 775 L500 650",
  "M262 637 L370 575",
  "M262 363 L370 425",
];

function Icon({ type }) {
  switch (type) {
    case "magic":
      return <path d="M-22 18 C-6 2 8 -12 24 -28 M16 -30 l10 -10 M12 -40 l14 14 M-22 -16 l-12 -8 M-18 -28 l-6 -12 M26 6 l14 6" />;
    case "target":
      return <><circle cx="0" cy="-12" r="30" /><circle cx="0" cy="-12" r="14" /><path d="M14 -26 L34 -46" /></>;
    case "book":
      return <><path d="M-34 -38 h26 a8 8 0 0 1 8 8 v48 a8 8 0 0 0 -8 -8 h-26 z" /><path d="M0 -30 a8 8 0 0 1 8 -8 h26 v48 h-26 a8 8 0 0 0 -8 8 z" /></>;
    case "chat":
      return <><path d="M-36 -22 a32 26 0 0 1 64 0 a32 26 0 0 1 -32 26 h-14 l-18 16 5 -21 a26 26 0 0 1 -5 -21 z" /><path d="M-14 -21 h.1 M0 -21 h.1 M14 -21 h.1" /></>;
    case "file":
      return <><path d="M-22 -42 h34 l22 22 v62 h-56 z" /><path d="M12 -42 v22 h22" /><path d="M-10 0 h26 M-10 18 h26" /></>;
    default:
      return <><path d="M-18 -28 h36 M-12 -15 h24 M-18 -2 h36 M-10 15 h20" /></>;
  }
}

export default function PackageOrbit({
  title = "BALÍČKY",
  subtitle = "SOUČÁSTI",
  items = nodes,
}) {
  return (
    <div className={styles.component} aria-label="Vizuální diagram obsahu balíčků">
      <svg className={styles.svg} viewBox="0 0 1000 1000" role="img" aria-labelledby="packageOrbitTitle packageOrbitDesc">
        <title id="packageOrbitTitle">Balíčky a jejich součásti</title>
        <desc id="packageOrbitDesc">Kruhový diagram se šesti součástmi balíčku.</desc>

        <defs>
          <linearGradient id="orbitRingGradient" x1="110" y1="190" x2="890" y2="810" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#9D7BFF" />
            <stop offset=".26" stopColor="#6E88F7" />
            <stop offset=".52" stopColor="#50C8D3" />
            <stop offset=".76" stopColor="#7A74F0" />
            <stop offset="1" stopColor="#C385D8" />
          </linearGradient>
          {[
            ["nodeTipy", "#B996FF", "#6F6FEA"],
            ["nodeTriky", "#78A5FF", "#5B70E8"],
            ["nodeMetody", "#6FC3F5", "#5A7BD8"],
            ["nodeNavody", "#6FD6DC", "#4F94D6"],
            ["nodePrompty", "#987FFF", "#7767D8"],
            ["nodePriklady", "#C894D8", "#8B79D7"],
          ].map(([id, from, to]) => (
            <linearGradient key={id} id={id} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={from} />
              <stop offset="1" stopColor={to} />
            </linearGradient>
          ))}
          <radialGradient id="orbitCenterFill" cx="50%" cy="38%" r="70%">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity=".92" />
            <stop offset=".65" stopColor="#F3F7FF" stopOpacity=".86" />
            <stop offset="1" stopColor="#DDE7F7" stopOpacity=".94" />
          </radialGradient>
          <radialGradient id="orbitGloss" cx="38%" cy="28%" r="70%">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity=".45" />
            <stop offset=".48" stopColor="#FFFFFF" stopOpacity=".12" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <filter id="orbitSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#566391" floodOpacity=".13" />
          </filter>
          <filter id="orbitNodeShadow" x="-35%" y="-35%" width="170%" height="170%">
            <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#50608E" floodOpacity=".20" />
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#FFFFFF" floodOpacity=".45" />
          </filter>
          <filter id="orbitCenterShadow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="18" stdDeviation="20" floodColor="#4E5B85" floodOpacity=".14" />
          </filter>
          <filter id="orbitArrowGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#8C9CFF" floodOpacity=".20" />
          </filter>
          <marker id="orbitArrowHead" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto" markerUnits="strokeWidth">
            <path d="M2 2 L10 6 L2 10 Z" fill="rgba(84, 103, 156, .44)" />
          </marker>
        </defs>

        <circle className={styles.ringBase} cx="500" cy="500" r="318" />
        <circle className={styles.ringGradient} cx="500" cy="500" r="318" />
        <circle className={styles.ringHairline} cx="500" cy="500" r="228" />

        {arrows.map((d) => (
          <path key={d} className={styles.arrow} d={d} markerEnd="url(#orbitArrowHead)" />
        ))}

        <circle className={styles.centerDisc} cx="500" cy="500" r="152" />
        <circle className={styles.centerRing} cx="500" cy="500" r="124" />
        <text className={styles.centerTitle} x="500" y="486" textAnchor="middle">{title}</text>
        <text className={styles.centerSubtitle} x="500" y="532" textAnchor="middle">{subtitle}</text>

        {items.map((item) => (
          <g key={item.label} transform={`translate(${item.x} ${item.y})`}>
            <circle className={styles.nodeRim} r="112" />
            <circle className={styles.nodeInner} r="88" fill={`url(#${item.gradient})`} />
            <circle className={styles.nodeGloss} r="88" />
            <g className={styles.nodeIcon}><Icon type={item.icon} /></g>
            <text className={styles.nodeText} y="46">{item.label}</text>
            <path className={styles.nodeAccent} d="M-24 69 H24" />
          </g>
        ))}
      </svg>
    </div>
  );
}
