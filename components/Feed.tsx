import React from 'react';
import { CreatePost } from './CreatePost';
import { Post } from './Post';
import { SmartFilters } from './SmartFilters';
import { PostData, ListingType } from '../types';

interface FeedProps {
  posts: PostData[];
  onPostClick?: (post: PostData) => void;
  onOpenCreatePost?: () => void;
  filter?: 'ALL' | ListingType;
  cityFilter?: string;
  searchQuery?: string;
}

export const Feed: React.FC<FeedProps> = ({
  posts,
  onPostClick,
  onOpenCreatePost,
  filter = 'ALL',
  cityFilter = 'ALL',
  searchQuery = ''
}) => {
  const filteredPosts = posts.filter(post => {
    // Filter by type
    if (filter !== 'ALL' && post.listingType !== filter) {
      return false;
    }

    // Filter by city
    if (cityFilter !== 'ALL') {
      const cityCode = cityFilter.toUpperCase();
      const postCity = (post.city || '').toUpperCase();
      const loc = `${post.location || ''} ${post.district || ''} ${post.address || ''}`.toLowerCase();

      const cityKeywords: Record<string, string[]> = {
        COTONOU: ['cotonou', 'bénin', 'benin', 'haie vive', 'calavi', 'akpakpa', 'fidjrossè', 'agla', 'ouidah'],
        ABIDJAN: ['abidjan', 'côte d\'ivoire', 'cote d\'ivoire', 'cocody', 'assinie', 'marcory', 'plateau', 'riviera', 'vallons'],
        DAKAR: ['dakar', 'sénégal', 'senegal', 'almadies', 'ngor', 'mamelles', 'fann'],
        LOME: ['lomé', 'lome', 'togo', 'tokoin', 'baguida']
      };

      const validKeys = cityKeywords[cityCode] || [];
      const matchesCity = postCity === cityCode || validKeys.some(keyword => loc.includes(keyword));
      if (!matchesCity) return false;
    }

    // Filter by search query
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

    return true;
  });

  return (
    <div>
      <CreatePost onOpen={onOpenCreatePost} />

      <div className="flex items-center gap-2 mb-3 px-1">
        <div className="h-[1px] bg-slate-200 flex-grow"></div>
        <span className="text-xs text-slate-500 flex items-center gap-1.5">
          <span>Marché actif :</span>
          <span className="font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded-full border border-slate-200/80 shadow-2xs">
            {filter === 'ALL'
              ? '✨ Toutes les annonces'
              : filter === 'RENTAL'
              ? '🔑 Locations'
              : filter === 'SALE'
              ? '🏷️ Ventes'
              : filter === 'INVESTMENT'
              ? '📈 Investissements'
              : '🛠️ Services'}
            {cityFilter !== 'ALL' && ` • ${cityFilter}`}
          </span>
        </span>
      </div>

      <SmartFilters />

      {filteredPosts.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow-xs text-center border border-slate-200/90 my-2">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3 text-xl">
            🔍
          </div>
          <p className="text-slate-800 font-bold mb-1">Aucune annonce trouvée dans cette catégorie.</p>
          <p className="text-xs text-slate-400">Essayez de modifier votre recherche ou de sélectionner « Zone UEMOA ».</p>
        </div>
      ) : (
        filteredPosts.map(post => (
          <Post key={post.id} post={post} onClick={() => onPostClick && onPostClick(post)} />
        ))
      )}
    </div>
  );
};
