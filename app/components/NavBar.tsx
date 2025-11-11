"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react';
import { useNavStore } from '@/lib/store';

// Můžeš si vytvořit typ pro přísnější kontrolu (dobrá praxe v TypeScriptu)
export type NavLink = {
  title: string;
  href: string;
};

// Zde je tvůj list
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

  const { isOpen, toggleMenu } = useNavStore();

  const handleClick = toggleMenu;

  if(!isOpen) {
    return (
      <nav className='fixed bg-black h-screen w-full top-0 z-50  flex justify-center items-center text-center'>
        <div className='flex flex-col gap-2 text-3xl mb-20'>
            {navigationLinks.map((product, id) => (
                    <Link className='text-white/70 hover:text-white/90' key={id} href={product.href}>{product.title}</Link>
                ))}
          </div>
        <X className='absolute top-5 right-5 text-white' onClick={handleClick}/>
      </nav>
    )
  }

  return (
    <nav className='h-15 fixed w-full text-white flex items-center px-5 z-10'>
        <div className='flex flex-row items-center justify-between w-full'>
            <Link href={"/"}>Zavi Finds</Link>
            <div className=' flex-row items-center gap-5 hidden sm:flex'>
                {navigationLinks.map((product, id) => (
                    <Link key={id} href={product.href}>{product.title}</Link>
                ))}
            </div>
            <Link href={"https://cnfans.com/register?ref=1507752"} className='hidden sm:block'>Sign Up to CnFans</Link>
            <Menu  className='block sm:hidden'  onClick={handleClick}/>
        </div>
    </nav>
  )
}

export default NavBar
