
import React, { useState } from 'react';
import { X, Home, TrendingUp, Hammer, Camera, Upload, Check, ChevronRight } from 'lucide-react';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'RENTAL' | 'INVESTMENT' | 'SERVICE';

export const CreateListingModal: React.FC<CreateListingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<Tab>('RENTAL');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-[#f3f2ef] w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900">Créer une Annonce</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white px-6 border-b border-gray-200 flex gap-6">
           <button 
             onClick={() => setActiveTab('RENTAL')}
             className={`py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'RENTAL' ? 'border-linkedin-blue text-linkedin-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
           >
             <Home className="w-4 h-4" />
             Location / Vente
           </button>
           <button 
             onClick={() => setActiveTab('INVESTMENT')}
             className={`py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'INVESTMENT' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
           >
             <TrendingUp className="w-4 h-4" />
             Investissement
           </button>
           <button 
             onClick={() => setActiveTab('SERVICE')}
             className={`py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'SERVICE' ? 'border-yellow-600 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
           >
             <Hammer className="w-4 h-4" />
             Service Artisan
           </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-grow bg-white">
           
           {/* Image Upload Area */}
           <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 cursor-pointer transition-colors group">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                 <Camera className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-sm font-semibold text-gray-700">Ajouter des photos</p>
              <p className="text-xs text-gray-500 mt-1">ou glisser-déposer (Max 10)</p>
           </div>

           {/* Form Fields based on Tab */}
           <div className="space-y-4">
              
              {/* Common Fields */}
              <div>
                 <label className="block text-xs font-bold text-gray-700 mb-1">Titre de l'annonce</label>
                 <input type="text" placeholder="Ex: Appartement moderne à Haie Vive" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-linkedin-blue focus:outline-none" />
              </div>

              {activeTab === 'RENTAL' && (
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-xs font-bold text-gray-700 mb-1">Loyer Mensuel (CFA)</label>
                       <input type="number" placeholder="250 000" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-linkedin-blue focus:outline-none" />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-700 mb-1">Localisation</label>
                       <input type="text" placeholder="Quartier, Ville" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-linkedin-blue focus:outline-none" />
                    </div>
                    <div className="col-span-2">
                       <label className="block text-xs font-bold text-gray-700 mb-1">Commodités</label>
                       <div className="flex gap-2 flex-wrap">
                          {['Climatisation', 'WiFi', 'Piscine', 'Groupe Électrogène', 'Sécurité 24/7'].map(tag => (
                             <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium cursor-pointer hover:bg-gray-200 border border-gray-200">
                                + {tag}
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
                       <input type="number" placeholder="50 000 000" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-700 mb-1">Ticket Minimum</label>
                       <input type="number" placeholder="10 000" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-700 mb-1">ROI Estimé (%)</label>
                       <input type="text" placeholder="12-15%" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-700 mb-1">Durée du Projet</label>
                       <input type="text" placeholder="ex: 24 mois" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                    </div>
                 </div>
              )}

              {activeTab === 'SERVICE' && (
                 <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-xs font-bold text-gray-700 mb-1">Type de Service</label>
                       <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none bg-white">
                          <option>Plomberie</option>
                          <option>Électricité</option>
                          <option>Peinture</option>
                          <option>Nettoyage</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-700 mb-1">Tarif Horaire / Forfait</label>
                       <input type="text" placeholder="Sur devis" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none" />
                    </div>
                 </div>
              )}

              <div>
                 <label className="block text-xs font-bold text-gray-700 mb-1 flex justify-between">
                    Description
                    <span className="text-linkedin-blue cursor-pointer flex items-center gap-1 font-normal">
                       <TrendingUp className="w-3 h-3" /> Générer avec IA
                    </span>
                 </label>
                 <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-linkedin-blue focus:outline-none" placeholder="Décrivez le bien en détail..."></textarea>
              </div>

           </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
           <button onClick={onClose} className="px-5 py-2 text-gray-600 font-semibold text-sm hover:bg-gray-200 rounded-full transition-colors">
              Annuler
           </button>
           <button 
             onClick={onClose}
             className={`px-6 py-2 text-white font-bold text-sm rounded-full transition-colors shadow-sm flex items-center gap-2 ${
               activeTab === 'INVESTMENT' ? 'bg-purple-600 hover:bg-purple-700' :
               activeTab === 'SERVICE' ? 'bg-yellow-600 hover:bg-yellow-700' :
               'bg-linkedin-blue hover:bg-blue-700'
             }`}
           >
              Publier l'annonce
              <ChevronRight className="w-4 h-4" />
           </button>
        </div>

      </div>
    </div>
  );
};
