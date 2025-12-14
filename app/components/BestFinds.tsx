import React from 'react'
import Grid from './Grid'
import { supabase } from '@/lib/supabase'

// Tvoje vybrané IDčka produktů, které chceš zobrazit


const BestFinds = async () => {

  const ids = [1, 2, 3, 4, 5] 
  
  // Stáhneme data ze Supabase
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .in('id', ids);

  if (error) {
    console.error("Chyba při načítání Best Finds:", error);
    return null;
  }

  // Ošetření, kdyby se nic nenačetlo
  if (!products || products.length === 0) {
    return null; 
  }

  return (
    <div className='max-w-7xl mx-auto space-y-5'>
      <div className="header-anim flex items-center gap-3 mb-2">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 font-mono">
            Best Finds
          </h2>
        </div>
      <div className='mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
        
        {products.map((product) => (
          <Grid 
            key={product.id} 
            title={product.title} 
            href={product.id} 
            price={product.price} 
            img={product.url}
          />
        ))}
      </div>
    </div>
  )
}

export default BestFinds