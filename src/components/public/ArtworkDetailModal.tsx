import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Mail, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Artwork } from '../../types';

interface ArtworkDetailModalProps {
  artwork: Artwork | null;
  artworksList?: Artwork[];
  onClose: () => void;
  onSelectArtwork?: (artwork: Artwork) => void;
}

export const ArtworkDetailModal: React.FC<ArtworkDetailModalProps> = ({
  artwork,
  artworksList = [],
  onClose,
  onSelectArtwork,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!artwork || artworksList.length <= 1 || !onSelectArtwork) return;
      const currentIndex = artworksList.findIndex((a) => a.id === artwork.id);
      if (e.key === 'ArrowRight' && currentIndex < artworksList.length - 1) {
        onSelectArtwork(artworksList[currentIndex + 1]);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectArtwork(artworksList[currentIndex - 1]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [artwork, artworksList, onClose, onSelectArtwork]);

  if (!artwork) return null;

  const currentIndex = artworksList.findIndex((a) => a.id === artwork.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex !== -1 && currentIndex < artworksList.length - 1;

  const handleInquire = () => {
    onClose();
    navigate(`/contact?subject=${encodeURIComponent(`Inquiry regarding ${artwork.title}`)}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[90vh] bg-[#FFFFFF] rounded-none painting-border shadow-2xl overflow-y-auto flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-[#FFFFFF]/90 rounded-full text-[#1A1A1A] hover:bg-[#E7E7E2] transition-colors border border-[#E7E7E2]"
          aria-label="Close artwork detail"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Artwork Visual Display */}
        <div className="md:w-3/5 bg-[#F5F5F2] flex items-center justify-center p-6 md:p-10 relative select-none">
          <div className="max-w-full max-h-[70vh] flex items-center justify-center">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="max-h-[65vh] max-w-full object-contain shadow-sm border border-[#1A1C19]"
              onError={(e) => {
                // Fallback to external stitch URL if local asset has any loading problem
                (e.target as HTMLImageElement).src =
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuC7iM7JK0r5wwY6o5VOzlU04QMv2fs7Cst_L6pBkVBBY4AZnERn0GLAfd4NnM2wamXIvxQ0sf_OhQHnroIdO5NzgfMTaT-qNAz2VRpZNirilBS2iwiiqPXnKffEULEObEYChR73yIp2ebETxfHfGUADitDhdr6GQigndd5z8besiM7i92vNcq89MIB2yLd-PfPLwvmwKMzF7NgaRngf-r1JXVWKytH1VQYs5HblJegW8jx9og20IYCvI1AMzl0iI1grJQ';
              }}
            />
          </div>

          {/* Prev/Next Overlay Controls */}
          {artworksList.length > 1 && onSelectArtwork && (
            <div className="absolute inset-x-4 bottom-4 flex justify-between pointer-events-none">
              <button
                disabled={!hasPrev}
                onClick={() => hasPrev && onSelectArtwork(artworksList[currentIndex - 1])}
                className={`p-2 rounded-full bg-[#FFFFFF]/90 border border-[#1A1C19] text-[#1A1A1A] pointer-events-auto transition-colors ${
                  hasPrev ? 'hover:bg-[#E8EDE0]' : 'opacity-30 cursor-not-allowed'
                }`}
                title="Previous artwork"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                disabled={!hasNext}
                onClick={() => hasNext && onSelectArtwork(artworksList[currentIndex + 1])}
                className={`p-2 rounded-full bg-[#FFFFFF]/90 border border-[#1A1C19] text-[#1A1A1A] pointer-events-auto transition-colors ${
                  hasNext ? 'hover:bg-[#E8EDE0]' : 'opacity-30 cursor-not-allowed'
                }`}
                title="Next artwork"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Artwork Info & Curation Details */}
        <div className="md:w-2/5 p-6 md:p-10 flex flex-col justify-between bg-[#F9F9F7]">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-[0.15em] font-semibold text-[#737871]">
                  {artwork.category}
                </span>
                {artwork.featured && (
                  <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#6F7F45] bg-[#E8EDE0] px-2.5 py-0.5 rounded font-medium border border-[#8A9A5B]/30">
                    <Sparkles className="w-3 h-3 text-[#8A9A5B]" /> Featured
                  </span>
                )}
              </div>
              <h2 className="font-serif text-3xl text-[#1A1A1A] italic tracking-tight">
                {artwork.title}
              </h2>
              <p className="text-sm text-[#5A5E57] font-medium mt-1">
                {artwork.medium}
                {artwork.year ? `, ${artwork.year}` : ''}
              </p>
            </div>

            {artwork.dimensions && (
              <div className="border-t border-b border-[#E7E7E2] py-3">
                <span className="text-xs text-[#737871] uppercase tracking-wider block">
                  Dimensions
                </span>
                <span className="text-sm font-medium text-[#1A1A1A]">{artwork.dimensions}</span>
              </div>
            )}

            <div>
              <span className="text-xs text-[#737871] uppercase tracking-wider block mb-2 font-medium">
                Artwork Overview
              </span>
              <p className="text-sm leading-relaxed text-[#5A5E57] whitespace-pre-line">
                {artwork.description}
              </p>
            </div>
          </div>

          <div className="pt-8 mt-6 border-t border-[#E7E7E2] flex flex-col gap-3">
            <button
              onClick={handleInquire}
              className="w-full flex items-center justify-center gap-2 bg-[#1A1C19] text-[#FFFFFF] py-3.5 px-6 text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#8A9A5B] transition-colors shadow-xs"
            >
              <Mail className="w-4 h-4" />
              <span>Inquire About This Piece</span>
            </button>
            <button
              onClick={onClose}
              className="w-full py-2.5 text-xs uppercase tracking-[0.15em] text-[#737871] hover:text-[#1A1A1A] transition-colors"
            >
              Return to Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
