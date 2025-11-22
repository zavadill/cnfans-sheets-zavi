"use client";

import React, { useState, useEffect, useMemo } from 'react'; 
import { Gift, Clock, CheckCircle } from 'lucide-react'; 
import Link from 'next/link'; 
import { supabase } from '@/lib/supabase'; 

// --- Důležité: Pevné datum v budoucnu pro stabilitu ---
// V produkci by se toto datum stáhlo ze serveru.
// Nastavil jsem to na pevné datum, aby byl odpočet stabilní.
const FIXED_DEADLINE_MS = new Date('2025-12-05T18:00:00+01:00').getTime(); 

const ContestWidget = () => {
  // Stanovíme startovní čas
  const [timeLeft, setTimeLeft] = useState(FIXED_DEADLINE_MS - new Date().getTime());
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'active' | 'submitted' | 'expired'>('active'); 
  const [message, setMessage] = useState('');

  // Logika Odpočtu
  useEffect(() => {
    const timer = setInterval(() => {
      const distance = FIXED_DEADLINE_MS - new Date().getTime();
      
      if (distance <= 1000) {
          clearInterval(timer);
          setTimeLeft(0);
          if (status === 'active') { // Pokud se nepřihlásil
             setStatus('expired');
          } else { // Pokud se přihlásil
             setMessage('Soutěž skončila! Vítěz bude brzy vyhlášen.');
          }
      } else {
          setTimeLeft(distance);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [status]); 

  // Formátování času
  const formatTime = (ms: number) => {
    // Používáme Math.max(0, ...) abychom neměli záporná čísla po vypršení času
    const d = Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
    const h = Math.max(0, Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const m = Math.max(0, Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)));
    const s = Math.max(0, Math.floor((ms % (1000 * 60)) / 1000));
    return { days: d, hours: h, mins: m, secs: s };
  };
  const time = formatTime(timeLeft);
  const isExpired = timeLeft <= 0;
  const isFormDisabled = status === 'submitted' || isExpired;

  // Funkce odeslání (simulace)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormDisabled || isExpired || !email) return;

    console.log("Simulace odeslání s emailem:", email);
    
    // Vizuální simulace úspěchu
    setStatus('submitted');
    setMessage('Jsi přihlášen! Čekáme na konec odpočtu.');
  };

  return (
    <div className="p-8 bg-[#1a1a1a] rounded-xl shadow-2xl shadow-blue-500/20 max-w-lg mx-auto border-2 border-blue-500/50">
      <h2 className="text-3xl font-bold text-white text-center mb-6 flex items-center justify-center">
        <Gift className="w-8 h-8 mr-3 text-blue-500" /> SOUTĚŽ: Vyhraj Yeezy Slides!
      </h2>
      
      {/* Odpočet - Zvýraznění modrou barvou */}
      <div className="flex justify-around text-center py-4 rounded-lg bg-[#121212] border border-blue-600/50">
        {Object.entries(time).map(([label, value]) => (
          <div key={label} className="w-1/4">
            <span className="text-4xl font-extrabold block text-blue-500">{value.toString().padStart(2, '0')}</span>
            <span className="text-white/60 text-sm uppercase">{label}</span>
          </div>
        ))}
      </div>

      {/* Popisek stavu */}
      <p className={`text-center text-sm mt-3 ${status === 'submitted' ? 'text-green-400' : (isExpired ? 'text-red-400' : 'text-white/80')}`}>
        {message || (isExpired ? 'Soutěž UKONČENA! Vítěz bude brzy vyhlášen.' : `Soutěž končí za ${time.days} dní, ${time.hours} hodin, ${time.mins} minut.`)}
      </p>


      {/* Formulář */}
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={isExpired ? "SOUTĚŽ UKONČENA" : "Tvůj email pro přihlášení"}
          disabled={isFormDisabled}
          required
          className="w-full p-3 bg-[#2a2a2a] text-white rounded-lg focus:ring-blue-500 focus:outline-none"
        />
        <button 
          type="submit"
          disabled={isFormDisabled}
          className="w-full sm:w-1/3 p-3 font-bold rounded-lg transition-colors 
            bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-700 disabled:text-white/40"
        >
          {isExpired ? 'Soutěž skončila' : (status === 'submitted' ? 'Jsi přihlášen! ✅' : 'Přihlásit se')}
        </button>
      </form>
      
      <p className="text-center text-xs text-white/40 mt-4">
        *Platí jen pro nové CNFans uživatele. Zkontroluj naše podmínky soutěže.
      </p>
    </div>
  );
};

export default ContestWidget;