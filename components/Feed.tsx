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
      const loc = (post.location || '').toLowerCase();
      const cityKeywords: Record<string, string[]> = {
        COTONOU: ['cotonou', 'bénin', 'benin', 'haie vive', 'calavi', 'akpakpa', 'fidjrossè'],
        ABIDJAN: ['abidjan', 'côte d\'ivoire', 'cote d\'ivoire', 'cocody', 'assinie', 'marcory', 'plateau'],
        DAKAR: ['dakar', 'sénégal', 'senegal', 'almadies', 'ngor'],
        LOME: ['lomé', 'lome', 'togo']
      };

      const validKeys = cityKeywords[cityFilter] || [];
      const matchesCity = validKeys.some(keyword => loc.includes(keyword));
      if (!matchesCity) return false;
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesQuery =
        (post.content || '').toLowerCase().includes(q) ||
        (post.location || '').toLowerCase().includes(q) ||
        (post.author.name || '').toLowerCase().includes(q) ||
        (post.price || '').toLowerCase().includes(q);
      if (!matchesQuery) return false;
    }

    return true;
  });

  return (
    <div>
      <CreatePost onOpen={onOpenCreatePost} />

      <div className="flex items-center gap-2 mb-3 px-1">
        <div className="h-[1px] bg-gray-300 flex-grow"></div>
        <span className="text-xs text-gray-500 flex items-center gap-1">
          Filtre actif :{' '}
          <span className="font-semibold text-gray-900">
            {filter === 'ALL' ? 'Toutes les offres' : filter === 'RENTAL' ? 'Locations' : filter === 'INVESTMENT' ? 'Investissements' : 'Services'}
            {cityFilter !== 'ALL' && ` • ${cityFilter}`}
          </span>
        </span>
      </div>

      <SmartFilters />

      {filteredPosts.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-200">
          <p className="text-gray-600 font-semibold mb-1">Aucune annonce ne correspond à votre sélection.</p>
          <p className="text-xs text-gray-400">Essayez de modifier votre recherche ou la ville sélectionnée.</p>
        </div>
      ) : (
        filteredPosts.map(post => (
          <Post key={post.id} post={post} onClick={() => onPostClick && onPostClick(post)} />
        ))
      )}
    </div>
  );
};
