import { Metadata } from 'next';
import { mockMovies } from '@/data/mockMovies';
import Hero from '@/components/home/Hero';
import MovieRow from '@/components/home/MovieRow';

export const metadata: Metadata = {
  title: '首页 | 电影视频网',
  description: '在线观看高清电影',
};

export default function HomePage() {
  // 获取评分最高的5部电影作为特色展示
  const featuredMovies = [...mockMovies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  // 按类型分组电影
  const moviesByGenre = mockMovies.reduce((acc, movie) => {
    movie.genres.forEach(genre => {
      if (!acc[genre]) {
        acc[genre] = [];
      }
      acc[genre].push(movie);
    });
    return acc;
  }, {} as Record<string, typeof mockMovies>);

  // 获取最新上线的电影
  const latestMovies = [...mockMovies]
    .sort((a, b) => b.id - a.id)
    .slice(0, 20);

  // 获取评分最高的电影
  const topRatedMovies = [...mockMovies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 20);

  return (
    <div className="min-h-screen bg-[#141414]">
      {/* Hero Section */}
      <Hero movies={featuredMovies} />

      {/* Movie Rows */}
      <div className="space-y-12 py-12">
        <MovieRow title="最新上线" movies={latestMovies} />
        <MovieRow title="评分最高" movies={topRatedMovies} />
        {Object.entries(moviesByGenre).map(([genre, movies]) => (
          <MovieRow
            key={genre}
            title={genre}
            movies={movies.slice(0, 20)}
          />
        ))}
      </div>
    </div>
  );
}
