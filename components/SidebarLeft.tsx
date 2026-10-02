import React from 'react';
import { Heart, ShieldCheck, PlusCircle, Search, MapPin, Sparkles } from 'lucide-react';

interface SidebarLeftProps {
  onOpenProfile?: () => void;
  onOpenCreatePost?: () => void;
  onOpenServices?: () => void;
  onOpenSearches?: () => void;
}

export const SidebarLeft: React.FC<SidebarLeftProps> = ({
  onOpenProfile,
  onOpenCreatePost,
  onOpenServices,
  onOpenSearches
}) => {
  return (
    <div className="flex flex-col gap-3.5">
      {/* Identity Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-sm transition-shadow">
        {/* Banner with Executive Dark Slate Gradient */}
        <div className="h-16 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 relative">
          <div className="absolute top-2 right-2 text-[10px] uppercase font-bold bg-white/15 backdrop-blur-xs text-white px-2 py-0.5 rounded-full tracking-wider">
            Membre Certifié
          </div>
        </div>

        {/* Avatar */}
        <div className="px-4 pb-4">
          <div className="relative -mt-9 mb-2 flex items-end justify-between">
            <div
              onClick={onOpenProfile}
              className="w-16 h-16 rounded-2xl border-2 border-white bg-slate-100 overflow-hidden cursor-pointer shadow-md hover:scale-105 transition-transform"
            >
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Caleb N."
                className="w-full h-full object-cover"
              />
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              En ligne
            </span>
          </div>

          {/* User Info */}
          <div>
            <h2
              onClick={onOpenProfile}
              className="text-base font-bold text-slate-900 hover:text-slate-700 cursor-pointer"
            >
              Caleb N.
            </h2>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> Cotonou, Bénin • Particulier
            </p>
          </div>

          {/* RentScore Widget */}
          <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                RentScore™
              </span>
              <span className="font-black text-slate-900">780 / 850</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-slate-900 h-1.5 rounded-full w-[91%]"></div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1">
              <span>Fiabilité Élevée</span>
              <span className="text-slate-700 font-medium">PaySafe Garanti ✓</span>
            </div>
          </div>

          {/* Quick Publish Action - Executive Dark Button */}
          <button
            onClick={onOpenCreatePost}
            className="w-full mt-3 py-2.5 px-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-xs shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Déposer une Annonce</span>
          </button>
        </div>

        {/* Shortcuts Section */}
        <div className="border-t border-slate-100 py-1 px-1">
          <div
            onClick={onOpenSearches}
            className="px-3 py-2 rounded-xl hover:bg-slate-50 cursor-pointer flex items-center justify-between text-xs font-semibold text-slate-700 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-slate-200">
                <Search className="w-3.5 h-3.5" />
              </div>
              <span className="group-hover:text-slate-900 font-bold">20 Demandes Clients</span>
            </div>
            <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
              UEMOA
            </span>
          </div>

          <div
            onClick={onOpenProfile}
            className="px-3 py-2 rounded-xl hover:bg-slate-50 cursor-pointer flex items-center justify-between text-xs font-semibold text-slate-700 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
                <Heart className="w-3.5 h-3.5" />
              </div>
              <span>Favoris & Alertes</span>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">3</span>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Banner - Clean Neutral */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-3.5">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-slate-700" />
          Zéro Frais d'Agence Cachés
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Paiements protégés par séquestre PaySafe™ et vérification des titres de propriété certifiés.
        </p>
      </div>

      {/* Popular Zones */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-xs">
        <div className="text-xs font-bold text-slate-800 mb-2.5 flex items-center justify-between">
          <span>Quartiers les Plus Demandés</span>
          <span className="text-[10px] text-slate-500 font-semibold">En direct</span>
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between items-center py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer text-slate-700">
            <span className="font-medium">🇧🇯 Haie Vive (Cotonou)</span>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">14 biens</span>
          </div>
          <div className="flex justify-between items-center py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer text-slate-700">
            <span className="font-medium">🇨🇮 Cocody & Riviera (Abidjan)</span>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">28 biens</span>
          </div>
          <div className="flex justify-between items-center py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer text-slate-700">
            <span className="font-medium">🇧🇯 Fidjrossè Plage</span>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">9 biens</span>
          </div>
          <div className="flex justify-between items-center py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer text-slate-700">
            <span className="font-medium">🇸🇳 Almadies (Dakar)</span>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">18 biens</span>
          </div>
        </div>
      </div>
    </div>
  );
};
