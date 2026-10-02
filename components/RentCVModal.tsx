
import React from 'react';
import { X, ShieldCheck, CheckCircle, Star, FileText, Share2, Download, Briefcase, Calendar } from 'lucide-react';

interface RentCVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RentCVModal: React.FC<RentCVModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[#f3f2ef] w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 p-1.5 rounded text-white">
               <FileText className="w-5 h-5" />
            </div>
            <div>
               <h2 className="text-lg font-bold text-gray-900 leading-none">Mon RentCV™</h2>
               <p className="text-xs text-gray-500 mt-0.5">CV Locatif Numérique & Identité</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-grow">
          
          {/* Top Profile Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 mb-5 shadow-sm flex flex-col md:flex-row gap-6">
             {/* Left: Avatar & Badge */}
             <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full border-4 border-green-50 overflow-hidden relative">
                   <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="mt-2 bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                   <ShieldCheck className="w-3 h-3" /> Locataire Vérifié
                </div>
             </div>

             {/* Right: Info & Stats */}
             <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                   <div>
                      <h3 className="text-xl font-bold text-gray-900">Caleb N.</h3>
                      <p className="text-sm text-gray-500">Ingénieur Logiciel • Cotonou, Bénin</p>
                   </div>
                   <div className="text-right hidden sm:block">
                      <p className="text-xs text-gray-400">Membre depuis 2023</p>
                      <p className="text-xs text-gray-400">ID: #IMMO-8291</p>
                   </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                   <div className="bg-gray-50 p-2 rounded border border-gray-100 text-center">
                      <p className="text-[10px] text-gray-500 uppercase font-semibold">RentScore</p>
                      <p className="text-xl font-bold text-linkedin-blue">780<span className="text-xs text-gray-400 font-normal">/850</span></p>
                   </div>
                   <div className="bg-gray-50 p-2 rounded border border-gray-100 text-center">
                      <p className="text-[10px] text-gray-500 uppercase font-semibold">Revenus</p>
                      <p className="text-sm font-bold text-gray-800">Vérifiés</p>
                      <CheckCircle className="w-3 h-3 text-green-500 mx-auto mt-0.5" />
                   </div>
                   <div className="bg-gray-50 p-2 rounded border border-gray-100 text-center">
                      <p className="text-[10px] text-gray-500 uppercase font-semibold">Paiements</p>
                      <p className="text-sm font-bold text-gray-800">100%</p>
                   </div>
                   <div className="bg-gray-50 p-2 rounded border border-gray-100 text-center">
                      <p className="text-[10px] text-gray-500 uppercase font-semibold">Garant</p>
                      <p className="text-sm font-bold text-gray-800">Actif</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Verification Status */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 mb-5 shadow-sm">
             <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gray-600" />
                Identité & Solvabilité
             </h4>
             <div className="space-y-3">
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors">
                   <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-1.5 rounded-full">
                         <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                         <p className="text-sm font-semibold text-gray-800">Pièce d'identité (CIP/Passeport)</p>
                         <p className="text-xs text-gray-500">Vérifié via base gouvernementale</p>
                      </div>
                   </div>
                   <span className="text-xs text-green-700 font-medium bg-green-50 px-2 py-0.5 rounded border border-green-100">Vérifié</span>
                </div>

                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors">
                   <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-1.5 rounded-full">
                         <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                         <p className="text-sm font-semibold text-gray-800">Emploi & Revenus</p>
                         <p className="text-xs text-gray-500">Vérifié via Fiches de Paie & Relevés</p>
                      </div>
                   </div>
                   <span className="text-xs text-green-700 font-medium bg-green-50 px-2 py-0.5 rounded border border-green-100">Vérifié</span>
                </div>

                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors">
                   <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-1.5 rounded-full">
                         <Briefcase className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                         <p className="text-sm font-semibold text-gray-800">Recommandation Employeur</p>
                         <p className="text-xs text-gray-500">En attente de confirmation RH</p>
                      </div>
                   </div>
                   <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded border border-gray-200">En cours</span>
                </div>
             </div>
          </div>

          {/* Rental History */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 mb-5 shadow-sm">
             <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                Historique Locatif
             </h4>
             <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
                
                {/* Item 1 */}
                <div className="ml-6 relative">
                   <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                   <div className="flex justify-between items-start">
                      <div>
                         <h5 className="text-sm font-bold text-gray-900">Appartement Haie Vive</h5>
                         <p className="text-xs text-gray-500">24 mois • Jan 2022 - Présent</p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded border border-yellow-100">
                         <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                         <span className="text-xs font-bold text-yellow-700">5.0</span>
                      </div>
                   </div>
                   <p className="text-xs text-gray-600 mt-1 italic">"Caleb est un excellent locataire. Paiements toujours à l'heure." - Proprio A.</p>
                </div>

                {/* Item 2 */}
                <div className="ml-6 relative">
                   <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-gray-300 border-2 border-white"></div>
                   <div className="flex justify-between items-start">
                      <div>
                         <h5 className="text-sm font-bold text-gray-900">Studio Calavi</h5>
                         <p className="text-xs text-gray-500">12 mois • Jan 2021 - Déc 2021</p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded border border-yellow-100">
                         <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                         <span className="text-xs font-bold text-yellow-700">4.8</span>
                      </div>
                   </div>
                </div>

             </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-white px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
           <button className="flex-1 py-2.5 bg-linkedin-blue text-white rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm">
              <Share2 className="w-4 h-4" />
              Partager RentCV
           </button>
           <button className="flex-1 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-full font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Télécharger PDF
           </button>
        </div>

      </div>
    </div>
  );
};
