import React from 'react';
import { Link } from 'react-router-dom';

interface AboutPreviewProps {
  image?: string;
}

export const AboutPreview: React.FC<AboutPreviewProps> = ({
  image = '/images/artwork/artists-journey.jpg',
}) => {
  return (
    <section className="py-24 bg-[#F5F5F2] border-y border-[#E7E7E2]">
      <div className="px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Text Column */}
          <div className="md:col-span-6 order-2 md:order-1">
            <span className="text-xs uppercase tracking-[0.15em] text-[#5A5E57] font-semibold block mb-4">
              The Artist's Journey
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] italic mb-8 leading-snug">
              From a background in science to a life dedicated to art, my journey has been one of discovery and reverence.
            </h2>
            <blockquote className="border-l-2 border-[#8A9A5B] pl-4 italic text-[#1A1A1A] mb-6 leading-relaxed font-serif text-lg">
              "Alhamdulillah for the beauty that surrounds us and the ability to capture a fragment of it. My work is a visual journal, an exploration of the natural world and the internal landscapes of imagination."
            </blockquote>
            <p className="text-sm md:text-base text-[#5A5E57] mb-8 leading-relaxed font-sans">
              Self-taught and continually evolving, I explore acrylics, watercolours, and mixed media to capture the serene, untamed essence of living things.
            </p>
            <Link
              to="/about"
              className="text-xs uppercase tracking-[0.15em] text-[#8A9A5B] border-b border-[#8A9A5B] pb-1 hover:text-[#6F7F45] hover:border-[#6F7F45] transition-colors inline-block font-semibold"
            >
              Meet the Artist
            </Link>
          </div>

          {/* Image Column with Signature Stitch Rotation Effect */}
          <div className="md:col-span-6 order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] painting-border bg-[#FFFFFF] overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500 shadow-xs">
              <img
                src={image}
                alt="The Artist's Journey silhouette study"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
