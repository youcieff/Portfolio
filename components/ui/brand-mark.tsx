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
        x="3.5"
        y="3.5"
        width="57"
        height="57"
        rx="18"
        fill="var(--surface)"
        stroke="var(--line)"
      />
      <path
        d="M18 12h-2a4 4 0 0 0-4 4v2M46 12h2a4 4 0 0 1 4 4v2M12 46v2a4 4 0 0 0 4 4h2M46 52h2a4 4 0 0 0 4-4v-2"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <text
        x="23"
        y="39"
        fill="var(--ink)"
        fontFamily="var(--font-outfit), sans-serif"
        fontSize="23"
        fontWeight="800"
        letterSpacing="-1.2"
        textAnchor="middle"
      >
        Y
      </text>
      <text
        x="41"
        y="39"
        fill="var(--accent)"
        fontFamily="var(--font-outfit), sans-serif"
        fontSize="23"
        fontWeight="800"
        letterSpacing="-1.2"
        textAnchor="middle"
      >
        M
      </text>
    </svg>
  );
}
