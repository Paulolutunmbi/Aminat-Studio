import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F0EFEA] border-t border-[#E7E7E2] py-20 px-6 md:px-20 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div>
          <span className="font-serif text-2xl italic block mb-4 text-[#1A1A1A]">
            Aminat Studio
          </span>
          <p className="text-sm leading-relaxed text-[#5A5E57] max-w-sm">
            An emerging, self-taught artist inspired by nature, exploring the world through acrylics,
            watercolours, and mixed media.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.15em] text-[#5A5E57] font-semibold">
            Connect
          </span>
          <div className="flex flex-wrap gap-6 text-sm text-[#1A1A1A]">
            <a
              href="mailto:aminatstudio.art@gmail.com"
              className="hover:text-[#8A9A5B] hover:underline transition-colors"
            >
              Email
            </a>
            <a
              href="https://www.youtube.com/@AminatStudio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8A9A5B] hover:underline transition-colors"
            >
              YouTube
            </a>
            <a
              href="https://www.tiktok.com/@aminatstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8A9A5B] hover:underline transition-colors"
            >
              TikTok
            </a>
            <Link
              to="/admin"
              className="text-[#737871] hover:text-[#8A9A5B] hover:underline text-xs self-center transition-colors"
            >
              Portal Login
            </Link>
          </div>
        </div>

        <div className="text-xs text-[#8C9188]">
          &copy; {new Date().getFullYear()} Aminat Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
