// components/Footer.tsx
import React from 'react'
import Link from 'next/link' // We use Link for email

const Footer = () => {
  return (
    // We use the semantic <footer> tag
    <footer className="w-full bg-[#101010] text-white/40 text-xs p-10 text-center">
      <div className="max-w-4xl mx-auto flex flex-col space-y-4">
        <p>
          © 2025 cnfanssheetszavi.com
        </p>
        <p>
          cnfanssheetszavi.com is an independent platform and is not affiliated with or endorsed by the CNFans.com website or brand. The primary function of our website is to facilitate the discovery of products available on the CNFans website. cnfanssheetszavi.com is intended exclusively for private users and does not operate as a marketplace.
        </p>
        <p>
          This website does not offer physical products for sale nor does it participate in any commercial activities. Our sole purpose is to provide information to visitors. We do not act as an intermediary or any other part of the supply chain.
        </p>
        <p>
          No information found on cnfanssheetszavi.com should be construed as advice of any kind. We do not endorse or recommend the purchase of any products. This platform is not engaged in the sale of any items. All purchases are made at the user's own discretion and risk. The mention of product names and their identification is presented solely for educational identification purposes, and cnfanssheetszavi.com maintains no relationships with any products or brands presented.
        </p>
        <p>
          <strong>Affiliate Disclaimer:</strong> Please note that this website contains affiliate links. This means we may earn a small commission from our registration links. We do not earn commissions from any individual products sold, only from the shipping costs of parcels for their function as a freight forwarder. It is therefore not our responsibility what you buy. These commissions contribute to the ongoing maintenance and development of our website at no additional cost to you. We sincerely thank you for your support.
        </p>
        <p>
          <strong>Disclaimer:</strong> The content of external websites is beyond our control, and we bear no responsibility for it. cnfanssheetszavi.com has no affiliation with Weidian.com, Taobao.com, 1688.com, tmall.com, or any other online shopping platforms.
        </p>
        <p>
          Contact us at
          <a 
            href="mailto:zavi@cnfanssheets.com" 
            className="text-white/70 hover:text-white transition-colors underline ml-1"
          >
            zavi@cnfanssheets.com
          </a>
          , if you wish to report any errors, copyright issues, or have any questions.
        </p>
      </div>
    </footer>
  )
}

export default Footer