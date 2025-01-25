import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { VideoSource } from '@/types/movie';

interface QualityMenuProps {
  qualities: { height: number; bitrate: number }[];
  currentQuality: number;
  onQualityChange: (index: number) => void;
}

export default function QualityMenu({ qualities, currentQuality, onQualityChange }: QualityMenuProps) {
  return (
    <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg overflow-hidden">
      {qualities.map((quality, index) => (
        <button
          key={quality.height}
          onClick={() => onQualityChange(index)}
          className={`block w-full px-4 py-2 text-left hover:bg-white/10 transition-colors ${
            currentQuality === index ? 'text-red-500' : 'text-white'
          }`}
        >
          {quality.height}p
        </button>
      ))}
      <button
        onClick={() => onQualityChange(-1)}
        className={`block w-full px-4 py-2 text-left hover:bg-white/10 transition-colors ${
          currentQuality === -1 ? 'text-red-500' : 'text-white'
        }`}
      >
        自动
      </button>
    </div>
  );
} 