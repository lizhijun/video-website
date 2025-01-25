'use client';

import { useEffect, useState } from 'react';
import { SubtitleCue } from '@/types/subtitle';
import { SubtitleSettings, defaultSubtitleSettings } from '@/utils/subtitleSettings';

interface SubtitleDisplayProps {
  cues: SubtitleCue[];
  currentTime: number;
  show: boolean;
  settings?: Partial<SubtitleSettings>;
}

export default function SubtitleDisplay({ 
  cues, 
  currentTime, 
  show,
  settings = defaultSubtitleSettings
}: SubtitleDisplayProps) {
  const [currentCue, setCurrentCue] = useState<SubtitleCue | null>(null);
  const mergedSettings = { ...defaultSubtitleSettings, ...settings };

  useEffect(() => {
    const adjustedTime = currentTime + (mergedSettings.delay / 1000);
    const cue = cues.find(
      cue => adjustedTime >= cue.startTime && adjustedTime <= cue.endTime
    ) || null;
    setCurrentCue(cue);
  }, [cues, currentTime, mergedSettings.delay]);

  if (!show || !currentCue) return null;

  return (
    <div 
      className={`absolute ${
        mergedSettings.position === 'bottom' ? 'bottom-20' : 'top-20'
      } left-1/2 -translate-x-1/2 text-center transition-all duration-200`}
    >
      <div 
        className="inline-block px-4 py-2 rounded-lg backdrop-blur-sm"
        style={{ 
          backgroundColor: mergedSettings.backgroundColor,
          fontSize: mergedSettings.fontSize,
        }}
      >
        <p 
          className="text-white font-medium drop-shadow-lg whitespace-pre-line"
          style={{ color: mergedSettings.textColor }}
        >
          {currentCue.text}
        </p>
      </div>
    </div>
  );
} 