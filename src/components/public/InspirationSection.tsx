import React from 'react';
import { NaturePhoto } from '../../types';
import { INITIAL_PHOTOS } from '../../data/initialData';

interface InspirationSectionProps {
  photos?: NaturePhoto[];
}

export const InspirationSection: React.FC<InspirationSectionProps> = ({
  photos = INITIAL_PHOTOS,
}) => {
  const photo1 = photos[0];
  const photo2 = photos[1];

  return (
    <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
      <div className="max-w-2xl mb-16">
        <span className="text-xs uppercase tracking-[0.15em] text-[#5A5E57] font-semibold block mb-2">
          Inspiration
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] italic mb-6">
          Rooted in Nature
        </h2>
        <p className="text-base text-[#5A5E57] leading-relaxed font-sans">
          The textures of landscapes, the resilience of plants, and the vastness of the sky serve as
          the primary source material for my creations. Observation is the first step of my
          process.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {photo1 && (
          <div className="group">
            <div className="aspect-[4/3] overflow-hidden photo-border mb-4 bg-[#F5F5F2]">
              <img
                alt={photo1.title}
                src={photo1.image}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#737871] uppercase tracking-wider font-medium">
                {photo1.caption}
              </span>
              <span className="text-[#5A5E57] italic">{photo1.title}</span>
            </div>
          </div>
        )}

        {photo2 && (
          <div className="group mt-0 md:mt-12">
            <div className="aspect-[3/4] overflow-hidden photo-border mb-4 bg-[#F5F5F2]">
              <img
                alt={photo2.title}
                src={photo2.image}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#737871] uppercase tracking-wider font-medium">
                {photo2.caption}
              </span>
              <span className="text-[#5A5E57] italic">{photo2.title}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
