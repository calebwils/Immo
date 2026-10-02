import React, { useState } from 'react';
import { X, Search, Filter, MapPin, Banknote, Calendar, Tag, ShieldCheck, CheckCircle2, ChevronRight, Phone, MessageSquare, Sparkles, Building2, UserCheck, Home, Key } from 'lucide-react';
import { PropertySearch, PropertyCategory } from '../types';
import { MOCK_SEARCHES } from '../data/mockDb';

interface ClientSearchesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSearchMatch?: (search: PropertySearch) => void;
}

export const ClientSearchesModal: React.FC<ClientSearchesModalProps> = ({
  isOpen,
  onClose,
  onSelectSearchMatch
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'ALL' | 'RENTAL' | 'SALE'>('ALL');
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredSearches = MOCK_SEARCHES.filter(s => {
    if (activeTab !== 'ALL' && s.transactionType !== activeTab) return false;
    if (selectedCity !== 'ALL' && s.city.toUpperCase() !== selectedCity.toUpperCase()) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const match =
        s.title.toLowerCase().includes(q) ||
        s.client.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.preferredDistricts.some(d => d.toLowerCase().includes(q)) ||
        s.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const rentalCount = MOCK_SEARCHES.filter(s => s.transactionType === 'RENTAL').length;
  const saleCount = MOCK_SEARCHES.filter(s => s.transactionType === 'SALE').length;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      {/* Modal Dialog */}
      <div className="relative bg-[#f8f9fa] w-full max-w-5xl rounded-none sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col h-full sm:h-[90vh] animate-in fade-in zoom-in duration-150">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-5 sm:px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-gray-900">
                  Demandes & Recherches Clients Actives
                </h2>
                <p className="text-xs text-gray-500">
                  20 demandes vérifiées • 15 Locations & 5 Achats avec critères et budgets réels
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-gray-50 border-b border-gray-200 px-5 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          
          {/* Tabs: Location vs Achat */}
          <div className="flex items-center gap-1.5 bg-gray-200/80 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'ALL' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Toutes ({MOCK_SEARCHES.length})
            </button>
            <button
              onClick={() => setActiveTab('RENTAL')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'RENTAL' ? 'bg-blue-600 text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              Locations ({rentalCount})
            </button>
            <button
              onClick={() => setActiveTab('SALE')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'SALE' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              Achats ({saleCount})
            </button>
          </div>

          {/* City & Search input */}
          <div className="flex items-center gap-2 flex-grow sm:flex-grow-0">
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className="text-xs bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 font-semibold text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="ALL">Toutes les villes</option>
              <option value="COTONOU">🇧🇯 Cotonou</option>
              <option value="ABIDJAN">🇨🇮 Abidjan</option>
              <option value="DAKAR">🇸🇳 Dakar</option>
              <option value="LOME">🇹🇬 Lomé</option>
            </select>

            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Filtrer par quartier, client..."
                className="text-xs bg-white border border-gray-300 rounded-lg pl-7 pr-3 py-1.5 w-40 sm:w-56 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-2.5" />
            </div>
          </div>
        </div>

        {/* Content: List of Searches */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredSearches.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <p className="text-gray-600 font-bold mb-1">Aucune demande ne correspond à ces filtres.</p>
              <p className="text-xs text-gray-400">Essayez de réinitialiser la ville ou le terme de recherche.</p>
            </div>
          ) : (
            filteredSearches.map(item => {
              const isSale = item.transactionType === 'SALE';
              const cleanPhone = (item.client.whatsapp || item.client.phone || '').replace(/[^0-9]/g, '');

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-2xs hover:shadow-md transition-shadow p-4 sm:p-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-gray-100 pb-3 mb-3">
                    
                    {/* Client & Title */}
                    <div className="flex items-start gap-3">
                      <img
                        src={item.client.avatarUrl}
                        alt={item.client.name}
                        className="w-11 h-11 rounded-full object-cover border border-gray-200"
                      />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-black text-gray-900">{item.client.name}</h3>
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            isSale ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-blue-100 text-blue-800 border border-blue-200'
                          }`}>
                            {isSale ? '🏷️ RECHERCHE ACHAT' : '🔑 RECHERCHE LOCATION'}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.urgency === 'IMMEDIATE'
                              ? 'bg-rose-100 text-rose-800'
                              : item.urgency === 'UNDER_1_MONTH'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {item.urgency === 'IMMEDIATE' ? '⚡ Urgent (Immédiat)' : item.urgency === 'UNDER_1_MONTH' ? '⏳ Sous 30 jours' : '📅 Flexible'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{item.client.headline}</p>
                      </div>
                    </div>

                    {/* Budget Badge */}
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Budget Prévu</span>
                      <span className="text-base sm:text-lg font-black text-emerald-700">
                        {item.budgetMin.toLocaleString('fr-FR')} - {item.budgetMax.toLocaleString('fr-FR')} CFA
                        {!isSale && <span className="text-xs font-normal text-gray-500">/mois</span>}
                      </span>
                    </div>
                  </div>

                  {/* Search Title & Desired Criteria */}
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Criteria Pills */}
                    <div className="flex flex-wrap gap-2 text-xs mb-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-800 rounded-md font-semibold border border-blue-100">
                        <MapPin className="w-3 h-3 text-blue-600" />
                        {item.city} ({item.preferredDistricts.join(', ')})
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md font-semibold">
                        <Home className="w-3 h-3" />
                        Type : {item.propertyCategory}
                      </span>
                      {item.minBedrooms !== undefined && item.minBedrooms > 0 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md font-semibold">
                          🛏️ Min. {item.minBedrooms} Chambre{item.minBedrooms > 1 ? 's' : ''}
                        </span>
                      )}
                      {item.minSurface && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md font-semibold">
                          📐 Min. {item.minSurface} m²
                        </span>
                      )}
                    </div>

                    {/* Amenities Requested */}
                    {item.desiredAmenities.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-bold text-gray-400">Exigences :</span>
                        {item.desiredAmenities.map((amenity, idx) => (
                          <span key={idx} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium">
                            ✓ {amenity}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[11px] text-gray-400">
                      Publiée {item.createdAt} • Référence : #{item.id}
                    </span>

                    <div className="flex items-center gap-2">
                      {cleanPhone && (
                        <a
                          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Bonjour ${item.client.name}, je vous contacte sur IMMO Africa concernant votre recherche : "${item.title}". J'ai un bien correspondant disponible !`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                        >
                          <span>💬</span>
                          <span>Proposer un Bien (WhatsApp)</span>
                        </a>
                      )}

                      {onSelectSearchMatch && (
                        <button
                          onClick={() => {
                            onSelectSearchMatch(item);
                            onClose();
                          }}
                          className="px-3.5 py-1.5 bg-linkedin-blue hover:bg-blue-700 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                        >
                          <span>Voir les biens du marché</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info banner */}
        <div className="bg-gray-100 border-t border-gray-200 px-5 py-3 text-xs text-gray-500 flex items-center justify-between flex-shrink-0">
          <span>
            💡 <strong>Astuce Bailleur & Agence :</strong> Contactez directement les clients qualifiés pour leur proposer vos biens sans commission intermédiaire.
          </span>
          <button
            onClick={onClose}
            className="text-xs font-bold text-gray-700 hover:underline"
          >
            Fermer la fenêtre
          </button>
        </div>

      </div>
    </div>
  );
};
