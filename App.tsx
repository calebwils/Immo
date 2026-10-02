import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SidebarLeft } from './components/SidebarLeft';
import { Feed } from './components/Feed';
import { SidebarRight } from './components/SidebarRight';
import { MessagingWidget } from './components/MessagingWidget';
import { WalletModal } from './components/WalletModal';
import { UserProfileModal } from './components/UserProfileModal';
import { LandlordDashboard } from './components/LandlordDashboard';
import { ListingDetailModal } from './components/ListingDetailModal';
import { CreateListingModal } from './components/CreateListingModal';
import { ContractModal } from './components/ContractModal';
import { ServicesModal } from './components/ServicesModal';
import { AiAssistant } from './components/AiAssistant';
import { NotificationsPanel } from './components/NotificationsPanel';
import { ClientSearchesModal } from './components/ClientSearchesModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PostData, ListingType, PropertySearch, PostComment } from './types';
import { MOCK_PROPERTIES } from './data/mockDb';

const App: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>(() => {
    const saved = localStorage.getItem('immo_posts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // If saved cache has fewer properties than the new mock database (15 properties), hydrate with MOCK_PROPERTIES
        if (Array.isArray(parsed) && parsed.length >= 15) {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return MOCK_PROPERTIES;
  });

  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isContractOpen, setIsContractOpen] = useState(false);
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSearchesOpen, setIsSearchesOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'TENANT' | 'AGENCY'>('TENANT');
  const [selectedListing, setSelectedListing] = useState<PostData | null>(null);
  const [feedFilter, setFeedFilter] = useState<'ALL' | ListingType>('ALL');
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [publishedToast, setPublishedToast] = useState<string | null>(null);

  const [userAvatar, setUserAvatar] = useState<string>(() => {
    return (
      localStorage.getItem('immo_user_avatar') ||
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    );
  });
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('immo_user_name') || 'Caleb N.';
  });

  const handleUpdateAvatar = (newAvatar: string) => {
    setUserAvatar(newAvatar);
    localStorage.setItem('immo_user_avatar', newAvatar);
  };

  const handleUpdateName = (newName: string) => {
    setUserName(newName);
    localStorage.setItem('immo_user_name', newName);
  };

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
        name: userName,
        headline: 'Propriétaire • Membre Certifié',
        avatarUrl: userAvatar,
        badge: 'Verified'
      },
      content: newPostData.content || '',
      timestamp: "À l'instant",
      likes: 0,
      comments: 0,
      reposts: 0,
      imageUrl: newPostData.imageUrl,
      images: newPostData.images,
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

  const handleAddComment = (postId: string, comment: PostComment) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const currentList = p.commentsList || [];
          return {
            ...p,
            comments: (p.comments || 0) + 1,
            commentsList: [comment, ...currentList]
          };
        }
        return p;
      })
    );

    if (selectedListing && selectedListing.id === postId) {
      setSelectedListing(prev => {
        if (!prev) return null;
        const currentList = prev.commentsList || [];
        return {
          ...prev,
          comments: (prev.comments || 0) + 1,
          commentsList: [comment, ...currentList]
        };
      });
    }
  };

  const handleSelectSearchMatch = (search: PropertySearch) => {
    setFeedFilter(search.transactionType);
    setSelectedCity(search.city.toUpperCase());
    setSearchQuery('');
    setPublishedToast(`Filtre activé : ${search.transactionType === 'SALE' ? 'Achats' : 'Locations'} à ${search.city}`);
    setTimeout(() => setPublishedToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-20 md:pb-12 text-slate-900 relative selection:bg-slate-200 selection:text-slate-900">
      <Navbar
        onOpenWallet={() => setIsWalletOpen(true)}
        onToggleView={toggleView}
        isAgencyView={viewMode === 'AGENCY'}
        onToggleNotifications={() => setShowNotifications(!showNotifications)}
        showNotifications={showNotifications}
        onToggleMessaging={() => setIsMessagingOpen(!isMessagingOpen)}
        isMessagingOpen={isMessagingOpen}
        onOpenProfile={() => setIsProfileOpen(true)}
        onFilterChange={setFeedFilter}
        currentFilter={feedFilter}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        userAvatar={userAvatar}
      />

      {/* Floating Published Notification Toast */}
      {publishedToast && (
        <div className="fixed top-16 right-6 z-[120] bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-2 text-xs sm:text-sm font-bold animate-in slide-in-from-top-4">
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
        className="max-w-[1180px] mx-auto pt-4 sm:pt-6 px-3 sm:px-4"
        onClick={() => showNotifications && setShowNotifications(false)}
      >
        {viewMode === 'AGENCY' ? (
          <LandlordDashboard />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
            {/* Left Sidebar */}
            <div className="hidden md:block md:col-span-4 lg:col-span-3">
              <SidebarLeft
                onOpenProfile={() => setIsProfileOpen(true)}
                onOpenCreatePost={() => setIsCreateListingOpen(true)}
                onOpenServices={() => setIsServicesOpen(true)}
                onOpenSearches={() => setIsSearchesOpen(true)}
                userAvatar={userAvatar}
                userName={userName}
              />
            </div>

            {/* Main Feed */}
            <div className="col-span-1 md:col-span-8 lg:col-span-6">
              <Feed
                posts={posts}
                onPostClick={setSelectedListing}
                onOpenCreatePost={() => setIsCreateListingOpen(true)}
                filter={feedFilter}
                cityFilter={selectedCity}
                searchQuery={searchQuery}
                userAvatar={userAvatar}
                userName={userName}
                onAddComment={handleAddComment}
              />
            </div>

            {/* Right Sidebar */}
            <div className="hidden lg:block lg:col-span-3">
              <SidebarRight 
                onOpenServices={() => setIsServicesOpen(true)} 
                onOpenSearches={() => setIsSearchesOpen(true)}
              />
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentFilter={feedFilter}
        onFilterChange={setFeedFilter}
        onOpenCreatePost={() => setIsCreateListingOpen(true)}
        onOpenWallet={() => setIsWalletOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenNotifications={() => setShowNotifications(true)}
      />

      <AiAssistant
        listings={posts}
        onSelectListing={(listing) => setSelectedListing(listing)}
      />
      <MessagingWidget isOpen={isMessagingOpen} onToggle={() => setIsMessagingOpen(!isMessagingOpen)} />
      <WalletModal isOpen={isWalletOpen} onClose={() => setIsWalletOpen(false)} />
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userAvatar={userAvatar}
        onUpdateAvatar={handleUpdateAvatar}
        userName={userName}
        onUpdateName={handleUpdateName}
      />
      <ContractModal isOpen={isContractOpen} onClose={() => setIsContractOpen(false)} />
      <ListingDetailModal 
        listing={selectedListing} 
        onClose={() => setSelectedListing(null)} 
        userAvatar={userAvatar}
        userName={userName}
        onAddComment={handleAddComment}
      />
      <CreateListingModal
        isOpen={isCreateListingOpen}
        onClose={() => setIsCreateListingOpen(false)}
        onSubmit={handleAddPost}
      />
      <ClientSearchesModal
        isOpen={isSearchesOpen}
        onClose={() => setIsSearchesOpen(false)}
        onSelectSearchMatch={handleSelectSearchMatch}
      />
      <ServicesModal isOpen={isServicesOpen} onClose={() => setIsServicesOpen(false)} />
    </div>
  );
};

export default App;
