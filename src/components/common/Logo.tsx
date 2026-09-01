interface LogoProps {
  compact?: boolean;
  className?: string;
  light?: boolean;
}

export function Logo({ compact = false, className = '', light = false }: LogoProps) {
  const textColor = light ? '#F5F1EA' : '#1A1A1A';
  const accentColor = '#8A9A5B';
  const softAccent = '#C6D1A6';

  return (
    <svg
      viewBox={compact ? '0 0 110 46' : '0 0 360 80'}
      className={className}
      role="img"
      aria-label="Aminat Studio"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <g transform={compact ? 'translate(0 2)' : 'translate(0 4)'}>
        <rect
          x={compact ? 8 : 0}
          y={compact ? 8 : 10}
          width={compact ? 34 : 48}
          height={compact ? 30 : 46}
          rx={compact ? 8 : 12}
          fill={accentColor}
          opacity={light ? 0.9 : 0.14}
        />

        <path
          d={compact ? 'M18 27C13.5 21.8 13.8 9.5 22 9.2C27 9 30.2 12.1 31.2 15.8C32.4 20 31.4 25 26.5 27.2C25.3 27.7 24.2 28.4 22.9 29.8C21.2 31.5 21.2 34.2 23.2 35.7C26.9 38.7 33.3 34 35.5 28.8' : 'M25 51C18.5 41.6 19 22.4 31 20.7C40 19.5 47 23.9 49.7 31.4C52.6 39.6 49.2 52 37.4 54.5C34.7 55.1 32.1 55.7 29.5 57.6C26.1 59.9 24.6 64.1 28 66.5C36.5 72 49.8 65.9 56 55.3'}
          fill="none"
          stroke={light ? '#F5F1EA' : accentColor}
          strokeWidth={compact ? 2.5 : 3.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d={compact ? 'M19.5 33.5C22 30.5 25.5 29 28.5 29.5C31.7 30 34.2 32.6 34.6 35.6' : 'M27.5 60C32.5 52.3 42.5 48.4 52 49.2C60.6 50 67.5 53.6 71.3 60'}
          fill="none"
          stroke={softAccent}
          strokeWidth={compact ? 2.2 : 2.8}
          strokeLinecap="round"
        />

        <path
          d={compact ? 'M29 14.8H31.5V32.3H29V14.8Z M24 30.5H36.4' : 'M42 25.2H49V52.5H42V25.2ZM35 42.5H56'}
          fill={light ? '#F5F1EA' : textColor}
        />
      </g>

      {!compact && (
        <g transform="translate(72 0)">
          <text
            x="0"
            y="42"
            fill={textColor}
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="32"
            fontStyle="italic"
            fontWeight="600"
          >
            Aminat
          </text>
          <text
            x="170"
            y="42"
            fill={textColor}
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="18"
            fontWeight="700"
            letterSpacing="0.22em"
          >
            STUDIO
          </text>
          <line
            x1="0"
            y1="56"
            x2="280"
            y2="56"
            stroke={accentColor}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
};