import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-[#F9F9F7]/95 backdrop-blur-md sticky top-0 z-40 w-full border-b border-[#E7E7E2] transition-all duration-300">
      <div className="flex justify-between items-center w-full px-6 md:px-20 py-6 max-w-7xl mx-auto">
        <Link
          to="/"
          className="w-44 md:w-52 text-[#1A1A1A] hover:opacity-75 transition-opacity"
        >
          <Logo className="w-full h-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-xs font-semibold uppercase tracking-[0.15em] transition-colors pb-1 ${
                isActive(link.path)
                  ? 'text-[#1A1A1A] border-b-2 border-[#8A9A5B]'
                  : 'text-[#5A5E57] hover:text-[#8A9A5B]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#1A1A1A] p-2 hover:bg-[#E7E7E2] rounded transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E7E7E2] bg-[#F9F9F7] px-6 py-6 transition-all">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold uppercase tracking-[0.15em] py-1 ${
                  isActive(link.path)
                    ? 'text-[#1A1A1A] border-l-2 border-[#8A9A5B] pl-3'
                    : 'text-[#5A5E57] pl-3 hover:text-[#8A9A5B]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
