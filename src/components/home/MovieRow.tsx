'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Movie } from '@/types/movie';
import MovieCard from '../movie/MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollTo = direction === 'left' 
      ? scrollLeft - clientWidth + 200
      : scrollLeft + clientWidth - 200;

    scrollRef.current.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    });
  };

  return (
    <div className="group/row">
      {/* 标题 */}
      <h2 className="text-xl text-white font-medium mb-4 px-4 sm:px-6 lg:px-8 group-hover/row:text-white/70">
        {title}
      </h2>

      <div className="relative">
        {/* 滚动按钮 */}
        <AnimatePresence>
          {showLeftButton && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('left')}
              className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-black/30 hover:bg-black/60 transition-colors flex items-center justify-center group"
            >
              <ChevronLeftIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showRightButton && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('right')}
              className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-black/30 hover:bg-black/60 transition-colors flex items-center justify-center group"
            >
              <ChevronRightIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* 电影列表 */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-2 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
        >
          {movies.map((movie, index) => (
            <div 
              key={movie.id} 
              className="flex-none w-[200px]"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <MovieCard 
                movie={movie} 
                delay={index}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 