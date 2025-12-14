import React from 'react';
import { PlayCircle, ShoppingBag, Youtube } from 'lucide-react';

const HowToBuy = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 font-sans">
      {/* Hlavička sekce */}
      <div className="text-center mb-10 space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white flex items-center justify-center gap-3 font-mono">
          <ShoppingBag className="text-blue-500 w-8 h-8 md:w-12 md:h-12" />
          How to Buy?
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Don't know how to order? Watch this complete video guide for 2025 that will take you through the entire process from registration to delivery.
        </p>
      </div>

      {/* Kontejner pro video s efektním rámečkem */}
      <div className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#1a1a1a]">
        
        {/* Dekorativní pozadí (Glow efekt) */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative bg-black rounded-xl overflow-hidden">
          {/* Aspect Ratio Container pro video (16:9) */}
          <div className="relative pb-[56.25%] h-0">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/WUrsMA_TMhc?si=EnSIkaIECMiOmarE" 
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Tlačítko pod videem (Call to Action) */}
      <div className="mt-8 text-center">
        <a 
          href="https://www.youtube.com/watch?v=WUrsMA_TMhc" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white hover:underline transition-colors"
        >
          <Youtube className="w-5 h-5 text-red-500" />
          Open directly on YouTube
        </a>
      </div>
    </section>
  );
};

export default HowToBuy;