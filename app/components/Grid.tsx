import React from 'react'
import Image from 'next/image'

export type Props = {
  title: string,
  price: string,
  img: string,
  href: string,
}

const Grid = (props: Props) => {
  return (
    <a 
      href={`/products/${props.href}`} 
      className="
        group relative flex flex-col h-full
        bg-[#1a1a1a] rounded-xl overflow-hidden 
        border border-white/5 hover:border-blue-600/50
        transition-all duration-300 shadow-lg
        no-underline
      "
    >
      
      {/* 1. Kontejner pro obrázek (Čtverec) */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-800">
        {/* Pro náhled používáme standardní img. V Next.js použijte <Image fill ... /> */}
        <Image 
          src={`/productsImage/${props.img}`} 
          alt={props.title} 
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          width={200}
          height={200}
          unoptimized
        />
        
        {/* Jemný stín pro lepší hloubku */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* 2. Kontejner pro text - PŘIDÁNO 'flex-1' */}
      {/* 'flex-1' zajistí, že tento div vyplní veškerý zbývající prostor v kartě */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        
        {/* line-clamp-2 ořízne text až po 2 řádcích */}
        <h4 className="text-white font-medium text-lg leading-tight line-clamp-2" title={props.title}>
          {props.title}
        </h4>
        
        {/* 3. Kontejner pro cenu - PŘIDÁNO 'mt-auto' */}
        {/* 'mt-auto' (margin-top: auto) v flex kontejneru odtlačí prvek co nejvíce dolů */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-white/5">
          <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">
            CNFans
          </span>
          <span className="bg-linear-to-tr from-blue-600 via-blue-400 to-blue-600 bg-clip-text text-transparent font-bold text-xl">
            $ {props.price}
          </span>
        </div>

      </div>

    </a>
  )
}

export default Grid