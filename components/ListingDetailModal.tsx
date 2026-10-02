
import React from 'react';
import { X, MapPin, Check, ShieldCheck, Share2, Heart, MessageSquare, TrendingUp, Users, Banknote, Calendar, Building2 } from 'lucide-react';
import { PostData } from '../types';

interface ListingDetailModalProps {
  listing: PostData | null;
  onClose: () => void;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({ listing, onClose }) => {
  if (!listing) return null;

  const isInvestment = listing.listingType === 'INVESTMENT';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[#f3f2ef] w-full max-w-4xl rounded-none sm:rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col h-full sm:h-[90vh]">
        
        {/* Header / Close Button (Mobile Overlay) */}
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
        >
            <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-hidden">
            
            {/* Left: Media & Gallery */}
            <div className="w-full md:w-1/2 bg-black flex flex-col h-[40vh] md:h-full relative group">
                <div className="flex-grow relative overflow-hidden">
                   <img 
                     src={listing.imageUrl || listing.images?.[0]} 
                     alt="Main" 
                     className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                   />
                   
                   {/* Overlay Stats for Investment */}
                   {isInvestment && (
                       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-white">
                           <div className="flex items-end justify-between">
                               <div>
                                   <p className="text-sm font-semibold text-gray-300 mb-1">Objectif: {listing.targetAmount}</p>
                                   <div className="h-2 w-48 bg-gray-700 rounded-full overflow-hidden">
                                       <div className="h-full bg-green-500" style={{ width: `${listing.fundingProgress}%` }}></div>
                                   </div>
                               </div>
                               <div className="text-right">
                                   <p className="text-3xl font-bold text-green-400">{listing.fundingProgress}%</p>
                                   <p className="text-xs text-gray-400">Financé</p>
                               </div>
                           </div>
                       </div>
                   )}
                </div>

                {/* Thumbnails (Mock) */}
                {listing.images && (
                    <div className="h-20 bg-[#191919] p-2 flex gap-2 overflow-x-auto no-scrollbar">
                        {listing.images.map((img, idx) => (
                            <img key={idx} src={img} className="h-full w-24 object-cover rounded opacity-60 hover:opacity-100 cursor-pointer transition-opacity border border-transparent hover:border-white" />
                        ))}
                    </div>
                )}
            </div>

            {/* Right: Info & Actions */}
            <div className="w-full md:w-1/2 flex flex-col h-full bg-white">
                
                {/* Scrollable Content */}
                <div className="flex-grow overflow-y-auto p-6">
                    
                    {/* Title & Author */}
                    <div className="border-b border-gray-100 pb-4 mb-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                             <span className={`px-2 py-0.5 rounded font-bold ${isInvestment ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                 {listing.listingType === 'INVESTMENT' ? 'INVESTISSEMENT' : 'LOCATION'}
                             </span>
                             <span>•</span>
                             <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {listing.location}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1 leading-tight">{listing.content.split('\n')[0]}</h2>
                        <p className="text-sm text-gray-500">{listing.specs}</p>

                        <div className="flex items-center gap-3 mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                             <img src={listing.author.avatarUrl} className="w-10 h-10 rounded-full object-cover" />
                             <div className="flex-grow">
                                 <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
                                     {listing.author.name} 
                                     {listing.author.badge && <ShieldCheck className="w-3 h-3 text-green-600" />}
                                 </p>
                                 <p className="text-xs text-gray-500">{listing.author.headline}</p>
                             </div>
                             <button className="text-xs font-bold text-linkedin-blue border border-linkedin-blue px-3 py-1 rounded-full hover:bg-blue-50">
                                 Voir Profil
                             </button>
                        </div>
                    </div>

                    {/* Investment Highlights or Amenities */}
                    {isInvestment ? (
                        <div className="grid grid-cols-2 gap-3 mb-6">
                             <div className="p-3 bg-green-50 rounded border border-green-100 text-center">
                                 <p className="text-xs text-gray-500 uppercase font-semibold">Rendement</p>
                                 <p className="text-xl font-bold text-green-700">{listing.projectedYield}</p>
                             </div>
                             <div className="p-3 bg-purple-50 rounded border border-purple-100 text-center">
                                 <p className="text-xs text-gray-500 uppercase font-semibold">Ticket Min</p>
                                 <p className="text-xl font-bold text-purple-700">{listing.minInvestment}</p>
                             </div>
                             <div className="p-3 bg-gray-50 rounded border border-gray-100 text-center col-span-2 flex items-center justify-between px-6">
                                 <div className="flex flex-col items-start">
                                     <p className="text-xs text-gray-500 uppercase font-semibold">Investisseurs</p>
                                     <p className="text-lg font-bold text-gray-900 flex items-center gap-2"><Users className="w-4 h-4" /> {listing.investorsCount}</p>
                                 </div>
                                 <div className="flex flex-col items-end">
                                     <p className="text-xs text-gray-500 uppercase font-semibold">Prochain Paiement</p>
                                     <p className="text-lg font-bold text-gray-900 flex items-center gap-2"><Calendar className="w-4 h-4" /> 1er Jan</p>
                                 </div>
                             </div>
                        </div>
                    ) : (
                        <div className="mb-6">
                            <h3 className="text-sm font-bold text-gray-900 mb-3">Aménagements</h3>
                            <div className="flex flex-wrap gap-2">
                                {listing.amenities?.map((amenity, i) => (
                                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium flex items-center gap-1">
                                        <Check className="w-3 h-3 text-green-600" /> {amenity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div className="mb-6">
                        <h3 className="text-sm font-bold text-gray-900 mb-2">À propos</h3>
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                            {listing.description || listing.content}
                        </p>
                    </div>

                </div>

                {/* Footer / CTA */}
                <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center gap-3 flex-shrink-0">
                    <button className="p-3 rounded-full border border-gray-300 bg-white hover:bg-gray-100 text-gray-600 transition-colors">
                        <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-3 rounded-full border border-gray-300 bg-white hover:bg-gray-100 text-gray-600 transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                    
                    {isInvestment ? (
                        <button className="flex-grow py-3 bg-purple-600 text-white rounded-full font-bold text-sm hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-200">
                            <TrendingUp className="w-4 h-4" />
                            Investir
                        </button>
                    ) : (
                        <div className="flex-grow flex gap-2">
                             <button className="flex-1 py-3 bg-white border border-gray-300 text-gray-700 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                <MessageSquare className="w-4 h-4" />
                                Chat
                            </button>
                            <button className="flex-[2] py-3 bg-linkedin-blue text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
                                <Building2 className="w-4 h-4" />
                                Postuler RentCV
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};
