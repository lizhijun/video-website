'use client';

import { useState, useMemo, useEffect } from 'react';
import { Movie } from '@/types/movie';
import MovieList from './MovieList';
import MovieFilter from './MovieFilter';
import MovieSearch from './MovieSearch';
import MovieSort from './MovieSort';
import { FilterOptions } from '@/types/filter';
import MoviePagination from './MoviePagination';
import MovieCard from './MovieCard';

interface MovieLibraryProps {
  movies: Movie[];
}

export default function MovieLibrary({ movies }: MovieLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    genres: [],
    years: [],
    regions: [],
    rating: 0,
  });
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 20;

  // 提取所有可用的筛选选项
  const filterOptions = useMemo(() => {
    const genres = new Set<string>();
    const years = new Set<number>();
    const regions = new Set<string>();

    movies.forEach(movie => {
      movie.genres.forEach(genre => genres.add(genre));
      years.add(movie.year);
      regions.add(movie.region);
    });

    return {
      genres: Array.from(genres).sort(),
      years: Array.from(years).sort((a, b) => b - a),
      regions: Array.from(regions).sort(),
    };
  }, [movies]);

  // 应用筛选、搜索和排序
  const processedMovies = useMemo(() => {
    let result = movies.filter(movie => {
      // 搜索过滤
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchSearch = 
          movie.title.toLowerCase().includes(query) ||
          movie.originalTitle?.toLowerCase().includes(query) ||
          movie.directors.some(d => d.toLowerCase().includes(query)) ||
          movie.actors.some(a => a.toLowerCase().includes(query));
        
        if (!matchSearch) return false;
      }

      // 类型过滤
      if (filters.genres.length > 0) {
        if (!movie.genres.some(g => filters.genres.includes(g))) {
          return false;
        }
      }

      // 年份过滤
      if (filters.years.length > 0) {
        if (!filters.years.includes(movie.year)) {
          return false;
        }
      }

      // 地区过滤
      if (filters.regions.length > 0) {
        if (!filters.regions.includes(movie.region)) {
          return false;
        }
      }

      // 评分过滤
      if (filters.rating > 0) {
        if (movie.rating < filters.rating) {
          return false;
        }
      }

      return true;
    });

    // 应用排序
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'latest':
        default:
          // 假设有上线时间字段，这里暂时用 id 代替
          return b.id - a.id;
      }
    });

    return result;
  }, [movies, searchQuery, filters, sortBy]);

  const paginatedMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    return processedMovies.slice(startIndex, startIndex + moviesPerPage);
  }, [processedMovies, currentPage]);

  const totalPages = Math.ceil(processedMovies.length / moviesPerPage);

  // 当过滤条件改变时，重置页码
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, sortBy]);

  return (
    <div className="min-h-screen bg-[#141414]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 侧边栏筛选 */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-[#1f1f1f] rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">筛选</h2>
              <MovieFilter
                options={filterOptions}
                filters={filters}
                onChange={setFilters}
              />
            </div>
          </div>

          {/* 主内容区 */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <div className="flex-1">
                <MovieSearch
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4">
                <MovieSort
                  currentSort={sortBy}
                  onSort={setSortBy}
                />
              </div>
            </div>

            <div className="mb-6 text-gray-400 text-sm">
              找到 {processedMovies.length} 部电影
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {paginatedMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="mt-12">
                <MoviePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 