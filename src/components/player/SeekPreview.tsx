'use client';

interface SeekPreviewProps {
  show: boolean;
  time: number;
  position: { x: number; y: number };
  thumbnailUrl?: string;
}

export default function SeekPreview({ show, time, position, thumbnailUrl }: SeekPreviewProps) {
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!show) return null;

  return (
    <div 
      className="absolute z-50 -translate-x-1/2 -translate-y-full pointer-events-none animate-fade-in"
      style={{ left: position.x, top: position.y - 16 }}
    >
      <div className="bg-black/90 rounded-lg overflow-hidden">
        {thumbnailUrl && (
          <div className="relative w-40 h-24">
            <img
              src={thumbnailUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="px-3 py-2 text-center text-sm text-white">
          {formatTime(time)}
        </div>
      </div>
    </div>
  );
} 