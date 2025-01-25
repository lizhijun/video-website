import { mockMovies } from '@/data/mockMovies';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import VideoPlayer from '@/components/player/VideoPlayer';
import PlayerControls from '@/components/player/PlayerControls';

interface WatchPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: WatchPageProps): Promise<Metadata> {
  const movieId = Number(params.slug.split('-').pop());
  const movie = mockMovies.find(m => m.id === movieId);
  
  if (!movie) {
    return {
      title: '视频未找到',
    };
  }

  return {
    title: `正在播放: ${movie.title} | 电影视频网`,
    description: movie.description,
  };
}

export default function WatchPage({ params }: WatchPageProps) {
  const movieId = Number(params.slug.split('-').pop());
  const movie = mockMovies.find(m => m.id === movieId);
  
  if (!movie) {
    notFound();
  }

  return (
    <div className="fixed inset-0 bg-black">
      <VideoPlayer movie={movie} />
    </div>
  );
} 