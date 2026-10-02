
import React from 'react';
import { Search, Home, MapPin, Wallet, MessageSquare, Bell, Building2, TrendingUp, RefreshCw } from 'lucide-react';
import { ListingType } from '../types';

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void; badge?: number }> = ({ icon, label, active, onClick, badge }) => (
  <div 
    onClick={onClick}
    className={`flex flex-col items-center justify-center cursor-pointer px-2 min-w-[80px] h-full border-b-2 transition-colors relative group ${active ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}
  >
    <div className="mb-0.5 relative">
      {icon}
      {badge && badge > 0 && (
         <div className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
            {badge}
         </div>
      )}
    </div>
    <span className="text-xs hidden md:block group-hover:text-black transition-colors">{label}</span>
  </div>
);

interface NavbarProps {
  onOpenWallet?: () => void;
  onToggleView?: () => void;
  isAgencyView?: boolean;
  onToggleNotifications?: () => void;
  showNotifications?: boolean;
  onToggleMessaging?: () => void;
  isMessagingOpen?: boolean;
  onOpenProfile?: () => void;
  onFilterChange?: (filter: 'ALL' | ListingType) => void;
  currentFilter?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
    onOpenWallet, 
    onToggleView, 
    isAgencyView, 
    onToggleNotifications, 
    showNotifications,
    onToggleMessaging,
    isMessagingOpen,
    onOpenProfile,
    onFilterChange,
    currentFilter
}) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 h-[52px] px-4 sm:px-0">
      <div className="max-w-[1128px] mx-auto h-full flex items-center justify-between">
        
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-2 md:gap-4 h-full">
          <div className="text-linkedin-blue flex items-center justify-center cursor-pointer" onClick={() => !isAgencyView && window.location.reload()}>
            {/* Custom House Logo */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.753.753 1.841 1.159 2.946 1.159H24v7.75A2.25 2.25 0 0121.75 24h-19.5A2.25 2.25 0 010 21.75V14.75h.895c1.105 0 2.193-.406 2.946-1.159L12 5.432z" opacity="0.5"/>
              <path d="M12 10a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </div>
          
          <div className="relative hidden md:block group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500 group-focus-within:text-black" />
            </div>
            <input
              type="text"
              placeholder={isAgencyView ? "Rechercher locataires, biens..." : "Rechercher biens, agents..."}
              className="bg-[#edf3f8] text-sm rounded-md pl-10 pr-4 py-1.5 w-[280px] focus:outline-none focus:ring-2 focus:ring-black/5 transition-all focus:bg-[#edf3f8] focus:w-[320px]"
            />
          </div>
        </div>

        {/* Right: Navigation Items */}
        <div className="flex items-center h-full gap-1 overflow-x-auto no-scrollbar">
          <NavItem 
            icon={<Home className="w-6 h-6" fill={currentFilter === 'ALL' && !isAgencyView ? "currentColor" : "none"} />} 
            label="Accueil" 
            active={currentFilter === 'ALL' && !isAgencyView} 
            onClick={() => {
                if(isAgencyView && onToggleView) onToggleView();
                if(onFilterChange) onFilterChange('ALL');
            }} 
          />
          <NavItem 
            icon={<MapPin className="w-6 h-6" />} 
            label="Biens" 
            active={currentFilter === 'RENTAL'}
            onClick={() => {
                if(isAgencyView && onToggleView) onToggleView();
                if(onFilterChange) onFilterChange('RENTAL');
            }}
          />
          <NavItem 
            icon={<TrendingUp className="w-6 h-6" />} 
            label="Investir" 
            active={currentFilter === 'INVESTMENT'}
            onClick={() => {
                if(isAgencyView && onToggleView) onToggleView();
                if(onFilterChange) onFilterChange('INVESTMENT');
            }}
          />
          <NavItem icon={<Wallet className="w-6 h-6" />} label="Portefeuille" onClick={onOpenWallet} />
          <NavItem 
            icon={<MessageSquare className="w-6 h-6" />} 
            label="Messagerie" 
            active={isMessagingOpen}
            onClick={onToggleMessaging}
          />
          <NavItem 
            icon={<Bell className={`w-6 h-6 ${showNotifications ? 'fill-current' : ''}`} />} 
            label="Alertes" 
            onClick={onToggleNotifications} 
            badge={2} 
            active={showNotifications} 
          />
          
          <div 
            onClick={onOpenProfile}
            className="flex flex-col items-center justify-center cursor-pointer px-2 min-w-[80px] h-full border-b-2 border-transparent text-gray-500 hover:text-black ml-1 border-l border-gray-100 pl-4 group"
          >
            <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden ring-2 ring-transparent group-hover:ring-gray-200">
               <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Me" className="w-full h-full object-cover opacity-90" />
            </div>
            <span className="text-xs hidden md:flex items-center gap-0.5">
              Moi <span className="text-[10px]">▼</span>
            </span>
          </div>

          <div 
            onClick={onToggleView}
            className={`hidden lg:flex flex-col items-center justify-center cursor-pointer px-2 min-w-[80px] h-full border-b-2 transition-colors border-l border-gray-100 ${isAgencyView ? 'border-black text-black bg-gray-50' : 'border-transparent text-gray-500 hover:text-black'}`}
          >
             {isAgencyView ? <RefreshCw className="w-6 h-6" /> : <Building2 className="w-6 h-6" />}
             <span className="text-xs flex items-center gap-0.5">
              {isAgencyView ? 'Retour Feed' : 'Espace Pro'}
            </span>
          </div>
          
          <div className="hidden lg:block text-xs text-center w-[100px] text-[#915907] hover:underline cursor-pointer">
            Essayer PaySafe™ Premium
          </div>

        </div>
      </div>
    </nav>
  );
};
