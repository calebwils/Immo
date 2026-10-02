
import React from 'react';
import { Bookmark, FileCheck, ShieldCheck, Wallet, CreditCard, Clock, TrendingUp, FileText } from 'lucide-react';

interface SidebarLeftProps {
  onOpenRentCV?: () => void;
  onOpenContract?: () => void;
  onOpenServices?: () => void;
}

export const SidebarLeft: React.FC<SidebarLeftProps> = ({ onOpenRentCV, onOpenContract, onOpenServices }) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Identity Card */}
      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm relative">
        {/* Banner */}
        <div className="h-14 bg-gradient-to-r from-blue-700 to-cyan-500 w-full"></div>
        
        {/* Avatar */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
           <div className="w-[72px] h-[72px] rounded-full border-2 border-white bg-gray-200 overflow-hidden cursor-pointer hover:opacity-90">
             <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" className="w-full h-full object-cover" />
           </div>
        </div>

        {/* User Info */}
        <div className="mt-14 pt-2 pb-4 px-3 text-center border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900 hover:underline cursor-pointer">Caleb N.</h2>
          <p className="text-xs text-gray-500 mt-1">Locataire • Cotonou, Bénin</p>
          <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
            Profil Vérifié
          </div>
        </div>

        {/* Stats */}
        <div className="py-3 border-b border-gray-200">
          <div className="px-3 py-1 flex justify-between items-center hover:bg-gray-100 cursor-pointer" onClick={onOpenRentCV}>
             <div className="flex flex-col text-left">
                <span className="text-xs text-gray-500 font-semibold">RentScore™</span>
                <span className="text-[10px] text-gray-400">Fiabilité élevée</span>
             </div>
             <span className="text-xs text-green-600 font-bold">780/850</span>
          </div>
          <div className="px-3 py-1 flex justify-between items-center hover:bg-gray-100 cursor-pointer mt-2">
             <div className="flex flex-col text-left">
                <span className="text-xs text-gray-500 font-semibold">Solde Mobile</span>
                <span className="text-[10px] text-gray-400">Mobile Money</span>
             </div>
             <span className="text-xs text-linkedin-blue font-semibold">15 400 CFA</span>
          </div>
        </div>

        {/* Premium Teaser */}
        <div className="px-3 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 group">
          <div className="text-xs text-gray-500">Sécurisez votre logement</div>
          <div className="flex items-center gap-1 mt-1">
             <ShieldCheck className="w-3 h-3 text-yellow-600" />
             <span className="text-xs font-semibold underline decoration-transparent group-hover:decoration-current">Activer PaySafe™</span>
          </div>
        </div>

        {/* My Items */}
        <div className="py-1">
          <div 
            onClick={onOpenRentCV}
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between text-xs font-semibold text-gray-600 transition-colors"
          >
             <div className="flex items-center gap-2">
               <FileCheck className="w-4 h-4" />
               <span>Mon RentCV</span>
             </div>
          </div>
          
          <div 
            onClick={onOpenContract}
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between text-xs font-semibold text-gray-600 transition-colors"
          >
             <div className="flex items-center gap-2">
               <FileText className="w-4 h-4" />
               <span>Mes Contrats</span>
             </div>
             <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">1</span>
          </div>
        </div>
      </div>

      {/* Financial Snapshot */}
      <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-3">
         <h3 className="text-xs font-bold text-gray-900 mb-2">Aperçu Financier</h3>
         
         <div className="flex items-center gap-3 p-2 bg-red-50 rounded border border-red-100 mb-2 cursor-pointer hover:bg-red-100">
            <Clock className="w-8 h-8 text-red-500" />
            <div>
               <p className="text-xs text-gray-500">Prochain Loyer</p>
               <p className="text-sm font-bold text-red-700">J-5</p>
            </div>
         </div>

         <div className="flex items-center gap-3 p-2 bg-green-50 rounded border border-green-100 cursor-pointer hover:bg-green-100">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <div>
               <p className="text-xs text-gray-500">ROI Investissement</p>
               <p className="text-sm font-bold text-green-700">+12 500 CFA</p>
            </div>
         </div>
      </div>

      {/* Sticky Bottom Section (Community/Groups) */}
      <div className="bg-white rounded-lg border border-gray-300 shadow-sm pt-3 pb-1 sticky top-20">
         <div className="px-3 pb-2 text-xs font-semibold hover:underline cursor-pointer text-linkedin-blue">Mes Communautés</div>
         <div className="px-3 pb-2 flex justify-between items-center text-xs font-semibold hover:underline cursor-pointer text-linkedin-blue group">
            <span>Location Cotonou</span>
            <Wallet className="w-4 h-4 text-gray-600 group-hover:bg-gray-200 rounded" />
         </div>
         <div className="px-3 pb-2 flex justify-between items-center text-xs font-semibold hover:underline cursor-pointer text-linkedin-blue group">
            <span>Investisseurs Immo</span>
         </div>
         <div className="px-3 pb-2 text-xs font-semibold hover:underline cursor-pointer text-linkedin-blue">Recherches Sauvegardées</div>
         
         <div 
           onClick={onOpenServices}
           className="border-t border-gray-200 hover:bg-gray-100 cursor-pointer py-3 text-center transition-colors"
         >
            <span className="text-sm font-semibold text-gray-500 hover:text-linkedin-blue">Trouver un Artisan</span>
         </div>
      </div>
    </div>
  );
};
