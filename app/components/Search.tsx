"use client";

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname(); // např. "/category/shoes"

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ===== TADY JE TA ZMĚNA =====

    // Použijeme trim() pro odstranění zbytečných mezer
    if (query.trim() !== '') {
      // 1. Pokud je ve vyhledávání text, přidáme ho do URL
      router.push(`${pathname}?q=${query}`);
    } else {
      // 2. Pokud je vyhledávání prázdné, vrátíme se na čistou URL
      //    (bez ?q=), čímž se odstraní předchozí filtr
      router.push(pathname);
    }
    // ============================

    setQuery("")
    
  };

  return (
    <form className="w-full max-w-sm" onSubmit={handleSearch}>
      <div className="relative w-full">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Search className="w-5 h-5 text-white/40" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Hledej v této kategorii..."
          className="
            w-full
            bg-[#1a1a1a]
            text-white
            border-none
            rounded-lg
            py-2.5
            pl-10
            pr-4
            placeholder:text-white/40
          "
        />
      </div>
    </form>
  );
}

export default SearchBar;