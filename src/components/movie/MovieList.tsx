import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';

interface MovieListProps {
  title?: string;
  movies: Movie[];
}

export default function MovieList({ title, movies }: MovieListProps) {
  return (
    <section className="py-8">
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
} 