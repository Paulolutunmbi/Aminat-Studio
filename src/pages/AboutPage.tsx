import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dataService } from '../services/dataService';

export const AboutPage: React.FC = () => {
  const [settings, setSettings] = useState({
    studioName: 'Aminat Studio',
    artistName: 'Aminat',
    description: 'An emerging, self-taught artist inspired by nature.',
    profileImage: '/images/profile/aminat-profile.jpg',
  });

  useEffect(() => {
    const load = async () => {
      try {
        const current = await dataService.getSettings();
        setSettings({
          studioName: current.studioName || 'Aminat Studio',
          artistName: current.artistName || 'Aminat',
          description: current.description || 'An emerging, self-taught artist inspired by nature.',
          profileImage: current.profileImage || '/images/profile/aminat-profile.jpg',
        });
      } catch {
        setSettings({
          studioName: 'Aminat Studio',
          artistName: 'Aminat',
          description: 'An emerging, self-taught artist inspired by nature.',
          profileImage: '/images/profile/aminat-profile.jpg',
        });
      }
    };
    load();
  }, []);

  return (
    <div className="py-16 md:py-24 px-6 md:px-20 max-w-7xl mx-auto">
      <div className="max-w-3xl mb-16">
        <span className="text-xs uppercase tracking-[0.15em] text-[#5A5E57] font-semibold block mb-3">
          Biography & Background
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] italic tracking-tight mb-6">
          About {settings.artistName}
        </h1>
        <p className="text-lg md:text-xl text-[#1A1A1A] font-serif leading-relaxed italic border-l-2 border-[#8A9A5B] pl-6 py-1">
          "Alhamdulillah for the beauty that surrounds us and the ability to capture a fragment of it."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
        <div className="md:col-span-5 md:sticky md:top-28">
          <div className="painting-border bg-[#F5F5F2] overflow-hidden shadow-xs">
            <img
              src={settings.profileImage}
              alt={`${settings.studioName} profile`}
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          <div className="mt-4 text-xs text-[#737871] uppercase tracking-wider flex justify-between">
            <span>{settings.studioName}</span>
            <span className="italic">Self-Taught Artist</span>
          </div>
        </div>

        <div className="md:col-span-7 space-y-10 text-base leading-relaxed text-[#5A5E57] font-sans">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] italic mb-4">
              {settings.description}
            </h2>
            <p className="mb-4">
              {settings.artistName} is an emerging, self-taught artist whose practice is grounded in reverence for the natural world. Drawn to the interplay of light, organic structure, and serene landscapes, her artwork explores the quiet resonance of living flora and trees.
            </p>
            <p>
              Without formal academy constraints, her approach developed organically—guided by genuine curiosity, keen visual observation, and an innate desire to understand the world through brushwork and line.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] italic mb-4">
              From Science to the Studio
            </h2>
            <p className="mb-4">
              {settings.artistName} first encountered art in her youth, experiencing the spark that would stay with her through years of intensive academic study. While pursuing and completing her degree in science, her scientific discipline cultivated an analytical eye—teaching her to notice microscopic textures, the cellular geometry of leaves, and the delicate balance of ecosystems.
            </p>
            <p>
              It was after graduation that she felt a profound call to return to the easel. Bringing together the observant patience of her scientific background with an uninhibited artistic intuition, she created her first complete painting—a transformative moment that crystallized her dedication to art.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] italic mb-4">
              Photography & The Observational Eye
            </h2>
            <p className="mb-4">
              Observation is the indispensable first stage of {settings.artistName}'s process. Alongside painting, she maintains a close relationship with nature photography. Whether pausing to capture the golden center of a wild calendula bloom or the tangled geometry of an overarching forest canopy, her camera serves as a visual sketchbook.
            </p>
            <p>
              These captured photographs inform the light, palette, and botanical fidelity of her later studio studies.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] italic mb-4">
              Mediums & Exploration
            </h2>
            <p className="mb-4">
              Refusing to be bound by a single rigid medium, {settings.artistName} works fluidly across:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-[#1A1A1A]">
              <li className="flex items-center gap-2 bg-[#E8EDE0]/50 px-4 py-3 border-l-2 border-[#8A9A5B]">
                <span><strong>Acrylics:</strong> Layered textural and rich opaque canvases.</span>
              </li>
              <li className="flex items-center gap-2 bg-[#E8EDE0]/50 px-4 py-3 border-l-2 border-[#1A1C19]">
                <span><strong>Watercolours:</strong> Transparent, luminous washes and sky gradients.</span>
              </li>
              <li className="flex items-center gap-2 bg-[#E8EDE0]/50 px-4 py-3 border-l-2 border-[#8A9A5B]">
                <span><strong>Paint Markers:</strong> Crisp definition and expressive mark-making.</span>
              </li>
              <li className="flex items-center gap-2 bg-[#E8EDE0]/50 px-4 py-3 border-l-2 border-[#737871]">
                <span><strong>Pen & Sketches:</strong> Contemplative line studies and studio journals.</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[#E7E7E2]">
            <h2 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] italic mb-4">
              Ongoing Development
            </h2>
            <p className="mb-6">
              Today, {settings.artistName}'s practice remains an authentic voyage of learning and creation. Each piece is an honest conversation with color, space, and spirit—celebrating the profound grace of creation.
            </p>
            <Link
              to="/gallery"
              className="inline-block bg-[#1A1C19] text-[#FFFFFF] px-8 py-4 text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#8A9A5B] transition-colors shadow-xs"
            >
              Explore the Artworks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
