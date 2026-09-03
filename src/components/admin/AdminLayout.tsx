import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Palette,
  Sparkles,
  Users,
  MessageSquare,
  Settings,
  KeyRound,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Brush,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, username } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Artwork Management', path: '/admin/artworks', icon: Palette },
    { label: 'Featured Works', path: '/admin/featured', icon: Sparkles },
    { label: 'Subscribers', path: '/admin/subscribers', icon: Users },
    { label: 'Messages', path: '/admin/messages', icon: MessageSquare },
    { label: 'Studio Settings', path: '/admin/settings', icon: Settings },
    { label: 'Change Password', path: '/admin/change-password', icon: KeyRound },
  ];

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] flex flex-col md:flex-row text-[#1A1A1A]">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#1A1C19] border-b border-[#2A2C29] px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Brush className="w-5 h-5 text-[#8A9A5B]" />
          <span className="font-serif text-lg italic text-[#FFFFFF]">Aminat Studio Admin</span>
        </div>
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 text-[#E5E7EB] hover:bg-[#2A2C29] rounded"
          aria-label="Toggle navigation"
        >
          {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation (Desktop & Mobile Drawer) */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-[#1A1C19] border-r border-[#2A2C29] flex flex-col justify-between p-6 transition-transform duration-300 ${
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-8">
          {/* Logo & Portal title */}
          <div>
            <Link
              to="/admin"
              className="font-serif text-2xl italic tracking-tight text-[#FFFFFF] block hover:text-[#8A9A5B] transition-colors"
            >
              Aminat Studio
            </Link>
            <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#8A9A5B] block mt-1">
              Artist Workspace
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors rounded-none ${
                    active
                      ? 'bg-[#8A9A5B] text-[#FFFFFF]'
                      : 'text-[#A1A79F] hover:bg-[#2A2C29] hover:text-[#FFFFFF]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#FFFFFF]' : 'text-[#8A9A5B]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile & Actions */}
        <div className="pt-6 border-t border-[#2A2C29] space-y-3">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between text-xs text-[#8A9A5B] hover:text-[#A6B676] hover:underline font-medium px-2 py-1 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" />
              View Live Website
            </span>
            <span className="text-[10px] uppercase text-[#737871]">Tab ↗</span>
          </Link>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#2A2C29] border border-[#8A9A5B] flex items-center justify-center font-serif italic text-xs text-[#FFFFFF]">
                A
              </div>
              <span className="text-xs font-medium text-[#E5E7EB] capitalize">
                {username || 'Aminat'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-[#A1A79F] hover:text-red-400 p-1.5 rounded hover:bg-[#2A2C29] transition-colors"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Top Header Bar */}
        <header className="hidden md:flex bg-[#FFFFFF] border-b border-[#E7E7E2] px-8 py-4 justify-between items-center sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-[#737871]">
            <Link to="/admin" className="hover:text-[#1A1A1A]">
              Admin
            </Link>
            <span>/</span>
            <span className="text-[#1A1A1A] uppercase tracking-wider font-semibold">
              {navItems.find((n) => isActive(n))?.label || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-xs uppercase tracking-wider font-medium text-[#1A1A1A] hover:text-[#8A9A5B] flex items-center gap-1.5 px-3.5 py-1.5 border border-[#E7E7E2] hover:border-[#1A1A1A] hover:bg-[#F9F9F7] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Gallery</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Nested Route Content */}
        <main className="flex-1 p-6 md:p-10 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
