// app/products/[id]/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { ExternalLink } from 'lucide-react';

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>
};

async function getProduct(id: string) {
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  return product;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    return {
      title: 'Product Not Found',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${product.title}`,
    openGraph: {
      title: `${product.title}`,
      images: [
        {
          url: `/productsImage/${product.url}`,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title}`,
      images: [`/productsImage/${product.url}`],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6 lg:p-12 font-sans">
      <div className="max-w-5xl pt-15 w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        <div className="flex justify-center w-full h-full relative p-4">
           <Image 
             src={`/productsImage/${product.url}`} 
             alt={product.title} 
             width={1000} 
             height={1000}
             priority={true}
             className="w-full max-w-[500px] h-auto object-cover rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] bg-[#121212] border border-white/10 z-10"
           />
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              {product.title}
            </h1>
          </div>

          <div className="text-5xl font-semibold text-white/90">
            $ {product.price} <span className="text-xl text-white/50 font-normal">USD</span>
          </div>

          <div className="pt-2 w-full md:w-auto font-mono">
            <Link 
              href={product.aff} 
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full md:w-auto inline-flex items-center justify-center px-8 py-4 text-xl font-bold text-white transition-all duration-300 bg-blue-600 hover:bg-blue-700 rounded-2xl hover:shadow-xl hover:shadow-blue-900/20 hover:-translate-y-0.5"
            >
              Buy on CnFans
              <ExternalLink size={22} className="ml-3 text-white/80 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}