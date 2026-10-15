type BrandMarkProps = {
  className?: string;
  size?: number;
};

export function BrandMark({ className, size = 40 }: BrandMarkProps) {
  const gradientId = `brand-mark-gradient-${size}`;

  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-secondary)" />
        </linearGradient>
      </defs>
      <rect
        x="4.5"
        y="4.5"
        width="55"
        height="55"
        rx="18"
        fill="var(--page)"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.8"
      />
      <path
        d="M16.5 19v-3a3 3 0 0 1 3-3h4.5M40 13h4.5a3 3 0 0 1 3 3v3M16.5 45v3a3 3 0 0 0 3 3H24m23.5-6v3a3 3 0 0 1-3 3H40"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g transform="translate(-1.5 0)">
        <text
          x="20.5"
          y="42"
          fill="var(--ink)"
          fontFamily="var(--font-outfit), sans-serif"
          fontSize="31"
          fontWeight="800"
          letterSpacing="-2.6"
          textAnchor="middle"
        >
          Y
        </text>
        <text
          x="42.5"
          y="42"
          fill={`url(#${gradientId})`}
          fontFamily="var(--font-outfit), sans-serif"
          fontSize="31"
          fontWeight="800"
          letterSpacing="-2.6"
          textAnchor="middle"
        >
          M
        </text>
      </g>
    </svg>
  );
}
