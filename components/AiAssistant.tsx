import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, FileText, TrendingUp, Search, ChevronRight, Zap, RefreshCw } from 'lucide-react';
import { askQwenAi, ChatMessage } from '../services/qwenAi';

interface Message {
  id: number;
  text: string;
  sender: 'USER' | 'AI';
  type?: 'TEXT' | 'ANALYSIS' | 'LISTING';
}

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour Caleb ! Je suis Immo-AI propulsé par Qwen 🧠. Je peux analyser vos baux d'habitation, estimer la rentabilité d'un quartier ou vous conseiller sur vos investissements. Comment puis-je vous aider ?",
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
  }, [messages, isOpen, isTyping]);

  const handleSend = async (customText?: string) => {
    const textToSend = (customText || inputValue).trim();
    if (!textToSend || isTyping) return;

    const userMsgId = Date.now();
    const newUserMsg: Message = { id: userMsgId, text: textToSend, sender: 'USER' };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    const historyForAi: ChatMessage[] = [
      ...conversationHistory,
      { role: 'user', content: textToSend }
    ];

    try {
      const responseText = await askQwenAi(textToSend, conversationHistory);
      
      const isAnalysis = textToSend.toLowerCase().includes('bail') || textToSend.toLowerCase().includes('contrat');
      const isListing = textToSend.toLowerCase().includes('invest') || textToSend.toLowerCase().includes('assinie');

      const aiMsg: Message = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'AI',
        type: isAnalysis ? 'ANALYSIS' : isListing ? 'LISTING' : 'TEXT'
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
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[340px] sm:w-[410px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-200 flex flex-col h-[520px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#191919] via-[#0a66c2] to-[#7c3aed] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm">Immo-AI™ (Qwen)</h3>
                  <span className="text-[9px] bg-green-400/20 text-green-300 font-semibold px-1.5 py-0.5 rounded border border-green-400/30">
                    Live AI
                  </span>
                </div>
                <p className="text-[10px] text-blue-100 opacity-90">Expert Immobilier & Baux UEMOA</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                title="Réinitialiser"
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-grow bg-[#f3f4f6] p-4 overflow-y-auto">
            <div className="text-center text-[10px] text-gray-400 mb-4 uppercase tracking-widest font-semibold">
              Assistant Intelligent Connecté
            </div>

            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex mb-3 ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'AI' && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center mr-2 flex-shrink-0 text-white shadow-sm mt-1">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm shadow-sm leading-relaxed ${
                    msg.sender === 'USER'
                      ? 'bg-linkedin-blue text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                  }`}
                >
                  {msg.type === 'ANALYSIS' && (
                    <div className="flex items-center gap-1.5 mb-1.5 text-indigo-600 font-bold text-[11px] uppercase tracking-wide border-b border-gray-100 pb-1">
                      <FileText className="w-3 h-3" /> Analyse Juridique & Conformité
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start mb-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center mr-2 text-white">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-none px-4 py-2.5 border border-gray-200 flex items-center gap-1.5 shadow-sm">
                  <span className="text-[11px] text-gray-500 font-medium mr-1">Qwen réfléchit</span>
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

          {/* Quick Actions */}
          <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleQuickAction('Quels sont les quartiers les plus rentables à Abidjan ?')}
              className="whitespace-nowrap bg-blue-50 border border-blue-200 text-[11px] text-linkedin-blue px-2.5 py-1 rounded-full hover:bg-blue-100 transition-colors flex items-center gap-1"
            >
              <TrendingUp className="w-3 h-3" /> Rentabilité Abidjan
            </button>
            <button
              onClick={() => handleQuickAction('Vérifie les clauses clés d’un bail d’habitation au Bénin')}
              className="whitespace-nowrap bg-indigo-50 border border-indigo-200 text-[11px] text-indigo-700 px-2.5 py-1 rounded-full hover:bg-indigo-100 transition-colors flex items-center gap-1"
            >
              <FileText className="w-3 h-3" /> Clauses Bail UEMOA
            </button>
            <button
              onClick={() => handleQuickAction('Estimer le loyer moyen d’un appartement F3 à Haie Vive Cotonou')}
              className="whitespace-nowrap bg-purple-50 border border-purple-200 text-[11px] text-purple-700 px-2.5 py-1 rounded-full hover:bg-purple-100 transition-colors flex items-center gap-1"
            >
              <Search className="w-3 h-3" /> Loyer Haie Vive
            </button>
          </div>

          {/* Input Area */}
          <div className="bg-white p-3 border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Posez votre question à Qwen..."
              disabled={isTyping}
              className="flex-grow bg-gray-100 rounded-full px-4 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-linkedin-blue/40"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isTyping}
              className="w-9 h-9 bg-linkedin-blue hover:bg-blue-700 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95 shadow-sm"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
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
