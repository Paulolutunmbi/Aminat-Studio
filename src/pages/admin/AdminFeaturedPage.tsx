import React, { useState, useEffect } from 'react';
import { Sparkles, Check, Info, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Artwork } from '../../types';
import { dataService } from '../../services/dataService';

export const AdminFeaturedPage: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const list = await dataService.getArtworks();
    setArtworks(list);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleToggle = async (id: string) => {
    try {
      const current = artworks.find((item) => item.id === id);
      const featuredCount = artworks.filter((item) => item.featured).length;
      const nextValue = !(current?.featured ?? false);
      if (nextValue && featuredCount >= 3) {
        alert('Only 3 artworks can be featured at a time. Please remove one of the current featured artworks before featuring another.');
        return;
      }
      await dataService.toggleFeatured(id);
      await load();
    } catch (error: any) {
      alert(error?.message || 'Unable to update featured artwork status.');
    }
  };

  const featured = artworks.filter((a) => a.featured);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.15em] text-[#737871] font-semibold block mb-1">
            Homepage Curation
          </span>
          <h1 className="font-serif text-3xl italic tracking-tight text-[#1A1A1A]">
            Featured Works
          </h1>
        </div>

        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-[#E7E7E2] bg-[#FFFFFF] text-[#1A1A1A] px-4 py-2 text-xs uppercase tracking-wider font-medium hover:border-[#1A1A1A] hover:bg-[#F9F9F7] flex items-center gap-1.5 self-start sm:self-auto transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Preview on Homepage</span>
        </Link>
      </div>

      {/* Explanatory Guidance Callout */}
      <div className="bg-[#E8EDE0]/40 p-4 border-l-4 border-[#8A9A5B] text-xs text-[#5A5E57] space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-[#1A1A1A]">
          <Info className="w-4 h-4 text-[#8A9A5B]" />
          <span>About Featured Works Curation</span>
        </div>
        <p className="leading-relaxed">
          The homepage features a curated selection of 3 key artworks organized in the signature
          asymmetrical editorial layout (one large feature, one offset study, and one panoramic
          composition). Toggle any artwork below to include or remove it.
        </p>
        <p className="text-[#737871]">
          <em>Note:</em> Removing an artwork from Featured will never delete it from your gallery
          catalog; it will simply not be spotlighted on the home screen.
        </p>
      </div>

      {/* Summary Count Bar */}
      <div className="flex items-center justify-between bg-[#FFFFFF] p-4 border border-[#E7E7E2]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#8A9A5B]" />
          <span className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A]">
            {featured.length} / 3 Featured
          </span>
        </div>
        <span className="text-xs text-[#737871]">
          {featured.length >= 3
            ? 'Optimal 3 pieces selected for the homepage grid.'
            : `Recommended: 3 featured pieces (currently ${featured.length})`}
        </span>
      </div>

      {/* Grid of Artworks with Toggle Switches */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((art) => (
          <div
            key={art.id}
            className={`bg-[#FFFFFF] border transition-all ${
              art.featured
                ? 'border-[#8A9A5B] shadow-xs ring-1 ring-[#8A9A5B]'
                : 'border-[#E7E7E2] hover:border-[#8A9A5B]'
            }`}
          >
            {/* Thumbnail */}
            <div className="aspect-[4/3] bg-[#F5F5F2] overflow-hidden border-b border-[#E7E7E2] relative">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover"
              />
              {art.featured && (
                <div className="absolute top-3 left-3 bg-[#8A9A5B] text-white text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-3 h-3" />
                  <span>Featured</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-serif text-lg italic text-[#1A1A1A] truncate">
                  {art.title}
                </h3>
                <p className="text-xs text-[#737871]">
                  {art.medium} &bull; {art.year || '2024'}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleToggle(art.id)}
                className={`w-full py-2 px-3 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs ${
                  art.featured
                    ? 'bg-[#E8EDE0] text-[#6F7F45] hover:bg-red-50 hover:text-red-700'
                    : 'bg-[#1A1C19] text-[#FFFFFF] hover:bg-[#8A9A5B]'
                }`}
              >
                {art.featured ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Featured (Click to Remove)</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Feature on Homepage</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
