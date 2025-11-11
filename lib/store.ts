// lib/store.ts

import { create } from 'zustand'

// 1. Definujeme "tvar" našeho store (co v něm bude)
interface NavState {
  isOpen: boolean;
  toggleMenu: () => void; // Funkce, která mění stav
}

// 2. Vytvoříme store
export const useNavStore = create<NavState>((set) => ({
  // Výchozí hodnota
  isOpen: true,
  
  // Akce (funkce), která stav změní
  // vezme 'state' a vrátí nový stav, kde je 'isOpen' opakem
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}))