import React, { useState, useRef } from 'react';
import {
  X,
  Home,
  TrendingUp,
  Tag,
  Camera,
  ChevronRight,
  Sparkles,
  Loader2,
  CheckCircle2,
  Upload,
  Trash2,
  Key
} from 'lucide-react';
import { generateListingDescription } from '../services/qwenAi';
import { PostData, ListingType } from '../types';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (listing: Partial<PostData>) => void;
}

type Tab = 'RENTAL' | 'SALE' | 'INVESTMENT';

export const CreateListingModal: React.FC<CreateListingModalProps> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<Tab>('RENTAL');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('250000');
  const [location, setLocation] = useState('Haie Vive, Cotonou');
  const [description, setDescription] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Climatisation',
    'WiFi',
    'Piscine',
    'Groupe Électrogène',
    'Sécurité 24/7'
  ]);
  const [targetAmount, setTargetAmount] = useState('50000000');
  const [minInvestment, setMinInvestment] = useState('10000');
  const [roi, setRoi] = useState('14%');
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Images state: can have multiple uploaded images!
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ]);
  const [selectedMainImageIndex, setSelectedMainImageIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleAmenity = (tag: string) => {
    setSelectedAmenities(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    processFiles(Array.from(files));
  };

  const processFiles = (files: File[]) => {
    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    if (imageFiles.length === 0) return;

    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = event => {
        const result = event.target?.result as string;
        if (result) {
          setUploadedImages(prev => [result, ...prev]);
          setSelectedMainImageIndex(0);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const removeImage = (indexToRemove: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedImages(prev => {
      const updated = prev.filter((_, idx) => idx !== indexToRemove);
      if (selectedMainImageIndex >= updated.length) {
        setSelectedMainImageIndex(Math.max(0, updated.length - 1));
      }
      return updated;
    });
  };

  const handleGenerateAiDescription = async () => {
    if (isAiGenerating) return;
    setIsAiGenerating(true);
    try {
      const generated = await generateListingDescription({
        title: title || (activeTab === 'RENTAL' ? 'Appartement Haut Standing' : activeTab === 'SALE' ? 'Villa Contemporaine à Vendre' : 'Projet Résidence Airbnb'),
        type: activeTab,
        location: location || 'Cotonou, Bénin',
        price: activeTab === 'INVESTMENT' ? minInvestment : price,
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
    const mainImg = uploadedImages[selectedMainImageIndex] || uploadedImages[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
    
    const formattedPrice = activeTab === 'SALE'
      ? `${parseInt(price || '45000000').toLocaleString('fr-FR')} CFA`
      : activeTab === 'RENTAL'
      ? `${parseInt(price || '250000').toLocaleString('fr-FR')} CFA/mois`
      : 'Min: 10 000 CFA';

    const newListing: Partial<PostData> = {
      id: `listing-${Date.now()}`,
      author: {
        name: 'Caleb N.',
        headline: 'Propriétaire • Cotonou',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        badge: 'Verified'
      },
      content: `${title || (activeTab === 'SALE' ? 'Maison à Vendre' : 'Bien à Louer')}\n\n${description || 'Superbe opportunité disponible avec commodités complètes et visites directes.'}`,
      timestamp: "À l'instant",
      likes: 1,
      comments: 0,
      reposts: 0,
      imageUrl: mainImg,
      images: uploadedImages.length > 0 ? uploadedImages : [mainImg],
      listingType: activeTab as ListingType,
      price: formattedPrice,
      location: location || 'Cotonou, Bénin',
      specs: activeTab === 'INVESTMENT' ? `${roi} Rendement Est.` : '3 Pièces • 2 Salles d\'eau',
      description: description || 'Visite immédiate sur rendez-vous avec le propriétaire.',
      amenities: selectedAmenities,
      fundingProgress: activeTab === 'INVESTMENT' ? 10 : undefined,
      targetAmount: activeTab === 'INVESTMENT' ? `${targetAmount} CFA` : undefined,
      minInvestment: activeTab === 'INVESTMENT' ? `${minInvestment} CFA` : undefined,
      isAiRecommended: true,
      matchScore: 98,
      matchReason: 'Recommandé par Immo-AI selon vos critères'
    };

    if (onSubmit) {
      onSubmit(newListing);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="relative bg-[#f3f2ef] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">Publier une Annonce</h2>
            <p className="text-xs text-gray-500">Mettez votre bien en location ou en vente auprès d'acheteurs et locataires</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs: Location / Vente / Investissement */}
        <div className="bg-white px-6 border-b border-gray-200 flex gap-4 sm:gap-6 flex-shrink-0">
          <button
            onClick={() => {
              setActiveTab('RENTAL');
              if (price === '45000000') setPrice('250000');
            }}
            className={`py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'RENTAL' ? 'border-linkedin-blue text-linkedin-blue' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Key className="w-4 h-4" />
            Location (À Louer)
          </button>
          <button
            onClick={() => {
              setActiveTab('SALE');
              if (price === '250000') setPrice('45000000');
            }}
            className={`py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'SALE' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Tag className="w-4 h-4" />
            Vente (À Vendre)
          </button>
          <button
            onClick={() => setActiveTab('INVESTMENT')}
            className={`py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'INVESTMENT' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Investissement
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-grow bg-white">
          {/* Real Image Upload Area */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2 flex justify-between items-center">
              <span>Photos du Bien ({uploadedImages.length})</span>
              <span className="text-[11px] text-gray-400 font-normal">Formats : JPG, PNG, WEBP</span>
            </label>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              multiple
              className="hidden"
            />

            {/* Drag & Drop Upload Box */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/80 scale-[1.01]'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50 bg-[#fafafa]'
              }`}
            >
              <div className="w-12 h-12 bg-blue-100/70 text-linkedin-blue rounded-full flex items-center justify-center mb-2 shadow-xs">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-gray-800">
                Glissez vos photos ici ou <span className="text-linkedin-blue underline">cliquez pour importer</span>
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Sélectionnez les images depuis votre ordinateur ou smartphone
              </p>
            </div>

            {/* Thumbnails of uploaded images */}
            {uploadedImages.length > 0 && (
              <div className="mt-3">
                <p className="text-[11px] font-semibold text-gray-500 mb-1.5">
                  Cliquez sur une image pour la définir comme couverture :
                </p>
                <div className="flex gap-2.5 overflow-x-auto py-1 no-scrollbar">
                  {uploadedImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedMainImageIndex(idx)}
                      className={`relative w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 cursor-pointer group shadow-xs transition-all ${
                        selectedMainImageIndex === idx ? 'border-linkedin-blue ring-2 ring-blue-400/40' : 'border-gray-200 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                      {selectedMainImageIndex === idx && (
                        <span className="absolute bottom-0 inset-x-0 bg-linkedin-blue text-white text-[9px] font-bold text-center py-0.5">
                          Couverture
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={e => removeImage(idx, e)}
                        title="Supprimer"
                        className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Fields based on Tab */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Titre de l'annonce</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={activeTab === 'SALE' ? "Ex: Belle Villa 4 Chambres avec Jardin à Cocody" : "Ex: Appartement F3 Moderne et Lumineux à Haie Vive"}
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-linkedin-blue focus:outline-none"
              />
            </div>

            {(activeTab === 'RENTAL' || activeTab === 'SALE') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {activeTab === 'RENTAL' ? 'Loyer Mensuel (CFA)' : 'Prix de Vente Total (CFA)'}
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder={activeTab === 'RENTAL' ? "250 000" : "45 000 000"}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-linkedin-blue focus:outline-none font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Localisation / Quartier</label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="Haie Vive, Cotonou ou Cocody, Abidjan"
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-linkedin-blue focus:outline-none"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Commodités incluses</label>
                  <div className="flex gap-2 flex-wrap">
                    {['Climatisation', 'WiFi', 'Piscine', 'Groupe Électrogène', 'Sécurité 24/7', 'Forage Eau', 'Garage'].map(tag => (
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
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Ticket Minimum (CFA)</label>
                  <input
                    type="text"
                    value={minInvestment}
                    onChange={e => setMinInvestment(e.target.value)}
                    placeholder="10 000"
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Rendement Estimé (%)</label>
                  <input
                    type="text"
                    value={roi}
                    onChange={e => setRoi(e.target.value)}
                    placeholder="12-15%"
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Localisation</label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="Assinie, Côte d'Ivoire"
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Description & AI Generator */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-gray-700">Description de l'Annonce</label>
                <button
                  type="button"
                  onClick={handleGenerateAiDescription}
                  disabled={isAiGenerating}
                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold flex items-center gap-1.5 transition-all px-3 py-1 rounded-full shadow-2xs active:scale-95"
                >
                  {isAiGenerating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                      <span>Qwen rédige pour {location || 'votre bien'}...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Rédiger avec Qwen AI</span>
                    </>
                  )}
                </button>
              </div>
              <textarea
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-linkedin-blue focus:outline-none leading-relaxed"
                placeholder="Cliquez sur 'Rédiger avec Qwen AI' pour générer une description sur-mesure basée sur votre titre, quartier et commodités..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center flex-shrink-0">
          <span className="text-[11px] text-gray-500 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            Publication directe IMMO
          </span>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 text-gray-600 font-semibold text-sm hover:bg-gray-200 rounded-full transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              className={`px-6 py-2 text-white font-bold text-sm rounded-full transition-colors shadow-sm flex items-center gap-2 ${
                activeTab === 'SALE'
                  ? 'bg-green-600 hover:bg-green-700'
                  : activeTab === 'INVESTMENT'
                  ? 'bg-purple-600 hover:bg-purple-700'
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
