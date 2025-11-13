
import React from "react";
import Grid from "@/app/components/Grid";
import SearchBar from "@/app/components/Search";
import Link from "next/link";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    q?: string;
  }>;
};

const nazvySouboru = [
  'open1326912390-1234478995-09ce0000019874a9caf60aa043f9_1242_1071.jpg',
  'open1326912390-1234478995-09e00000019874a9db5f0aa043f9_1242_1055.jpg',
  'open1326912390-1234478995-09ce0000019874a9caf60aa043f9_1242_1071.jpg',
  'open1326912390-1234478995-09e00000019874a9db5f0aa043f9_1242_1055.jpg',
  'open1326912390-1234478995-09ce0000019874a9caf60aa043f9_1242_1071.jpg',
  'open1326912390-1234478995-09e00000019874a9db5f0aa043f9_1242_1055.jpg',
  'open1326912390-1234478995-09ce0000019874a9caf60aa043f9_1242_1071.jpg',
  'open1326912390-1234478995-09e00000019874a9db5f0aa043f9_1242_1055.jpg',
];

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {

  // "Rozbalíme" Promise pomocí React.use()
  const resolvedParams = React.use(params);
  const resolvedSearchParams = React.use(searchParams);

  // Teď můžeme bezpečně číst data
  const kategoryNazev = resolvedParams.category;
  const searchQuery = resolvedSearchParams.q;

  return (
    <div className="bg-[#121212] text-white/90 min-h-screen pt-25">
      <main className="max-w-7xl mx-auto px-4">

        <div className="flex flex-row justify-between items-center gap-5">
          <Link href={`/category/${kategoryNazev}`}><h1 className="font-bold text-4xl">{kategoryNazev}</h1></Link>
          <SearchBar />
        </div>
        {searchQuery && (
          <p>Searching for: {searchQuery}</p>
        )}
        
        <div className='max-w-7xl mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {nazvySouboru.map((item, id) => (
            <Grid title={"item"} key={id} price={"item"} img={item} href={"/products/sdsdsdsdsd"} />
          ))}
        </div>

      </main>
    </div>
  )
}