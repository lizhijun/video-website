import { SubtitleCue } from '@/types/subtitle';

export function parseVTT(vttContent: string): SubtitleCue[] {
  const lines = vttContent.trim().split('\n');
  const cues: SubtitleCue[] = [];
  let currentCue: Partial<SubtitleCue> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.includes('-->')) {
      const [start, end] = line.split('-->').map(timeString => {
        const [h, m, s] = timeString.trim().split(':');
        const [seconds, ms] = s.split('.');
        return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(seconds) + parseInt(ms) / 1000;
      });
      
      currentCue.startTime = start;
      currentCue.endTime = end;
    } else if (line !== '' && !line.includes('WEBVTT')) {
      currentCue.text = (currentCue.text || '') + line + '\n';
      
      if (lines[i + 1]?.trim() === '') {
        cues.push(currentCue as SubtitleCue);
        currentCue = {};
      }
    }
  }

  return cues;
} 