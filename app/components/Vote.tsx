"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowUp, Sparkles, Send, Loader2, Trophy } from "lucide-react";
import gsap from "gsap";

type Suggestion = {
  id: number;
  text: string;
  votes: number;
};

export default function SuggestionBox() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [votedIds, setVotedIds] = useState<number[]>([]);

  // Refs pro GSAP animace
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // 1. Načtení návrhů při startu
  useEffect(() => {
    fetchSuggestions();
    
    const localVotes = localStorage.getItem("votedSuggestions");
    if (localVotes) {
      setVotedIds(JSON.parse(localVotes));
    }

    // Úvodní animace hlavičky a formuláře
    const ctx = gsap.context(() => {
      gsap.from(".header-anim", {
        y: -30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animace seznamu při načtení dat (pouze pokud se změní počet položek)
  useEffect(() => {
    if (suggestions.length > 0 && listRef.current) {
      gsap.fromTo(
        ".suggestion-item",
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.2)",
          clearProps: "all", // Po animaci vyčistit styly, aby neblokovaly hover efekty
        }
      );
    }
  }, [suggestions.length]);

  const fetchSuggestions = async () => {
    const { data } = await supabase
      .from("suggestions")
      .select("*")
      .order("votes", { ascending: false })
      .limit(20);

    if (data) setSuggestions(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    setLoading(true);
    
    // Animace tlačítka při odeslání
    gsap.to(".submit-btn", { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });

    const { error } = await supabase
      .from("suggestions")
      .insert([{ text: newItem, votes: 1 }]);

    if (!error) {
      setNewItem("");
      fetchSuggestions();
    } else {
      console.error(error);
    }
    setLoading(false);
  };

  const handleVote = async (id: number, currentVotes: number) => {
    // Zjistíme, zda uživatel tento hlas odebírá nebo přidává
    const isRemovingVote = votedIds.includes(id);
    const newVotes = isRemovingVote ? currentVotes - 1 : currentVotes + 1;

    // GSAP animace
    if (!isRemovingVote) {
      // "Bump" nahoru při přidání
      gsap.fromTo(
        `#vote-btn-${id}`,
        { scale: 1 },
        { scale: 1.2, duration: 0.15, yoyo: true, repeat: 1, ease: "power1.out" }
      );
    } else {
      // Jemné zmenšení při odebrání
      gsap.fromTo(
        `#vote-btn-${id}`,
        { scale: 1 },
        { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1, ease: "power1.out" }
      );
    }

    // Optimistický update UI (změníme číslo hned na obrazovce)
    setSuggestions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, votes: newVotes } : item
      )
    );

    // Update LocalStorage a State
    let newVotedIds;
    if (isRemovingVote) {
      newVotedIds = votedIds.filter((voteId) => voteId !== id);
    } else {
      newVotedIds = [...votedIds, id];
    }
    
    setVotedIds(newVotedIds);
    localStorage.setItem("votedSuggestions", JSON.stringify(newVotedIds));

    // Odešleme do databáze
    await supabase
      .from("suggestions")
      .update({ votes: newVotes })
      .eq("id", id);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-7xl mx-auto mt-12 p-1"
    >
      {/* Dekorativní pozadí s gradientem - změněno na modré tóny */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-indigo-500/10 to-cyan-500/10 blur-3xl -z-10 rounded-full opacity-50" />

      <div className="bg-[#121212]/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
        
        {/* Hlavička */}
        <div className="header-anim flex items-center gap-3 mb-2">
          <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 font-mono">
            Community Requests
          </h3>
        </div>
        
        <p className="header-anim text-gray-400 mb-8 ml-1">
          Help us decide what to hunt next. Add your grail or vote for others!
        </p>

        {/* Input Formulář */}
        <form onSubmit={handleSubmit} className="header-anim group relative flex gap-3 mb-10">
          <div className="relative flex-1">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="E.g. Jordan 4 Retro Black Cat..."
              className="w-full bg-[#1a1a1a] text-white border border-white/10 rounded-xl px-5 py-4 pl-5 focus:outline-none focus:border-[#3b82f6]/50 focus:ring-1 focus:ring-[#3b82f6]/50 transition-all placeholder:text-gray-600"
              maxLength={50}
            />
            {newItem.length > 0 && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                {newItem.length}/50
              </span>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading || !newItem.trim()}
            className="submit-btn bg-[#3b82f6] text-white font-bold px-6 rounded-xl hover:bg-[#60a5fa] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Add</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Seznam návrhů */}
        <div ref={listRef} className="space-y-3">
          {suggestions.length === 0 ? (
            <div className="text-center py-12 bg-white/5 rounded-xl border border-dashed border-white/10">
              <Trophy className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No requests yet. Be the first to start the trend!</p>
            </div>
          ) : (
            suggestions.map((item, index) => {
              const isTop3 = index < 3;
              const hasVoted = votedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`suggestion-item group flex justify-between items-center p-4 rounded-xl border transition-all duration-300 ${
                    isTop3 
                      ? "bg-gradient-to-r from-[#1a1a1a] to-[#222] border-white/10 hover:border-[#3b82f6]/30" 
                      : "bg-[#1a1a1a] border-transparent hover:bg-[#222]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {isTop3 && (
                      <span className="flex items-center justify-center w-6 h-6 text-xs font-bold text-[#121212] bg-white/20 rounded-full">
                        #{index + 1}
                      </span>
                    )}
                    <span className={`font-medium text-lg ${hasVoted ? "text-white" : "text-white/80"}`}>
                      {item.text}
                    </span>
                  </div>
                  
                  <button
                    id={`vote-btn-${item.id}`}
                    onClick={() => handleVote(item.id, item.votes)}
                    className={`group/btn relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all overflow-hidden ${
                      hasVoted
                        ? "bg-[#3b82f6] text-white font-bold shadow-[0_0_10px_rgba(59,130,246,0.2)] hover:bg-[#60a5fa]"
                        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <ArrowUp 
                      className={`w-4 h-4 transition-transform duration-300 ${
                        hasVoted ? "stroke-2 rotate-0" : "group-hover/btn:-translate-y-0.5"
                      }`} 
                    />
                    <span className="font-medium min-w-[1ch] text-center">{item.votes}</span>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}