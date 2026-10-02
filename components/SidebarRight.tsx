
import React from 'react';
import { TrendingUp, Info, Star, ShieldCheck } from 'lucide-react';

interface SidebarRightProps {
  onOpenServices?: () => void;
}

const NewsItem: React.FC<{ title: string; subtitle: string; index: number }> = ({ title, subtitle, index }) => (
  <div className="cursor-pointer hover:bg-gray-100 px-3 py-2 flex items-start gap-2">
     <div className="pt-1.5">
       <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
     </div>
     <div>
       <h3 className="text-sm font-semibold text-gray-700 line-clamp-2 pr-2">{title}</h3>
       <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
     </div>
  </div>
);

const ArtisanItem: React.FC<{ name: string; role: string; rating: number; img: string }> = ({ name, role, rating, img }) => (
  <div className="flex items-center gap-3 mb-3 cursor-pointer group">
     <img src={img} alt={name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
     <div className="flex-grow">
        <h4 className="text-sm font-semibold text-gray-900 group-hover:underline flex items-center gap-1">
           {name}
           <ShieldCheck className="w-3 h-3 text-blue-500" />
        </h4>
        <p className="text-xs text-gray-500">{role}</p>
     </div>
     <div className="flex items-center gap-0.5 bg-gray-100 px-1.5 py-0.5 rounded">
        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
        <span className="text-xs font-bold text-gray-700">{rating}</span>
     </div>
  </div>
);

export const SidebarRight: React.FC<SidebarRightProps> = ({ onOpenServices }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-white rounded-lg border border-gray-300 shadow-sm pt-3 pb-2">
        <div className="flex justify-between items-center px-3 mb-2">
           <h2 className="text-base font-semibold text-gray-900">Tendances Immo</h2>
           <Info className="w-4 h-4 text-gray-600 rounded fill-current hover:text-gray-900 cursor-pointer" />
        </div>
        
        <div className="flex flex-col">
           <NewsItem title="Titres fonciers sécurisés par Blockchain" subtitle="Il y a 2h • Innovation" index={1} />
           <NewsItem title="Nouvelle garantie 'PaySafe' pour proprios" subtitle="Il y a 10h • 5 212 intéressés" index={2} />
           <NewsItem title="Coût construction Cotonou: -5%" subtitle="Il y a 1j • Analyse Marché" index={3} />
           <NewsItem title="Top 10 Quartiers Rentables Abidjan" subtitle="Il y a 18h • Investissement" index={4} />
           <NewsItem title="Moov Money intègre le paiement de loyer" subtitle="Il y a 2j • FinTech" index={5} />
        </div>

        <button className="mt-1 ml-3 px-2 py-1 rounded hover:bg-gray-100 flex items-center gap-1 text-sm font-semibold text-gray-500">
           Voir le rapport complet <span className="text-lg leading-none">→</span>
        </button>
      </div>

      {/* Suggested Artisans */}
      <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-3">
         <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Artisans Recommandés</h3>
            <span 
              onClick={onOpenServices}
              className="text-xs text-gray-500 cursor-pointer hover:underline"
            >
              Voir tout
            </span>
         </div>
         <ArtisanItem 
            name="Eric K." 
            role="Électricien" 
            rating={4.9} 
            img="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
         />
         <ArtisanItem 
            name="Sarah M." 
            role="Designer Intérieur" 
            rating={4.8} 
            img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
         />
         <ArtisanItem 
            name="Bâtisseurs Pro" 
            role="Entrepreneur Général" 
            rating={4.7} 
            img="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
         />
         <button 
           onClick={onOpenServices}
           className="w-full mt-1 py-1.5 border border-gray-400 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-500 transition-colors"
         >
            Trouver un Pro à proximité
         </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-3">
         <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded">
                <TrendingUp className="w-6 h-6 text-linkedin-blue" />
            </div>
            <div>
                <h3 className="text-sm font-semibold">Commencez à Investir</h3>
                <p className="text-xs text-gray-500 mt-1">Achetez des parts immobilières dès 10 000 CFA.</p>
                <button className="mt-2 w-full py-1 border border-linkedin-blue text-linkedin-blue rounded-full text-sm font-semibold hover:bg-blue-50">
                    Explorer les opportunités
                </button>
            </div>
         </div>
      </div>

      <div className="px-4 text-xs text-gray-500 text-center">
         <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 my-2">
            <span className="hover:text-linkedin-blue hover:underline cursor-pointer">À propos</span>
            <span className="hover:text-linkedin-blue hover:underline cursor-pointer">Anti-Arnaque</span>
            <span className="hover:text-linkedin-blue hover:underline cursor-pointer">Centre d'aide</span>
            <span className="hover:text-linkedin-blue hover:underline cursor-pointer">Confidentialité</span>
            <span className="hover:text-linkedin-blue hover:underline cursor-pointer">PaySafe™</span>
         </div>
         <p className="mt-2">Immo Africa Corporation © 2025</p>
      </div>
    </div>
  );
};
