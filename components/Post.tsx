
import React from 'react';
import { ThumbsUp, Share2, MapPin, Send, MoreHorizontal, ShieldCheck, Banknote, Sparkles, TrendingUp, Users, Link } from 'lucide-react';
import { PostData } from '../types';

interface PostProps {
  post: PostData;
  onClick?: () => void;
}

export const Post: React.FC<PostProps> = ({ post, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-lg border border-gray-300 shadow-sm mb-2 pb-1 relative overflow-hidden transition-shadow ${onClick ? 'cursor-pointer hover:shadow-md' : ''}`}
    >
      
      {/* AI Recommendation Banner */}
      {post.isAiRecommended && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 px-4 py-2 flex items-center gap-2">
           <Sparkles className="w-4 h-4 text-indigo-600 fill-indigo-100" />
           <span className="text-xs font-semibold text-indigo-800">
             {post.matchScore}% Match • {post.matchReason || "Basé sur vos préférences"}
           </span>
        </div>
      )}

      {/* Header */}
      <div className="px-4 py-3 flex gap-3 mb-1">
        {/* Author Image */}
        <div className="flex-shrink-0">
           {post.author.avatarUrl ? (
             <img src={post.author.avatarUrl} alt={post.author.name} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
           ) : (
             <div className="w-12 h-12 rounded-full bg-gray-200"></div>
           )}
        </div>
        
        {/* Author Info */}
        <div className="flex-grow overflow-hidden">
           <div className="flex justify-between items-start">
             <div>
                <h3 className="text-sm font-semibold text-gray-900 hover:text-linkedin-blue hover:underline cursor-pointer truncate flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  {post.author.name}
                  {post.author.badge === 'Verified' && <ShieldCheck className="w-3 h-3 text-green-600" />}
                  {post.author.badge === 'Pro' && <span className="bg-gray-100 text-gray-600 text-[10px] px-1 rounded border">AGENCE</span>}
                </h3>
                <p className="text-xs text-gray-500 truncate">{post.author.headline}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                   <span>{post.timestamp}</span>
                   <span>•</span>
                   <span className={`uppercase font-bold text-[10px] px-1 rounded ${
                     post.listingType === 'INVESTMENT' ? 'bg-purple-100 text-purple-700' :
                     post.listingType === 'RENTAL' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                   }`}>{post.listingType === 'INVESTMENT' ? 'INVESTISSEMENT' : post.listingType === 'RENTAL' ? 'LOCATION' : post.listingType === 'SERVICE' ? 'SERVICE' : 'INFO'}</span>
                </div>
             </div>
             
             {/* Controls */}
             <div className="flex items-center gap-1">
                <button className="p-1 rounded-full hover:bg-gray-100 text-gray-600" onClick={(e) => e.stopPropagation()}>
                  <MoreHorizontal className="w-5 h-5" />
                </button>
             </div>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-2">
         <p className="text-sm text-gray-900 whitespace-pre-line leading-normal line-clamp-3">
           {post.content}
         </p>
         
         {/* Real Estate Specific Tags */}
         {(post.price || post.location || post.specs) && (
             <div className="flex flex-wrap gap-2 mt-3 mb-1">
                 {post.price && (
                     <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-md text-sm font-bold border border-green-100">
                         <Banknote className="w-3 h-3" /> {post.price}
                     </span>
                 )}
                 {post.location && (
                     <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold border border-blue-100">
                         <MapPin className="w-3 h-3" /> {post.location}
                     </span>
                 )}
                 {post.specs && (
                     <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                         {post.specs}
                     </span>
                 )}
             </div>
         )}
      </div>

      {/* Post Image (Optional) */}
      {post.imageUrl && (
        <div className="w-full mt-2 bg-gray-100 border-t border-b border-gray-100 relative group">
          <img src={post.imageUrl} alt="Post Content" className="w-full h-auto max-h-[500px] object-cover" />
          
          {post.listingType === 'RENTAL' && (
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Voir Visite 3D
              </div>
          )}
        </div>
      )}

      {/* Investment Progress Section */}
      {post.listingType === 'INVESTMENT' && post.fundingProgress !== undefined && (
        <div className="px-4 pt-3 pb-1">
          <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
            <span>{post.fundingProgress}% Financé</span>
            <span className="text-gray-500">Obj: {post.targetAmount}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-purple-600 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${post.fundingProgress}%` }}
            ></div>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
             <Users className="w-3 h-3" />
             <span>{post.investorsCount} investisseurs</span>
             <span className="ml-auto text-green-600 font-bold flex items-center gap-1">
               <TrendingUp className="w-3 h-3" /> Rendement: {post.specs}
             </span>
          </div>
        </div>
      )}
      
      {/* Blockchain Verified Footer for Rentals */}
      {post.listingType === 'RENTAL' && (
        <div className="mx-4 mt-2 px-3 py-1.5 bg-gray-50 rounded border border-gray-200 flex items-center justify-between">
           <div className="flex items-center gap-1.5 text-xs text-gray-600">
             <Link className="w-3 h-3 text-gray-400" />
             <span>Propriété certifiée Blockchain</span>
           </div>
           <span className="text-[10px] text-gray-400 font-mono">HASH: 0x7F...3A2</span>
        </div>
      )}

      {/* Social Counts */}
      <div className="px-4 py-2 flex justify-between items-center text-xs text-gray-500 border-b border-gray-100 mx-4 mt-1">
         <div className="flex items-center gap-1 hover:text-linkedin-blue hover:underline cursor-pointer" onClick={(e) => e.stopPropagation()}>
            <div className="flex -space-x-1">
               <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                 <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
               </div>
            </div>
            <span>{post.likes}</span>
         </div>
         <div className="flex gap-2 hover:text-linkedin-blue cursor-pointer" onClick={(e) => e.stopPropagation()}>
            <span className="hover:underline">{post.comments} commentaires</span>
            <span>•</span>
            <span className="hover:underline">{post.reposts} partages</span>
         </div>
      </div>

      {/* Action Buttons */}
      <div className="px-2 py-1 flex justify-between items-center mt-1">
         <button 
           className="flex items-center justify-center gap-2 px-3 py-3 rounded-md hover:bg-gray-100 flex-1 transition-colors group"
           onClick={(e) => e.stopPropagation()}
         >
            <ThumbsUp className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold text-gray-600">J'aime</span>
         </button>
         <button 
            className="flex items-center justify-center gap-2 px-3 py-3 rounded-md hover:bg-gray-100 flex-1 transition-colors"
            onClick={(e) => e.stopPropagation()}
         >
            <Share2 className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-semibold text-gray-600">Partager</span>
         </button>
         
         {post.listingType === 'INVESTMENT' ? (
           <button 
             className="flex items-center justify-center gap-2 px-3 py-3 rounded-md hover:bg-purple-50 flex-1 transition-colors text-purple-700"
             onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
           >
             <Banknote className="w-5 h-5 text-purple-700" />
             <span className="text-sm font-bold">Investir</span>
           </button>
         ) : post.listingType === 'SERVICE' ? (
           <button 
             className="flex items-center justify-center gap-2 px-3 py-3 rounded-md hover:bg-yellow-50 flex-1 transition-colors text-yellow-700"
             onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
           >
             <Send className="w-5 h-5 text-yellow-700" />
             <span className="text-sm font-bold">Réserver</span>
           </button>
         ) : (
           <button 
             className="flex items-center justify-center gap-2 px-3 py-3 rounded-md hover:bg-blue-50 flex-1 transition-colors text-blue-700"
             onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
           >
             <Send className="w-5 h-5 text-blue-700" />
             <span className="text-sm font-bold">Contacter</span>
           </button>
         )}
      </div>
    </div>
  );
};
