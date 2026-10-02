import React, { useState } from 'react';
import { Heart, Share2, MapPin, MoreHorizontal, ShieldCheck, Sparkles, Users, Building2, UserCheck, Image as ImageIcon, ChevronRight } from 'lucide-react';
import { PostData } from '../types';

interface PostProps {
  post: PostData;
  onClick?: () => void;
}

export const Post: React.FC<PostProps> = ({ post, onClick }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);

  const isAgency = post.author.role === 'AGENCY' || post.author.badge === 'Pro' || post.author.badge === 'Agent';
  const isParticular = post.author.role === 'PARTICULAR' || post.author.badge === 'Particulier';
  const hasMultipleImages = (post.images && post.images.length > 1);
  const imageCount = post.images?.length || (post.imageUrl ? 1 : 0);

  const cleanPhone = (post.author.whatsapp || post.author.phone || '').replace(/[^0-9]/g, '');

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) {
      setLikesCount(prev => prev - 1);
      setLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setLiked(true);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: post.content.split('\n')[0] || 'Bien IMMO Africa',
        text: `${post.price ? post.price + ' • ' : ''}${post.location || ''}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert('Lien de l\'annonce copié dans le presse-papier !');
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-sm transition-all duration-200 mb-4 overflow-hidden group cursor-pointer"
    >
      {/* AI Recommendation Banner if applicable - Subtle Neutral */}
      {post.isAiRecommended && (
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs font-semibold text-slate-800">
              {post.matchScore ? `${post.matchScore}% Match` : 'Sélection IA'} • {post.matchReason || 'Idéal pour votre recherche'}
            </span>
          </div>
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider bg-white px-2 py-0.5 rounded-full border border-slate-200">
            Recommandé
          </span>
        </div>
      )}

      {/* Author Header */}
      <div className="p-3.5 sm:p-4 pb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            {post.author.avatarUrl ? (
              <img 
                src={post.author.avatarUrl} 
                alt={post.author.name} 
                className="w-10 h-10 rounded-xl object-cover border border-slate-200" 
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm border border-slate-200">
                {post.author.name.charAt(0)}
              </div>
            )}
            {isAgency && (
              <span className="absolute -bottom-1 -right-1 bg-slate-900 text-white p-0.5 rounded-full ring-2 ring-white" title="Agence Vérifiée">
                <Building2 className="w-2.5 h-2.5" />
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                {post.author.name}
              </h3>
              {isAgency ? (
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-200">
                  <Building2 className="w-2.5 h-2.5 text-slate-600" />
                  AGENCE
                </span>
              ) : isParticular ? (
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-200">
                  <UserCheck className="w-2.5 h-2.5 text-slate-600" />
                  PROPRIÉTAIRE
                </span>
              ) : null}
            </div>
            <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
              <span>{post.timestamp}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5 text-slate-600">
                <MapPin className="w-3 h-3 text-slate-400" />
                {post.location || post.city || 'UEMOA'}
              </span>
            </p>
          </div>
        </div>

        {/* Transaction Type Tag - Clean Executive Badges */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-200 bg-slate-100 text-slate-800 shadow-2xs">
            {post.listingType === 'SALE' ? 'À Vendre' : post.listingType === 'INVESTMENT' ? 'Investissement' : 'À Louer'}
          </span>
          <button 
            type="button" 
            onClick={(e) => e.stopPropagation()} 
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Image with floating badges */}
      {post.imageUrl && (
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-100 overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.content.split('\n')[0] || 'Bien immobilier'} 
            className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300" 
          />

          {/* Gradient Overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none"></div>

          {/* Floating Price Badge */}
          {post.price && (
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-white/60 flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-black text-slate-950 tracking-tight">
                {post.price}
              </span>
            </div>
          )}

          {/* Image Count & Guarantee Badges */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            {hasMultipleImages && (
              <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2 py-0.5 rounded-lg flex items-center gap-1">
                <ImageIcon className="w-3 h-3 text-slate-300" />
                {imageCount} photos
              </span>
            )}
            <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-lg flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-slate-300" />
              PaySafe™
            </span>
          </div>
        </div>
      )}

      {/* Content & Specs */}
      <div className="p-3.5 sm:p-4">
        {/* Short Title & Description */}
        <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed line-clamp-2">
          {post.content}
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
          {post.specs && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
              {post.specs}
            </span>
          )}
          {post.surfaceArea && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
              📐 {post.surfaceArea} m²
            </span>
          )}
          {post.legalTitle && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-lg text-xs font-semibold">
              📜 {post.legalTitle}
            </span>
          )}
        </div>

        {/* Investment progress bar if applicable */}
        {post.listingType === 'INVESTMENT' && post.fundingProgress !== undefined && (
          <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
              <span>{post.fundingProgress}% Financé</span>
              <span className="text-slate-500 font-normal">Objectif: {post.targetAmount}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-slate-900 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${post.fundingProgress}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-700 font-medium mt-2">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                {post.investorsCount} investisseurs
              </span>
              <span className="text-slate-900 font-bold">
                Ticket min: {post.minInvestment || '10 000 CFA'}
              </span>
            </div>
          </div>
        )}

        {/* Action Row */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 gap-2">
          {/* Quick social actions on left */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleLike}
              className={`p-2 rounded-full transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                liked ? 'text-rose-600 bg-rose-50' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`}
              title="Aimer"
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-rose-600' : ''}`} />
              <span>{likesCount}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              title="Partager"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Main Direct CTAs */}
          <div className="flex items-center gap-2 flex-1 max-w-[260px] justify-end">
            {cleanPhone && (
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  `Bonjour, je vous contacte depuis IMMO Africa concernant votre bien : "${post.content.split('\n')[0]}" (${post.price || ''})`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs transition-colors shadow-2xs active:scale-95"
                title="WhatsApp Direct"
              >
                <span>💬</span>
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClick && onClick();
              }}
              className="flex items-center justify-center gap-1 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs transition-all shadow-2xs active:scale-95 flex-grow sm:flex-grow-0"
            >
              <span>Détails</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
