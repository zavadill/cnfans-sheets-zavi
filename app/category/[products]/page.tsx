"use client"

// 1. Importy pro klientskou komponentu
import React from "react";
import Grid from "@/app/components/Grid";
import SearchBar from "@/app/components/Search";
// Importujeme 'useParams' pro získání segmentu URL a 'useSearchParams' pro query
import { useSearchParams, useParams } from 'next/navigation';
import { Metadata } from "next";

type CategoryPageProps = {
  params: {
    products: string;
  };
  searchParams: {
    q?: string;
  };
};


export default function CategoryPage() {

  // 3. Získání 'params' (segmentu URL, např. 'shoes') pomocí hooku
  const params = useParams();
  const products = params.products as string; // Kastování na string

  // 4. Získání 'search params' (query, např. '?q=nike') pomocí hooku
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');
  
  // 'kategoryNazev' byla duplicitní, používáme přímo 'products'

  return (
    <div className="bg-[#121212] text-white/90 min-h-screen pt-25">
      <main className="max-w-7xl mx-auto px-4">

        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-4xl">{products}</h1>
          <SearchBar />
        </div>

        <div className='max-w-7xl mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <Grid title='Jordan 4 x Travis scott'  img='sdsd' price='150' href='linkkkk'/><Grid title='Jordan 4 x Travis scott'  img='sdsd' price='150' href='linkkkk'/><Grid title='Jordan 4 x Travis scott'  img='sdsd' price='150' href='linkkkk'/><Grid title='Jordan 4 x Travis scott'  img='sdsd' price='150' href='linkkkk'/><Grid title='Jordan 4 x Travis scott'  img='sdsd' price='150' href='linkkkk'/>
        </div>

      </main>
    </div>
  )
}