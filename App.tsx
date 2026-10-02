import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SidebarLeft } from './components/SidebarLeft';
import { Feed } from './components/Feed';
import { SidebarRight } from './components/SidebarRight';
import { MessagingWidget } from './components/MessagingWidget';
import { WalletModal } from './components/WalletModal';
import { RentCVModal } from './components/RentCVModal';
import { LandlordDashboard } from './components/LandlordDashboard';
import { ListingDetailModal } from './components/ListingDetailModal';
import { CreateListingModal } from './components/CreateListingModal';
import { ContractModal } from './components/ContractModal';
import { ServicesModal } from './components/ServicesModal';
import { AiAssistant } from './components/AiAssistant';
import { NotificationsPanel } from './components/NotificationsPanel';
import { PostData, ListingType } from './types';

const INITIAL_POSTS: PostData[] = [
  {
    id: '1',
    author: {
      name: 'Prestige Immobilier',
      headline: 'Agence Premium à Cotonou • Partenaire Vérifié',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      badge: 'Pro'
    },
    content: '🏡 Nouveau Bien : Appartement moderne 3 pièces à Haie Vive, Cotonou.\n\nCaractéristiques :\n- Sécurité 24/7\n- Groupe Électrogène\n- Fibre Optique\n- Paiement flexible via Wave & Mobile Money accepté.\n\nDM pour visite ou postulez directement via RentCV.',
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
    matchReason: 'Correspond à votre trajet de 25min max'
  },
  {
    id: '2',
    author: {
      name: 'ImmoInvest Africa',
      headline: 'Plateforme d\'Investissement Fractionné • Abidjan',
      avatarUrl: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      badge: 'Verified'
    },
    content: "🚀 Opportunité d'Investissement : Résidence Bord de Mer à Assinie.\n\nInvestissez dès 10 000 CFA et devenez copropriétaire de ce bien à haut rendement locatif Airbnb.\n\nDividendes versés trimestriellement via Wave / Mobile Money. Titre de propriété notarié et certifié conforme.",
    timestamp: '5h',
    likes: 845,
    comments: 120,
    reposts: 220,
    imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    listingType: 'INVESTMENT',
    price: 'Min: 10 000 CFA',
    location: "Assinie, Côte d'Ivoire",
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
      headline: 'Plombier Certifié UEMOA',
      avatarUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
    },
    content: "Disponible pour dépannages d'urgence ce week-end à Calavi et Cotonou.\n\nVérifié par la plateforme Immo. Réservez-moi via l'onglet \"Artisan\" pour un prix fixe et un paiement séquestré PaySafe.",
    timestamp: '1j',
    likes: 21,
    comments: 4,
    reposts: 2,
    listingType: 'SERVICE',
    price: 'Tarifs Standards',
    location: 'Abomey-Calavi, Bénin'
  },
  {
    id: '4',
    author: {
      name: 'Immo News Bot',
      headline: 'Analyse Marché IA (Qwen)',
      avatarUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      badge: 'Verified'
    },
    content: '📉 Point Marché : Les loyers à Akpakpa et Cocody se stabilisent suite aux nouvelles régulations locatives.\n\nConsultez notre assistant Immo-AI pour trouver des offres au prix juste du marché.',
    timestamp: '2j',
    likes: 132,
    comments: 9,
    reposts: 10,
    listingType: 'NEWS'
  }
];

