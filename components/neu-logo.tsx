interface NEULogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export function NEULogo({ size = "md", showText = true, className = "" }: NEULogoProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizes[size]} relative flex items-center justify-center`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Shield background with NEU red */}
          <path
            d="M50 5 L90 20 L90 45 Q90 75 50 95 Q10 75 10 45 L10 20 Z"
            fill="#b11226"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          {/* Inner shield */}
          <path d="M50 15 L80 27 L80 45 Q80 68 50 85 Q20 68 20 45 L20 27 Z" fill="#FFFFFF" opacity="0.2" />
          {/* NEU text */}
          <text x="50" y="50" fontSize="28" fontWeight="bold" fill="#FFFFFF" textAnchor="middle" dy=".3em">
            NEU
          </text>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-bold text-foreground">Near East University</span>
          <span className="text-xs text-primary font-semibold">NEU UniGuide</span>
        </div>
      )}
    </div>
  )
}
