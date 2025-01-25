interface ShortcutHintsProps {
  show: boolean;
}

export default function ShortcutHints({ show }: ShortcutHintsProps) {
  const shortcuts = [
    { key: 'Space/K', description: '播放/暂停' },
    { key: 'F', description: '全屏' },
    { key: 'M', description: '静音' },
    { key: '←/→', description: '快退/快进 10 秒' },
    { key: '↑/↓', description: '音量调节' },
    { key: '?', description: '显示/隐藏快捷键' },
  ];

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-black/90 rounded-lg p-6 max-w-lg w-full mx-4">
        <h2 className="text-xl font-medium text-white mb-4">键盘快捷键</h2>
        <div className="grid grid-cols-2 gap-4">
          {shortcuts.map(({ key, description }) => (
            <div key={key} className="flex items-center gap-3">
              <kbd className="px-2 py-1 bg-white/10 rounded text-sm text-white">{key}</kbd>
              <span className="text-gray-300">{description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 