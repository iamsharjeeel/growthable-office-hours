export function WireframeMesh() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute -left-[18%] top-[-8%] h-[120%] w-[78%] mesh-glow">
        <svg
          className="h-full w-full"
          viewBox="0 0 800 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="meshStroke" x1="0" y1="0" x2="800" y2="900" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f23e67" stopOpacity="0.85" />
              <stop offset="0.45" stopColor="#e8406a" stopOpacity="0.45" />
              <stop offset="1" stopColor="#7b2cff" stopOpacity="0.15" />
            </linearGradient>
            <radialGradient id="meshFade" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(220 380) rotate(90) scale(520 420)">
              <stop stopColor="white" stopOpacity="1" />
              <stop offset="0.7" stopColor="white" stopOpacity="0.35" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <mask id="meshMask">
              <rect width="800" height="900" fill="url(#meshFade)" />
            </mask>
          </defs>
          <g mask="url(#meshMask)" filter="url(#softGlow)" stroke="url(#meshStroke)" strokeWidth="1.15">
            {Array.from({ length: 14 }).map((_, i) => {
              const y = 40 + i * 58;
              return (
                <path
                  key={`h-${i}`}
                  d={`M-40 ${y} C 120 ${y - 70 + (i % 3) * 18}, 280 ${y + 80 - (i % 4) * 16}, 420 ${y - 20}, 560 ${y - 90}, 700 ${y + 40}, 860 ${y - 10}`}
                  opacity={0.35 + (i % 5) * 0.08}
                />
              );
            })}
            {Array.from({ length: 12 }).map((_, i) => {
              const x = 20 + i * 62;
              return (
                <path
                  key={`v-${i}`}
                  d={`M${x} -20 C ${x + 70 - (i % 3) * 20} 160, ${x - 50} 320, ${x + 30} 480, ${x - 40} 640, ${x + 60} 780, ${x} 940`}
                  opacity={0.28 + (i % 4) * 0.07}
                />
              );
            })}
          </g>
        </svg>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(232,64,106,0.16),transparent_55%),radial-gradient(ellipse_at_80%_0%,rgba(120,60,255,0.08),transparent_45%),linear-gradient(180deg,rgba(15,24,41,0.15)_0%,rgba(21,32,57,0.55)_70%,rgba(21,32,57,0.95)_100%)]" />
    </div>
  );
}
