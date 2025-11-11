import Link from 'next/link'
import React from 'react'

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
      <div className='h-50 bg-[#393939] flex justify-center items-center'>{props.img}</div>
      
      {/* Placeholder pro obsah */}
      <div className="p-4 flex flex-col">
        <h4 className="text-lg">{props.title}</h4>
        <h5 className='text-base flex text-blue-600/70'>{props.price} usd</h5>
      </div>
    </Link>
  )
}

export default Grid
