// components/BestFinds.tsx

import React from 'react'
import Grid from './Grid'
import { supabase } from '@/lib/supabase' // Importujeme klienta

// Tvoje vybrané IDčka produktů, které chceš zobrazit
const ids = [25, 225, 125, 266, 276] 

const BestFinds = async () => { // 1. Komponenta musí být 'async'
  
  // 2. Stáhneme data ze Supabase
  // Použijeme filtr .in(), který říká: "Dej mi produkty, kde 'id' je jedno z čísel v poli 'ids'"
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .in('id', ids);

  // Ošetření, kdyby se nic nenačetlo
  if (!products || products.length === 0) {
    return null; 
  }

  return (
    <div className='max-w-7xl mx-auto space-y-5'>
      <h3 className='text-5xl'>Best finds</h3>
      <div className='mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
        
        {/* 3. Mapujeme přes data z databáze */}
        {products.map((product) => (
          <Grid 
            key={product.id} 
            title={product.title} 
            href={product.id} 
            price={product.price} 
            img={product.url} // Předpokládám, že v DB máš sloupec 'url'
          />
        ))}

      </div>
    </div>
  )
}

export default BestFinds