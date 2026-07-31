/**
 * Logo Lauréat : cocarde de lauréat en 3D (dégradés radiaux + reflets),
 * bleu-blanc-rouge discret, deux rubans et pétales plissés.
 * Les ids de gradients sont préfixés pour éviter les collisions si le SVG
 * apparaît plusieurs fois dans la page.
 */
export function LaureatLogo({ size = 36 }: { size?: number }) {
  const uid = "ll";
  // 12 pétales plissés de la couronne extérieure
  const petals = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        {/* Couronne bleue : lumière en haut à gauche */}
        <radialGradient id={`${uid}-blue`} cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#4A6BD0" />
          <stop offset="55%" stopColor="#2B4CA8" />
          <stop offset="100%" stopColor="#14265E" />
        </radialGradient>
        {/* Anneau blanc légèrement bombé */}
        <radialGradient id={`${uid}-white`} cx="40%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#F2F0E9" />
          <stop offset="100%" stopColor="#D8D5CC" />
        </radialGradient>
        {/* Cœur rouge */}
        <radialGradient id={`${uid}-red`} cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#E0605A" />
          <stop offset="55%" stopColor="#B91C1C" />
          <stop offset="100%" stopColor="#7C1010" />
        </radialGradient>
        {/* Reflet spéculaire */}
        <radialGradient id={`${uid}-gloss`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        {/* Rubans */}
        <linearGradient id={`${uid}-rb`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2B4CA8" />
          <stop offset="100%" stopColor="#172D6B" />
        </linearGradient>
        <linearGradient id={`${uid}-rr`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#CC2B2B" />
          <stop offset="100%" stopColor="#8F1616" />
        </linearGradient>
      </defs>

      {/* Ombre au sol */}
      <ellipse cx="32" cy="60" rx="15" ry="2.8" fill="#2a2440" opacity="0.15" />

      {/* Rubans (queue d'aronde) */}
      <path d="M25 40 L20.5 58 L26 54.5 L29.5 59 L32 42 Z" fill={`url(#${uid}-rb)`} />
      <path d="M39 40 L43.5 58 L38 54.5 L34.5 59 L32 42 Z" fill={`url(#${uid}-rr)`} />

      {/* Pétales plissés de la cocarde */}
      <g>
        {petals.map((a) => (
          <g key={a} transform={`rotate(${a} 32 27)`}>
            <path
              d="M32 27 L27.5 4.5 Q32 1.5 36.5 4.5 Z"
              fill={`url(#${uid}-blue)`}
              stroke="#14265E"
              strokeWidth="0.5"
            />
          </g>
        ))}
      </g>

      {/* Disques concentriques : bleu, blanc, rouge */}
      <circle cx="32" cy="27" r="19" fill={`url(#${uid}-blue)`} />
      <circle cx="32" cy="27" r="13" fill={`url(#${uid}-white)`} />
      <circle cx="32" cy="27" r="7" fill={`url(#${uid}-red)`} />

      {/* Reflets 3D */}
      <ellipse
        cx="26"
        cy="19"
        rx="7.5"
        ry="4.5"
        fill={`url(#${uid}-gloss)`}
        transform="rotate(-30 26 19)"
      />
      <circle cx="30" cy="24.5" r="1.6" fill="#FFFFFF" opacity="0.75" />
    </svg>
  );
}
