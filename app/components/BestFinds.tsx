import React from 'react'
import Grid from './Grid'
import { supabase } from '@/lib/supabase'

// Tvoje vybrané IDčka produktů, které chceš zobrazit


const BestFinds = async () => {

  const ids = [2020, 2576, 2125, 2956, 2263] 
  
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
      <h3 className='text-5xl'>Best finds</h3>
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