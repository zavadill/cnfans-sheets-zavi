"use client"

import React from 'react'
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';


const HeaderSlider = () => {

    const headerList = [
        { title: 'Quality' },
        { title: 'Prices' },
        { title: 'Links' },
    ];

    const textRef = useRef<HTMLHeadingElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const animateText = () => {
      const nextIndex = (currentIndex + 1) % headerList.length;

      gsap.to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentIndex(nextIndex);
          gsap.fromTo(
            textRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
          );
        },
      });
    };

    const interval = setInterval(animateText, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, headerList]);

  return (
    <h2 ref={textRef} className="text-white/60 mt-4 h-16 flex items-center justify-center">
        {headerList[currentIndex].title}
    </h2>
  )
}

export default HeaderSlider