const App: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>(() => {
    const saved = localStorage.getItem('immo_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isRentCVOpen, setIsRentCVOpen] = useState(false);
  const [isContractOpen, setIsContractOpen] = useState(false);
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'TENANT' | 'AGENCY'>('TENANT');
  const [selectedListing, setSelectedListing] = useState<PostData | null>(null);
  const [feedFilter, setFeedFilter] = useState<'ALL' | ListingType>('RENTAL');
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [publishedToast, setPublishedToast] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('immo_posts', JSON.stringify(posts));
  }, [posts]);

  const toggleView = () => {
    setViewMode(prev => (prev === 'TENANT' ? 'AGENCY' : 'TENANT'));
    window.scrollTo(0, 0);
  };

  const handleAddPost = (newPostData: Partial<PostData>) => {
    const fullPost: PostData = {
      id: newPostData.id || `post-${Date.now()}`,
      author: newPostData.author || {
        name: 'Caleb N.',
        headline: 'Membre Certifié RentCV',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        badge: 'Verified'
      },
      content: newPostData.content || '',
      timestamp: "À l'instant",
      likes: 0,
      comments: 0,
      reposts: 0,
      imageUrl: newPostData.imageUrl,
      listingType: newPostData.listingType || 'RENTAL',
      price: newPostData.price,
      location: newPostData.location,
      specs: newPostData.specs,
      description: newPostData.description,
      amenities: newPostData.amenities,
      fundingProgress: newPostData.fundingProgress,
      targetAmount: newPostData.targetAmount,
      minInvestment: newPostData.minInvestment,
      isAiRecommended: newPostData.isAiRecommended,
      matchScore: newPostData.matchScore,
      matchReason: newPostData.matchReason
    };

    setPosts(prev => [fullPost, ...prev]);
    setPublishedToast('Annonce publiée avec succès et visible sur le Feed !');
    setTimeout(() => setPublishedToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#f3f2ef] font-sans pb-10 relative">
      <Navbar
        onOpenWallet={() => setIsWalletOpen(true)}
        onToggleView={toggleView}
        isAgencyView={viewMode === 'AGENCY'}
        onToggleNotifications={() => setShowNotifications(!showNotifications)}
        showNotifications={showNotifications}
        onToggleMessaging={() => setIsMessagingOpen(!isMessagingOpen)}
        isMessagingOpen={isMessagingOpen}
        onOpenProfile={() => setIsRentCVOpen(true)}
        onFilterChange={setFeedFilter}
        currentFilter={feedFilter}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Floating Published Notification Toast */}
      {publishedToast && (
        <div className="fixed top-16 right-6 z-[120] bg-green-700 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-semibold animate-in slide-in-from-top-4">
          <span>✓</span>
          <span>{publishedToast}</span>
        </div>
      )}

      {/* Notifications Overlay */}
      <NotificationsPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onOpenContract={() => {
          setShowNotifications(false);
          setIsContractOpen(true);
        }}
        onOpenWallet={() => {
          setShowNotifications(false);
          setIsWalletOpen(true);
        }}
      />

      <main
        className="max-w-[1128px] mx-auto pt-6 px-0 sm:px-4 md:px-0"
        onClick={() => showNotifications && setShowNotifications(false)}
      >
        {viewMode === 'AGENCY' ? (
          <LandlordDashboard />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <div className="hidden md:block md:col-span-3 lg:col-span-3">
              <SidebarLeft
                onOpenRentCV={() => setIsRentCVOpen(true)}
                onOpenContract={() => setIsContractOpen(true)}
                onOpenServices={() => setIsServicesOpen(true)}
              />
            </div>

            {/* Main Feed */}
            <div className="col-span-1 md:col-span-9 lg:col-span-6">
              <Feed
                posts={posts}
                onPostClick={setSelectedListing}
                onOpenCreatePost={() => setIsCreateListingOpen(true)}
                filter={feedFilter}
                cityFilter={selectedCity}
                searchQuery={searchQuery}
              />
            </div>

            {/* Right Sidebar */}
            <div className="hidden lg:block lg:col-span-3">
              <SidebarRight onOpenServices={() => setIsServicesOpen(true)} />
            </div>
          </div>
        )}
      </main>

      <AiAssistant />
      <MessagingWidget isOpen={isMessagingOpen} onToggle={() => setIsMessagingOpen(!isMessagingOpen)} />
      <WalletModal isOpen={isWalletOpen} onClose={() => setIsWalletOpen(false)} />
      <RentCVModal isOpen={isRentCVOpen} onClose={() => setIsRentCVOpen(false)} />
      <ContractModal isOpen={isContractOpen} onClose={() => setIsContractOpen(false)} />
      <ListingDetailModal listing={selectedListing} onClose={() => setSelectedListing(null)} />
      <CreateListingModal
        isOpen={isCreateListingOpen}
        onClose={() => setIsCreateListingOpen(false)}
        onSubmit={handleAddPost}
      />
      <ServicesModal isOpen={isServicesOpen} onClose={() => setIsServicesOpen(false)} />
    </div>
  );
};

export default App;
