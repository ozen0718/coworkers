interface IconDeleteProps {
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}

export default function IconDelete({
  width = 24,
  height = 24,
  className = '',
  onClick,
}: IconDeleteProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M18 6L6 18"
        stroke="#CBD5E1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke="#CBD5E1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
