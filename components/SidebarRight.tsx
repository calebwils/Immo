import React from 'react';
import { TrendingUp, Info, Star, ShieldCheck, Search, ChevronRight, Sparkles } from 'lucide-react';
import { MOCK_SEARCHES } from '../data/mockDb';

interface SidebarRightProps {
  onOpenServices?: () => void;
  onOpenSearches?: () => void;
}

const NewsItem: React.FC<{ title: string; subtitle: string; tag: string }> = ({ title, subtitle, tag }) => (
  <div className="cursor-pointer hover:bg-slate-50 p-2.5 rounded-xl transition-colors flex items-start gap-2.5">
    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0"></div>
    <div>
      <h3 className="text-xs font-semibold text-slate-800 line-clamp-2 leading-snug">{title}</h3>
      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-1">
        <span>{subtitle}</span>
        <span>•</span>
        <span className="font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.2 rounded">{tag}</span>
      </div>
    </div>
  </div>
);

const ArtisanItem: React.FC<{ name: string; role: string; rating: number; img: string }> = ({ name, role, rating, img }) => (
  <div className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
    <img src={img} alt={name} className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
    <div className="flex-grow min-w-0">
      <h4 className="text-xs font-bold text-slate-900 group-hover:text-slate-700 flex items-center gap-1 truncate">
        {name}
        <ShieldCheck className="w-3 h-3 text-slate-500 flex-shrink-0" />
      </h4>
      <p className="text-[11px] text-slate-500 truncate">{role}</p>
    </div>
    <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-lg flex-shrink-0">
      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
      <span className="text-[11px] font-bold text-slate-800">{rating}</span>
    </div>
  </div>
);

export const SidebarRight: React.FC<SidebarRightProps> = ({ onOpenServices, onOpenSearches }) => {
  const latestSearches = MOCK_SEARCHES.slice(0, 3);

  return (
    <div className="flex flex-col gap-3.5">
      {/* Client Searches Widget - Executive Slate */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-slate-900 px-3.5 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Demandes Clients ({MOCK_SEARCHES.length})</h3>
          </div>
          <span className="text-[10px] bg-white/10 font-medium px-2 py-0.5 rounded-full">
            15 Loc. • 5 Ventes
          </span>
        </div>

        <div className="p-3 space-y-2">
          <p className="text-[11px] text-slate-500">
            Acheteurs et locataires solvables avec budget validé :
          </p>

          {latestSearches.map(s => (
            <div 
              key={s.id} 
              onClick={onOpenSearches}
              className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-bold text-slate-900 truncate pr-2">{s.client.name}</span>
                <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wide ${
                  s.transactionType === 'SALE' ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-800'
                }`}>
                  {s.transactionType === 'SALE' ? 'Achat' : 'Location'}
                </span>
              </div>
              <p className="text-xs text-slate-700 line-clamp-1 font-semibold">{s.title}</p>
              <div className="flex items-center justify-between mt-1.5 text-[10px] text-slate-500">
                <span className="font-medium">📍 {s.city}</span>
                <span className="font-bold text-slate-900">{s.budgetMax.toLocaleString('fr-FR')} CFA</span>
              </div>
            </div>
          ))}

          <button
            onClick={onOpenSearches}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Voir les 20 demandes clients</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Marché & Signaux Immo */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3.5">
        <div className="flex justify-between items-center mb-2 px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Signaux & Marché UEMOA
          </h2>
          <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
        </div>
        
        <div className="space-y-1">
          <NewsItem title="Cadastre numérique et titres fonciers au Bénin" subtitle="Il y a 2h" tag="Innovation" />
          <NewsItem title="Garantie PaySafe pour sécuriser 100% des loyers" subtitle="Il y a 10h" tag="FinTech" />
          <NewsItem title="Top 10 Quartiers Rentables à Abidjan (Rendement > 11%)" subtitle="Il y a 18h" tag="Invest" />
          <NewsItem title="Paiement par Mobile Money sans commission locataire" subtitle="Il y a 2j" tag="Sécurité" />
        </div>
      </div>

      {/* Suggested Artisans */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3.5">
        <div className="flex justify-between items-center mb-2 px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Artisans Certifiés</h3>
          <span 
            onClick={onOpenServices}
            className="text-xs text-slate-600 font-semibold cursor-pointer hover:underline"
          >
            Voir tout
          </span>
        </div>
        <div className="space-y-1">
          <ArtisanItem 
            name="Eric K." 
            role="Électricien & Domotique" 
            rating={4.9} 
            img="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
          />
          <ArtisanItem 
            name="Sarah M." 
            role="Designer d'Intérieur" 
            rating={4.8} 
            img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
          />
          <ArtisanItem 
            name="Bâtisseurs Pro" 
            role="Gros Œuvre & Rénovation" 
            rating={4.7} 
            img="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
          />
        </div>
        <button 
          onClick={onOpenServices}
          className="w-full mt-2.5 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Trouver un artisan qualifié
        </button>
      </div>

      {/* Footer Info */}
      <div className="px-3 text-[11px] text-slate-400 text-center">
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 my-1 font-medium">
          <span className="hover:text-slate-700 hover:underline cursor-pointer">À propos</span>
          <span className="hover:text-slate-700 hover:underline cursor-pointer">Garantie PaySafe</span>
          <span className="hover:text-slate-700 hover:underline cursor-pointer">Aide & Contact</span>
          <span className="hover:text-slate-700 hover:underline cursor-pointer">Sécurité</span>
        </div>
        <p className="mt-1">IMMO Africa © 2026 • Réseau PropTech</p>
      </div>
    </div>
  );
};
