
import React, { useState } from 'react';
import { CreatePost } from './CreatePost';
import { Post } from './Post';
import { SmartFilters } from './SmartFilters';
import { PostData, ListingType } from '../types';

interface FeedProps {
  onPostClick?: (post: PostData) => void;
  onOpenCreatePost?: () => void;
  filter?: 'ALL' | ListingType;
}

export const Feed: React.FC<FeedProps> = ({ onPostClick, onOpenCreatePost, filter = 'ALL' }) => {
  const [posts] = useState<PostData[]>([
    {
      id: '1',
      author: {
        name: 'Prestige Immobilier',
        headline: 'Agence Premium à Cotonou',
        avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
        badge: 'Pro'
      },
      content: '🏡 Nouveau Bien : Appartement moderne 3 pièces à Haie Vive, Cotonou. \n\nCaractéristiques : \n- Sécurité 24/7\n- Groupe Électrogène\n- Fibre Optique\n- Paiement flexible via Mobile Money accepté.\n\nDM pour visite ou postulez directement via RentCV.',
      timestamp: '2h',
      likes: 45,
      comments: 12,
      reposts: 5,
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      listingType: 'RENTAL',
      price: '250 000 CFA/mois',
      location: 'Haie Vive, Cotonou',
      specs: '3 Chambres • 2 Douches',
      description: "Situé au cœur du quartier des expatriés de Cotonou, cet appartement offre un cadre de vie luxueux.\n\nLa résidence dispose d'une piscine, d'une salle de sport et d'un service de conciergerie 24h/24. Parfait pour les professionnels.\n\nVérifié par Immo pour les paiements 'PaySafe'.",
      amenities: ['Climatisation', 'Piscine', 'Groupe Électrogène', 'Sécurité 24/7', 'Internet Fibre', 'Parking'],
      images: [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      isAiRecommended: true,
      matchScore: 94,
      matchReason: "Correspond à votre trajet de 25min max",
    },
    {
      id: '2',
      author: {
        name: 'ImmoInvest Africa',
        headline: 'Plateforme d\'Investissement Fractionné',
        avatarUrl: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
        badge: 'Verified'
      },
      content: '🚀 Opportunité d\'Investissement : Résidence Bord de Mer à Assinie.\n\nInvestissez dès 10 000 CFA et devenez copropriétaire de ce bien à haut rendement locatif Airbnb. \n\nDividendes versés trimestriellement via Mobile Money. Propriété certifiée Blockchain.',
      timestamp: '5h',
      likes: 845,
      comments: 120,
      reposts: 220,
      imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      listingType: 'INVESTMENT',
      price: 'Min: 10 000 CFA',
      location: 'Assinie, Côte d\'Ivoire',
      specs: '12% Rendement Est.',
      description: "Possédez un coin de paradis. Le projet 'Assinie Beachfront' permet la propriété fractionnée d'un complexe de 5 villas de luxe.\n\nExploité en Airbnb Premium avec 80% d'occupation prévue. Dividendes distribués automatiquement sur votre Wallet Immo.",
      images: [
          'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1572331165267-854da2dc72af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      fundingProgress: 75,
      targetAmount: '50 000 000 CFA',
      investorsCount: 342,
      minInvestment: '10 000 CFA',
      projectedYield: '12-15% AN',
      roi: '15% sur 2 ans'
    },
    {
      id: '3',
      author: {
        name: 'Jean-Marc D.',
        headline: 'Plombier Certifié',
        avatarUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      },
      content: 'Disponible pour dépannages d\'urgence ce week-end à Calavi et environs. \n\nVérifié par la plateforme Immo. Réservez-moi via l\'onglet "Artisan" pour un prix fixe et un paiement sécurisé.',
      timestamp: '1j',
      likes: 21,
      comments: 4,
      reposts: 2,
      listingType: 'SERVICE',
      price: 'Tarifs Standards',
      location: 'Abomey-Calavi',
    },
    {
      id: '4',
      author: {
        name: 'Immo News Bot',
        headline: 'Analyse Marché IA',
        avatarUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
        badge: 'Verified'
      },
      content: '📉 Point Marché : Les loyers à Akpakpa se stabilisent suite aux nouvelles régulations. \n\nUtilisez notre "Recherche Intelligente" pour trouver des offres au prix du marché.',
      timestamp: '2j',
      likes: 132,
      comments: 9,
      reposts: 10,
      listingType: 'NEWS',
    }
  ]);

  const filteredPosts = filter === 'ALL' 
    ? posts 
    : posts.filter(post => post.listingType === filter);

  return (
    <div>
      <CreatePost onOpen={onOpenCreatePost} />
      
      <div className="flex items-center gap-2 mb-3 px-1">
         <div className="h-[1px] bg-gray-300 flex-grow"></div>
         <span className="text-xs text-gray-500 flex items-center gap-1">
            Filtre : <span className="font-semibold text-gray-900 cursor-pointer">{filter === 'ALL' ? 'Tout' : filter === 'RENTAL' ? 'Locations' : 'Investissements'}</span>
         </span>
      </div>

      <SmartFilters />

      {filteredPosts.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center text-gray-500">
             Aucune publication ne correspond à ce filtre.
          </div>
      ) : (
          filteredPosts.map(post => (
            <Post key={post.id} post={post} onClick={() => onPostClick && onPostClick(post)} />
          ))
      )}
    </div>
  );
};
