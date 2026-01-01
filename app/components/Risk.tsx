import React from 'react';
import { ShieldAlert, Chrome, CheckCircle2 } from 'lucide-react';

const Risk = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 font-sans py-10">
      {/* Hlavní karta s tmavým pozadím a glow efektem */}
      <div className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#1a1a1a] p-8 md:p-12">
        
        {/* Dekorativní pozadí (Glow efekt - červená pro "Risk") */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-900 to-orange-900 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 z-10">
          
          {/* Levá část: Text a CTA */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center md:justify-start gap-3 font-mono">
                <ShieldAlert className="text-red-500 w-8 h-8 md:w-10 md:h-10" />
                Risk Reminder?
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Are annoying "High Risk" popups blocking you from viewing products on CnFans? 
                Use the official <strong>Clean View</strong> extension to bypass these warnings and browse seamlessly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <a 
                href="https://chromewebstore.google.com/detail/cnfans-clean-view/khcgbbbfonocoahmicmmnkoobckjdggc?utm_source=item-share-cb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1"
              >
                <Chrome className="w-6 h-6" />
                Add to Chrome
              </a>
              <span className="text-sm text-gray-500">Free • 5 Star Rating</span>
            </div>
          </div>

          {/* Pravá část: Vizuální ukázka */}
          <div className="w-full md:w-1/3 flex justify-center relative">
             {/* Simulace Alertu */}
             <div className="bg-neutral-900 p-6 rounded-xl border border-red-500/20 shadow-xl backdrop-blur-sm transform rotate-3 transition-transform group-hover:rotate-0">
                <div className="flex items-center gap-2 mb-4 text-red-500 border-b border-white/5 pb-3">
                    <ShieldAlert className="w-6 h-6" />
                    <span className="font-bold tracking-wider">SYSTEM WARNING</span>
                </div>
                <div className="space-y-3 opacity-50 blur-[1px] group-hover:blur-0 group-hover:opacity-100 transition-all">
                    <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-700 rounded w-5/6"></div>
                </div>
                
                {/* Overlay "Fixed" */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl backdrop-blur-[2px]">
                    <div className="bg-green-500/20 text-green-400 border border-green-500/50 px-4 py-2 rounded-full flex items-center gap-2 font-bold shadow-lg transform scale-110">
                        <CheckCircle2 className="w-5 h-5" />
                        Clean View Active
                    </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Risk;