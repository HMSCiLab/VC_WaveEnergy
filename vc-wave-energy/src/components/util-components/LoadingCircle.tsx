function LoadingCircle() {
  return (
    <div className="min-w-screen flex justify-end relative z-10 pt-8 pr-10">
      <div className="relative w-20 h-20">
        <svg  className="-rotate-90 w-20 h-20">
          <circle
            className="animate-draw text-blue-500"
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            r="36"
            cx="40"
            cy="40"
            strokeDasharray="251.2"
            strokeDashoffset="251.2"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-bold text-blue-600">X</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingCircle;
