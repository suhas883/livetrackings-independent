import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { getAffiliateUrl } from '../lib/affiliate';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/logo.svg" alt="LiveTrackings" className="h-8 w-8" />
            <span className="text-xl font-bold text-gray-900">LiveTrackings</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">
              Features
            </a>
            <a href="/blogs.html" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">
              Blogs
            </a>
            <a
              href={getAffiliateUrl('yendo')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-900 transition-colors"
            >
              Get Yendo Card
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-blue-800 font-medium"
              >
                Features
              </a>
              <a
                href="/blogs.html"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-blue-800 font-medium"
              >
                Blogs
              </a>
              <a
                href={getAffiliateUrl('yendo')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 text-white px-4 py-2 rounded-lg font-medium text-center hover:bg-blue-900 transition-colors"
              >
                Get Yendo Card
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
