
import React from 'react';
import { Home, Hammer, FileText, Image } from 'lucide-react';

interface CreatePostProps {
  onOpen?: () => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onOpen }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-4 mb-2">
      <div className="flex gap-3 mb-2">
         <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 cursor-pointer">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" className="w-full h-full object-cover" />
         </div>
         <div className="flex-grow">
            <button 
              onClick={onOpen}
              className="w-full h-12 text-left px-4 rounded-full border border-gray-400 font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
            >
               Publier un bien ou une demande...
            </button>
         </div>
      </div>
      
      <div className="flex justify-between items-center pt-2">
         <button onClick={onOpen} className="flex items-center gap-3 px-2 py-3 hover:bg-gray-100 rounded-md transition-colors flex-1 justify-center">
            <Home className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-semibold text-gray-600">Immobilier</span>
         </button>
         <button onClick={onOpen} className="flex items-center gap-3 px-2 py-3 hover:bg-gray-100 rounded-md transition-colors flex-1 justify-center">
            <Hammer className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-semibold text-gray-600">Artisan</span>
         </button>
         <button onClick={onOpen} className="flex items-center gap-3 px-2 py-3 hover:bg-gray-100 rounded-md transition-colors flex-1 justify-center">
            <FileText className="w-5 h-5 text-green-500" />
            <span className="text-sm font-semibold text-gray-600">Contrat</span>
         </button>
      </div>
    </div>
  );
};
