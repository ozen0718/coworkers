interface IconCheckProps {
  width?: number | string;
  height?: number | string;
  color?: string;
}

export default function IconCheck({
  width = 16,
  height = 16,
  color = "currentColor",
}: IconCheckProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 7.14286L6.90909 10L12 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
