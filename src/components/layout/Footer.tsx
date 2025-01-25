export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">关于我们</h3>
            <p className="text-gray-400">
              提供高质量的电影在线观看体验，支持多种观看方式。
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-white">关于我们</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">联系我们</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white">服务条款</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">联系方式</h3>
            <ul className="space-y-2 text-gray-400">
              <li>邮箱：contact@example.com</li>
              <li>电话：+86 123 4567 8900</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 电影视频网. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 