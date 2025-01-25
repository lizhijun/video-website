export interface Subtitle {
  id: string;
  language: string;
  label: string;
  url: string;
}

export interface SubtitleCue {
  startTime: number;
  endTime: number;
  text: string;
} 