import React from 'react'

const BestBrands = () => {
  return (
    <div className='max-w-7xl mx-auto space-y-5'>
          <h3 className='text-5xl'>Best Brands</h3>
          <div className=' gap-5 flex flex-col sm:flex-row text-2xl'>
            <div className='relative w-full rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105'>
              <div className='block h-50  bg-linear-to-br from-[#121212] via-purple-950 to-blue-950'/>
              <p className='absolute left-5 font-bold bottom-2'>NIKE</p>
            </div>
            <div className='relative w-full rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105'>
              <div className='block h-50  bg-linear-to-br from-[#121212] via-purple-950 to-blue-950'/>
              <p className='absolute left-5 font-bold bottom-2'>CORTEIZ</p>
            </div>
            <div className='relative w-full rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105'>
              <div className='block h-50  bg-linear-to-br from-[#121212] via-purple-950 to-blue-950'/>
              <p className='absolute left-5 font-bold bottom-2'>TRAPSTAR</p>
            </div>
            <div className='relative w-full rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105'>
              <div className='block h-50  bg-linear-to-br from-[#121212] via-purple-950 to-blue-950'/>
              <p className='absolute left-5 font-bold bottom-2'>LOUIS VUITTON</p>
            </div>
          </div>
        </div>
  )
}

export default BestBrands
