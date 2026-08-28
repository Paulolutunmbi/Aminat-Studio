import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Palette,
  Sparkles,
  Users,
  MessageSquare,
  Plus,
  ArrowRight,
  Clock,
  Eye,
  CheckCircle,
} from 'lucide-react';
import { Artwork, Message, Subscriber } from '../../types';
import { dataService } from '../../services/dataService';

export const AdminOverviewPage: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [artList, subList, msgList] = await Promise.all([
        dataService.getArtworks(),
        dataService.getSubscribers(),
        dataService.getMessages(),
      ]);
      setArtworks(artList);
      setSubscribers(subList);
      setMessages(msgList);
      setLoading(false);
    };
    load();
  }, []);

  const featuredCount = artworks.filter((a) => a.featured).length;
  const unreadMessages = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-10">
      {/* Page Title & Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.15em] text-[#737871] font-semibold block mb-1">
            Overview & Metrics
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] italic tracking-tight">
            Studio Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/artworks?action=add"
            className="bg-[#1A1C19] text-[#FFFFFF] px-4 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-[#8A9A5B] transition-colors flex items-center gap-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Artwork</span>
          </Link>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#E7E7E2] bg-[#FFFFFF] text-[#1A1A1A] px-4 py-2.5 text-xs uppercase tracking-wider font-medium hover:border-[#1A1C19] hover:bg-[#F9F9F7] transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>View Site</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Artworks */}
        <Link
          to="/admin/artworks"
          className="bg-[#FFFFFF] p-6 border border-[#E7E7E2] hover:border-[#8A9A5B] transition-all hover:shadow-xs group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#737871]">
              Total Artworks
            </span>
            <div className="p-2 bg-[#E8EDE0] rounded-xs text-[#1A1C19] group-hover:bg-[#8A9A5B] group-hover:text-white transition-colors">
              <Palette className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl text-[#1A1A1A] italic mb-1">
            {loading ? '-' : artworks.length}
          </div>
          <span className="text-xs text-[#737871] flex items-center gap-1">
            In portfolio catalog <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        {/* Featured Works */}
        <Link
          to="/admin/featured"
          className="bg-[#FFFFFF] p-6 border border-[#E7E7E2] hover:border-[#8A9A5B] transition-all hover:shadow-xs group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#737871]">
              Featured Works
            </span>
            <div className="p-2 bg-[#E8EDE0] rounded-xs text-[#8A9A5B] group-hover:bg-[#8A9A5B] group-hover:text-white transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl text-[#1A1A1A] italic mb-1">
            {loading ? '-' : featuredCount}
          </div>
          <span className="text-xs text-[#737871] flex items-center gap-1">
            Curated on homepage <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        {/* Newsletter Subscribers */}
        <Link
          to="/admin/subscribers"
          className="bg-[#FFFFFF] p-6 border border-[#E7E7E2] hover:border-[#8A9A5B] transition-all hover:shadow-xs group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#737871]">
              Subscribers
            </span>
            <div className="p-2 bg-[#E8EDE0] rounded-xs text-[#1A1C19] group-hover:bg-[#8A9A5B] group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl text-[#1A1A1A] italic mb-1">
            {loading ? '-' : subscribers.length}
          </div>
          <span className="text-xs text-[#737871] flex items-center gap-1">
            Studio Journal readers <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        {/* Contact Inquiries */}
        <Link
          to="/admin/messages"
          className="bg-[#FFFFFF] p-6 border border-[#E7E7E2] hover:border-[#8A9A5B] transition-all hover:shadow-xs group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#737871]">
              Inquiries
            </span>
            <div className="p-2 bg-[#E8EDE0] rounded-xs text-[#1A1C19] group-hover:bg-[#8A9A5B] group-hover:text-white transition-colors">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl text-[#1A1A1A] italic mb-1 flex items-center gap-2">
            <span>{loading ? '-' : messages.length}</span>
            {unreadMessages > 0 && (
              <span className="text-xs font-sans font-semibold bg-[#8A9A5B] text-white px-2 py-0.5 rounded-full not-italic">
                {unreadMessages} new
              </span>
            )}
          </div>
          <span className="text-xs text-[#737871] flex items-center gap-1">
            Studio inquiries <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>

      {/* Two Column Layout: Recent Works & Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Artworks (7 cols) */}
        <div className="lg:col-span-7 bg-[#FFFFFF] p-6 border border-[#E7E7E2]">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E7E7E2]">
            <h2 className="font-serif text-xl italic text-[#1A1A1A]">Recent Artworks</h2>
            <Link
              to="/admin/artworks"
              className="text-xs uppercase tracking-wider text-[#8A9A5B] hover:underline font-semibold"
            >
              Manage All
            </Link>
          </div>

          <div className="divide-y divide-[#E7E7E2]">
            {artworks.slice(0, 4).map((art) => (
              <div key={art.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 bg-[#F5F5F2] border border-[#1A1C19] shrink-0 overflow-hidden">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-[#1A1A1A] truncate">{art.title}</h3>
                    <p className="text-xs text-[#737871] truncate">
                      {art.medium} &bull; {art.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {art.featured ? (
                    <span className="text-[11px] bg-[#E8EDE0] text-[#6F7F45] font-medium px-2 py-0.5 rounded border border-[#8A9A5B]/30">
                      Featured
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#737871]">Gallery</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries (5 cols) */}
        <div className="lg:col-span-5 bg-[#FFFFFF] p-6 border border-[#E7E7E2]">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E7E7E2]">
            <h2 className="font-serif text-xl italic text-[#1A1A1A]">Recent Inquiries</h2>
            <Link
              to="/admin/messages"
              className="text-xs uppercase tracking-wider text-[#8A9A5B] hover:underline font-semibold"
            >
              View Inbox
            </Link>
          </div>

          {messages.length === 0 ? (
            <p className="text-sm text-[#737871] py-6 text-center">No messages received yet.</p>
          ) : (
            <div className="space-y-3">
              {messages.slice(0, 3).map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 border text-xs ${
                    msg.read ? 'bg-[#F9F9F7] border-[#E7E7E2]' : 'bg-[#E8EDE0]/30 border-[#8A9A5B]/40'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-[#1A1A1A]">{msg.name}</span>
                    <span className="text-[10px] text-[#737871] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-[#5A5E57] line-clamp-2 mb-2 leading-relaxed">
                    {msg.message}
                  </p>
                  <div className="flex justify-between items-center text-[11px]">
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-[#8A9A5B] hover:underline font-medium"
                    >
                      Reply to {msg.email}
                    </a>
                    {msg.read && (
                      <span className="text-[#737871] flex items-center gap-1 text-[10px]">
                        <CheckCircle className="w-3 h-3 text-[#8A9A5B]" /> Read
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
