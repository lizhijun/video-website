'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlayIcon, InformationCircleIcon, SpeakerXMarkIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';
import { Movie } from '@/types/movie';

interface HeroProps {
  movies: Movie[];
}

export default function Hero({ movies }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const movie = movies[currentIndex];

  // 自动轮播
  useEffect(() => {
    if (isPlaying) return; // 如果正在播放预告片，不进行轮播

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [movies.length, isPlaying]);

  // 处理预告片播放结束
  const handleVideoEnded = () => {
    setIsPlaying(false);
    // 继续轮播
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  // 切换静音
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative h-[85vh] bg-black">
      {/* 背景媒体 */}
      <div className="absolute inset-0">
        {isPlaying && movie.trailerUrl ? (
          <video
            ref={videoRef}
            src={movie.trailerUrl}
            className="w-full h-full object-cover"
            autoPlay
            muted={isMuted}
            onEnded={handleVideoEnded}
          />
        ) : (
          <Image
            src={movie.coverUrl || movie.posterUrl}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        )}
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#14141480] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#14141480] to-transparent" />
      </div>

      {/* 内容 */}
      <div className="relative h-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full max-w-2xl">
          {/* 标题 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            {movie.title}
          </h1>

          {/* 原标题 */}
          {movie.originalTitle && (
            <h2 className="text-xl text-gray-300 mb-6">
              {movie.originalTitle}
            </h2>
          )}

          {/* 评分和其他信息 */}
          <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
            <span className="text-red-500 font-medium">{movie.rating.toFixed(1)} 分</span>
            <span>{movie.year}</span>
            <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
          </div>

          {/* 简介 */}
          <p className="text-gray-300 text-lg mb-8 line-clamp-3">
            {movie.description}
          </p>

          {/* 按钮组 */}
          <div className="flex items-center gap-4">
            <Link
              href={`/movie/${movie.slug}-${movie.id}`}
              className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              <PlayIcon className="w-6 h-6" />
              <span>立即播放</span>
            </Link>
            {movie.trailerUrl && (
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm transition-colors"
              >
                {isPlaying ? (
                  <>
                    <InformationCircleIcon className="w-6 h-6" />
                    <span>关闭预告片</span>
                  </>
                ) : (
                  <>
                    <PlayIcon className="w-6 h-6" />
                    <span>播放预告片</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 音量控制 */}
      {isPlaying && movie.trailerUrl && (
        <button
          onClick={toggleMute}
          className="absolute bottom-28 right-4 sm:right-6 lg:right-8 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
        >
          {isMuted ? (
            <SpeakerXMarkIcon className="w-6 h-6 text-white" />
          ) : (
            <SpeakerWaveIcon className="w-6 h-6 text-white" />
          )}
        </button>
      )}

      {/* 指示器 */}
      <div className="absolute bottom-8 right-4 sm:right-6 lg:right-8 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsPlaying(false);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-red-600' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 