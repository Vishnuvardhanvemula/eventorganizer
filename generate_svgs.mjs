import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const svgDir = path.join(__dirname, 'components', 'svg');

if (!fs.existsSync(svgDir)) {
  fs.mkdirSync(svgDir, { recursive: true });
}

// Flat, White & Gold illustrative theme.
const files = {
  'DJBooth.tsx': `import { motion, Variants } from "framer-motion";
export function DJBooth({ index }: { index: number }) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } }
  };
  return (
    <motion.svg
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-56 h-32"
      viewBox="0 0 200 100"
      fill="none"
    >
      <motion.rect variants={draw} x="10" y="30" width="180" height="70" rx="4" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
      <motion.rect variants={draw} x="0" y="20" width="200" height="10" fill="#C9A84C" opacity="0.8" />
      <motion.rect variants={draw} x="40" y="0" width="30" height="20" rx="2" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
      <motion.rect variants={draw} x="130" y="0" width="30" height="20" rx="2" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
      <motion.circle variants={draw} cx="60" cy="65" r="14" stroke="#C9A84C" strokeWidth="3" fill="none" />
      <motion.circle variants={draw} cx="140" cy="65" r="14" stroke="#C9A84C" strokeWidth="3" fill="none" />
    </motion.svg>
  );
}`,
  'DanceFloor.tsx': `import { motion, Variants } from "framer-motion";
export function DanceFloor({ index }: { index: number }) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } }
  };
  return (
    <motion.svg
      className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[700px] h-40 opacity-80"
      viewBox="0 0 600 150"
      fill="none"
    >
      <motion.path variants={draw} d="M100 0 L500 0 L600 150 L0 150 Z" fill="#FAFAFA" stroke="#C9A84C" strokeWidth="2" />
      <motion.path variants={draw} d="M200 0 L150 150" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
      <motion.path variants={draw} d="M300 0 L300 150" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
      <motion.path variants={draw} d="M400 0 L450 150" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
      <motion.path variants={draw} d="M75 37 L525 37" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
      <motion.path variants={draw} d="M50 75 L550 75" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
      <motion.path variants={draw} d="M25 112 L575 112" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
    </motion.svg>
  );
}`,
  'LightingRig.tsx': `import { motion, Variants } from "framer-motion";
export function LightingRig({ index }: { index: number }) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } }
  };
  return (
    <motion.svg
      className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl h-48"
      viewBox="0 0 800 180"
      fill="none"
    >
      <motion.rect variants={draw} x="0" y="10" width="800" height="20" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
      <motion.path variants={draw} d="M0 10 L800 30 M0 30 L800 10" stroke="#C9A84C" strokeWidth="1.5" />
      {[100, 300, 500, 700].map((x, i) => (
        <g key={i}>
          <motion.rect variants={draw} x={x - 15} y="30" width="30" height="20" stroke="#C9A84C" strokeWidth="2" fill="#FFFFFF" />
          <motion.path variants={draw} d={\`M\${x - 20} 50 L\${x + 20} 50 L\${x + 10} 70 L\${x - 10} 70 Z\`} stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
          <motion.path 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            transition={{ delay: 1.5, duration: 2 }}
            d={\`M\${x - 10} 70 L\${x - 100} 400 L\${x + 100} 400 L\${x + 10} 70 Z\`} 
            fill="#C9A84C" 
          />
        </g>
      ))}
    </motion.svg>
  );
}`,
  'FloralArch.tsx': `import { motion, Variants } from "framer-motion";
export function FloralArch({ index }: { index: number }) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 2, ease: "easeInOut" } }
  };
  return (
    <motion.svg
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-15 w-80 h-96 opacity-90"
      viewBox="0 0 300 300"
      fill="none"
    >
      <motion.path variants={draw} d="M50 300 L50 150 C50 50 250 50 250 150 L250 300" stroke="#C9A84C" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
      <motion.path variants={draw} d="M30 150 Q70 120 70 80 T130 60 Q180 50 210 80 T260 140" stroke="#C9A84C" strokeWidth="2.5" fill="none" opacity="0.6" />
      <motion.circle variants={draw} cx="50" cy="150" r="16" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
      <motion.circle variants={draw} cx="100" cy="90" r="22" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
      <motion.circle variants={draw} cx="150" cy="70" r="28" stroke="#C9A84C" strokeWidth="3" fill="none" />
      <motion.circle variants={draw} cx="200" cy="90" r="18" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
      <motion.circle variants={draw} cx="250" cy="160" r="20" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
    </motion.svg>
  );
}`,
  'LEDScreen.tsx': `import { motion, Variants } from "framer-motion";
export function LEDScreen({ index }: { index: number }) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } }
  };
  return (
    <motion.svg
      className="absolute bottom-24 left-1/2 -translate-x-1/2 z-0 w-[500px] h-[300px]"
      viewBox="0 0 500 250"
      fill="none"
    >
      <motion.rect variants={draw} x="0" y="0" width="500" height="250" stroke="#C9A84C" strokeWidth="3" fill="#FFFFFF" rx="4" />
      <motion.rect variants={draw} x="10" y="10" width="480" height="230" stroke="#C9A84C" strokeWidth="1.5" fill="#FAFAFA" rx="2" />
      <motion.path 
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 0.3, pathLength: 1 }}
        transition={{ delay: 1, duration: 2 }}
        d="M 100 240 Q 250 100 400 240"
        stroke="#C9A84C" strokeWidth="2.5" fill="none"
      />
    </motion.svg>
  );
}`,
  'Podium.tsx': `import { motion, Variants } from "framer-motion";
export function Podium({ index }: { index: number }) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } }
  };
  return (
    <motion.svg
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-25 w-32 h-48"
      viewBox="0 0 100 160"
      fill="none"
    >
      <motion.rect variants={draw} x="10" y="150" width="80" height="10" rx="2" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
      <motion.path variants={draw} d="M20 30 L80 30 L90 150 L10 150 Z" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
      <motion.path variants={draw} d="M10 20 L90 20 L80 30 L20 30 Z" stroke="#C9A84C" strokeWidth="2.5" fill="#FAFAFA" />
      <motion.rect variants={draw} x="45" y="0" width="4" height="20" fill="#C9A84C" />
      <motion.circle variants={draw} cx="47" cy="0" r="4" fill="#C9A84C" />
    </motion.svg>
  );
}`,
  'Lounge.tsx': `import { motion, Variants } from "framer-motion";
export function Lounge({ index }: { index: number }) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } }
  };
  return (
    <motion.svg
      className="absolute bottom-12 right-20 z-20 w-72 h-40"
      viewBox="0 0 250 120"
      fill="none"
    >
      <motion.rect variants={draw} x="20" y="60" width="200" height="40" rx="8" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
      <motion.rect variants={draw} x="10" y="50" width="30" height="70" rx="4" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
      <motion.rect variants={draw} x="200" y="50" width="30" height="70" rx="4" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
      <motion.rect variants={draw} x="100" y="30" width="40" height="30" rx="4" stroke="#C9A84C" strokeWidth="2" fill="#FAFAFA" />
      <motion.rect variants={draw} x="50" y="35" width="40" height="25" rx="4" stroke="#C9A84C" strokeWidth="2" fill="#FAFAFA" />
      <motion.rect variants={draw} x="150" y="35" width="40" height="25" rx="4" stroke="#C9A84C" strokeWidth="2" fill="#FAFAFA" />
      <motion.path variants={draw} d="M100 100 L110 120 M140 100 L130 120" stroke="#C9A84C" strokeWidth="2" />
    </motion.svg>
  );
}`,
  'Balloons.tsx': `import { motion, Variants } from "framer-motion";
export function Balloons({ index }: { index: number }) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 2, ease: "easeInOut" } }
  };
  return (
    <motion.svg
      className="absolute top-20 left-24 z-20 w-56 h-72"
      viewBox="0 0 200 300"
      fill="none"
    >
      <motion.path variants={draw} d="M100 200 C90 230 110 260 100 300" stroke="#C9A84C" strokeWidth="1.5" fill="none" opacity="0.6" />
      <motion.path variants={draw} d="M120 180 C130 220 100 250 100 300" stroke="#C9A84C" strokeWidth="1.5" fill="none" opacity="0.6" />
      <motion.path variants={draw} d="M80 170 C60 210 90 250 100 300" stroke="#C9A84C" strokeWidth="1.5" fill="none" opacity="0.6" />
      <motion.circle variants={draw} cx="100" cy="150" r="50" stroke="#C9A84C" strokeWidth="2.5" fill="#FFFFFF" />
      <motion.circle variants={draw} cx="140" cy="120" r="40" stroke="#C9A84C" strokeWidth="2" fill="#FAFAFA" />
      <motion.circle variants={draw} cx="60" cy="110" r="45" stroke="#C9A84C" strokeWidth="2" fill="#FFFFFF" />
      <motion.circle variants={draw} cx="100" cy="80" r="35" stroke="#C9A84C" strokeWidth="2" fill="#FAFAFA" />
    </motion.svg>
  );
}`,
  'Monogram.tsx': `import { motion, Variants } from "framer-motion";
export function Monogram({ index }: { index: number }) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 0.8, transition: { duration: 2, ease: "easeInOut" } }
  };
  return (
    <motion.svg
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[4] w-80 h-80 pointer-events-none"
      viewBox="0 0 300 300"
      fill="none"
    >
      <motion.circle variants={draw} cx="150" cy="150" r="140" stroke="#C9A84C" strokeWidth="2.5" fill="none" />
      <motion.circle variants={draw} cx="150" cy="150" r="120" stroke="#C9A84C" strokeWidth="1.5" strokeDasharray="5 5" fill="none" />
      <motion.text 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.5, duration: 1 }}
        x="150" y="180" fill="#C9A84C" fontSize="100" fontFamily="serif" textAnchor="middle"
      >
        E
      </motion.text>
    </motion.svg>
  );
}`
};

for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(svgDir, filename), content);
}
console.log("SVGs generated successfully with Flat Warm Gold style, Fixed variants 'show', and increased density.");
