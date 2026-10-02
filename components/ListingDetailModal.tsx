
import React, { useState } from 'react';
import { X, MapPin, Check, ShieldCheck, Share2, Heart, MessageSquare, TrendingUp, Users, Banknote, Calendar, Building2, Phone, UserCheck, CheckCircle2, ChevronRight, Layers, Send, ThumbsUp } from 'lucide-react';
import { PostData, PostComment } from '../types';

interface ListingDetailModalProps {
  listing: PostData | null;
  onClose: () => void;
  userAvatar?: string;
  userName?: string;
  onAddComment?: (postId: string, comment: PostComment) => void;
}

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({ 
  listing, 
  onClose,
  userAvatar = DEFAULT_AVATAR,
  userName = 'Caleb N.',
  onAddComment
}) => {
  if (!listing) return null;

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [modalCommentText, setModalCommentText] = useState('');
  const [modalComments, setModalComments] = useState<PostComment[]>(() => {
    if (listing.commentsList && listing.commentsList.length > 0) {
      return listing.commentsList;
    }
    return [
      {
        id: `c-1-${listing.id}`,
        authorName: 'Sébastien Houngbédji',
        authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        content: 'Le bien est-il toujours disponible pour une visite ce week-end ?',
        timestamp: 'Il y a 2h',
        likes: 2
      },
      {
        id: `c-2-${listing.id}`,
        authorName: 'Mariam Ouattara',
        authorAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        content: 'Les charges de copropriété et gardiennage sont-elles incluses ?',
        timestamp: 'Il y a 5h',
        likes: 1
      }
    ].slice(0, Math.min(listing.comments || 1, 2));
  });

  const isInvestment = listing.listingType === 'INVESTMENT';
  const isSale = listing.listingType === 'SALE';
  const isRental = listing.listingType === 'RENTAL';
  const isAgency = listing.author.role === 'AGENCY' || listing.author.badge === 'Pro' || listing.author.badge === 'Agent';
  const isParticular = listing.author.role === 'PARTICULAR' || listing.author.badge === 'Particulier';

  const imagesList = listing.images && listing.images.length > 0 ? listing.images : (listing.imageUrl ? [listing.imageUrl] : []);
  const currentImage = imagesList[activeImageIndex] || listing.imageUrl || '';

  const cleanPhone = (listing.author.whatsapp || listing.author.phone || '').replace(/[^0-9]/g, '');

  const handleModalCommentSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!modalCommentText.trim()) return;

    const newComment: PostComment = {
      id: `comment-modal-${Date.now()}`,
      authorName: userName || 'Caleb N.',
      authorAvatar: userAvatar || DEFAULT_AVATAR,
      content: modalCommentText.trim(),
      timestamp: "À l'instant",
      likes: 0
    };

    setModalComments(prev => [newComment, ...prev]);
    setModalCommentText('');

    if (onAddComment) {
      onAddComment(listing.id, newComment);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listing.content.split('\n')[0],
        text: `Découvrez ce bien sur IMMO Africa : ${listing.price || ''} à ${listing.location || ''}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[#f8f9fa] w-full max-w-5xl rounded-none sm:rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col h-full sm:h-[92vh]">
        
        {/* Header / Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 p-2.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors shadow-lg"
          title="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-hidden">
          
          {/* Left: Media & Multi-photo Gallery */}
          <div className="w-full md:w-1/2 bg-black flex flex-col h-[42vh] md:h-full relative group">
            <div className="flex-grow relative overflow-hidden bg-neutral-900 flex items-center justify-center">
              <img 
                src={currentImage} 
                alt="Vue du bien" 
                className="w-full h-full object-cover transition-all duration-300" 
              />

              {/* Badges on main image */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                <span className={`px-3 py-1 rounded-full text-xs font-black shadow-md uppercase tracking-wider ${
                  isSale ? 'bg-emerald-600 text-white' :
                  isRental ? 'bg-blue-600 text-white' :
                  isInvestment ? 'bg-purple-600 text-white' : 'bg-gray-800 text-white'
                }`}>
                  {isSale ? '🏷️ À Vendre' : isRental ? '🔑 À Louer' : 'Investissement'}
                </span>
                {listing.legalTitle && (
                  <span className="bg-amber-500 text-gray-950 font-bold px-2.5 py-0.5 rounded-full text-[11px] shadow-sm flex items-center gap-1">
                    📜 {listing.legalTitle}
                  </span>
                )}
              </div>

              {/* Photo indicator */}
              {imagesList.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-xs text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Photo {activeImageIndex + 1} / {imagesList.length}
                </div>
              )}
            </div>

            {/* Thumbnails Navigator */}
            {imagesList.length > 1 && (
              <div className="h-20 bg-[#121212] p-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-white/10">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-full w-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-blue-500 scale-102 ring-2 ring-blue-400/50' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Miniature ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info, Owner Profile & Actions */}
          <div className="w-full md:w-1/2 flex flex-col h-full bg-white">
            
            {/* Scrollable Content */}
            <div className="flex-grow overflow-y-auto p-5 sm:p-6 space-y-5">
              
              {/* Header Title & Price */}
              <div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1 font-semibold text-gray-700">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" /> {listing.location || 'Localisation'}
                  </span>
                  {listing.district && <span>• {listing.district}</span>}
                </div>
                
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                  {listing.content.split('\n')[0]}
                </h2>

                {/* Price Display */}
                {listing.price && (
                  <div className="mt-2.5 inline-flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 tracking-tight">
                      {listing.price}
                    </span>
                    {listing.availability && (
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        Disponibilité : {listing.availability}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Property Details Grid (Specs) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-center">
                <div className="p-2 bg-white rounded-lg border border-gray-100 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Type</span>
                  <span className="text-xs font-extrabold text-gray-800">
                    {listing.propertyCategory || (listing.specs?.includes('Villa') ? 'Villa' : 'Appartement')}
                  </span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-gray-100 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Surface</span>
                  <span className="text-xs font-extrabold text-gray-800">
                    {listing.surfaceArea ? `${listing.surfaceArea} m²` : 'N/C'}
                  </span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-gray-100 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Chambres</span>
                  <span className="text-xs font-extrabold text-gray-800">
                    {listing.bedrooms !== undefined ? `${listing.bedrooms} Ch.` : 'N/C'}
                  </span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-gray-100 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Titre Foncier</span>
                  <span className="text-xs font-extrabold text-emerald-700 truncate block">
                    {listing.legalTitle || 'Vérifié'}
                  </span>
                </div>
              </div>

              {/* Author / Publisher Profile Card */}
              <div className="p-4 rounded-xl border bg-gradient-to-br from-slate-50 to-blue-50/40 border-blue-100">
                <div className="flex items-start gap-3">
                  <img 
                    src={listing.author.avatarUrl} 
                    alt={listing.author.name}
                    className={`w-12 h-12 object-cover border-2 ${isAgency ? 'rounded-lg border-blue-500' : 'rounded-full border-emerald-500'}`} 
                  />
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-black text-gray-900 truncate">
                        {listing.author.name}
                      </p>
                      {isAgency ? (
                        <span className="inline-flex items-center gap-1 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-2xs">
                          <Building2 className="w-3 h-3" />
                          AGENCE AGRÉÉE
                        </span>
                      ) : isParticular ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-2xs">
                          <UserCheck className="w-3 h-3" />
                          PROPRIÉTAIRE DIRECT
                        </span>
                      ) : null}
                    </div>

                    <p className="text-xs text-gray-600 mt-0.5">{listing.author.headline}</p>

                    {isAgency && listing.author.licenseNumber && (
                      <p className="text-[11px] text-blue-700 font-semibold mt-1">
                        Licence professionnelle : <span className="font-mono">{listing.author.licenseNumber}</span>
                      </p>
                    )}

                    {listing.author.address && (
                      <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                        📍 {listing.author.address}
                      </p>
                    )}

                    {isParticular && (
                      <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        0% commission d'agence • Visite directe avec le propriétaire
                      </p>
                    )}
                  </div>
                </div>

                {/* Direct Contact Pills */}
                {(listing.author.phone || listing.author.whatsapp) && (
                  <div className="mt-3 pt-3 border-t border-gray-200/60 flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium">Contact direct vendeur :</span>
                    <span className="font-mono font-bold text-gray-800 bg-white px-2 py-1 rounded border border-gray-200">
                      {listing.author.phone || listing.author.whatsapp}
                    </span>
                  </div>
                )}
              </div>

              {/* Amenities Section */}
              {listing.amenities && listing.amenities.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
                    Équipements & Commodités Incluses
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {listing.amenities.map((amenity, i) => (
                      <span key={i} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors">
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Description */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Description Détaillée
                </h3>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-xl border border-gray-200">
                  {listing.description || listing.content}
                </div>
              </div>

              {/* Questions & Comments Section */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-600" />
                    <span>Questions & Échanges ({modalComments.length})</span>
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">Interactions directes</span>
                </div>

                {/* Comment Input */}
                <form onSubmit={handleModalCommentSubmit} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-slate-200 shadow-2xs">
                    <img src={userAvatar || DEFAULT_AVATAR} alt={userName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={modalCommentText}
                      onChange={(e) => setModalCommentText(e.target.value)}
                      placeholder="Poser une question ou demander des précisions..."
                      className="w-full text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-xl pl-3 pr-9 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-500 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!modalCommentText.trim()}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-slate-900 hover:bg-black disabled:opacity-30 disabled:hover:bg-slate-900 text-white rounded-lg transition-all"
                      title="Envoyer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {modalComments.map((comment) => (
                    <div key={comment.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <div className="flex items-center gap-2">
                          <img src={comment.authorAvatar || DEFAULT_AVATAR} alt={comment.authorName} className="w-6 h-6 rounded-full object-cover border border-slate-200" />
                          <span className="font-bold text-slate-900">{comment.authorName}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{comment.timestamp}</span>
                      </div>
                      <p className="text-slate-700 pl-8 leading-relaxed">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer Actions / Call To Actions */}
            <div className="p-4 border-t border-gray-200 bg-white flex items-center gap-2.5 flex-shrink-0">
              <button 
                onClick={handleShare}
                className="p-3 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 transition-colors relative"
                title="Partager le bien"
              >
                <Share2 className="w-4 h-4" />
                {copiedLink && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-0.5 rounded shadow">
                    Copié!
                  </span>
                )}
              </button>

              {/* WhatsApp direct button */}
              {cleanPhone && (
                <a
                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Bonjour ${listing.author.name}, je vous contacte via IMMO Africa pour le bien "${listing.content.split('\n')[0]}" (${listing.price || ''}) à ${listing.location || ''}. Est-il toujours disponible pour une visite ?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-200 active:scale-98"
                >
                  <span className="text-base leading-none">💬</span>
                  <span>WhatsApp Direct</span>
                </a>
              )}

              {/* Phone call / Visit button */}
              {listing.author.phone ? (
                <a
                  href={`tel:${listing.author.phone}`}
                  className="flex-1 py-3 px-4 bg-linkedin-blue hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-200 active:scale-98"
                >
                  <Phone className="w-4 h-4" />
                  <span>Appeler Vendeur</span>
                </a>
              ) : (
                <button 
                  onClick={() => alert(`Votre demande de visite a été envoyée avec succès à ${listing.author.name}.`)}
                  className="flex-1 py-3 px-4 bg-linkedin-blue hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-200 active:scale-98"
                >
                  <Phone className="w-4 h-4" />
                  <span>Demander Visite</span>
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
