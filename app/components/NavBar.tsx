"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react';

export type NavLink = {
  title: string;
  href: string;
};

export const navigationLinks: NavLink[] = [
  { title: "Home", href: "/" },
  { title: "Shoes", href: "/category/shoes" },
  { title: "Hoodies/Sweaters", href: "/category/hoodies-sweaters" },
  { title: "T-Shirt", href: "/category/t-shirts" },
  { title: "Jackets", href: "/category/jackets" },
  { title: "Pants/Shorts", href: "/category/pants-shorts" },
  { title: "Headwear", href: "/category/headwear" },
  { title: "Accessories", href: "/category/accessories" },
  { title: "Other Stuff", href: "/category/other" }
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);
  const [hasScrolled, setHasScrolled] = useState(false);

  // --- OPRAVENÝ SCROLL EFFECT ---
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    // 1. Zavoláme to HNED při načtení (opravuje bug při refreshi)
    handleScroll();

    // 2. Přidáme posluchače pro další pohyb
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // ------------------------------

  // Zámek scrollu při otevřeném menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Mobilní menu
  if (isOpen) {
    return (
      <nav className='fixed bg-black/90 backdrop-blur-xl h-screen w-full top-0 z-50 text-white flex justify-center items-center text-center font-sans'>
        <div className='flex flex-col gap-6 text-2xl font-medium'>
          {navigationLinks.map((product, id) => (
            <Link
              className='text-white/80 hover:text-white transition-colors duration-200'
              key={id}
              href={product.href}
              onClick={handleClick}
            >
              {product.title}
            </Link>
          ))}

          <Link
            href={"https://cnfans.com/register?ref=1507752"}
            className='mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-bold hover:bg-blue-500 transition-all font-mono'
            onClick={handleClick}
          >
            Sign Up to CnFans
          </Link>
        </div>
        <X className='absolute top-6 right-6 text-white/80 cursor-pointer hover:text-white' size={32} onClick={handleClick} />
      </nav>
    )
  }

  // Desktop / Default Navbar
  return (
    <nav className={`
        h-20 fixed w-full text-white flex items-center px-6 z-40 
        transition-all duration-300 ease-in-out border-b border-transparent
        ${hasScrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md shadow-lg border-white/5' : 'bg-transparent'}
    `}>
      <div className='flex flex-row items-center justify-between w-full max-w-7xl mx-auto'>
        <Link href={"/"} className='text-2xl font-extrabold tracking-tight font-mono'>
          TheVault
        </Link>

        {/* Desktop Links */}
        <div className='flex-row items-center gap-6 hidden xl:flex'>
          {navigationLinks.map((product, id) => (
            <Link
              key={id}
              href={product.href}
              className='text-sm font-medium text-white/70 hover:text-white transition-colors'
            >
              {product.title}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="flex items-center gap-4">
            <Link
            href={"https://cnfans.com/register?ref=1507752"}
            className='hidden xl:block bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-900/20 font-mono'
            >
            Sign Up To CnFans
            </Link>

            {/* Mobile Menu Trigger */}
            <Menu className='block xl:hidden cursor-pointer text-white/90 hover:text-white' size={28} onClick={handleClick} />
        </div>
      </div>
    </nav>
  )
}

export default NavBar