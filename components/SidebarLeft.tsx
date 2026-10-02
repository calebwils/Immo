import React from 'react';
import { Bookmark, Heart, ShieldCheck, PlusCircle, Search, Home, Building2, MapPin } from 'lucide-react';

interface SidebarLeftProps {
  onOpenProfile?: () => void;
  onOpenCreatePost?: () => void;
  onOpenServices?: () => void;
}

export const SidebarLeft: React.FC<SidebarLeftProps> = ({
  onOpenProfile,
  onOpenCreatePost,
  onOpenServices
}) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Identity Card */}
      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm relative">
        {/* Banner */}
        <div className="h-14 bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 w-full"></div>

        {/* Avatar */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div
            onClick={onOpenProfile}
            className="w-[72px] h-[72px] rounded-full border-2 border-white bg-gray-200 overflow-hidden cursor-pointer hover:opacity-90 shadow-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="mt-14 pt-2 pb-4 px-3 text-center border-b border-gray-200">
          <h2
            onClick={onOpenProfile}
            className="text-base font-semibold text-gray-900 hover:underline cursor-pointer"
          >
            Caleb N.
          </h2>
          <p className="text-xs text-gray-500 mt-0.5 flex items-center justify-center gap-1">
            <MapPin className="w-3 h-3 text-gray-400" /> Cotonou, Bénin
          </p>
          <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-800 border border-blue-200">
            Recherche active Location & Vente
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-3 border-b border-gray-200 space-y-2">
          <button
            onClick={onOpenCreatePost}
            className="w-full py-2 bg-linkedin-blue hover:bg-blue-700 text-white rounded-full font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            Publier un Bien (Location/Vente)
          </button>
        </div>

        {/* Saved & Favorites */}
        <div className="py-1">
          <div
            onClick={onOpenProfile}
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between text-xs font-semibold text-gray-700 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Biens Enregistrés</span>
            </div>
            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">3</span>
          </div>

          <div
            onClick={onOpenProfile}
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between text-xs font-semibold text-gray-700 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-blue-600" />
              <span>Recherches Sauvegardées</span>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Immo */}
      <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-4">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          Immobilier Direct & Sécurisé
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Accédez directement aux coordonnées des propriétaires et agences certifiées. Aucun intermédiaire opaque, pas de frais cachés.
        </p>
      </div>

      {/* Popular Zones */}
      <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-3">
        <div className="text-xs font-bold text-gray-800 mb-2">Quartiers Prisés</div>
        <div className="space-y-1.5 text-xs text-gray-600">
          <div className="flex justify-between hover:text-linkedin-blue cursor-pointer py-0.5">
            <span>🇧🇯 Haie Vive (Cotonou)</span>
            <span className="text-gray-400 font-mono">14 biens</span>
          </div>
          <div className="flex justify-between hover:text-linkedin-blue cursor-pointer py-0.5">
            <span>🇨🇮 Cocody & Riviera (Abidjan)</span>
            <span className="text-gray-400 font-mono">28 biens</span>
          </div>
          <div className="flex justify-between hover:text-linkedin-blue cursor-pointer py-0.5">
            <span>🇧🇯 Fidjrossè Plage</span>
            <span className="text-gray-400 font-mono">9 biens</span>
          </div>
          <div className="flex justify-between hover:text-linkedin-blue cursor-pointer py-0.5">
            <span>🇸🇳 Almadies (Dakar)</span>
            <span className="text-gray-400 font-mono">18 biens</span>
          </div>
        </div>
      </div>
    </div>
  );
};
