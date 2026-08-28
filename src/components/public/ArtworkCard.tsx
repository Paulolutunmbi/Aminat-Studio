import React from 'react';
import { Artwork } from '../../types';

interface ArtworkCardProps {
  artwork: Artwork;
  aspectRatio?: string;
  onClick: (artwork: Artwork) => void;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  aspectRatio = 'aspect-[4/5]',
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(artwork)}
      className="group cursor-pointer transition-all duration-300"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(artwork);
        }
      }}
      aria-label={`View artwork: ${artwork.title}`}
    >
      <div className={`${aspectRatio} overflow-hidden painting-border mb-4 bg-[#F5F5F2] relative`}>
        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100">
          <span className="text-[11px] uppercase tracking-widest bg-[#FFFFFF] text-[#1A1A1A] border border-[#E7E7E2] px-3 py-1 font-medium shadow-xs">
            View Details
          </span>
        </div>
      </div>
      <h3 className="font-serif text-2xl text-[#1A1A1A] italic tracking-tight group-hover:text-[#8A9A5B] transition-colors">
        {artwork.title}
      </h3>
      <p className="text-sm text-[#5A5E57] mt-1 font-sans">
        {artwork.medium}
        {artwork.year ? `, ${artwork.year}` : ''}
      </p>
    </div>
  );
};
