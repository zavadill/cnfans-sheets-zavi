// components/Grid.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type GridProps = {
    title: string;
    price: number;
    img: string;
    href: string; // ID produktu
}

const Grid = ({ title, price, img, href }: GridProps) => {
  return (
    <Link href={`/products/${href}`} className="group block">
        {/* Obal pro obrázek - drží poměr stran a zajišťuje, že nic neposkakuje */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#1a1a1a] mb-3">
            <Image 
                src={`/productsImage/${img}`} // Cesta k obrázku
                alt={title}
                fill // Roztáhne se do rodiče
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw" // Kritické pro rychlost!
                className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
        </div>
        
        {/* Texty */}
        <div className="space-y-1">
            <p className="text-sm sm:text-base font-medium text-white/90 line-clamp-1 group-hover:text-blue-400 transition-colors">
                {title}
            </p>
            <p className="text-sm sm:text-lg font-bold text-white">
                $ {price}
            </p>
        </div>
    </Link>
  )
}

export default Grid;