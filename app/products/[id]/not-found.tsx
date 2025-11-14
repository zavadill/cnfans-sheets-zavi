// This file should be named 'not-found.tsx'
// and placed in the 'app/' folder for Next.js to use it automatically.

import React from 'react'
import Link from 'next/link'

// Components should start with a capital letter (PascalCase)
const NotFound = () => {
  return (
    <div className='h-screen flex justify-center items-center flex-col bg-[#121212] text-white/70 p-4'>
      <div className="text-center flex flex-col items-center space-y-4">
        
        {/* Using the color from your QR code for branding */}
        <span className=" text-9xl font-bold">
          404
        </span>
        
        <h1 className='text-3xl font-semibold'>
          This Product does not exist
        </h1>
        
        <p className='text-lg text-white/50 max-w-md'>
          Sorry, the product you are looking for doesnt exist.
        </p>
        
        {/* Key CTA - get the user back on track */}
        <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-center pt-8'>
          <Link 
            href="/" 
            className="bg-white text-[#121212] px-5 py-2 rounded-md text-sm font-bold hover:bg-gray-200 transition-colors"
          >
            Back to Homepage
          </Link>
          <Link 
            href={"mailto:zavi@cnfanssheets.com"} 
            className='text-sm text-white/60 underline hover:text-white transition-colors'
          >
            Report a Problem
          </Link>
        </div>
      </div>

 </div>
  )
}

export default NotFound