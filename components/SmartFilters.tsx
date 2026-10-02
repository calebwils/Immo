
import React from 'react';
import { SlidersHorizontal, Sparkles, ShieldCheck, MapPin, Banknote } from 'lucide-react';

export const SmartFilters: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-300 shadow-sm mb-2 p-3">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Filtres Intelligents</h3>
        <button className="text-xs text-linkedin-blue font-semibold hover:underline flex items-center gap-1">
          <SlidersHorizontal className="w-3 h-3" />
          Avancé
        </button>
      </div>
      
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-bold whitespace-nowrap hover:bg-green-100 transition-colors">
          <Sparkles className="w-3 h-3" />
          Recommandé IA
        </button>
        
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-600 border border-gray-400 rounded-full text-xs font-semibold whitespace-nowrap hover:bg-gray-100 transition-colors hover:border-gray-500">
          <ShieldCheck className="w-3 h-3 text-yellow-600" />
          PaySafe™ Uniquement
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-600 border border-gray-400 rounded-full text-xs font-semibold whitespace-nowrap hover:bg-gray-100 transition-colors hover:border-gray-500">
          <Banknote className="w-3 h-3" />
          Moins de 100k CFA
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-600 border border-gray-400 rounded-full text-xs font-semibold whitespace-nowrap hover:bg-gray-100 transition-colors hover:border-gray-500">
          <MapPin className="w-3 h-3" />
          Proche Travail
        </button>
        
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-600 border border-gray-400 rounded-full text-xs font-semibold whitespace-nowrap hover:bg-gray-100 transition-colors hover:border-gray-500">
          Paiement Mensuel
        </button>
      </div>
    </div>
  );
};
