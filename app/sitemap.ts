import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

// ❗ ZMĚŇTE NA SVOJI SKUTEČNOU DOMÉNU
const BASE_URL = 'https://vas-web.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  
  // 1. ZÍSKÁNÍ DAT ZE SUPABASE
  // Stáhneme ID a KATEGORIE všech produktů.
  // Nepotřebujeme stahovat všechno (*), stačí nám sloupce pro URL.
  const { data: products, error } = await supabase
    .from('products')
    .select('id, category, title') 
    // Můžete přidat .order, pokud chcete, ale pro sitemap to není nutné

  if (error || !products) {
    console.error("Chyba při generování sitemap:", error)
    // Pokud selže databáze, vrátíme alespoň hlavní stranu, aby sitemap nespadl
    return [
      {
        url: BASE_URL,
        lastModified: new Date(),
      },
    ]
  }

  // 2. DEFINICE STATICKÝCH STRÁNEK (Homepage)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1, // Hlavní stránka je nejdůležitější
    },
  ]

  // 3. GENERUJEME URL PRO PRODUKTY (/products/[id])
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${product.id}`,
    // Pokud máte v DB sloupec 'updated_at', použijte: new Date(product.updated_at)
    lastModified: new Date(), 
    changeFrequency: 'weekly',
    priority: 0.8, // Produkty mají vysokou prioritu
  }))

  // 4. GENERUJEME URL PRO KATEGORIE (/category/[category])
  // Produkty se opakují, ale kategorie chceme v mapě jen jednou.
  // Použijeme Set pro získání unikátních názvů.
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)))

  const categoryRoutes: MetadataRoute.Sitemap = uniqueCategories.map((category) => ({
    // Pozor na mezery v URL, encodeURIComponent je bezpečně převede (např. "Air Jordan" -> "Air%20Jordan")
    url: `${BASE_URL}/category/${encodeURIComponent(category)}`,
    lastModified: new Date(),
    changeFrequency: 'daily', // Kategorie se mění často (přibývají produkty)
    priority: 0.9,
  }))

  // 5. SLOUČENÍ VŠEHO DOHROMADY
  return [...staticRoutes, ...categoryRoutes, ...productRoutes]
}