interface KebabProps {
  width?: number | string;
  height?: number | string;
  color?: string;
}

export default function Kebab({
  width = 24,
  height = 24,
  color = "currentColor",
}: KebabProps) {
  return (
    <svg
      className="cursor-pointer"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="7.5" r="1.5" fill={color} />
      <circle cx="12" cy="12" r="1.5" fill={color} />
      <circle cx="12" cy="16.5" r="1.5" fill={color} />
    </svg>
  );
}
