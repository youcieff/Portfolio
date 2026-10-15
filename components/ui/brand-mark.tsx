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
        x="6"
        y="6"
        width="52"
        height="52"
        rx="16"
        fill="var(--surface)"
        stroke="var(--line)"
      />
      <text
        x="32"
        y="40"
        fill="var(--ink)"
        fontFamily="var(--font-outfit), sans-serif"
        fontSize="31"
        fontWeight="800"
        letterSpacing="-2.2"
        textAnchor="middle"
      >
        YM
      </text>
      <rect x="25" y="47" width="14" height="2" rx="1" fill="var(--accent)" />
    </svg>
  );
}
