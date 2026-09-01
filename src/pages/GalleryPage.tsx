import React, { useState, useEffect, useMemo } from 'react';
import { ArtworkCard } from '../components/public/ArtworkCard';
import { ArtworkDetailModal } from '../components/public/ArtworkDetailModal';
import { Artwork } from '../types';
import { dataService } from '../services/dataService';
import { Search } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const list = await dataService.getArtworks();
        setArtworks(list);
      } catch (err: any) {
        setError(err?.message || 'Unable to load artwork collection right now.');
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set<string>();
    artworks.forEach((a) => {
      if (a.category) unique.add(a.category);
    });
    return ['All', ...Array.from(unique)];
  }, [artworks]);

  const filteredArtworks = useMemo(() => {
    return artworks.filter((a) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        a.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        a.medium?.toLowerCase().includes(selectedCategory.toLowerCase());

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        a.title.toLowerCase().includes(query) ||
        a.medium.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [artworks, selectedCategory, searchQuery]);

  return (
    <div className="py-16 md:py-24 px-6 md:px-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-12 md:mb-16">
        <span className="text-xs uppercase tracking-[0.15em] text-[#5A5E57] font-semibold block mb-3">
          Complete Collection
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] italic tracking-tight mb-4">
          Artworks & Studies
        </h1>
        <p className="text-base text-[#5A5E57] leading-relaxed font-sans">
          A visual record of quiet observation, capturing organic geometry, tree canopies, and
          expressive botanical moments.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 mb-12 border-b border-[#E7E7E2]">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1A1C19] text-[#FFFFFF] shadow-xs'
                  : 'bg-[#E8EDE0]/60 text-[#5A5E57] hover:bg-[#E8EDE0] hover:text-[#1A1A1A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737871]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, medium..."
            className="w-full bg-[#FFFFFF] border border-[#E7E7E2] py-2 pl-10 pr-4 text-xs font-sans placeholder-[#737871] text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B] transition-colors"
          />
        </div>
      </div>

      {/* Counter */}
      <div className="text-xs text-[#737871] uppercase tracking-wider mb-8">
        {loading ? 'Loading artworks...' : `Showing ${filteredArtworks.length} ${filteredArtworks.length === 1 ? 'artwork' : 'artworks'}`}
      </div>

      {error && (
        <div className="mb-8 border border-amber-200 bg-amber-50 text-amber-800 text-sm p-4">
          {error}
        </div>
      )}

      {/* Gallery Grid */}
      {loading ? (
        <div className="text-center py-20 text-[#5A5E57]">Loading artwork collection…</div>
      ) : filteredArtworks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {filteredArtworks.map((artwork, idx) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              aspectRatio={idx % 3 === 1 ? 'aspect-[3/4]' : 'aspect-[4/5]'}
              onClick={(art) => setSelectedArtwork(art)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-[#F5F5F2] border border-dashed border-[#E7E7E2] p-8">
          <h3 className="font-serif text-2xl text-[#1A1A1A] italic mb-2">No artworks found</h3>
          <p className="text-sm text-[#5A5E57] mb-6">
            Try adjusting your category filter or search keywords.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 bg-[#1A1C19] text-[#FFFFFF] text-xs uppercase tracking-widest hover:bg-[#8A9A5B] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Lightbox / Detail Modal */}
      <ArtworkDetailModal
        artwork={selectedArtwork}
        artworksList={filteredArtworks}
        onClose={() => setSelectedArtwork(null)}
        onSelectArtwork={(art) => setSelectedArtwork(art)}
      />
    </div>
  );
};
