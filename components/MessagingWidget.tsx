
import React from 'react';
import { ChevronUp, ChevronDown, MoreHorizontal, Edit, Search } from 'lucide-react';

interface MessagingWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MessagingWidget: React.FC<MessagingWidgetProps> = ({ isOpen, onToggle }) => {
  return (
    <div className={`fixed bottom-0 right-4 w-[300px] bg-white rounded-t-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] border border-gray-300 transition-all duration-300 z-50 ${isOpen ? 'h-[400px]' : 'h-[48px]'}`}>
      
      {/* Header */}
      <div 
        className="h-[48px] px-3 flex items-center justify-between cursor-pointer border-b border-gray-200 hover:bg-gray-50 rounded-t-lg"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
           <div className="relative">
             <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Me" className="w-full h-full object-cover" />
             </div>
             <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
           </div>
           <span className="text-sm font-bold text-gray-800">Messagerie</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
           <MoreHorizontal className="w-4 h-4 hover:text-black" />
           <Edit className="w-4 h-4 hover:text-black" />
           {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>
      </div>

      {/* Content (only visible when open) */}
      {isOpen && (
        <div className="flex flex-col h-[352px]">
          {/* Search */}
          <div className="p-2 border-b border-gray-200">
             <div className="relative">
                <Search className="absolute left-2 top-1.5 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className="w-full bg-[#eef3f8] pl-8 pr-3 py-1 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black/20"
                />
             </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
             
             {/* Chat Item 1 */}
             <div className="px-3 py-3 hover:bg-gray-100 cursor-pointer flex gap-2 border-l-4 border-transparent hover:border-green-600">
                <div className="relative flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" alt="Agent" className="w-10 h-10 rounded-full object-cover" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-grow overflow-hidden">
                   <div className="flex justify-between items-baseline">
                      <span className="text-sm font-semibold truncate">Agence Prestige</span>
                      <span className="text-xs text-gray-500">10:42</span>
                   </div>
                   <p className="text-xs text-gray-500 truncate">Bonjour ! Êtes-vous disponible pour une visite demain ?</p>
                </div>
             </div>

             {/* Chat Item 2 */}
             <div className="px-3 py-3 hover:bg-gray-100 cursor-pointer flex gap-2 border-l-4 border-transparent hover:border-green-600">
                <div className="relative flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" alt="Invest" className="w-10 h-10 rounded-full object-cover" />
                </div>
                <div className="flex-grow overflow-hidden">
                   <div className="flex justify-between items-baseline">
                      <span className="text-sm font-semibold truncate">Support Immo</span>
                      <span className="text-xs text-gray-500">Hier</span>
                   </div>
                   <p className="text-xs text-gray-500 truncate">Votre dividende est disponible !</p>
                </div>
             </div>

             {/* Chat Item 3 */}
             <div className="px-3 py-3 hover:bg-gray-100 cursor-pointer flex gap-2 border-l-4 border-transparent hover:border-green-600">
                <div className="relative flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" alt="Plumber" className="w-10 h-10 rounded-full object-cover" />
                </div>
                <div className="flex-grow overflow-hidden">
                   <div className="flex justify-between items-baseline">
                      <span className="text-sm font-semibold truncate">Jean-Marc (Plombier)</span>
                      <span className="text-xs text-gray-500">Lun</span>
                   </div>
                   <p className="text-xs text-gray-500 truncate">J'arrive à 14h.</p>
                </div>
             </div>

          </div>
        </div>
      )}
    </div>
  );
};
