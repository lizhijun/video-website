'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-red-600">电影视频网</span>
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md ${
                  pathname === '/' 
                    ? 'text-red-600 font-medium' 
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                首页
              </Link>
              <Link
                href="/library"
                className={`px-3 py-2 rounded-md ${
                  pathname === '/library'
                    ? 'text-red-600 font-medium'
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                电影库
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 