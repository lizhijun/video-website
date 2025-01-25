import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          页面未找到
        </h2>
        <p className="text-gray-600 mb-8">
          抱歉，您访问的页面不存在。
        </p>
        <Link
          href="/"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
} 