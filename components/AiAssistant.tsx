import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  FileText,
  TrendingUp,
  Search,
  ChevronRight,
  RefreshCw,
  Maximize2,
  Minimize2,
  Home,
  MapPin,
  ChevronsUpDown
} from 'lucide-react';
import { askQwenAi, searchRelevantListings, ChatMessage } from '../services/qwenAi';
import { PostData } from '../types';

interface Message {
  id: number;
  text: string;
  sender: 'USER' | 'AI';
  type?: 'TEXT' | 'ANALYSIS' | 'LISTING';
  matchedListings?: PostData[];
}

interface AiAssistantProps {
  listings?: PostData[];
  onSelectListing?: (listing: PostData) => void;
}

/**
 * Nettoyage et rendu du texte sans markdown brut (##, **) avec vrai gras et listes à puces soignées
 */
const renderInlineFormatting = (text: string) => {
  const clean = text.replace(/^#{1,6}\s*/, '');
  const parts = clean.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2).trim();
      return (
        <strong key={index} className="font-bold text-gray-950">
          {boldText}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

const FormattedAiText: React.FC<{ text: string }> = ({ text }) => {
  const sanitized = text
    .replace(/^(\s*)#{1,6}\s*\*\*(.*?)\*\*/gm, '$1**$2**')
    .replace(/^(\s*)#{1,6}\s+/gm, '$1')
    .replace(/\*\*\s*#{1,6}\s*/g, '**');

  const lines = sanitized.split('\n');

  return (
    <div className="space-y-1.5 leading-relaxed text-gray-800">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Puce de liste (- ou * ou •)
        const isBullet = /^[-*•]\s+/.test(trimmed);
        if (isBullet) {
          const bulletContent = trimmed.replace(/^[-*•]\s+/, '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-0.5">
              <span className="text-blue-600 font-bold text-sm leading-none mt-1 select-none">•</span>
              <div className="flex-grow text-xs sm:text-[13px] leading-relaxed">
                {renderInlineFormatting(bulletContent)}
              </div>
            </div>
          );
        }

        // Paragraphe ou titre sans balise
        return (
          <p key={idx} className="text-xs sm:text-[13px] leading-relaxed">
            {renderInlineFormatting(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

export const AiAssistant: React.FC<AiAssistantProps> = ({ listings = [], onSelectListing }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInputExpanded, setIsInputExpanded] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis **Immo-AI** propulsé par Qwen 🧠.\n\nJe peux vous proposer les meilleures offres selon vos critères (location, achat), analyser vos baux d'habitation ou estimer la rentabilité d'un quartier. Comment puis-je vous orienter aujourd'hui ?",
      sender: 'AI'
    }
  ]);
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping, isExpanded]);

  const handleSend = async (customText?: string) => {
    const textToSend = (customText || inputValue).trim();
    if (!textToSend || isTyping) return;

    const userMsgId = Date.now();
    const newUserMsg: Message = { id: userMsgId, text: textToSend, sender: 'USER' };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Recherche directe des annonces correspondantes dans la base
    const matched = searchRelevantListings(textToSend, listings);

    const historyForAi: ChatMessage[] = [
      ...conversationHistory,
      { role: 'user', content: textToSend }
    ];

    try {
      const responseText = await askQwenAi(textToSend, conversationHistory, {
        availableListings: listings
      });

      const isAnalysis = textToSend.toLowerCase().includes('bail') || textToSend.toLowerCase().includes('contrat');
      const isListing = matched.length > 0 || textToSend.toLowerCase().includes('invest') || textToSend.toLowerCase().includes('assinie');

      const aiMsg: Message = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'AI',
        type: isAnalysis ? 'ANALYSIS' : isListing ? 'LISTING' : 'TEXT',
        matchedListings: matched.length > 0 ? matched : undefined
      };

      setMessages(prev => [...prev, aiMsg]);
      setConversationHistory([
        ...historyForAi,
        { role: 'assistant', content: responseText }
      ]);
    } catch (err) {
      console.error('Erreur AI Assistant:', err);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Désolé, une coupure réseau temporaire m'empêche de répondre. Réessayez dans un instant.",
          sender: 'AI'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: string) => {
    handleSend(action);
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: "Conversation réinitialisée. Comment puis-je vous aider aujourd'hui ?",
        sender: 'AI'
      }
    ]);
    setConversationHistory([]);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[90] flex flex-col items-start font-sans">
      {/* Fenêtre de Chat */}
      {isOpen && (
        <div
          className={`mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 flex flex-col transition-all ease-in-out ${
            isExpanded
              ? 'w-[94vw] sm:w-[680px] md:w-[820px] h-[82vh] max-h-[780px]'
              : 'w-[350px] sm:w-[420px] h-[540px]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#191919] via-[#0a66c2] to-[#7c3aed] p-4 flex justify-between items-center text-white select-none">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm shadow-inner">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm">Immo-AI™ (Qwen)</h3>
                  <span className="text-[9px] bg-green-400/20 text-green-300 font-semibold px-1.5 py-0.5 rounded border border-green-400/30">
                    Live AI
                  </span>
                </div>
                <p className="text-[10px] text-blue-100 opacity-90">Conseiller Immobilier & Baux UEMOA</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Bouton Agrandir / Réduire */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Réduire la fenêtre' : "Agrandir l'espace de discussion"}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Bouton Reset */}
              <button
                onClick={clearChat}
                title="Réinitialiser"
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              {/* Bouton Fermer */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Zone des messages */}
          <div className="flex-grow bg-[#f8fafc] p-4 overflow-y-auto space-y-3.5">
            <div className="text-center text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
              Assistant Connecté au Marché UEMOA
            </div>

            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'AI' && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center mr-2 flex-shrink-0 text-white shadow-sm mt-1">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs sm:text-[13px] shadow-sm leading-relaxed ${
                    msg.sender === 'USER'
                      ? 'bg-linkedin-blue text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                  }`}
                >
                  {msg.type === 'ANALYSIS' && (
                    <div className="flex items-center gap-1.5 mb-2 text-indigo-600 font-bold text-[11px] uppercase tracking-wide border-b border-gray-100 pb-1">
                      <FileText className="w-3.5 h-3.5" /> Analyse Juridique & Conformité
                    </div>
                  )}

                  {/* Rendu propre sans ## ni ** */}
                  {msg.sender === 'AI' ? (
                    <FormattedAiText text={msg.text} />
                  ) : (
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  )}

                  {/* Cartes interactives pointant vers les offres réelles */}
                  {msg.matchedListings && msg.matchedListings.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-gray-100 flex flex-col gap-2">
                      <div className="text-[11px] font-bold text-gray-900 flex items-center gap-1.5">
                        <Home className="w-3.5 h-3.5 text-blue-600" />
                        <span>Offres correspondantes disponibles ({msg.matchedListings.length}) :</span>
                      </div>

                      <div
                        className={`grid gap-2 ${
                          isExpanded && msg.matchedListings.length > 1
                            ? 'grid-cols-1 sm:grid-cols-2'
                            : 'grid-cols-1'
                        }`}
                      >
                        {msg.matchedListings.map(item => (
                          <div
                            key={item.id}
                            onClick={() => onSelectListing?.(item)}
                            className="flex items-center gap-3 p-2.5 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-white hover:from-blue-100/80 hover:to-indigo-50 border border-blue-200/80 hover:border-blue-400 rounded-xl cursor-pointer transition-all duration-200 group shadow-sm hover:shadow"
                          >
                            <img
                              src={item.imageUrl}
                              alt={item.content}
                              className="w-16 h-16 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                            />
                            <div className="flex-grow min-w-0">
                              <div className="flex items-center justify-between gap-1 mb-0.5">
                                <span className="text-[9px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded">
                                  {item.listingType === 'RENTAL'
                                    ? 'À Louer'
                                    : item.listingType === 'SALE'
                                    ? 'À Vendre'
                                    : 'Invest'}
                                </span>
                                <span className="text-xs font-black text-emerald-700">
                                  {item.price}
                                </span>
                              </div>
                              <p className="text-xs font-bold text-gray-900 line-clamp-1 group-hover:text-blue-700 transition-colors">
                                {item.content
                                  .split('\n')[0]
                                  .replace(/^🏢|🏡|🌴|✨|🏷️|💎|🏠/g, '')
                                  .trim()}
                              </p>
                              <div className="flex items-center justify-between text-[11px] text-gray-500 mt-1">
                                <span className="flex items-center gap-1 truncate text-[10px]">
                                  <MapPin className="w-3 h-3 text-red-500 flex-shrink-0" />
                                  {item.location || item.city}
                                </span>
                                <span className="text-blue-600 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform flex-shrink-0 text-[10px]">
                                  Voir l'offre <ChevronRight className="w-3 h-3" />
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start mb-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center mr-2 text-white">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-none px-4 py-2.5 border border-gray-200 flex items-center gap-1.5 shadow-sm">
                  <span className="text-[11px] text-gray-500 font-medium mr-1">Qwen analyse le catalogue</span>
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                  <span
                    className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: '0.15s' }}
                  ></span>
                  <span
                    className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: '0.3s' }}
                  ></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions d'actions rapides */}
          <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleQuickAction('Je cherche une maison 3 chambres à Haie Vive')}
              className="whitespace-nowrap bg-blue-50 border border-blue-200 text-[11px] text-linkedin-blue px-2.5 py-1 rounded-full hover:bg-blue-100 transition-colors flex items-center gap-1"
            >
              <Search className="w-3 h-3" /> Maison 3 ch. Haie Vive
            </button>
            <button
              onClick={() => handleQuickAction('Quels sont les quartiers les plus rentables à Abidjan ?')}
              className="whitespace-nowrap bg-indigo-50 border border-indigo-200 text-[11px] text-indigo-700 px-2.5 py-1 rounded-full hover:bg-indigo-100 transition-colors flex items-center gap-1"
            >
              <TrendingUp className="w-3 h-3" /> Rentabilité Abidjan
            </button>
            <button
              onClick={() => handleQuickAction('Vérifie les clauses clés d’un bail d’habitation')}
              className="whitespace-nowrap bg-purple-50 border border-purple-200 text-[11px] text-purple-700 px-2.5 py-1 rounded-full hover:bg-purple-100 transition-colors flex items-center gap-1"
            >
              <FileText className="w-3 h-3" /> Clauses Bail UEMOA
            </button>
          </div>

          {/* Champ de saisie / discussion extensible */}
          <div className="bg-white p-3 border-t border-gray-200">
            <div className="flex items-end gap-2 bg-gray-100 rounded-2xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-linkedin-blue/40 border border-gray-200">
              <textarea
                rows={isInputExpanded ? 3 : 1}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Posez votre question à Qwen (ex: maison 3 chambres à Haie Vive)..."
                disabled={isTyping}
                className="flex-grow bg-transparent text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none resize-none py-1.5 leading-normal max-h-28 overflow-y-auto"
              />

              <div className="flex items-center gap-1 pb-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsInputExpanded(!isInputExpanded)}
                  title={isInputExpanded ? 'Réduire le champ de saisie' : 'Agrandir le champ de saisie'}
                  className="p-1 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ChevronsUpDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-8 h-8 bg-linkedin-blue hover:bg-blue-700 text-white rounded-full flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all transform active:scale-95 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-1 px-1 text-[10px] text-gray-400">
              <span>💡 Entrée pour envoyer, Maj+Entrée pour nouvelle ligne</span>
              <span className="font-semibold text-blue-600">Qwen 2.5 Flash</span>
            </div>
          </div>
        </div>
      )}

      {/* Bouton Flottant Déclencheur */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 ${
          isOpen ? 'bg-gray-800 rotate-90' : 'bg-gradient-to-r from-linkedin-blue to-purple-600 hover:opacity-95'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <Bot className="w-7 h-7 text-white" />
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border-2 border-white"></span>
            </span>

            {/* Tooltip */}
            <span className="absolute left-16 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
              Assistant Immo-AI (Qwen)
            </span>
          </>
        )}
      </button>
    </div>
  );
};
