import React from 'react'

const Fix = () => {
  return (
    <div className='max-w-7xl mx-auto space-y-5'>
          <h3 className='text-5xl'>Link not working?</h3>
          
          {/* Tady je ten nový obsah */}
          <div 
            className="
              bg-gray-800/50 
              border border-gray-700 
              rounded-lg 
              p-8 
              flex flex-col sm:flex-row 
              justify-between 
              items-center 
              gap-6
            "
          >
            <div>
              <p className="text-2xl font-semibold text-white">
                Found a broken link or need help?
              </p>
              <p className="text-white/60 mt-1">
                Let us know! We will do our best to fix it or find what you're looking for.
              </p>
            </div>
            
            <a 
              href="mailto:zavi@cnfanssheets.com" 
              className="bg-blue-600/70 px-4 py-2 rounded-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
  )
}

export default Fix
