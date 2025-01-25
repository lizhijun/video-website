'use client';

import { SubtitleSettings } from '@/utils/subtitleSettings';

interface SubtitleSettingsProps {
  settings: SubtitleSettings;
  onSettingsChange: (settings: SubtitleSettings) => void;
}

export default function SubtitleSettings({ settings, onSettingsChange }: SubtitleSettingsProps) {
  return (
    <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg overflow-hidden p-4 w-72">
      <h3 className="text-white font-medium mb-4">字幕设置</h3>
      
      {/* 字体大小 */}
      <div className="mb-4">
        <label className="text-sm text-gray-300 mb-2 block">字体大小</label>
        <input
          type="range"
          min={12}
          max={32}
          value={settings.fontSize}
          onChange={(e) => onSettingsChange({
            ...settings,
            fontSize: Number(e.target.value)
          })}
          className="w-full"
        />
      </div>

      {/* 背景颜色 */}
      <div className="mb-4">
        <label className="text-sm text-gray-300 mb-2 block">背景颜色</label>
        <div className="flex gap-2">
          {['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)'].map(color => (
            <button
              key={color}
              onClick={() => onSettingsChange({
                ...settings,
                backgroundColor: color
              })}
              className={`w-8 h-8 rounded ${
                settings.backgroundColor === color ? 'ring-2 ring-netflix-red' : ''
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* 字幕位置 */}
      <div className="mb-4">
        <label className="text-sm text-gray-300 mb-2 block">字幕位置</label>
        <select
          value={settings.position}
          onChange={(e) => onSettingsChange({
            ...settings,
            position: e.target.value as 'bottom' | 'top'
          })}
          className="w-full bg-transparent text-white border border-gray-600 rounded px-2 py-1"
        >
          <option value="bottom">底部</option>
          <option value="top">顶部</option>
        </select>
      </div>

      {/* 字幕延迟 */}
      <div className="mb-4">
        <label className="text-sm text-gray-300 mb-2 block">字幕延迟 ({settings.delay}ms)</label>
        <input
          type="range"
          min={-5000}
          max={5000}
          step={100}
          value={settings.delay}
          onChange={(e) => onSettingsChange({
            ...settings,
            delay: Number(e.target.value)
          })}
          className="w-full"
        />
      </div>
    </div>
  );
} 