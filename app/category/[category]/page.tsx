import React from "react";
import Grid from "@/app/components/Grid";
import SearchBar from "@/app/components/Search";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

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
    // Tady nahrazujeme tvůj JS .filter() za databázový filtr
    .eq('category', kategoryNazev); 

  // 3. PŘIDÁNÍ FILTRU PRO VYHLEDÁVÁNÍ
  if (searchQuery) {
    // Místo JS .includes() použijeme .ilike() (case-insensitive like)
    // % okolo znamená "cokoliv před a cokoliv za"
    query = query.ilike('title', `%${searchQuery}%`);
  }

  // 4. ODESLÁNÍ DOTAZU A ČEKÁNÍ NA DATA (await)
  // Teprve teď se data stáhnou
  const { data: filtrovaneProdukty, error } = await query;

  // Ošetření chyby (pokud by DB nejela)
  if (error) {
    return <div className="flex w-full pt-20 h-screen justify-center items-center">Loading...</div>;
  }


  return (
    <div className="bg-[#121212] text-white/90 min-h-screen pt-25 pb">
      <main className="max-w-7xl mx-auto px-4">

        <div className="flex flex-row justify-between items-center gap-5">
          <Link href={`/category/${kategoryNazev}`}>
            <h1 className="font-bold text-xl sm:text-4xl capitalize">{kategoryNazev}</h1>
          </Link>
          <SearchBar />
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