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
        group relative flex flex-col h-full
        bg-[#1a1a1a] rounded-xl overflow-hidden 
        border border-white/5 hover:border-blue-600/50
        transition-all duration-300 hover:-translate-y-1 shadow-lg
      "
    >
      
      {/* 1. Kontejner pro obrázek */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-800">
        <Image 
          src={`/productsImage/${props.img}`} 
          alt={props.title} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* 2. Kontejner pro text - přidáno 'flex-1' */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        
        <p className="text-white font-medium text-lg" title={props.title}>
          {props.title}
        </p>
        
        {/* 3. Kontejner pro cenu - přidáno 'mt-auto' (zarovná na spodek) */}
        <div className="flex justify-between items-center mt-auto pt-2">
          <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">
            CNFans
          </span>
          <span className="bg-linear-to-tr from-blue-600 via-blue-400 to-blue-600 bg-clip-text text-transparent font-bold text-xl">
            {props.price}
          </span>
        </div>

      </div>

    </Link>
  )
}

export default Grid