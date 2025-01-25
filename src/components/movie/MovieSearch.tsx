import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface MovieSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MovieSearch({ value, onChange }: MovieSearchProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="搜索电影、导演、演员..."
        className="w-full pl-10 pr-4 py-3 bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg border border-transparent focus:border-red-600 focus:ring-1 focus:ring-red-600"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    </div>
  );
} 