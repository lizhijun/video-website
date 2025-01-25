'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlayIcon, PlusIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import { Movie } from '@/types/movie';
import VideoPlayer from '../player/VideoPlayer';
import MovieRow from '../home/MovieRow';
import BackButton from '../common/BackButton';
import { mockMovies } from '@/data/mockMovies';

interface MovieDetailProps {
  movie: Movie;
}

export default function MovieDetail({ movie }: MovieDetailProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // 获取相关电影推荐
  const relatedMovies = mockMovies
    .filter(m => 
      m.id !== movie.id && 
      m.genres.some(g => movie.genres.includes(g))
    )
    .slice(0, 20);

  // 获取同导演的其他作品
  const directorMovies = mockMovies
    .filter(m => 
      m.id !== movie.id && 
      m.directors.some(d => movie.directors.includes(d))
    )
    .slice(0, 20);

  if (isPlaying) {
    return (
      <VideoPlayer 
        movie={movie} 
        onClose={() => setIsPlaying(false)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#141414]">
      {/* 返回按钮 */}
      <div className="absolute top-4 left-4 z-10">
        <BackButton />
      </div>

      {/* Hero Section */}
      <div className="relative h-[85vh]">
        {/* 背景图片 */}
        <div className="absolute inset-0">
          <Image
            src={movie.coverUrl || movie.posterUrl}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
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
            <p className="text-gray-300 text-lg mb-8">
              {movie.description}
            </p>

            {/* 按钮组 */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(true)}
                className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                <PlayIcon className="w-6 h-6" />
                <span>立即播放</span>
              </button>
              <button className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-colors">
                <PlusIcon className="w-6 h-6" />
              </button>
              <button className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-colors">
                <HandThumbUpIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 详细信息 */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧信息 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 导演和演员 */}
            <div>
              <h3 className="text-white text-xl font-medium mb-4">演职人员</h3>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="text-gray-500">导演：</span>
                  {movie.directors.join('、')}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-500">主演：</span>
                  {movie.actors.join('、')}
                </p>
              </div>
            </div>

            {/* 类型和地区 */}
            <div>
              <h3 className="text-white text-xl font-medium mb-4">影片信息</h3>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="text-gray-500">类型：</span>
                  {movie.genres.join('、')}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-500">地区：</span>
                  {movie.region}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-500">上映：</span>
                  {movie.year}
                </p>
              </div>
            </div>
          </div>

          {/* 右侧海报 */}
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* 相关推荐 */}
      <div className="space-y-12 pb-12">
        {relatedMovies.length > 0 && (
          <MovieRow title="相关推荐" movies={relatedMovies} />
        )}
        {directorMovies.length > 0 && (
          <MovieRow title={`${movie.directors[0]}的其他作品`} movies={directorMovies} />
        )}
      </div>
    </div>
  );
} 