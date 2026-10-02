import React, { useState } from 'react';
import { X, User, Heart, Home, Phone, Mail, MapPin, Shield, Bell, Check, Edit2 } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedCount?: number;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  savedCount = 3
}) => {
  if (!isOpen) return null;

  const [userName, setUserName] = useState('Caleb N.');
  const [userPhone, setUserPhone] = useState('+229 97 00 12 34');
  const [userCity, setUserCity] = useState('Cotonou, Bénin');
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="relative bg-[#f3f2ef] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-linkedin-blue p-2 rounded-full text-white">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-none">Mon Compte IMMO</h2>
              <p className="text-xs text-gray-500 mt-1">Espace personnel & gestion de vos recherches</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-grow space-y-5 bg-white">
          {savedSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              Vos coordonnées ont été mises à jour avec succès.
            </div>
          )}

          {/* User Card */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-gray-900 text-base">{userName}</h3>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-gray-400" /> {userCity}
              </p>
              <div className="mt-2 flex gap-2">
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                  Membre Actif
                </span>
                <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full">
                  Numéro Vérifié
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 text-gray-500 hover:text-linkedin-blue hover:bg-white rounded-lg border border-gray-200 transition-colors"
              title="Modifier mes informations"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          {/* Edit Form */}
          {isEditing && (
            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200 space-y-3 animate-in fade-in">
              <h4 className="text-xs font-bold text-blue-900 uppercase">Modifier mes coordonnées de contact</h4>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">Nom complet</label>
                <input
                  type="text"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">Téléphone (WhatsApp)</label>
                <input
                  type="text"
                  value={userPhone}
                  onChange={e => setUserPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">Ville</label>
                <input
                  type="text"
                  value={userCity}
                  onChange={e => setUserCity(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-1.5 text-xs bg-linkedin-blue text-white font-bold rounded-lg hover:bg-blue-700"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          )}

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-3">
              <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold">Biens Favoris</p>
                <p className="text-lg font-bold text-gray-900">{savedCount}</p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-linkedin-blue rounded-lg">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold">Mes Annonces</p>
                <p className="text-lg font-bold text-gray-900">1 active</p>
              </div>
            </div>
          </div>

          {/* Privacy Guarantee Box */}
          <div className="p-4 bg-green-50/70 border border-green-200 rounded-xl flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-700 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-green-900">Confidentialité Totale Garantie</h4>
              <p className="text-[11px] text-green-800 mt-0.5 leading-relaxed">
                Sur IMMO Africa, votre historique personnel et financier reste 100% privé. Les propriétaires et agences ne voient que votre prénom et vos demandes de visite lorsque vous décidez de les contacter.
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="border border-gray-200 rounded-xl p-4 space-y-2.5">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Informations de Contact</h4>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>{userPhone}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>calebwils900@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold rounded-full transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
