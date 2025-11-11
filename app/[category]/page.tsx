import React from "react";
import Grid from "../components/Grid";


type CategoryPageProps = {
  params: {
    category: string; 
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  
  const kategoryNazev = params.category;

  return (
    <div className="bg-[#121212] text-white/90 min-h-screen pt-20">
      <main className="max-w-7xl mx-auto px-4">
        
        <h1 className="text-4xl font-bold capitalize">
          Kategorie: {kategoryNazev}
        </h1>
        
        <p className="text-white/50 mt-2">
          Zobrazují se produkty pro "{kategoryNazev}"...
        </p>

        <div className=' max-w-7xl mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <Grid />
            <Grid />
            <Grid />
            <Grid />
            <Grid />
            <Grid />
            <Grid />
            <Grid />
            <Grid />
            <Grid />
            <Grid />
          </div>

      </main>
    </div>
  )
}