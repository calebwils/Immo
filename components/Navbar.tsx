import React, { useState } from 'react';
import { Search, Home, MapPin, Wallet, MessageSquare, Bell, Building2, TrendingUp, RefreshCw, ChevronDown, Tag, Key } from 'lucide-react';
import { ListingType } from '../types';

export interface CityOption {
  code: string;
  name: string;
  flag: string;
}

export const CITIES: CityOption[] = [
  { code: 'ALL', name: 'Zone UEMOA', flag: '🌍' },
  { code: 'COTONOU', name: 'Cotonou', flag: '🇧🇯' },
  { code: 'ABIDJAN', name: 'Abidjan', flag: '🇨🇮' },
  { code: 'DAKAR', name: 'Dakar', flag: '🇸🇳' },
  { code: 'LOME', name: 'Lomé', flag: '🇹🇬' }
];

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
  selectedCity?: string;
  onSelectCity?: (cityCode: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
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
  currentFilter,
  selectedCity = 'ALL',
  onSelectCity,
  searchQuery = '',
  onSearchChange
}) => {
  const [showCityMenu, setShowCityMenu] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const activeCity = CITIES.find(c => c.code === selectedCity) || CITIES[0];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-shadow duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="max-w-[1180px] mx-auto px-3 sm:px-4 h-[60px] flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Brand + Search + City */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-1 max-w-xl">
          {/* Logo Brand: Executive Slate & Gold */}
          <div
            onClick={() => !isAgencyView && window.location.reload()}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
            title="IMMO Africa - Réseau Immobilier de Confiance"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm group-hover:bg-slate-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.753.753 1.841 1.159 2.946 1.159H24v7.75A2.25 2.25 0 0121.75 24h-19.5A2.25 2.25 0 010 21.75V14.75h.895c1.105 0 2.193-.406 2.946-1.159L12 5.432z" opacity="0.45" />
                <path d="M12 10a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </div>
            <div className="hidden xs:flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-base font-extrabold tracking-tight text-slate-900">IMMO</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 tracking-wider border border-slate-200">
                  AFRICA
                </span>
              </div>
              <span className="text-[9px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5">
                Réseau Immobilier & Baux
              </span>
            </div>
          </div>

          {/* City / Country Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCityMenu(!showCityMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 bg-slate-50/80 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-all shadow-2xs active:scale-95"
            >
              <span className="text-sm">{activeCity.flag}</span>
              <span className="hidden sm:inline font-bold text-slate-800">{activeCity.name}</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${showCityMenu ? 'rotate-180' : ''}`} />
            </button>

            {showCityMenu && (
              <div className="absolute top-10 left-0 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 w-48 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Marchés UEMOA
                </div>
                {CITIES.map(c => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      if (onSelectCity) onSelectCity(c.code);
                      setShowCityMenu(false);
                    }}
                    className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-100 transition-colors ${
                      selectedCity === c.code ? 'font-bold text-slate-900 bg-slate-100' : 'text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-base">{c.flag}</span>
                      <span>{c.name}</span>
                    </span>
                    {selectedCity === c.code && <span className="text-slate-900 font-bold">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Search Bar */}
          <div className="relative hidden md:block flex-1 max-w-sm group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400 group-focus-within:text-slate-800 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange && onSearchChange(e.target.value)}
              placeholder={isAgencyView ? 'Rechercher locataires, baux...' : 'Quartiers, villas, loyers...'}
              className="w-full bg-slate-100 hover:bg-slate-100/90 text-xs sm:text-sm rounded-full pl-9 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:bg-white focus:border-slate-400 border border-transparent transition-all"
            />
          </div>
        </div>

        {/* Center/Right: Desktop Navigation Pills (Executive Slate) */}
        <div className="hidden lg:flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              if (isAgencyView && onToggleView) onToggleView();
              if (onFilterChange) onFilterChange('ALL');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentFilter === 'ALL' && !isAgencyView
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Tout</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (isAgencyView && onToggleView) onToggleView();
              if (onFilterChange) onFilterChange('RENTAL');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentFilter === 'RENTAL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Locations</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (isAgencyView && onToggleView) onToggleView();
              if (onFilterChange) onFilterChange('SALE');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentFilter === 'SALE'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Ventes</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (isAgencyView && onToggleView) onToggleView();
              if (onFilterChange) onFilterChange('INVESTMENT');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentFilter === 'INVESTMENT'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Investir</span>
          </button>
        </div>

        {/* Right Tools & Switcher */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile search trigger */}
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="md:hidden p-2 rounded-full text-slate-600 hover:bg-slate-100"
            title="Rechercher"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wallet Shortcut - Executive Slate styling */}
          <button
            type="button"
            onClick={onOpenWallet}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200 transition-all text-xs font-bold active:scale-95 shadow-2xs"
            title="Solde Mobile Money & PaySafe"
          >
            <Wallet className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">15 400 CFA</span>
          </button>

          {/* Notifications */}
          <button
            type="button"
            onClick={onToggleNotifications}
            className={`p-2 rounded-full relative transition-colors ${
              showNotifications ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-100'
            }`}
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Messagerie */}
          <button
            type="button"
            onClick={onToggleMessaging}
            className={`hidden sm:flex p-2 rounded-full relative transition-colors ${
              isMessagingOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-100'
            }`}
            title="Messagerie Directe"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          {/* Toggle Bailleur / Locataire Button */}
          <button
            type="button"
            onClick={onToggleView}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all border shadow-2xs ${
              isAgencyView
                ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            {isAgencyView ? <RefreshCw className="w-3.5 h-3.5 text-amber-400" /> : <Building2 className="w-3.5 h-3.5 text-slate-700" />}
            <span className="hidden sm:inline">{isAgencyView ? 'Vue Locataire' : 'Espace Pro'}</span>
          </button>

          {/* Profile Avatar */}
          <div
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full border border-slate-300 overflow-hidden cursor-pointer hover:ring-2 hover:ring-slate-300 transition-all ml-0.5"
            title="Mon Profil & RentScore"
          >
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Caleb N."
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay Bar when toggled */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-3 py-2 bg-slate-50 border-t border-slate-200 flex items-center gap-2 animate-in fade-in">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={e => onSearchChange && onSearchChange(e.target.value)}
              placeholder="Rechercher un bien, quartier..."
              className="w-full pl-9 pr-3 py-1.5 rounded-full text-xs bg-white border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
          </div>
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(false)}
            className="text-xs font-semibold text-slate-500 px-2 py-1"
          >
            Fermer
          </button>
        </div>
      )}
    </header>
  );
};
