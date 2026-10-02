import React, { useState } from 'react';
import { X, Home, TrendingUp, Hammer, Camera, ChevronRight, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { generateListingDescription } from '../services/qwenAi';
import { PostData, ListingType } from '../types';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (listing: Partial<PostData>) => void;
}

type Tab = 'RENTAL' | 'INVESTMENT' | 'SERVICE';

export const CreateListingModal: React.FC<CreateListingModalProps> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<Tab>('RENTAL');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('Haie Vive, Cotonou');
  const [description, setDescription] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(['Climatisation', 'WiFi']);
  const [targetAmount, setTargetAmount] = useState('45 000 000');
  const [minInvestment, setMinInvestment] = useState('10 000');
  const [roi, setRoi] = useState('14%');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [customPhoto, setCustomPhoto] = useState<string>(
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  );

  const toggleAmenity = (tag: string) => {
    setSelectedAmenities(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleGenerateAiDescription = async () => {
    if (isAiGenerating) return;
    setIsAiGenerating(true);
    try {
      const generated = await generateListingDescription({
        title: title || (activeTab === 'RENTAL' ? 'Appartement Haut Standing' : 'Projet Villa Balnéaire'),
        type: activeTab,
        location,
        price,
        features: selectedAmenities
      });
      setDescription(generated);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleSubmit = () => {
    const formattedPrice = price ? `${price} CFA` : activeTab === 'INVESTMENT' ? 'Min: 10 000 CFA' : '250 000 CFA/mois';
    const newListing: Partial<PostData> = {
      id: `listing-${Date.now()}`,
      author: {
        name: 'Agence Prestige Immobilier',
        headline: 'Agence Certifiée Immo • Cotonou & Abidjan',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        badge: 'Agent'
      },
      content: `${title || 'Nouveau bien disponible sur IMMO'}\n\n${description || 'Superbe opportunité avec commodités complètes et gestion sécurisée via PaySafe.'}`,
      timestamp: "À l'instant",
      likes: 1,
      comments: 0,
      reposts: 0,
      imageUrl: customPhoto,
      listingType: activeTab as ListingType,
      price: formattedPrice,
      location: location || 'Cotonou, Bénin',
      specs: activeTab === 'INVESTMENT' ? `${roi} Rendement Est.` : '3 Pièces • 2 Salles d\'eau',
      description: description || 'Visite sur rendez-vous avec RentCV vérifié.',
      amenities: selectedAmenities,
      fundingProgress: activeTab === 'INVESTMENT' ? 10 : undefined,
      targetAmount: activeTab === 'INVESTMENT' ? `${targetAmount} CFA` : undefined,
      minInvestment: activeTab === 'INVESTMENT' ? `${minInvestment} CFA` : undefined,
      isAiRecommended: true,
      matchScore: 98,
      matchReason: 'Correspondance parfaite avec vos critères récents'
    };

    if (onSubmit) {
      onSubmit(newListing);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="relative bg-[#f3f2ef] w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Publier une Annonce</h2>
            <p className="text-xs text-gray-500">Visible par la communauté et investisseurs d'Afrique de l'Ouest</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white px-6 border-b border-gray-200 flex gap-6">
          <button
            onClick={() => setActiveTab('RENTAL')}
            className={`py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'RENTAL' ? 'border-linkedin-blue text-linkedin-blue' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Home className="w-4 h-4" />
            Location / Vente
          </button>
          <button
            onClick={() => setActiveTab('INVESTMENT')}
            className={`py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'INVESTMENT' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Investissement Fractionné
          </button>
          <button
            onClick={() => setActiveTab('SERVICE')}
            className={`py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'SERVICE' ? 'border-yellow-600 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Hammer className="w-4 h-4" />
            Service Artisan
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-grow bg-white">
          {/* Image Selection Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-5 flex flex-col sm:flex-row items-center gap-4 bg-gray-50">
            <img src={customPhoto} alt="Preview" className="w-24 h-20 rounded-lg object-cover border border-gray-200 shadow-sm" />
            <div className="flex-grow text-center sm:text-left">
              <p className="text-xs font-bold text-gray-700 mb-1">Image Principale de l'Annonce</p>
              <div className="flex gap-2 flex-wrap">
                {[
                  { label: 'Villa Moderne', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
                  { label: 'Bord de Mer', url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
                  { label: 'Appartement F3', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }
                ].map(item => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setCustomPhoto(item.url)}
                    className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                      customPhoto === item.url ? 'bg-blue-600 text-white border-blue-600 font-bold' : 'bg-white text-gray-600 border-gray-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Fields based on Tab */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Titre de l'annonce</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Ex: Superbe Penthouse 4 Pièces à Haie Vive"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-linkedin-blue focus:outline-none"
              />
            </div>

            {activeTab === 'RENTAL' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Loyer Mensuel (CFA)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="250 000"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-linkedin-blue focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Localisation / Quartier</label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="Haie Vive, Cotonou ou Cocody, Abidjan"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-linkedin-blue focus:outline-none"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Commodités incluses</label>
                  <div className="flex gap-2 flex-wrap">
                    {['Climatisation', 'WiFi', 'Piscine', 'Groupe Électrogène', 'Sécurité 24/7', 'Forage Eau'].map(tag => (
                      <span
                        key={tag}
                        onClick={() => toggleAmenity(tag)}
                        className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors border ${
                          selectedAmenities.includes(tag)
                            ? 'bg-blue-100 text-blue-800 border-blue-300 font-bold'
                            : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {selectedAmenities.includes(tag) ? '✓ ' : '+ '} {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'INVESTMENT' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Objectif de Financement (CFA)</label>
                  <input
                    type="text"
                    value={targetAmount}
                    onChange={e => setTargetAmount(e.target.value)}
                    placeholder="50 000 000"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Ticket Minimum</label>
                  <input
                    type="text"
                    value={minInvestment}
                    onChange={e => setMinInvestment(e.target.value)}
                    placeholder="10 000"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Rendement Estimé (%)</label>
                  <input
                    type="text"
                    value={roi}
                    onChange={e => setRoi(e.target.value)}
                    placeholder="12-15%"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Localisation</label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="Assinie, Côte d'Ivoire"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'SERVICE' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Corps d'état</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none bg-white">
                    <option>Plomberie & Sanitaire</option>
                    <option>Électricité & Climatisation</option>
                    <option>Peinture & Décoration</option>
                    <option>Sécurité & Gardiennage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tarif indicatif</label>
                  <input
                    type="text"
                    placeholder="15 000 CFA / intervention"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-gray-700">Description détaillée</label>
                <button
                  type="button"
                  onClick={handleGenerateAiDescription}
                  disabled={isAiGenerating}
                  className="text-linkedin-blue hover:text-blue-800 text-xs font-semibold flex items-center gap-1 transition-colors px-2 py-0.5 rounded hover:bg-blue-50"
                >
                  {isAiGenerating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Qwen rédige...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      Rédiger avec Qwen AI
                    </>
                  )}
                </button>
              </div>
              <textarea
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-linkedin-blue focus:outline-none"
                placeholder="Décrivez les atouts du bien, conditions locatives, charges..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <span className="text-[11px] text-gray-500 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            Publication certifiée IMMO
          </span>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-5 py-2 text-gray-600 font-semibold text-sm hover:bg-gray-200 rounded-full transition-colors">
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              className={`px-6 py-2 text-white font-bold text-sm rounded-full transition-colors shadow-sm flex items-center gap-2 ${
                activeTab === 'INVESTMENT'
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : activeTab === 'SERVICE'
                  ? 'bg-yellow-600 hover:bg-yellow-700'
                  : 'bg-linkedin-blue hover:bg-blue-700'
              }`}
            >
              Publier l'annonce
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
