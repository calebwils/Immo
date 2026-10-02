import React from 'react';
import { Home, Search, Plus, Wallet, User } from 'lucide-react';
import { ListingType } from '../types';

interface MobileBottomNavProps {
  currentFilter: 'ALL' | ListingType;
  onFilterChange: (filter: 'ALL' | ListingType) => void;
  onOpenCreatePost: () => void;
  onOpenWallet: () => void;
  onOpenProfile: () => void;
  onOpenNotifications: () => void;
  notificationCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentFilter,
  onFilterChange,
  onOpenCreatePost,
  onOpenWallet,
  onOpenProfile,
  onOpenNotifications,
  notificationCount = 2
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] px-2 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {/* Feed / Accueil */}
        <button
          type="button"
          onClick={() => onFilterChange('ALL')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            currentFilter === 'ALL'
              ? 'text-slate-950 font-bold'
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <Home className={`w-5 h-5 transition-transform ${currentFilter === 'ALL' ? 'scale-110 stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">Accueil</span>
        </button>

        {/* Biens / Explorer */}
        <button
          type="button"
          onClick={() => onFilterChange(currentFilter === 'RENTAL' ? 'SALE' : 'RENTAL')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            currentFilter === 'RENTAL' || currentFilter === 'SALE'
              ? 'text-slate-950 font-bold'
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <Search className={`w-5 h-5 transition-transform ${currentFilter === 'RENTAL' || currentFilter === 'SALE' ? 'scale-110 stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">
            {currentFilter === 'SALE' ? 'Achats' : 'Biens'}
          </span>
        </button>

        {/* Floating Center Action: Publier (Executive Slate) */}
        <div className="relative -top-3">
          <button
            type="button"
            onClick={onOpenCreatePost}
            aria-label="Publier une annonce"
            className="w-12 h-12 rounded-full bg-slate-900 hover:bg-black text-white flex items-center justify-center shadow-lg shadow-slate-900/30 active:scale-95 transition-all hover:scale-105 ring-4 ring-white"
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Portefeuille / Solde */}
        <button
          type="button"
          onClick={onOpenWallet}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-400 hover:text-slate-700 transition-all active:scale-95"
        >
          <Wallet className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">Solde</span>
        </button>

        {/* Profil */}
        <button
          type="button"
          onClick={onOpenProfile}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-400 hover:text-slate-700 transition-all active:scale-95 relative"
        >
          <div className="relative">
            <User className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-amber-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border border-white">
                {notificationCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Compte</span>
        </button>
      </div>
    </div>
  );
};
