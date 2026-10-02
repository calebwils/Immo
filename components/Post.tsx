import React, { useState } from 'react';
import {
  Heart,
  Share2,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  Building2,
  UserCheck,
  Image as ImageIcon,
  ChevronRight,
  MessageCircle,
  Send,
  ThumbsUp,
  CornerDownRight
} from 'lucide-react';
import { PostData, PostComment } from '../types';

interface PostProps {
  post: PostData;
  onClick?: () => void;
  userAvatar?: string;
  userName?: string;
  onAddComment?: (postId: string, comment: PostComment) => void;
}

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const QUICK_QUESTIONS = [
  '📅 Visite possible ce samedi ?',
  '📄 Titre foncier disponible ?',
  '⚡ Prix négociable ?',
  '💧 Charges comprises ?',
  '🚗 Garage sécurisé ?'
];

export const Post: React.FC<PostProps> = ({
  post,
  onClick,
  userAvatar = DEFAULT_AVATAR,
  userName = 'Caleb N.',
  onAddComment
}) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [showComments, setShowComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');

  // Initial comments list with realistic community interactions
  const [comments, setComments] = useState<PostComment[]>(() => {
    if (post.commentsList && post.commentsList.length > 0) {
      return post.commentsList;
    }
    const samplePool: PostComment[] = [
      {
        id: `c-1-${post.id}`,
        authorName: 'Sébastien Houngbédji',
        authorAvatar:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        content: 'Bonjour, le bien est-il toujours libre pour une visite ce week-end ?',
        timestamp: 'Il y a 2h',
        likes: 2
      },
      {
        id: `c-2-${post.id}`,
        authorName: 'Mariam Ouattara',
        authorAvatar:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        content: 'Les charges de copropriété et gardiennage sont-elles incluses ?',
        timestamp: 'Il y a 5h',
        likes: 1
      },
      {
        id: `c-3-${post.id}`,
        authorName: 'Dr. Marie-Claire Diatta',
        authorAvatar:
          'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        content: 'Très bel emplacement ! Avez-vous une copie du titre de propriété vérifié ?',
        timestamp: 'Il y a 1j',
        likes: 3
      }
    ];
    const initialCount = Math.min(post.comments || 1, 3);
    return samplePool.slice(0, Math.max(1, initialCount));
  });

  const isAgency =
    post.author.role === 'AGENCY' || post.author.badge === 'Pro' || post.author.badge === 'Agent';
  const isParticular =
    post.author.role === 'PARTICULAR' || post.author.badge === 'Particulier';
  const hasMultipleImages = post.images && post.images.length > 1;
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
      navigator
        .share({
          title: post.content.split('\n')[0] || 'Bien IMMO Africa',
          text: `${post.price ? post.price + ' • ' : ''}${post.location || ''}`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert("Lien de l'annonce copié dans le presse-papier !");
    }
  };

  const handleCommentSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: PostComment = {
      id: `comment-${Date.now()}`,
      authorName: userName || 'Caleb N.',
      authorAvatar: userAvatar || DEFAULT_AVATAR,
      content: newCommentText.trim(),
      timestamp: "À l'instant",
      likes: 0
    };

    setComments(prev => [newComment, ...prev]);
    setNewCommentText('');

    if (onAddComment) {
      onAddComment(post.id, newComment);
    }
  };

  const handleToggleLikeComment = (commentId: string) => {
    setComments(prev =>
      prev.map(c => {
        if (c.id === commentId) {
          return { ...c, likes: (c.likes || 0) + 1 };
        }
        return c;
      })
    );
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-sm transition-all duration-200 mb-4 overflow-hidden group cursor-pointer"
    >
      {/* AI Recommendation Banner if applicable */}
      {post.isAiRecommended && (
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs font-semibold text-slate-800">
              {post.matchScore ? `${post.matchScore}% Match` : 'Sélection IA'} •{' '}
              {post.matchReason || 'Idéal pour votre recherche'}
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
              <span
                className="absolute -bottom-1 -right-1 bg-slate-900 text-white p-0.5 rounded-full ring-2 ring-white"
                title="Agence Vérifiée"
              >
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

        {/* Right badge: Sale vs Rental */}
        <div className="text-right">
          <span
            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              post.listingType === 'SALE'
                ? 'bg-slate-900 text-white'
                : post.listingType === 'RENTAL'
                ? 'bg-slate-100 text-slate-800 border border-slate-200'
                : 'bg-slate-100 text-slate-800'
            }`}
          >
            {post.listingType === 'SALE' ? 'À Vendre' : post.listingType === 'RENTAL' ? 'À Louer' : 'Investir'}
          </span>
        </div>
      </div>

      {/* Main Hero Photo (Clickable) */}
      {post.imageUrl && (
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-slate-900 overflow-hidden">
          <img
            src={post.imageUrl}
            alt="Bien immobilier"
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />

          {/* Price Overlay Banner */}
          {post.price && (
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-white/40">
              <span className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
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
            {/* Like button */}
            <button
              type="button"
              onClick={handleLike}
              className={`px-2.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                liked
                  ? 'text-rose-600 bg-rose-50'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`}
              title="Aimer"
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-rose-600' : ''}`} />
              <span>{likesCount}</span>
            </button>

            {/* Comment button (interact) */}
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                setShowComments(!showComments);
              }}
              className={`px-2.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                showComments
                  ? 'text-slate-950 bg-slate-100 font-bold'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
              }`}
              title="Commenter & Poser une question"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{comments.length}</span>
            </button>

            {/* Share button */}
            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
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
                onClick={e => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs transition-colors shadow-2xs active:scale-95"
                title="WhatsApp Direct"
              >
                <span>💬</span>
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            )}

            <button
              type="button"
              onClick={e => {
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

        {/* Expandable Comments & Questions Section for people to interact */}
        {showComments && (
          <div
            onClick={e => e.stopPropagation()}
            className="mt-3.5 pt-3.5 border-t border-slate-100 space-y-3 animate-in fade-in duration-150"
          >
            {/* Quick Interaction Suggestions */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex-shrink-0">
                Idées :
              </span>
              {QUICK_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setNewCommentText(q)}
                  className="text-[11px] bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors flex-shrink-0 active:scale-95 font-medium"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Comment Form Input */}
            <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-slate-200 shadow-2xs">
                <img
                  src={userAvatar || DEFAULT_AVATAR}
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newCommentText}
                  onChange={e => setNewCommentText(e.target.value)}
                  placeholder="Écrire un commentaire ou poser une question..."
                  className="w-full text-xs bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl pl-3 pr-9 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-slate-900 hover:bg-black disabled:opacity-30 disabled:hover:bg-slate-900 text-white rounded-lg transition-all"
                  title="Publier le commentaire"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Comments List */}
            {comments.length > 0 && (
              <div className="space-y-2 pt-1 max-h-56 overflow-y-auto pr-1">
                {comments.map(comment => (
                  <div
                    key={comment.id}
                    className="flex items-start gap-2.5 bg-slate-50/70 hover:bg-slate-50 p-2.5 rounded-xl border border-slate-100 transition-colors"
                  >
                    <img
                      src={comment.authorAvatar || DEFAULT_AVATAR}
                      alt={comment.authorName}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200 flex-shrink-0 mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {comment.authorName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                        {comment.content}
                      </p>
                      <div className="mt-1 flex items-center gap-3 text-[10px] text-slate-500">
                        <button
                          type="button"
                          onClick={() => handleToggleLikeComment(comment.id)}
                          className="hover:text-slate-900 flex items-center gap-1 font-semibold"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{comment.likes || 0}</span>
                        </button>
                        <span className="text-slate-300">•</span>
                        <button
                          type="button"
                          onClick={() => setNewCommentText(`@${comment.authorName} `)}
                          className="hover:text-slate-900 font-semibold flex items-center gap-0.5"
                        >
                          <CornerDownRight className="w-3 h-3" />
                          <span>Répondre</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
