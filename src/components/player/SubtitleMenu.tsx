'use client';

import { Subtitle } from '@/types/subtitle';

interface SubtitleMenuProps {
  subtitles: Subtitle[];
  currentSubtitle: string | null;
  onSubtitleChange: (subtitleId: string | null) => void;
}

export default function SubtitleMenu({ 
  subtitles, 
  currentSubtitle, 
  onSubtitleChange 
}: SubtitleMenuProps) {
  return (
    <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg overflow-hidden">
      <button
        onClick={() => onSubtitleChange(null)}
        className={`block w-full px-4 py-2 text-left hover:bg-white/10 transition-colors ${
          currentSubtitle === null ? 'text-netflix-red' : 'text-white'
        }`}
      >
        关闭字幕
      </button>
      {subtitles.map(subtitle => (
        <button
          key={subtitle.id}
          onClick={() => onSubtitleChange(subtitle.id)}
          className={`block w-full px-4 py-2 text-left hover:bg-white/10 transition-colors ${
            currentSubtitle === subtitle.id ? 'text-netflix-red' : 'text-white'
          }`}
        >
          {subtitle.label}
        </button>
      ))}
    </div>
  );
} 