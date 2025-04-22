interface IconPlusProps {
  width?: number | string;
  height?: number | string;
  color?: string;
}

export default function IconPlus({
  width = 16,
  height = 16,
  color = "#F8FAFC",
}: IconPlusProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 8H12.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8.25 12.25V3.75"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
