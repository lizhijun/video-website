interface SpeedControlProps {
  currentSpeed: number;
  onSpeedChange: (speed: number) => void;
}

export default function SpeedControl({ currentSpeed, onSpeedChange }: SpeedControlProps) {
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg overflow-hidden">
      {speeds.map(speed => (
        <button
          key={speed}
          onClick={() => onSpeedChange(speed)}
          className={`block w-full px-4 py-2 text-left hover:bg-white/10 transition-colors ${
            currentSpeed === speed ? 'text-netflix-red' : 'text-white'
          }`}
        >
          {speed === 1 ? '正常' : `${speed}x`}
        </button>
      ))}
    </div>
  );
} 