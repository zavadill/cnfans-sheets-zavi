"use client"

// 1. Přidán useEffect
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react';
// 2. Odstraněn import Zustandu
// import { useNavStore } from '@/lib/store';

// Typ a list odkazů (beze změny)
export type NavLink = {
  title: string;
  href: string;
};
export const navigationLinks: NavLink[] = [
  { title: "Home", href: "/" },
  { title: "Shoes", href: "/shoes" },
  { title: "Hoodies/Sweaters", href: "/hoodies-sweaters" },
  { title: "T-Shirt", href: "/t-shirts" },
  { title: "Jackets", href: "/jackets" },
  { title: "Pants/Shorts", href: "/pants-shorts" },
  { title: "Headwear", href: "/headwear" },
  { title: "Accessories", href: "/accessories" },
  { title: "Other Stuff", href: "/other" }
];

const NavBar = () => {

  // 3. Zpět na lokální useState
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);

  // 4. Stav a efekt pro scroll
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  // 5. Opravená logika: if (isOpen) - zobrazí se mobilní menu
  if(isOpen) {
    return (
      // "Hezčí" pozadí s backdrop-blur
      <nav className='fixed bg-black/90 backdrop-blur-lg h-screen w-full top-0 z-50 text-white flex justify-center items-center text-center'>
        <div className='flex flex-col gap-4 text-3xl'> {/* Snížen 'gap' pro lepší vzhled */}
          {/* Logo i v mobilním menu */}


          {navigationLinks.map((product, id) => (
            <Link 
              className='text-white/70 hover:text-white transition-colors' 
              key={id} 
              href={product.href}
              onClick={handleClick} // Zavře menu po kliknutí
            >
              {product.title}
            </Link>
          ))}
          
          {/* Sign Up tlačítko pro mobilní menu */}
          <Link 
            href={"https://cnfans.com/register?ref=1507752"} 
            className='mt-8 bg-blue-600/70 text-black px-4 py-2 rounded-md text-xl font-semibold'
            onClick={handleClick} // Zavře menu
          >
            Sign Up to CnFans
          </Link>
        </div>
        {/* Tlačítko pro zavření */}
        <X className='absolute top-6 right-5 text-white' onClick={handleClick}/>
      </nav>
    )
  }

  // 6. Výchozí (desktopový) navbar
  return (
    // Dynamické pozadí podle scrollu
    <nav className={`
        h-20 fixed w-full text-white flex items-center px-0 sm:px-5 z-40 
        transition-all duration-300 ease-in-out
        ${hasScrolled ? 'bg-black/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}
    `}>
      <div className='flex flex-row items-center justify-between w-full'>
          <Link href={"/"} className='text-xl font-bold'>Zavi Finds</Link>
          
          {/* Desktopové odkazy */}
          <div className=' flex-row items-center gap-5 hidden sm:flex'>
            {navigationLinks.map((product, id) => (
              <Link 
                key={id} 
                href={product.href} 
                className='text-white/70 hover:text-white transition-colors'
              >
                {product.title}
              </Link>
            ))}
          </div>
          
          {/* Desktopové Sign Up tlačítko */}
          <Link 
            href={"https://cnfans.com/register?ref=1507752"} 
            className='hidden sm:block bg-blue-600/70 text-black px-3 py-1.5 rounded-md text-sm font-semibold transition-colors'
          >
            Sign Up to CnFans
          </Link>
          
          {/* Tlačítko pro otevření mobilního menu */}
          <Menu  className='block sm:hidden'  onClick={handleClick}/>
      </div>
    </nav>
  )
}

export default NavBar