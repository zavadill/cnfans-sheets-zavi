import React from "react";
import Grid from "@/app/components/Grid";
import SearchBar from "@/app/components/Search";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { X } from "lucide-react"; // Import ikonky křížku

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    q?: string;
  }>;
};

export const revalidate = 60;

// 1. Funkce MUSÍ být 'async', abychom mohli volat databázi
export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {

  // Rozbalení parametrů (v async funkci je lepší await než React.use)
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const kategoryNazev = resolvedParams.category;
  const searchQuery = resolvedSearchParams.q;

  // --- 2. STAVÍME DOTAZ PRO SUPABASE ---
  
  // Začneme dotaz: "Chci tabulku products a sloupeček *"
  let query = supabase
    .from('products')
    .select('*')
    .eq('category', kategoryNazev); 

  // 3. PŘIDÁNÍ FILTRU PRO VYHLEDÁVÁNÍ
  if (searchQuery) {
    // Místo JS .includes() použijeme .ilike() (case-insensitive like)
    // % okolo znamená "cokoliv před a cokoliv za"
    query = query.ilike('title', `%${searchQuery}%`);
  }

  query = query.order('title', { ascending: true });


  // 4. ODESLÁNÍ DOTAZU A ČEKÁNÍ NA DATA (await)
  // Teprve teď se data stáhnou
  const { data: filtrovaneProdukty, error } = await query;

  // Ošetření chyby (pokud by DB nejela)
  if (error) {
    return <div className="flex w-full pt-20 h-screen justify-center items-center">Loading...</div>;
  }


  return (
    <div className="bg-[#121212] text-white/90 min-h-screen pt-25 font-sans">
      <main className="max-w-7xl mx-auto px-4">

        <div className="flex flex-row justify-between items-center gap-5">
          <Link href={`/category/${kategoryNazev}`}>
            <h1 className="font-bold text-xl sm:text-4xl capitalize">{kategoryNazev}</h1>
          </Link>
          
          {/* Změna: Wrapper pro SearchBar a Reset tlačítko */}
          <div className="flex items-center gap-2">
            {searchQuery && (
              <Link 
                href={`/category/${kategoryNazev}`}
                className="group flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors bg-white/5 px-3 py-2 rounded-lg border border-transparent hover:border-red-500/30"
                title="Zrušit vyhledávání"
              >
                <X size={16} />
                <span className="hidden sm:inline">Reset</span>
              </Link>
            )}
            <SearchBar />
          </div>
        </div>

        {searchQuery && (
          <p className="text-white/50 mt-2">Searching for: "{searchQuery}"</p>
        )}
        
        <div className='max-w-7xl mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
          
          {/* 5. KONTROLA A VÝPIS DAT */}
          {filtrovaneProdukty && filtrovaneProdukty.length > 0 ? (
            filtrovaneProdukty.map((product) => (
              <Grid 
                key={product.id} 
                title={product.title} 
                price={product.price} 
                img={product.url} 
                href={product.id} 
              />
            ))
          ) : (
            <p className="text-white/50 col-span-full text-center text-lg mt-10">
              Sorry, this does not exist.
            </p>
          )}
        </div>

      </main>
    </div>
  )
}