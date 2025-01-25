import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

interface PlayerHeaderProps {
  title: string;
  show: boolean;
}

export default function PlayerHeader({ title, show }: PlayerHeaderProps) {
  return (
    <div 
      className={`absolute top-16 left-0 right-0 z-40 px-4 py-2 transition-opacity duration-300 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h1 className="text-2xl text-white font-medium">{title}</h1>
    </div>
  );
} 