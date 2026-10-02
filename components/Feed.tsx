import React, { useState } from 'react';
import { Plus, Sparkles, ShieldCheck, Banknote, FileCheck, Check, Filter } from 'lucide-react';
import { Post } from './Post';
import { PostData, ListingType } from '../types';

interface FeedProps {
  posts: PostData[];
  onPostClick?: (post: PostData) => void;
  onOpenCreatePost?: () => void;
  filter?: 'ALL' | ListingType;
  cityFilter?: string;
  searchQuery?: string;
  userAvatar?: string;
}

const SMART_FILTERS = [
  { id: 'ai', label: 'Sélection IA', icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" /> },
  { id: 'paysafe', label: 'Garantie PaySafe™', icon: <ShieldCheck className="w-3.5 h-3.5 text-slate-600" /> },
  { id: 'budget', label: 'Moins de 100k CFA', icon: <Banknote className="w-3.5 h-3.5 text-slate-600" /> },
  { id: 'title', label: 'Titre Foncier Certifié', icon: <FileCheck className="w-3.5 h-3.5 text-slate-600" /> },
];

export const Feed: React.FC<FeedProps> = ({
  posts,
  onPostClick,
  onOpenCreatePost,
  filter = 'ALL',
  cityFilter = 'ALL',
  searchQuery = '',
  userAvatar
}) => {
  const [activeSmartFilter, setActiveSmartFilter] = useState<string | null>(null);

  const toggleSmartFilter = (id: string) => {
    setActiveSmartFilter(prev => (prev === id ? null : id));
  };

  const filteredPosts = posts.filter(post => {
    // 1. Filter by transaction type
    if (filter !== 'ALL' && post.listingType !== filter) {
      return false;
    }

    // 2. Filter by city
    if (cityFilter !== 'ALL') {
      const cityCode = cityFilter.toUpperCase();
      const postCity = (post.city || '').toUpperCase();
      const loc = `${post.location || ''} ${post.district || ''} ${post.address || ''}`.toLowerCase();

      const cityKeywords: Record<string, string[]> = {
        COTONOU: ['cotonou', 'bénin', 'benin', 'haie vive', 'calavi', 'akpakpa', 'fidjrossè', 'agla', 'ouidah'],
        ABIDJAN: ['abidjan', "côte d'ivoire", "cote d'ivoire", 'cocody', 'assinie', 'marcory', 'plateau', 'riviera', 'vallons'],
        DAKAR: ['dakar', 'sénégal', 'senegal', 'almadies', 'ngor', 'mamelles', 'fann'],
        LOME: ['lomé', 'lome', 'togo', 'tokoin', 'baguida']
      };

      const validKeys = cityKeywords[cityCode] || [];
      const matchesCity = postCity === cityCode || validKeys.some(keyword => loc.includes(keyword));
      if (!matchesCity) return false;
    }

    // 3. Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesQuery =
        (post.content || '').toLowerCase().includes(q) ||
        (post.location || '').toLowerCase().includes(q) ||
        (post.district || '').toLowerCase().includes(q) ||
        (post.city || '').toLowerCase().includes(q) ||
        (post.author.name || '').toLowerCase().includes(q) ||
        (post.price || '').toLowerCase().includes(q) ||
        (post.legalTitle || '').toLowerCase().includes(q) ||
        (post.specs || '').toLowerCase().includes(q);
      if (!matchesQuery) return false;
    }

    // 4. Smart quick filters
    if (activeSmartFilter === 'ai' && !post.isAiRecommended) {
      return false;
    }
    if (activeSmartFilter === 'paysafe' && !post.legalTitle && post.author.role !== 'AGENCY') {
      return false;
    }
    if (activeSmartFilter === 'title' && !post.legalTitle) {
      return false;
    }
    if (activeSmartFilter === 'budget') {
      const priceDigits = (post.price || '').replace(/[^0-9]/g, '');
      const priceNum = parseInt(priceDigits, 10);
      if (priceNum && priceNum > 150000 && post.listingType === 'RENTAL') {
        return false;
      }
    }

    return true;
  });

  return (
    <div>
      {/* UNIFIED COMPACT CONTROL BAR (Option 1: Publication + Filtres fusionnés) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-3 sm:p-3.5 mb-3.5 space-y-2.5">
        {/* Row 1: Direct Publisher Input */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div
            onClick={onOpenCreatePost}
            className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200 cursor-pointer hover:ring-2 hover:ring-slate-300 transition-all shadow-2xs"
            title="Publier une annonce"
          >
            <img
              src={
                userAvatar ||
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              }
              alt="Profil"
              className="w-full h-full object-cover"
            />
          </div>

          <button
            type="button"
            onClick={onOpenCreatePost}
            className="flex-grow text-left px-3.5 sm:px-4 py-2 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs sm:text-sm text-slate-500 hover:text-slate-800 transition-all truncate"
          >
            Publier un bien ou déposer une demande...
          </button>

          <button
            type="button"
            onClick={onOpenCreatePost}
            className="px-3.5 py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 active:scale-95 flex-shrink-0"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden xs:inline">Déposer</span>
          </button>
        </div>

        {/* Row 2: Seamless Scrollable Filter Chips + Active Market Badge */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1 py-0.5">
            {/* Active market indicator pill if filtered */}
            {filter !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200 flex-shrink-0">
                {filter === 'RENTAL' ? '🔑 Locations' : filter === 'SALE' ? '🏷️ Ventes' : '📈 Investissements'}
              </span>
            )}

            {/* Smart Filter Pills */}
            {SMART_FILTERS.map(f => {
              const isActive = activeSmartFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => toggleSmartFilter(f.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95 flex-shrink-0 ${
                    isActive
                      ? 'bg-slate-900 text-white font-bold shadow-xs'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className={isActive ? 'text-white' : ''}>{f.icon}</span>
                  <span>{f.label}</span>
                  {isActive && <Check className="w-3 h-3 ml-0.5 text-slate-300 stroke-[2.5]" />}
                </button>
              );
            })}
          </div>

          {/* Quick Count Indicator */}
          <span className="text-[11px] font-medium text-slate-400 flex-shrink-0 hidden sm:inline pl-1">
            {filteredPosts.length} bien{filteredPosts.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Property Listings Feed */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow-xs text-center border border-slate-200/90 my-2">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3 text-xl">
            🔍
          </div>
          <p className="text-slate-800 font-bold mb-1">Aucune annonce trouvée avec ces critères.</p>
          <p className="text-xs text-slate-400">
            {activeSmartFilter ? 'Essayez de désactiver le filtre sélectionné.' : 'Essayez de sélectionner « Zone UEMOA ».'}
          </p>
        </div>
      ) : (
        filteredPosts.map(post => (
          <Post key={post.id} post={post} onClick={() => onPostClick && onPostClick(post)} />
        ))
      )}
    </div>
  );
};
