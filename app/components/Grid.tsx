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
    <Link href={`/products/${props.href}`} className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      {/* Placeholder pro obrázek */}
      <Image src={`/productsImage/${props.img}`} alt={props.title} width={200} height={100} className='w-full h-40 sm:h-50 object-cover'/>
      
      {/* Placeholder pro obsah */}
      <div className="p-4 flex flex-col">
        <h4 className="text-lg">{props.title}</h4>
        <h5 className='text-base flex text-blue-600/70'>{props.price} usd</h5>
      </div>
    </Link>
  )
}

export default Grid
