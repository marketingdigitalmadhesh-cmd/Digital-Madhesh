export function ArchGeometry({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M160 20C215 72 252 135 252 210V296H68V210C68 135 105 72 160 20Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M160 66C198 106 222 154 222 210V296H98V210C98 154 122 106 160 66Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M160 116C182 142 194 174 194 210V296H126V210C126 174 138 142 160 116Z"
        fill="currentColor"
        fillOpacity="0.08"
      />
    </svg>
  );
}

export function GeometricCornerAccent({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 180"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="18" y="18" width="144" height="144" rx="24" stroke="currentColor" strokeWidth="1.5" />
      <rect x="44" y="44" width="92" height="92" rx="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="90" cy="90" r="18" fill="currentColor" fillOpacity="0.16" />
    </svg>
  );
}
