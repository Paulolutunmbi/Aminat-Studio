import React, { useEffect, useState } from 'react';
import { Hero } from '../components/public/Hero';
import { FeaturedWorks } from '../components/public/FeaturedWorks';
import { AboutPreview } from '../components/public/AboutPreview';
import { InspirationSection } from '../components/public/InspirationSection';
import { NewsletterSection } from '../components/public/NewsletterSection';
import { ArtworkDetailModal } from '../components/public/ArtworkDetailModal';
import { Artwork, NaturePhoto } from '../types';
import { dataService } from '../services/dataService';

export const HomePage: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [photos, setPhotos] = useState<NaturePhoto[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const [artList, photoList] = await Promise.all([
        dataService.getArtworks(),
        dataService.getPhotos(),
      ]);
      setArtworks(artList);
      setPhotos(photoList);
    };
    loadData();
  }, []);

  return (
    <div>
      <Hero
        heroImage1="/images/artwork/paint-with-me.jpg"
        heroImage2="/images/artwork/the-path.jpg"
      />

      <FeaturedWorks
        artworks={artworks}
        onSelectArtwork={(art) => setSelectedArtwork(art)}
      />

      <AboutPreview image="/images/artwork/artists-journey.jpg" />

      <InspirationSection photos={photos} />

      <NewsletterSection />

      <ArtworkDetailModal
        artwork={selectedArtwork}
        artworksList={artworks}
        onClose={() => setSelectedArtwork(null)}
        onSelectArtwork={(art) => setSelectedArtwork(art)}
      />
    </div>
  );
};
