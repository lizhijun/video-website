'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface BackButtonProps {
  className?: string;
}

export default function BackButton({ className = '' }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`flex items-center gap-2 text-white hover:text-white/70 transition-colors ${className}`}
    >
      <ArrowLeftIcon className="w-6 h-6" />
      <span>返回</span>
    </button>
  );
} 