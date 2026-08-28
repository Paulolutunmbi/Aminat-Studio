import React from 'react';
import { Link } from 'react-router-dom';
import { Artwork } from '../../types';

interface FeaturedWorksProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
}

export const FeaturedWorks: React.FC<FeaturedWorksProps> = ({
  artworks,
  onSelectArtwork,
}) => {
  const featured = artworks.filter((a) => a.featured);
  const displayItems = featured.length >= 3 ? featured.slice(0, 3) : artworks.slice(0, 3);

  const item1 = displayItems[0];
  const item2 = displayItems[1];
  const item3 = displayItems[2];

  return (
    <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto border-t border-[#E7E7E2]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.15em] text-[#5A5E57] font-semibold block mb-2">
            Curated Selection
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] italic">
            Featured Works
          </h2>
        </div>
        <Link
          to="/gallery"
          className="text-xs uppercase tracking-[0.15em] text-[#8A9A5B] border-b border-[#8A9A5B] pb-1 hover:text-[#6F7F45] hover:border-[#6F7F45] transition-colors font-semibold"
        >
          View All Artworks
        </Link>
      </div>

      {/* Asymmetric 12-Column Grid matching Stitch Source of Truth */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Artwork 1 (Large, 8-columns) */}
        {item1 && (
          <div
            onClick={() => onSelectArtwork(item1)}
            className="md:col-span-8 group cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectArtwork(item1);
              }
            }}
          >
            <div className="aspect-[4/5] overflow-hidden painting-border mb-4 bg-[#F5F5F2] relative">
              <img
                alt={item1.title}
                src={item1.image}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-end p-4 opacity-0 group-hover:opacity-100">
                <span className="text-xs uppercase tracking-widest bg-[#FFFFFF] text-[#1A1A1A] border border-[#E7E7E2] px-3 py-1 font-medium shadow-xs">
                  View Piece
                </span>
              </div>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] italic group-hover:text-[#8A9A5B] transition-colors">
              {item1.title}
            </h3>
            <p className="text-sm text-[#5A5E57] mt-1 font-sans">
              {item1.medium}
              {item1.year ? `, ${item1.year}` : ''}
            </p>
          </div>
        )}

        {/* Artwork 2 (Medium, Offset 4-columns) */}
        {item2 && (
          <div
            onClick={() => onSelectArtwork(item2)}
            className="md:col-span-4 mt-0 md:mt-48 group cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectArtwork(item2);
              }
            }}
          >
            <div className="aspect-[3/4] overflow-hidden painting-border mb-4 bg-[#F5F5F2] relative">
              <img
                alt={item2.title}
                src={item2.image}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-end p-4 opacity-0 group-hover:opacity-100">
                <span className="text-xs uppercase tracking-widest bg-[#FFFFFF] text-[#1A1A1A] border border-[#E7E7E2] px-3 py-1 font-medium shadow-xs">
                  View Piece
                </span>
              </div>
            </div>
            <h3 className="font-serif text-2xl text-[#1A1A1A] italic group-hover:text-[#8A9A5B] transition-colors">
              {item2.title}
            </h3>
            <p className="text-sm text-[#5A5E57] mt-1 font-sans">
              {item2.medium}
              {item2.year ? `, ${item2.year}` : ''}
            </p>
          </div>
        )}

        {/* Artwork 3 (Wide, Centered 12-columns) */}
        {item3 && (
          <div
            onClick={() => onSelectArtwork(item3)}
            className="md:col-span-12 mt-8 md:mt-12 group cursor-pointer max-w-4xl mx-auto w-full"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectArtwork(item3);
              }
            }}
          >
            <div className="aspect-[16/9] overflow-hidden painting-border mb-4 bg-[#F5F5F2] relative">
              <img
                alt={item3.title}
                src={item3.image}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-end p-4 opacity-0 group-hover:opacity-100">
                <span className="text-xs uppercase tracking-widest bg-[#FFFFFF] text-[#1A1A1A] border border-[#E7E7E2] px-3 py-1 font-medium shadow-xs">
                  View Piece
                </span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] italic group-hover:text-[#8A9A5B] transition-colors">
                {item3.title}
              </h3>
              <p className="text-sm text-[#5A5E57] mt-1 font-sans">
                {item3.medium}
                {item3.year ? `, ${item3.year}` : ''}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
