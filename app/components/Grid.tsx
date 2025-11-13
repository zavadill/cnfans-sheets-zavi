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
    <Link href={props.href} className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      {/* Placeholder pro obrázek */}
      <div className='block w-full h-60 bg-gray-700' />
      
      {/* Placeholder pro obsah */}
      <div className="p-4 flex flex-col">
        <h4 className="text-lg">{props.title}</h4>
        <h5 className='text-base flex text-blue-600/70'>{props.price} usd</h5>
      </div>
    </Link>
  )
}

export default Grid
