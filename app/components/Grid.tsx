import React from 'react'


const Grid = () => {
  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      {/* Placeholder pro obrázek */}
      <div className="h-60 w-full bg-gray-700 animate-pulse" />
      
      {/* Placeholder pro obsah */}
      <div className="p-4">
        <div className="h-5 bg-gray-700 rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-700 rounded w-1/4 mt-3 animate-pulse" />
      </div>
    </div>
  )
}

export default Grid
