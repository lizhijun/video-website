import Layout from '@/components/layout/Layout';
import MovieLibrary from '@/components/movie/MovieLibrary';
import { mockMovies } from '@/data/mockMovies';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '电影库 | 电影视频网',
  description: '浏览所有电影，按类型、年份、地区等分类查看',
};

export default function LibraryPage() {
  return (
    <Layout>
      <MovieLibrary movies={mockMovies} />
    </Layout>
  );
} 