interface IndustrialArrowProps {
  direction?: "right" | "down";
  className?: string;
  strokeWidth?: number;
}

export function IndustrialArrow({
  direction = "right",
  className,
  strokeWidth = 2.5,
}: IndustrialArrowProps) {
  const rotate = direction === "down" ? "rotate(90 30 12)" : undefined;
  return (
    <svg
      viewBox="0 0 60 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      <g transform={rotate}>
        <path
          d="M0 12 L52 12"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="square"
        />
        <path d="M40 2 L52 12 L40 22 Z" fill="currentColor" />
      </g>
    </svg>
  );
}
