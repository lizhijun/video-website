import Layout from '@/components/layout/Layout';
import MovieDetail from '@/components/movie/MovieDetail';
import { mockMovies } from '@/data/mockMovies';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface MoviePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const slugParts = params.slug.split('-');
  const id = parseInt(slugParts[slugParts.length - 1]);
  const movie = mockMovies.find(m => m.id === id);

  if (!movie) {
    return {
      title: '未找到电影 | 电影视频网',
    };
  }

  return {
    title: `${movie.title} - ${movie.originalTitle || ''} | 电影视频网`,
    description: movie.description,
  };
}

export default function MoviePage({ params }: MoviePageProps) {
  const slugParts = params.slug.split('-');
  const id = parseInt(slugParts[slugParts.length - 1]);
  const movie = mockMovies.find(m => m.id === id);

  if (!movie) {
    notFound();
  }

  return (
    <Layout>
      <MovieDetail movie={movie} />
    </Layout>
  );
} 