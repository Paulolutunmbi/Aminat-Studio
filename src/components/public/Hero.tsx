import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  heroImage1?: string;
  heroImage2?: string;
}

export const Hero: React.FC<HeroProps> = ({
  heroImage1 = '/images/artwork/paint-with-me.jpg',
  heroImage2 = '/images/artwork/the-path.jpg',
}) => {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-20 py-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left Column: Heading, intro, and call to action buttons */}
        <div className="md:col-span-7 flex flex-col items-start">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] tracking-tight leading-[1.08] mb-8">
            Art shaped by nature, imagination, and the joy of creating.
          </h1>
          <p className="text-base sm:text-lg text-[#5A5E57] max-w-lg mb-10 leading-relaxed font-sans">
            Original paintings, mixed media, and studies inspired by the organic world. A visual
            journey of quiet observation and self-taught expression.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <Link
              to="/gallery"
              className="px-9 py-4 bg-[#1A1C19] text-[#FFFFFF] text-xs uppercase tracking-[0.15em] font-medium text-center hover:bg-[#8A9A5B] transition-all duration-300 shadow-xs"
            >
              Explore the Gallery
            </Link>
            <Link
              to="/about"
              className="px-9 py-4 border border-[#737871] text-xs uppercase tracking-[0.15em] font-medium text-center text-[#1A1A1A] hover:border-[#1A1C19] hover:bg-[#E8EDE0]/40 transition-all duration-300"
            >
              About the Artist
            </Link>
          </div>
        </div>

        {/* Right Column: Two offset framed artworks from the Stitch layout */}
        <div className="md:col-span-5 relative grid grid-cols-2 gap-4 pt-4 md:pt-0">
          <div className="relative w-full aspect-[4/5] painting-border bg-[#F5F5F2] overflow-hidden translate-y-0 md:translate-y-12 shadow-xs transition-transform duration-500 hover:scale-[1.02]">
            <img
              src={heroImage1}
              alt="Studio Watercolor study"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative w-full aspect-[4/5] painting-border bg-[#F5F5F2] overflow-hidden shadow-xs transition-transform duration-500 hover:scale-[1.02]">
            <img
              src={heroImage2}
              alt="The Path arched trees painting"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
