import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // ❗ DŮLEŽITÉ: Přepište toto na vaši skutečnou doménu (např. https://mojesuperboty.cz)
  // Musí to být přesně ta doména, na které web poběží v produkci.
  const baseUrl = 'https://thevaultfinds.com'

  return {
    rules: {
      userAgent: '*', // Pravidla platí pro všechny roboty
      allow: '/',     // Povolit přístup na celý web
      
      // Ochrana proti duplicitám:
      // Zakáže robotům indexovat URL, které obsahují "?q=" (vaše vyhledávání)
      // Vaše produkty a kategorie to NEOLIVNÍ (ty zůstanou povolené)
      disallow: '/*?q=*', 
    },
    // Odkaz na sitemapu, kterou jsme vytvořili v předchozím kroku
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}