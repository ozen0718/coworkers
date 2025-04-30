interface IconArrowPolygonProps {
  width?: number | string;
  height?: number | string;
  fillColor?: string;
  direction?: 'left' | 'right';
}

export default function IconArrowPolygon({
  width = 24,
  height = 24,
  fillColor = 'white',
  direction = 'left',
}: IconArrowPolygonProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: direction === 'right' ? 'rotate(180deg)' : undefined,
        transformOrigin: 'center',
      }}
    >
      <path
        d="M8.53482 12.7151C8.23473 12.3975 8.23473 11.9008 8.53482 11.5832L13.9941 5.8047C14.5061 5.26275 15.4173 5.6251 15.4173 6.37066V17.9276C15.4173 18.6732 14.5061 19.0355 13.9941 18.4936L8.53482 12.7151Z"
        fill={fillColor}
      />
    </svg>
  );
}
