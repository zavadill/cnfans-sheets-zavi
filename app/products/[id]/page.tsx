// app/products/[id]/page.tsx

// 1. Musíme importovat React, abychom mohli použít 'use'
import React from 'react';

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

  return (
    <div className='h-screen flex justify-center items-center text-white text-3xl'>
      ID produktu z URL je: {productId}
    </div>
  )
}