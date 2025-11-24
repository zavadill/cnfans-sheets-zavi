import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

export type Props = {
  title: string,
  price: string,
  img: string,
  href: string,
}

const Grid = (props: Props) => {
  return (
    <Link 
      href={`/products/${props.href}`} 
      className="
        group relative flex flex-col 
        bg-[#1a1a1a] rounded-xl overflow-hidden 
        border border-white/5 hover:border-blue-600/50
        transition-all duration-300 hover:-translate-y-1 shadow-lg
      "
    >
      
      {/* 1. Kontejner pro obrázek (Čtverec) */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-800">
        <Image 
          src={`/productsImage/${props.img}`} 
          alt={props.title} 
          fill // Roztáhne se na celý kontejner
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Volitelné: Jemný gradient přes spodek obrázku pro lepší kontrast */}
        <div className="absolute inset-0 bg-linear-to-t from-[#1a1a1a] via-transparent to-transparent opacity-20" />
      </div>
      
      {/* 2. Obsah karty */}
      <div className="p-4 flex flex-col gap-2">
        {/* Název produktu - ořízne se na 1 řádek (truncate) */}
        <h4 className="text-white font-medium text-lg" title={props.title}>
          {props.title}
        </h4>
        
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">
            CNFans
          </span>
          {/* Cena - výrazná barva */}
          <span className="bg-linear-to-tr from-blue-600 via-blue-400 to-blue-600 bg-clip-text text-transparent font-bold text-xl">
            {props.price}
          </span>
        </div>
      </div>

    </Link>
  )
}

export default Grid