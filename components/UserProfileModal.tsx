import React, { useState, useRef } from 'react';
import { X, User, Heart, Home, Phone, Mail, MapPin, Check, Edit2, Camera, Upload, Sparkles, Wallet, ShieldCheck, Image as ImageIcon } from 'lucide-react';

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
    triggerToast('Informations mises à jour avec succès');
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[92vh] border border-slate-200">
        
        {/* Top Header */}
        <div className="bg-white px-6 py-3.5 border-b border-slate-100 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">Profil & Compte IMMO</h2>
              <p className="text-[11px] text-slate-500">Espace membre certifié UEMOA</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-grow bg-white">
          
          {/* Notification Toast */}
          {successToast && (
            <div className="mx-6 mt-3 bg-slate-900 text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
              <span>{successToast}</span>
            </div>
          )}

          {/* Profile Banner & Hero */}
          <div className="relative">
            {/* Header Banner */}
            <div className="h-24 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 w-full relative">
              <div className="absolute top-3 right-4 text-[10px] uppercase font-bold tracking-wider text-slate-200 bg-white/10 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/15">
                Compte Certifié
              </div>
            </div>

            {/* Avatar & Main Identity Info */}
            <div className="px-6 pb-2">
              <div className="relative -mt-12 flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-3">
                {/* Avatar with Camera Trigger */}
                <div className="flex items-end gap-3">
                  <div 
                    onClick={() => setShowPhotoSelector(!showPhotoSelector)}
                    className="relative group cursor-pointer w-22 h-22 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl bg-slate-100 flex-shrink-0"
                    title="Cliquer pour changer la photo"
                  >
                    <img
                      src={currentAvatar}
                      alt="Photo de profil"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                      <Camera className="w-5 h-5 mb-0.5" />
                      <span className="text-[10px] font-bold">Changer</span>
                    </div>
                  </div>

                  {/* Quick Change Photo Button */}
                  <div className="pb-1">
                    <button
                      type="button"
                      onClick={() => setShowPhotoSelector(!showPhotoSelector)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 shadow-2xs transition-all active:scale-95"
                    >
                      <Camera className="w-3.5 h-3.5 text-slate-600" />
                      <span>Changer la photo</span>
                    </button>
                  </div>
                </div>

                {/* Edit details button */}
                <div className="pb-1">
                  <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>{isEditing ? 'Fermer l\'édition' : 'Modifier les infos'}</span>
                  </button>
                </div>
              </div>

              {/* Name & Subtitle */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">{currentName}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{userCity}</span>
                  <span>•</span>
                  <span className="text-slate-600 font-medium">Bailleur & Particulier</span>
                </p>
              </div>
            </div>
          </div>

          {/* Photo Selector Drawer (when opened) */}
          {showPhotoSelector && (
            <div className="mx-6 my-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 animate-in fade-in space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Mettre à jour la photo de profil</span>
                <button
                  type="button"
                  onClick={() => setShowPhotoSelector(false)}
                  className="text-xs text-slate-400 hover:text-slate-700 font-semibold"
                >
                  ✕
                </button>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Import from device button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs active:scale-[0.99]"
              >
                <Upload className="w-4 h-4" />
                <span>Importer une photo depuis cet appareil</span>
              </button>

              {/* Or enter URL */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Ou coller le lien d'une image web (URL) :
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
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
                    className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 disabled:opacity-40 text-slate-800 rounded-xl text-xs font-bold transition-colors"
                  >
                    Valider
                  </button>
                </div>
              </div>

              {/* Presets */}
              <div>
                <span className="block text-[11px] font-semibold text-slate-500 mb-1.5">
                  Ou sélectionner un portrait type :
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

          {/* Edit Form */}
          {isEditing && (
            <div className="mx-6 my-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 animate-in fade-in">
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
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Ville & Pays</label>
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

          {/* Key Metrics Grid */}
          <div className="px-6 py-2 grid grid-cols-3 gap-2.5">
            {/* RentScore */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-center">
              <div className="text-[10px] font-semibold text-slate-500 flex items-center justify-center gap-1 mb-0.5">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>RentScore™</span>
              </div>
              <p className="text-base font-black text-slate-900">780<span className="text-[10px] text-slate-400 font-normal">/850</span></p>
              <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200">
                Excellent
              </span>
            </div>

            {/* Solde PaySafe */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-center">
              <div className="text-[10px] font-semibold text-slate-500 flex items-center justify-center gap-1 mb-0.5">
                <Wallet className="w-3 h-3 text-slate-600" />
                <span>Solde Séquestre</span>
              </div>
              <p className="text-sm sm:text-base font-black text-slate-900 truncate">15 400</p>
              <span className="text-[9px] font-semibold text-slate-500">FCFA</span>
            </div>

            {/* Annonces & Favoris */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-center">
              <div className="text-[10px] font-semibold text-slate-500 flex items-center justify-center gap-1 mb-0.5">
                <Home className="w-3 h-3 text-slate-600" />
                <span>Activité</span>
              </div>
              <p className="text-base font-black text-slate-900">{savedCount} <span className="text-xs text-slate-400 font-normal">fav.</span></p>
              <span className="text-[9px] font-semibold text-slate-600">1 annonce</span>
            </div>
          </div>

          {/* Contact Coordinates */}
          <div className="px-6 py-2">
            <div className="border border-slate-200 rounded-2xl p-4 space-y-2.5 bg-white">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Coordonnées de Contact</h4>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="text-[11px] text-slate-500 hover:text-slate-900 font-semibold"
                >
                  Modifier
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>{userPhone}</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-semibold ml-auto">
                  WhatsApp Actif
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>calebwils900@gmail.com</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-semibold ml-auto">
                  Vérifié
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors shadow-xs active:scale-95"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
