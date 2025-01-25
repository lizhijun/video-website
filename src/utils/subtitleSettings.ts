export interface SubtitleSettings {
  fontSize: number;
  backgroundColor: string;
  textColor: string;
  position: 'bottom' | 'top';
  delay: number;
}

export const defaultSubtitleSettings: SubtitleSettings = {
  fontSize: 16,
  backgroundColor: 'rgba(0,0,0,0.5)',
  textColor: '#ffffff',
  position: 'bottom',
  delay: 0,
}; 