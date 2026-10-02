import React from 'react';
import { Key, Tag, TrendingUp, Plus } from 'lucide-react';

interface CreatePostProps {
  onOpen?: () => void;
  userAvatar?: string;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onOpen, userAvatar }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3.5 sm:p-4 mb-3">
      {/* Top row: Avatar + input button */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200">
          <img
            src={userAvatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
            alt="Profil"
            className="w-full h-full object-cover"
          />
        </div>
        <button
          type="button"
          onClick={onOpen}
          className="flex-grow text-left px-4 py-2.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-700 transition-all flex items-center justify-between group"
        >
          <span>Publier un bien ou déposer une demande...</span>
          <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          </span>
        </button>
      </div>

      {/* Quick category chips - Executive Neutrals */}
      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={onOpen}
          className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors text-xs font-semibold"
        >
          <Key className="w-4 h-4 text-slate-500" />
          <span>Location</span>
        </button>

        <button
          type="button"
          onClick={onOpen}
          className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors text-xs font-semibold"
        >
          <Tag className="w-4 h-4 text-slate-500" />
          <span>Vente</span>
        </button>

        <button
          type="button"
          onClick={onOpen}
          className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors text-xs font-semibold"
        >
          <TrendingUp className="w-4 h-4 text-slate-500" />
          <span>Investir</span>
        </button>
      </div>
    </div>
  );
};
