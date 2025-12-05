"use client"; // Potřebné pro data fetching na klientovi

import React, { useEffect, useState } from 'react';
import { Plus, RefreshCcw, Wrench, Megaphone, CalendarDays, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase'; // Import klienta

// Definice typu události
type EventType = 'new' | 'update' | 'fix' | 'info';

interface LogEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  type: EventType;
}

// Vylepšená funkce pro styly (přidány gradienty a stíny)
const getEventStyle = (type: EventType) => {
  switch (type) {
    case 'new':
      return { 
        icon: <Plus size={12} strokeWidth={3} />, 
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20', 
        dot: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]',
        label: 'NEW' 
      };
    case 'update':
      return { 
        icon: <RefreshCcw size={12} strokeWidth={3} />, 
        badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20', 
        dot: 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]',
        label: 'UPDATE' 
      };
    case 'fix':
      return { 
        icon: <Wrench size={12} strokeWidth={3} />, 
        badge: 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20', 
        dot: 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]',
        label: 'FIX' 
      };
    case 'info':
      return { 
        icon: <Megaphone size={12} strokeWidth={3} />, 
        badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20', 
        dot: 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]',
        label: 'INFO' 
      };
    default:
       return { 
        icon: <Megaphone size={12} strokeWidth={3} />, 
        badge: 'bg-gray-500/10 text-gray-400 border-gray-500/20', 
        dot: 'bg-gray-500',
        label: 'INFO' 
      };
  }
};

const EventLog = () => {
  const [events, setEvents] = useState<LogEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data, error } = await supabase
          .from('log') // Název tvé tabulky
          .select('*')
          .order('id', { ascending: false }); // Řazení od nejnovějšího (podle ID)

        if (error) {
          console.error('Chyba při načítání logů:', error);
        } else if (data) {
          setEvents(data as LogEvent[]);
        }
      } catch (err) {
        console.error('Neočekávaná chyba:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="relative group max-w-7xl mx-auto">
      {/* Dekorativní pozadí (glow efekt) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
      
      <div className="relative bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl min-h-[200px]">
        
        {isLoading ? (
          // Loading State
          <div className="flex flex-col items-center justify-center h-40 space-y-4">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="text-white/40 text-sm">Loading updates...</p>
          </div>
        ) : (
          // Scrollable kontejner s vylepšeným scrollbarem pomocí Tailwind tříd
          <div className="
            flex flex-col space-y-0 max-h-[400px] overflow-y-auto pr-2 sm:pr-4 
            [&::-webkit-scrollbar]:w-[4px] 
            [&::-webkit-scrollbar-track]:bg-white/5 
            [&::-webkit-scrollbar-track]:rounded-full 
            [&::-webkit-scrollbar-thumb]:bg-white/10 
            [&::-webkit-scrollbar-thumb]:rounded-full 
            hover:[&::-webkit-scrollbar-thumb]:bg-white/20
          ">
            
            {events.length > 0 ? (
              events.map((event, index) => {
                const style = getEventStyle(event.type);
                const isFirst = index === 0;
                
                return (
                  <div key={event.id || index} className="relative pl-8 sm:pl-12 py-4 first:pt-0 last:pb-0 group/item">
                    
                    {/* Časová osa (Gradient Line) */}
                    {index !== events.length - 1 && (
                      <div className="absolute left-[5px] sm:left-[6px] top-6 bottom-[-24px] w-[2px] bg-gradient-to-b from-white/10 to-transparent group-last/item:hidden" />
                    )}

                    {/* Kulička na ose */}
                    <div className={`
                      absolute left-0 sm:left-[1px] top-1.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full 
                      border-2 border-[#1a1a1a] z-10 transition-transform duration-300 group-hover/item:scale-125
                      ${style.dot}
                    `}>
                      {/* Ping animace jen pro nejnovější příspěvek */}
                      {isFirst && (
                        <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${style.dot.split(' ')[0]}`}></span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 transition-all duration-300 group-hover/item:translate-x-1">
                      {/* Hlavička: Datum a Badge */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <span className={`
                          inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-bold border tracking-wider transition-colors
                          ${style.badge}
                        `}>
                          {style.icon} {style.label}
                        </span>
                        
                        <span className="flex items-center text-xs text-white/40 font-mono">
                          <CalendarDays size={12} className="mr-1.5 opacity-50" />
                          {event.date}
                        </span>
                      </div>

                      {/* Obsah */}
                      <div className="space-y-1">
                        <h5 className="text-base sm:text-lg font-bold text-white group-hover/item:text-white/90 transition-colors">
                          {event.title}
                        </h5>
                        <p className="text-sm text-white/50 leading-relaxed max-w-xl group-hover/item:text-white/70 transition-colors">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-white/40 text-center py-10">No updates found.</p>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default EventLog;