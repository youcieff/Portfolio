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
        d="M16.5 18v-2a3 3 0 0 1 3-3H24m16 0h4.5a3 3 0 0 1 3 3v2M16.5 48v3a3 3 0 0 0 3 3H24m16 0h4.5a3 3 0 0 0 3-3v-3"
        stroke="var(--accent)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g transform="translate(-1.5 0)">
        <path
          d="M14 20h5l3.5 5.2L26 20h5l-6 10v17h-6V30z"
          fill="var(--ink)"
        />
        <path
          d="M32 47V20h5l5.5 7.5L48 20h5v27h-6V31.5l-4.5 6h-3l-4.5-6V47z"
          fill="var(--accent)"
        />
      </g>
    </svg>
  );
}
