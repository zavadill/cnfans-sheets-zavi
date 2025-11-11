import React from 'react'
import Link from 'next/link'
import { link } from 'fs';

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

  return (
    <nav className='h-15 fixed w-full text-white flex items-center px-5 z-10'>
        <div className='flex flex-row items-center justify-between w-full'>
            <Link href={"/"}>Zavi Finds</Link>
            <div className='flex flex-row items-center gap-5'>
                {navigationLinks.map((product, id) => (
                    <Link key={id} href={product.href}>{product.title}</Link>
                ))}
            </div>
            <Link href={"https://cnfans.com/register?ref=1507752"}>Sign Up to CnFans</Link>
        </div>
    </nav>
  )
}

export default NavBar
