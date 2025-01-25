import { Subtitle } from './subtitle';

export interface VideoSource {
  quality: '4K' | '1080p' | '720p' | '480p';
  url: string;
  label: string;
  bitrate: number; // kbps
}

export interface Movie {
  id: number;
  slug: string;
  title: string;
  originalTitle?: string;
  year: number;
  description: string;
  posterUrl: string;
  rating: number;
  duration: number;
  directors: string[];
  actors: string[];
  genres: string[];
  region: string;
  videoSources: VideoSource[];
  coverUrl?: string;
  trailerUrl?: string;
  subtitles: Subtitle[];
} 