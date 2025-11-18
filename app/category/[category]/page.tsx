
import React from "react";
import Grid from "@/app/components/Grid";
import SearchBar from "@/app/components/Search";
import Link from "next/link";
import { products } from "@/lib/data";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    q?: string;
  }>;
};






export default function CategoryPage({ params, searchParams }: CategoryPageProps) {

  // "Rozbalíme" Promise pomocí React.use()
  const resolvedParams = React.use(params);
  const resolvedSearchParams = React.use(searchParams);

  // Teď můžeme bezpečně číst data
  const kategoryNazev = resolvedParams.category;
  const searchQuery = resolvedSearchParams.q;

 
  let filtrovaneProdukty = products;

  filtrovaneProdukty = filtrovaneProdukty.filter(
    (product) => product.category === kategoryNazev
  );


  if (searchQuery) {
    filtrovaneProdukty = filtrovaneProdukty.filter(
      (product) => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }


  return (
    <div className="bg-[#121212] text-white/90 min-h-screen pt-25">
      <main className="max-w-7xl mx-auto px-4">

        <div className="flex flex-row justify-between items-center gap-5">
          <Link href={`/category/${kategoryNazev}`}><h1 className="font-bold text-xl sm:text-4xl">{kategoryNazev}</h1></Link>
          <SearchBar />
        </div>
        {searchQuery && (
          <p>Searching for: {searchQuery}</p>
        )}
        
        <div className='max-w-7xl mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {filtrovaneProdukty.length > 0 ? (
            // Pokud jsme něco našli, vylistujeme to
            filtrovaneProdukty.map((product) => (
              <Grid 
                key={product.id} 
                title={product.title} 
                price={product.price} 
                img={product.url} // Ujisti se, že 'Grid' přijímá 'img'
                href={product.id} 
              />
        	  ))
          ) : (
            // Pokud jsme nic nenašli
            <p className="text-white/50 col-span-full text-center text-lg">
              Sorry, this does not exist.
            </p>
          )}
        </div>

      </main>
    </div>
  )
}