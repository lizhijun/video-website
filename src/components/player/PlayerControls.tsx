'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { formatTime } from '@/utils/time';
import { Movie } from '@/types/movie';
import { 
  PlayIcon, 
  PauseIcon, 
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon
} from '@heroicons/react/24/solid';
import SeekPreview from './SeekPreview';

interface PlayerControlsProps {
  show: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isFullscreen: boolean;
  movie: Movie;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleFullscreen: () => void;
  qualityMenu: React.ReactNode;
  subtitleMenu: React.ReactNode;
}

export default function PlayerControls({
  show,
  isPlaying,
  currentTime,
  duration,
  volume,
  isFullscreen,
  movie,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onToggleFullscreen,
  qualityMenu,
  subtitleMenu,
}: PlayerControlsProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [previewTime, setPreviewTime] = useState(0);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const progressRef = useRef<HTMLDivElement>(null);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleProgressHover = (e: React.MouseEvent) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const time = duration * percentage;
    setPreviewTime(time);
    setPreviewPosition({ x: e.clientX, y: rect.top });
  };

  return (
    <div 
      className={`absolute bottom-0 left-0 right-0 gradient-bottom p-4 transition-opacity duration-300 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <SeekPreview
        show={isDragging || show}
        time={previewTime}
        position={previewPosition}
        thumbnailUrl={movie.coverUrl}
      />

      {/* Progress bar */}
      <div 
        ref={progressRef}
        className="relative group/progress mb-4"
        onMouseMove={handleProgressHover}
        onMouseLeave={() => setPreviewTime(0)}
      >
        <div className="h-1 bg-white/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-netflix-red transition-all duration-150"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={(e) => onSeek(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded opacity-0 group-hover/progress:opacity-100 transition-opacity">
          {formatTime(currentTime)}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Play/Pause button */}
          <button
            onClick={onPlayPause}
            className="btn-icon"
          >
            {isPlaying ? (
              <PauseIcon className="w-6 h-6 text-white" />
            ) : (
              <PlayIcon className="w-6 h-6 text-white" />
            )}
          </button>

          {/* Time display */}
          <div className="text-sm text-white">
            <span>{formatTime(currentTime)}</span>
            <span className="mx-1">/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Quality selector */}
          {qualityMenu}

          {/* Volume control */}
          <div 
            className="relative group/volume"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <button
              onClick={() => onVolumeChange(volume === 0 ? 1 : 0)}
              className="btn-icon"
            >
              {volume === 0 ? (
                <SpeakerXMarkIcon className="w-6 h-6 text-white" />
              ) : (
                <SpeakerWaveIcon className="w-6 h-6 text-white" />
              )}
            </button>
            <div 
              className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-8 h-24 bg-black/90 rounded-full p-2 transition-opacity ${
                showVolumeSlider ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={volume}
                onChange={(e) => onVolumeChange(Number(e.target.value))}
                className="w-24 -rotate-90 translate-x-[-50px] translate-y-[50px]"
              />
            </div>
          </div>

          {/* Fullscreen button */}
          <button
            onClick={onToggleFullscreen}
            className="btn-icon"
          >
            {isFullscreen ? (
              <ArrowsPointingInIcon className="w-6 h-6 text-white" />
            ) : (
              <ArrowsPointingOutIcon className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 