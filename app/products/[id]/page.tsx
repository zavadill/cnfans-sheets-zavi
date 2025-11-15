// app/products/[id]/page.tsx

// 1. Musíme importovat React, abychom mohli použít 'use'
import Link from 'next/link';
import React from 'react';
import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
// 2. Upravíme typ: 'params' je 'Promise'
type ProductPageProps = {
  params: Promise<{
    id: string; // Jméno 'id' se musí shodovat se složkou [id]
  }>
};


// 3. Funkce NENÍ 'async'
export default function ProductPage({ params }: ProductPageProps) {
  
  // 4. TADY POUŽIJEME React.use() pro "rozbalení" Promise
  const resolvedParams = React.use(params);
  
  // 5. Teď můžeme bezpečně přistoupit k 'id'
  const productId = resolvedParams.id;



  const product = products.find(p => p.id === productId);

  if (!product) {
    // Pokud 'product' je 'undefined' (nenašel se),
    // Next.js zastaví renderování a zobrazí 404 stránku (not-found.tsx)
    notFound()
  }





  return (
    <div className='min-h-screen bg-blue-950/40 flex justify-center items-center text-white'>
      <div className='flex flex-col-reverse pt-30 sm:flex-row items-center gap-20'>
        <div className='gap-5 flex flex-col'>
          <Image src={product.url} alt={product.title}  height={200} width={400} className='w-90 h-auto'/>
          <div className='w-90 h-50 bg-gray-600'/>
        </div>
        <div className='text-center text-2xl space-y-5'>
          <h1 className='text-5xl'>{product.title}</h1>
          <h2>$ {product.price}</h2>
          <h3 className=''><Link href={product.aff} className='px-5 py-2 rounded-lg bg-blue-600/40 '>CnFans Link</Link></h3>
        </div>
      </div>
    </div>
  )
}