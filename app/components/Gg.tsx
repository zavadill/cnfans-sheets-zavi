"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Users, ShoppingBag, Layers } from 'lucide-react';

const statsData = [
  {
    rawValue: 4000,
    suffix: '+',
    label: 'Trusted By People',
    icon: Users,
  },
  {
    rawValue: 2000,
    suffix: '+',
    label: 'Handpicked Finds',
    icon: ShoppingBag,
  },
  {
    rawValue: 8,
    suffix: '+',
    label: 'Categories',
    icon: Layers,
  },
];

// Custom hook pro animaci čísla (náhrada za GSAP)
const useCountUp = (end: number, duration: number = 2000, start: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing funkce (easeOutExpo) pro plynulý dojezd jako v GSAP
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
};

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="max-w-5xl mx-auto w-full relative z-10 px-4">
      {/* Vložení stylů pro animaci odlesku */}
      <style jsx global>{`
        @keyframes border-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-border-shimmer {
          background: linear-gradient(
            90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.1) 25%, 
            rgba(255, 255, 255, 0.6) 50%, 
            rgba(255, 255, 255, 0.1) 75%, 
            transparent 100%
          );
          background-size: 200% 100%;
          animation: border-shimmer 8s linear infinite;
        }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statsData.map((stat, index) => (
          <StatCard 
            key={index} 
            stat={stat} 
            index={index} 
            isVisible={isVisible} 
          />
        ))}
      </div>
    </section>
  );
};

const StatCard = ({ stat, index, isVisible }: { stat: typeof statsData[0], index: number, isVisible: boolean }) => {
  // Použití custom hooku pro animaci
  const count = useCountUp(stat.rawValue, 2000, isVisible);

  return (
    <div 
      className={`relative group h-full transition-all duration-700 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* 1. Rámeček s efektem odlesku (Shimmer Border) */}
      <div className="absolute -inset-[1px] rounded-xl animate-border-shimmer pointer-events-none"></div>
      
      {/* 2. Glassmorphism Karta */}
      <div className="
        relative h-full
        bg-black/40 backdrop-blur-md
        rounded-xl
        p-5
        flex flex-row items-center gap-4
        shadow-lg
        transition-all duration-300
        hover:bg-white/5
      ">
        {/* Ikona */}
        <div className="
          p-2.5 rounded-lg bg-white/5 border border-white/10
          text-white/80 group-hover:text-white group-hover:scale-105 transition-all duration-300
          shadow-inner
        ">
          <stat.icon size={20} strokeWidth={1.5} />
        </div>

        {/* Textový obsah */}
        <div className="flex flex-col items-start">
          {/* Číslo - kovový/stříbrný gradient */}
          <h3 className="
            text-2xl sm:text-3xl font-bold tracking-tight
            bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent
            tabular-nums
          ">
            {count.toLocaleString('en-US')}{stat.suffix}
          </h3>

          {/* Popisek */}
          <p className="text-white/50 text-xs font-medium uppercase tracking-wider">
            {stat.label}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;