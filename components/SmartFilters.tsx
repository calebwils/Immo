import React, { useState } from 'react';
import { SlidersHorizontal, Sparkles, ShieldCheck, MapPin, Banknote, FileCheck, Check } from 'lucide-react';

export const SmartFilters: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const toggle = (id: string) => {
    setActiveFilter(prev => (prev === id ? null : id));
  };

  const filters = [
    { id: 'ai', label: 'Sélection IA', icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" /> },
    { id: 'paysafe', label: 'Garantie PaySafe™', icon: <ShieldCheck className="w-3.5 h-3.5 text-slate-600" /> },
    { id: 'budget', label: 'Moins de 100k CFA', icon: <Banknote className="w-3.5 h-3.5 text-slate-600" /> },
    { id: 'title', label: 'Titre Foncier Certifié', icon: <FileCheck className="w-3.5 h-3.5 text-slate-600" /> },
    { id: 'proximity', label: 'Proche Travail', icon: <MapPin className="w-3.5 h-3.5 text-slate-600" /> },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs mb-3 p-3">
      <div className="flex justify-between items-center mb-2 px-1">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Filtres Rapides
        </h3>
        <span className="text-[11px] text-slate-700 font-semibold flex items-center gap-1 cursor-pointer hover:underline">
          <SlidersHorizontal className="w-3 h-3 text-slate-400" />
          Affiner
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
        {filters.map(f => {
          const isActive = activeFilter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => toggle(f.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <span className={isActive ? 'text-white' : ''}>{f.icon}</span>
              <span>{f.label}</span>
              {isActive && <Check className="w-3 h-3 ml-0.5 text-slate-300 stroke-[2.5]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
