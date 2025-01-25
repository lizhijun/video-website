'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayIcon, PlusIcon, HandThumbUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
  delay?: number;
}

export default function MovieCard({ movie, delay = 0 }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isHovered) {
      hoverTimeout.current = setTimeout(() => {
        setShowPreview(true);
      }, 500);
    } else {
      clearTimeout(hoverTimeout.current);
      setShowPreview(false);
    }

    return () => clearTimeout(hoverTimeout.current);
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 基础卡片 */}
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-[#2f2f2f]">
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
        />
      </div>

      {/* 预览卡片 */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 right-0 z-50 w-[300%] bg-[#181818] rounded-lg shadow-2xl origin-top-left"
            style={{ 
              transform: `translateX(${-50}%)`,
              display: showPreview ? 'block' : 'none'
            }}
          >
            {/* 预览图 */}
            <div className="relative aspect-video rounded-t-lg overflow-hidden">
              {movie.trailerUrl ? (
                <video
                  src={movie.trailerUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                />
              ) : (
                <Image
                  src={movie.coverUrl || movie.posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* 内容 */}
            <div className="p-4">
              {/* 按钮组 */}
              <div className="flex items-center gap-2 mb-4">
                <Link
                  href={`/movie/${movie.slug}-${movie.id}`}
                  className="w-10 h-10 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <PlayIcon className="w-5 h-5 text-black" />
                </Link>
                <button className="w-10 h-10 rounded-full border-2 border-gray-400 hover:border-white flex items-center justify-center transition-colors">
                  <PlusIcon className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 rounded-full border-2 border-gray-400 hover:border-white flex items-center justify-center transition-colors">
                  <HandThumbUpIcon className="w-5 h-5 text-white" />
                </button>
                <Link
                  href={`/movie/${movie.slug}-${movie.id}`}
                  className="w-10 h-10 rounded-full border-2 border-gray-400 hover:border-white flex items-center justify-center transition-colors ml-auto"
                >
                  <ChevronDownIcon className="w-5 h-5 text-white" />
                </Link>
              </div>

              {/* 信息 */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-medium">
                    推荐指数 {Math.round(movie.rating * 10)}%
                  </span>
                  <span className="text-gray-400">{movie.year}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map(genre => (
                    <span 
                      key={genre}
                      className="text-sm text-gray-300"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 