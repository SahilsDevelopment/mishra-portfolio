import { site } from "@/lib/content";

const TUFTS: [number, number][] = [
  [90, 200], [220, 190], [340, 205], [470, 195], [610, 208], [740, 192],
  [880, 203], [1010, 196], [1150, 206], [1270, 193], [1380, 200],
];

const FALLEN_LEAVES: { t: string; fill: string }[] = [
  { t: "translate(60 232) rotate(20) scale(1.2)", fill: "#c2541f" },
  { t: "translate(150 214) rotate(-30)", fill: "#d9742b" },
  { t: "translate(260 240) rotate(70) scale(1.3)", fill: "#e8a13a" },
  { t: "translate(330 222) rotate(-10) scale(.8)", fill: "#8a3b1a" },
  { t: "translate(430 236) rotate(150)", fill: "#d9742b" },
  { t: "translate(520 218) rotate(40) scale(1.2)", fill: "#c2541f" },
  { t: "translate(640 242) rotate(-60)", fill: "#e8a13a" },
  { t: "translate(720 226) rotate(110) scale(.8)", fill: "#a85a2e" },
  { t: "translate(830 238) rotate(10) scale(1.3)", fill: "#c2541f" },
  { t: "translate(930 220) rotate(-45)", fill: "#d9742b" },
  { t: "translate(1040 244) rotate(80) scale(1.2)", fill: "#8a3b1a" },
  { t: "translate(1120 226) rotate(-20) scale(.8)", fill: "#e8a13a" },
  { t: "translate(1220 238) rotate(130)", fill: "#c2541f" },
  { t: "translate(1320 218) rotate(25) scale(1.3)", fill: "#d9742b" },
  { t: "translate(1400 240) rotate(-70)", fill: "#a85a2e" },
];

export function Footer() {
  return (
    <footer>
      <p>
        © {new Date().getFullYear()} {site.name} · {site.footer}
      </p>
      <svg className="ground" viewBox="0 0 1440 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <path d="M0 150 C240 110 460 150 700 128 S1130 100 1440 140 V260 H0Z" style={{ fill: "var(--h1)" }} />
        <path d="M0 185 C260 150 500 190 760 168 S1160 150 1440 178 V260 H0Z" style={{ fill: "var(--h2)" }} />
        <defs>
          <path
            id="tf"
            d="M0 0C-2 -10 -6 -16 -9 -20M0 0C0 -12 1 -18 2 -24M0 0C3 -10 6 -15 10 -18"
            fill="none"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path id="lf" d="M0 0C4 -7 11 -7 16 0C11 7 4 7 0 0Z" />
        </defs>
        <g style={{ stroke: "var(--h3)" }}>
          {TUFTS.map(([x, y]) => (
            <use key={x} href="#tf" x={x} y={y} />
          ))}
        </g>
        <g className="fx-flo" style={{ fill: "var(--accent)" }}>
          <circle cx="222" cy="166" r="3.6" />
          <circle cx="612" cy="184" r="3.6" />
          <circle cx="1012" cy="172" r="3.6" />
          <circle cx="1272" cy="169" r="3.6" />
        </g>
        <path d="M0 225 C300 200 560 232 820 214 S1220 205 1440 222 V260 H0Z" style={{ fill: "var(--h3)" }} />
        <g className="fx-aut">
          <g fill="none" stroke="#7a5a3a" strokeWidth="2" strokeLinecap="round">
            <path d="M222 190C222 176 226 166 234 168" />
            <path d="M612 208C612 194 616 184 624 186" />
            <path d="M1012 196C1012 182 1016 172 1024 174" />
            <path d="M1272 193C1272 179 1276 169 1284 171" />
          </g>
          <g fill="#8a5a3b">
            <circle cx="235" cy="170" r="3.6" />
            <circle cx="625" cy="188" r="3.6" />
            <circle cx="1025" cy="176" r="3.6" />
            <circle cx="1285" cy="173" r="3.6" />
          </g>
          <g fill="#c2541f">
            <circle cx="238" cy="186" r="2" />
            <circle cx="628" cy="204" r="2" />
            <circle cx="1028" cy="192" r="2" />
          </g>
          {FALLEN_LEAVES.map((l) => (
            <use key={l.t} href="#lf" transform={l.t} fill={l.fill} />
          ))}
        </g>
      </svg>
    </footer>
  );
}
