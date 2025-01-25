import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            电影视频网
          </Link>
          <div className="space-x-6">
            <Link href="/movies" className="hover:text-gray-300">
              电影库
            </Link>
            <Link href="/categories" className="hover:text-gray-300">
              分类
            </Link>
            <Link href="/search" className="hover:text-gray-300">
              搜索
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 