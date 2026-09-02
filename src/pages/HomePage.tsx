import React, { useEffect, useState } from 'react';
import { Hero } from '../components/public/Hero';
import { FeaturedWorks } from '../components/public/FeaturedWorks';
import { AboutPreview } from '../components/public/AboutPreview';
import { InspirationSection } from '../components/public/InspirationSection';
// import { NewsletterSection } from '../components/public/NewsletterSection';
import { ArtworkDetailModal } from '../components/public/ArtworkDetailModal';
import { Artwork, NaturePhoto } from '../types';
import { dataService } from '../services/dataService';

export const HomePage: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [photos, setPhotos] = useState<NaturePhoto[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [artList, photoList] = await Promise.all([
          dataService.getArtworks(),
          dataService.getPhotos(),
        ]);
        setArtworks(artList);
        setPhotos(photoList);
      } catch (err: any) {
        setError(err?.message || 'The featured artwork collection is currently unavailable.');
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div>
      {error && (
        <div className="mx-6 md:mx-20 mt-6 border border-amber-200 bg-amber-50 text-amber-800 text-sm p-4">
          {error}
        </div>
      )}

      <Hero
        heroImage1="/images/artwork/paint-with-me.jpg"
        heroImage2="/images/artwork/the-path.jpg"
      />

      {loading ? (
        <div className="py-12 text-center text-[#5A5E57]">Loading featured works…</div>
      ) : (
        <FeaturedWorks
          artworks={artworks}
          onSelectArtwork={(art) => setSelectedArtwork(art)}
        />
      )}

      <AboutPreview image="/images/artwork/artists-journey.jpg" />

      <InspirationSection photos={photos} />

      {/*
        TODO: Re-enable newsletter signup once production email/domain
        configuration is verified and newsletter delivery is ready.
      */}

      <ArtworkDetailModal
        artwork={selectedArtwork}
        artworksList={artworks}
        onClose={() => setSelectedArtwork(null)}
        onSelectArtwork={(art) => setSelectedArtwork(art)}
      />
    </div>
  );
};
