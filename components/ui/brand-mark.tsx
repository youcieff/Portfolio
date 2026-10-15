type BrandMarkProps = {
  className?: string;
  size?: number;
};

export function BrandMark({ className, size = 40 }: BrandMarkProps) {
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
      <rect
        x="4.5"
        y="4.5"
        width="55"
        height="55"
        rx="18"
        fill="var(--page)"
        stroke="var(--accent)"
        strokeWidth="1.8"
      />
      <path
        d="M16.5 19v-3a3 3 0 0 1 3-3h4.5M40 13h4.5a3 3 0 0 1 3 3v3M16.5 45v3a3 3 0 0 0 3 3H24m23.5-6v3a3 3 0 0 1-3 3H40"
        stroke="var(--accent)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="32"
        y="42"
        fill="var(--ink)"
        fontFamily="var(--font-outfit), sans-serif"
        fontSize="30"
        fontWeight="800"
        letterSpacing="-1.8"
        textAnchor="middle"
      >
        <tspan>Y</tspan>
        <tspan fill="var(--accent)">M</tspan>
      </text>
    </svg>
  );
}
