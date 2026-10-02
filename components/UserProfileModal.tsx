import React, { useState, useRef } from 'react';
import { X, User, Heart, Home, Phone, Mail, MapPin, Check, Edit2, Camera, Upload, Image as ImageIcon } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedCount?: number;
  userAvatar?: string;
  onUpdateAvatar?: (newAvatar: string) => void;
  userName?: string;
  onUpdateName?: (newName: string) => void;
}

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const AVATAR_PRESETS = [
  { name: 'Classique', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'Cadre 1', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'Cadre 2', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'Cadre 3', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  savedCount = 3,
  userAvatar = DEFAULT_AVATAR,
  onUpdateAvatar,
  userName = 'Caleb N.',
  onUpdateName
}) => {
  if (!isOpen) return null;

  const [currentName, setCurrentName] = useState(userName);
  const [currentAvatar, setCurrentAvatar] = useState(userAvatar);
  const [userPhone, setUserPhone] = useState('+229 97 00 12 34');
  const [userCity, setUserCity] = useState('Cotonou, Bénin');
  const [isEditing, setIsEditing] = useState(false);
  const [showPhotoSelector, setShowPhotoSelector] = useState(false);
  const [customPhotoUrl, setCustomPhotoUrl] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleSaveInfo = () => {
    if (onUpdateName) onUpdateName(currentName);
    setIsEditing(false);
    triggerToast('Coordonnées mises à jour avec succès');
  };

  const handleApplyAvatar = (url: string) => {
    setCurrentAvatar(url);
    if (onUpdateAvatar) onUpdateAvatar(url);
    setShowPhotoSelector(false);
    triggerToast('Photo de profil mise à jour');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate image size (under 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('L\'image est trop lourde. Veuillez choisir une image de moins de 5 Mo.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          handleApplyAvatar(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh] border border-slate-200">
        
        {/* Header - Executive Slate */}
        <div className="bg-white px-6 py-4 border-b border-slate-200 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">Mon Compte IMMO</h2>
              <p className="text-xs text-slate-500">Profil & coordonnées certifiées</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-grow space-y-4 bg-white">
          {successToast && (
            <div className="bg-slate-900 text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
              <span>{successToast}</span>
            </div>
          )}

          {/* User Profile Card with Photo Modifier */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-4">
              {/* Avatar with Camera Trigger */}
              <div className="relative group cursor-pointer" onClick={() => setShowPhotoSelector(!showPhotoSelector)}>
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-slate-200 relative">
                  <img
                    src={currentAvatar}
                    alt="Photo de profil"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {/* Camera overlay icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                    <Camera className="w-5 h-5" />
                    <span className="text-[9px] font-bold mt-0.5">Modifier</span>
                  </div>
                </div>

                {/* Floating camera badge */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPhotoSelector(!showPhotoSelector);
                  }}
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-slate-900 hover:bg-black text-white flex items-center justify-center shadow-md border-2 border-white transition-transform active:scale-95"
                  title="Changer la photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* User details */}
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base truncate">{currentName}</h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-white rounded-lg border border-slate-200 transition-colors"
                    title="Modifier mes informations"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" /> {userCity}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="text-[10px] bg-slate-200 text-slate-800 font-bold px-2 py-0.5 rounded-full">
                    Membre Vérifié
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-full border border-slate-200">
                    Bénin 🇧🇯
                  </span>
                </div>
              </div>
            </div>

            {/* Photo Selector Drawer */}
            {showPhotoSelector && (
              <div className="mt-4 pt-4 border-t border-slate-200 animate-in fade-in space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Changer la photo de profil</span>
                  <button
                    type="button"
                    onClick={() => setShowPhotoSelector(false)}
                    className="text-[11px] text-slate-500 hover:text-slate-800"
                  >
                    Fermer
                  </button>
                </div>

                {/* Upload from file button */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 py-2 px-3 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Importer une photo depuis l'appareil</span>
                  </button>
                </div>

                {/* Or enter image URL */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Ou coller le lien d'une image (URL) :
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://..."
                      value={customPhotoUrl}
                      onChange={(e) => setCustomPhotoUrl(e.target.value)}
                      className="flex-1 border border-slate-300 rounded-xl px-3 py-1.5 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customPhotoUrl.trim()) {
                          handleApplyAvatar(customPhotoUrl.trim());
                          setCustomPhotoUrl('');
                        }
                      }}
                      disabled={!customPhotoUrl.trim()}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-800 rounded-xl text-xs font-bold transition-colors"
                    >
                      Appliquer
                    </button>
                  </div>
                </div>

                {/* Quick Presets */}
                <div>
                  <span className="block text-[11px] font-semibold text-slate-500 mb-1.5">
                    Avatars professionnels suggérés :
                  </span>
                  <div className="flex gap-2.5">
                    {AVATAR_PRESETS.map((p, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleApplyAvatar(p.url)}
                        className={`w-12 h-12 rounded-xl overflow-hidden border-2 cursor-pointer transition-all hover:scale-105 ${
                          currentAvatar === p.url ? 'border-slate-900 ring-2 ring-slate-900/20' : 'border-slate-200'
                        }`}
                        title={p.name}
                      >
                        <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Edit Form */}
          {isEditing && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 animate-in fade-in">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Modifier mes informations</h4>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Nom complet</label>
                <input
                  type="text"
                  value={currentName}
                  onChange={e => setCurrentName(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Téléphone (WhatsApp)</label>
                <input
                  type="text"
                  value={userPhone}
                  onChange={e => setUserPhone(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Ville</label>
                <input
                  type="text"
                  value={userCity}
                  onChange={e => setUserCity(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-xl font-medium"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleSaveInfo}
                  className="px-4 py-1.5 text-xs bg-slate-900 hover:bg-black text-white font-bold rounded-xl shadow-xs"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          )}

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 bg-slate-200/80 text-slate-700 rounded-xl">
                <Heart className="w-4 h-4 text-rose-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold">Biens Favoris</p>
                <p className="text-base sm:text-lg font-bold text-slate-900">{savedCount}</p>
              </div>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 bg-slate-200/80 text-slate-700 rounded-xl">
                <Home className="w-4 h-4 text-slate-700" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold">Mes Annonces</p>
                <p className="text-base sm:text-lg font-bold text-slate-900">1 active</p>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="border border-slate-200 rounded-2xl p-4 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Coordonnées de Contact</h4>
            <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{userPhone}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>calebwils900@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
