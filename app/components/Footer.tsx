// components/Footer.tsx
import React from 'react'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#101010] text-white/50 text-xs border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-left">
          
          {/* --- 1. SEKCE: O WEBU (Branding) --- */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-lg font-bold mb-4">TheVault Finds</h3>
            <p className="mb-4 max-w-md">
              Your ultimate source for the best CNFans finds, QC photos, and hidden gems. 
              We help you navigate the world of reps with ease.
            </p>
            <p>
              Contact: 
              <a href="mailto:thevault.sheet@gmail.com" className="text-blue-600 hover:underline ml-1">
                thevault.sheet@gmail.com
              </a>
            </p>
          </div>

          {/* --- 2. SEKCE: RYCHLÉ ODKAZY (SEO Prolinkování) --- */}
          {/* Toto je klíčové pro SEO - Google tudy prochází tvůj web */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider">Categories</h4>
            <nav>
              <ul className="space-y-2">
                <li><Link href="/category/shoes" className="hover:text-blue-600/90 transition-colors">Shoes</Link></li>
                <li><Link href="/category/hoodies-sweaters" className="hover:text-blue-600/90 transition-colors">Hoodies & Sweaters</Link></li>
                <li><Link href="/category/t-shirts" className="hover:text-blue-600/90 transition-colors">T-Shirts</Link></li>
                <li><Link href="/category/jackets" className="hover:text-blue-600/90 transition-colors">Jackets</Link></li>
                <li><Link href="/category/accessories" className="hover:text-blue-600/90 transition-colors">Accessories</Link></li>
              </ul>
            </nav>
          </div>
          
        </div>

        {/* --- 4. SEKCE: LEGAL (Disclaimer) --- */}
        <div className="border-t border-white/10 pt-8 text-justify space-y-3 text-[10px] leading-relaxed opacity-60">
            <p>
              © {currentYear} cnfanssheetszavi.com. All rights reserved.
            </p>
            <p>
              cnfanssheetszavi.com is an independent platform and is not affiliated with or endorsed by the CNFans.com website or brand. The primary function of our website is to facilitate the discovery of products available on the CNFans website. This website is intended exclusively for private users and does not operate as a marketplace.
            </p>
            <p>
              We do not offer physical products for sale nor do we participate in any trading activities. Our sole purpose is to provide information. We do not act as an intermediary or any part of the supply chain. No information found on this website should be construed as professional advice. We do not endorse the purchase of any specific products. All purchases are made at the user's own discretion and risk.
            </p>
            <p>
              <strong>Affiliate Disclaimer:</strong> This website contains affiliate links. We may earn a small commission from registration links or shipping fees. We do not earn commissions from individual products sold. This helps support the maintenance of the site at no extra cost to you.
            </p>
            <p>
              <strong>Disclaimer:</strong> External website content is beyond our control. We hold no responsibility for Weidian, Taobao, 1688, or other platforms linked from here.
            </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer