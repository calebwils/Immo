
import React, { useState } from 'react';
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

const App: React.FC = () => {
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isRentCVOpen, setIsRentCVOpen] = useState(false);
  const [isContractOpen, setIsContractOpen] = useState(false);
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'TENANT' | 'AGENCY'>('TENANT');
  const [selectedListing, setSelectedListing] = useState<PostData | null>(null);
  // Default to 'RENTAL' to match screenshot where "Biens" is active
  const [feedFilter, setFeedFilter] = useState<'ALL' | ListingType>('RENTAL');

  const toggleView = () => {
    setViewMode(prev => prev === 'TENANT' ? 'AGENCY' : 'TENANT');
    window.scrollTo(0, 0);
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
      />
      
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

      <main className="max-w-[1128px] mx-auto pt-6 px-0 sm:px-4 md:px-0" onClick={() => showNotifications && setShowNotifications(false)}>
        
        {viewMode === 'AGENCY' ? (
          // Agency / Landlord View
          <LandlordDashboard />
        ) : (
          // Standard Tenant/Feed View
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Sidebar (Hidden on mobile, visible on medium+) */}
            <div className="hidden md:block md:col-span-3 lg:col-span-3">
               <SidebarLeft 
                 onOpenRentCV={() => setIsRentCVOpen(true)} 
                 onOpenContract={() => setIsContractOpen(true)}
                 onOpenServices={() => setIsServicesOpen(true)}
               />
            </div>

            {/* Main Feed (Full width on mobile, middle on larger) */}
            <div className="col-span-1 md:col-span-9 lg:col-span-6">
               <Feed 
                 onPostClick={setSelectedListing} 
                 onOpenCreatePost={() => setIsCreateListingOpen(true)}
                 filter={feedFilter}
               />
            </div>

            {/* Right Sidebar (Hidden on tablet/mobile, visible on large) */}
            <div className="hidden lg:block lg:col-span-3">
               <SidebarRight 
                 onOpenServices={() => setIsServicesOpen(true)}
               />
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
      <CreateListingModal isOpen={isCreateListingOpen} onClose={() => setIsCreateListingOpen(false)} />
      <ServicesModal isOpen={isServicesOpen} onClose={() => setIsServicesOpen(false)} />
    </div>
  );
};

export default App;
