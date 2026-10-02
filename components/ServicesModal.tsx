
import React, { useState } from 'react';
import { X, Hammer, Zap, Droplets, Wind, Star, ShieldCheck, Clock, Phone, MapPin, CheckCircle, Search, AlertTriangle } from 'lucide-react';

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Category = 'ALL' | 'PLUMBING' | 'ELEC' | 'AC' | 'CLEANING';

export const ServicesModal: React.FC<ServicesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [category, setCategory] = useState<Category>('ALL');
  const [isUrgencyMode, setIsUrgencyMode] = useState(false);
  const [bookingStep, setBookingStep] = useState<'LIST' | 'CONFIRM' | 'SUCCESS'>('LIST');

  const artisans = [
    {
      id: 1,
      name: 'Jean-Marc Dossou',
      role: 'Plombier Certifié',
      company: 'Plomberie Express',
      rating: 4.9,
      reviews: 124,
      price: '5 000 CFA',
      priceUnit: 'Déplacement',
      location: 'Cotonou, Haie Vive',
      isVerified: true,
      availability: 'Immédiat',
      category: 'PLUMBING',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
    },
    {
      id: 2,
      name: 'Elec Pro Bénin',
      role: 'Électricien Agréé',
      company: 'Sarl Elec',
      rating: 4.7,
      reviews: 89,
      price: 'Devis Gratuit',
      priceUnit: '',
      location: 'Calavi',
      isVerified: true,
      availability: 'Dans 2h',
      category: 'ELEC',
      image: 'https://images.unsplash.com/photo-1555963966-9260a3d0588f?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
    },
    {
      id: 3,
      name: 'Clim Fraîcheur',
      role: 'Technicien Froid',
      company: 'Auto-entrepreneur',
      rating: 4.8,
      reviews: 56,
      price: '10 000 CFA',
      priceUnit: 'Entretien',
      location: 'Cotonou, Ganhi',
      isVerified: true,
      availability: 'Demain',
      category: 'AC',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
    },
    {
      id: 4,
      name: 'Marie Propre',
      role: 'Service Ménage',
      company: 'Clean Agency',
      rating: 4.9,
      reviews: 210,
      price: '3 000 CFA',
      priceUnit: '/heure',
      location: 'Porto-Novo',
      isVerified: true,
      availability: 'Sur RDV',
      category: 'CLEANING',
      image: 'https://images.unsplash.com/photo-1584621645335-659f7850239f?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
    }
  ];

  const filteredArtisans = category === 'ALL' 
    ? artisans 
    : artisans.filter(a => a.category === category);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className={`relative bg-[#f3f2ef] w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col h-[85vh] ${isUrgencyMode ? 'ring-4 ring-red-500 ring-opacity-50' : ''}`}>
        
        {/* Header */}
        <div className={`${isUrgencyMode ? 'bg-red-600 text-white' : 'bg-white text-gray-900'} px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0 transition-colors duration-300`}>
          <div className="flex items-center gap-3">
             <div className={`${isUrgencyMode ? 'bg-white text-red-600' : 'bg-yellow-500 text-white'} p-2 rounded-lg`}>
                <Hammer className="w-6 h-6" />
             </div>
             <div>
                <h2 className="text-lg font-bold leading-none flex items-center gap-2">
                  Hub Services & Artisans
                  {isUrgencyMode && <span className="bg-white text-red-600 text-[10px] px-2 py-0.5 rounded-full font-black animate-pulse">URGENCE SOS</span>}
                </h2>
                <p className={`text-xs mt-1 ${isUrgencyMode ? 'text-red-100' : 'text-gray-500'}`}>Trouvez un professionnel certifié en quelques minutes.</p>
             </div>
          </div>
          <button onClick={onClose} className={`p-2 rounded-full transition-colors ${isUrgencyMode ? 'hover:bg-red-700 text-white' : 'hover:bg-gray-100 text-gray-500'}`}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Container */}
        <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
          
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 bg-white border-r border-gray-200 p-4 flex-shrink-0 overflow-y-auto">
             
             {/* Urgency Toggle */}
             <div 
               onClick={() => setIsUrgencyMode(!isUrgencyMode)}
               className={`mb-6 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 shadow-sm flex items-center gap-3 ${isUrgencyMode ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-transparent hover:border-gray-300'}`}
             >
                <div className={`p-2 rounded-full ${isUrgencyMode ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                   <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                   <h4 className={`font-bold text-sm ${isUrgencyMode ? 'text-red-700' : 'text-gray-700'}`}>Mode Urgence</h4>
                   <p className="text-[10px] text-gray-500 leading-tight">Intervention &lt; 1h</p>
                </div>
             </div>

             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Catégories</h3>
             <div className="space-y-1">
                <button 
                  onClick={() => setCategory('ALL')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${category === 'ALL' ? 'bg-linkedin-blue/10 text-linkedin-blue' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                   <Search className="w-4 h-4" /> Tous les services
                </button>
                <button 
                  onClick={() => setCategory('PLUMBING')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${category === 'PLUMBING' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                   <Droplets className="w-4 h-4" /> Plomberie
                </button>
                <button 
                  onClick={() => setCategory('ELEC')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${category === 'ELEC' ? 'bg-yellow-50 text-yellow-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                   <Zap className="w-4 h-4" /> Électricité
                </button>
                <button 
                  onClick={() => setCategory('AC')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${category === 'AC' ? 'bg-cyan-50 text-cyan-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                   <Wind className="w-4 h-4" /> Climatisation
                </button>
             </div>

             <div className="mt-8 bg-blue-50 p-4 rounded-xl">
                <h4 className="font-bold text-blue-800 text-sm mb-1">Garantie Travaux</h4>
                <p className="text-xs text-blue-600 leading-relaxed">
                   Tous les artisans Immo sont vérifiés. Paiement bloqué jusqu'à validation des travaux.
                </p>
                <div className="mt-2 flex items-center gap-1 text-xs font-bold text-blue-700">
                   <ShieldCheck className="w-4 h-4" />
                   Assurance incluse
                </div>
             </div>
          </div>

          {/* Main List */}
          <div className="flex-grow bg-[#f3f2ef] p-4 sm:p-6 overflow-y-auto">
             
             {bookingStep === 'LIST' && (
                <>
                   <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-gray-700">
                         {filteredArtisans.length} Professionnels à proximité
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                         <MapPin className="w-4 h-4" />
                         <span className="underline decoration-dotted cursor-pointer">Haie Vive, Cotonou</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {filteredArtisans.map((artisan) => (
                         <div key={artisan.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
                            <div className="flex items-start gap-4">
                               <div className="relative">
                                  <img src={artisan.image} alt={artisan.name} className="w-16 h-16 rounded-lg object-cover bg-gray-200" />
                                  {artisan.isVerified && (
                                     <div className="absolute -bottom-2 -right-2 bg-white p-0.5 rounded-full shadow-sm">
                                        <ShieldCheck className="w-5 h-5 text-green-600 fill-green-100" />
                                     </div>
                                  )}
                               </div>
                               <div className="flex-grow">
                                  <div className="flex justify-between items-start">
                                     <div>
                                        <h4 className="font-bold text-gray-900 group-hover:text-linkedin-blue transition-colors">{artisan.name}</h4>
                                        <p className="text-xs text-gray-500">{artisan.role} • {artisan.company}</p>
                                     </div>
                                     <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-xs font-bold text-yellow-700 border border-yellow-100">
                                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                        {artisan.rating}
                                     </div>
                                  </div>
                                  
                                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-600">
                                     <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3 text-gray-400" />
                                        {artisan.location}
                                     </div>
                                     <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3 text-gray-400" />
                                        {isUrgencyMode ? <span className="text-red-600 font-bold">15 min</span> : artisan.availability}
                                     </div>
                                  </div>

                                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                                     <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-semibold">Tarif estimé</p>
                                        <p className="text-sm font-bold text-gray-900">
                                           {artisan.price} <span className="text-xs font-normal text-gray-500">{artisan.priceUnit}</span>
                                        </p>
                                     </div>
                                     <button 
                                       onClick={() => setBookingStep('CONFIRM')}
                                       className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 ${isUrgencyMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-linkedin-blue text-white hover:bg-blue-700'}`}
                                     >
                                        {isUrgencyMode ? <Phone className="w-4 h-4" /> : null}
                                        {isUrgencyMode ? 'SOS Appel' : 'Réserver'}
                                     </button>
                                  </div>
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
                </>
             )}

             {bookingStep === 'CONFIRM' && (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-right-8 duration-300">
                   <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                      <Clock className="w-10 h-10 text-linkedin-blue" />
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-2">Confirmer la demande</h3>
                   <p className="text-gray-500 max-w-sm mb-8">
                      L'artisan recevra votre demande instantanément. Le paiement sera bloqué sur votre Wallet PaySafe mais ne sera débité qu'après validation de la fin des travaux.
                   </p>
                   
                   <div className="flex gap-3 w-full max-w-xs">
                      <button 
                        onClick={() => setBookingStep('LIST')}
                        className="flex-1 py-3 border border-gray-300 rounded-full font-semibold text-gray-600 hover:bg-gray-50"
                      >
                         Annuler
                      </button>
                      <button 
                        onClick={() => setBookingStep('SUCCESS')}
                        className="flex-1 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 shadow-lg"
                      >
                         Confirmer
                      </button>
                   </div>
                </div>
             )}

             {bookingStep === 'SUCCESS' && (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
                   <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 relative">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                      <div className="absolute inset-0 border-4 border-green-200 rounded-full animate-ping opacity-20"></div>
                   </div>
                   <h3 className="text-2xl font-bold text-gray-900 mb-2">Réservation Confirmée !</h3>
                   <p className="text-gray-500 max-w-sm mb-8">
                      Jean-Marc a été notifié. Il arrivera vers <span className="font-bold text-gray-900">14:30</span>.
                      <br/>Vous pouvez suivre son trajet dans la messagerie.
                   </p>
                   
                   <button 
                     onClick={onClose}
                     className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-black transition-colors"
                   >
                      Retour à l'accueil
                   </button>
                </div>
             )}

          </div>
        </div>
      </div>
    </div>
  );
};
