import { Subtitle } from '@/types/subtitle';

interface SubtitleDetectionResult {
  subtitles: Subtitle[];
  defaultSubtitle?: string;
}

export async function detectSubtitles(movieId: number): Promise<SubtitleDetectionResult> {
  // 这里可以替换为实际的 API 调用
  const subtitles: Subtitle[] = [
    {
      id: 'zh',
      language: 'zh',
      label: '中文',
      url: `/api/subtitles/${movieId}/zh.vtt`,
    },
    {
      id: 'en',
      language: 'en',
      label: 'English',
      url: `/api/subtitles/${movieId}/en.vtt`,
    },
  ];

  // 获取用户首选语言
  const userLanguage = navigator.language.split('-')[0];
  const defaultSubtitle = subtitles.find(s => s.language === userLanguage)?.id || subtitles[0]?.id;

  return { subtitles, defaultSubtitle };
}

export function getUserPreferredSubtitle(): string | null {
  return localStorage.getItem('preferred-subtitle') || navigator.language.split('-')[0];
}

export function saveUserPreferredSubtitle(subtitleId: string | null): void {
  if (subtitleId) {
    localStorage.setItem('preferred-subtitle', subtitleId);
  } else {
    localStorage.removeItem('preferred-subtitle');
  }
} 