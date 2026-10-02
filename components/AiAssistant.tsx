
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, FileText, TrendingUp, Search, ChevronRight, Zap } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'USER' | 'AI';
  type?: 'TEXT' | 'ANALYSIS' | 'LISTING';
}

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Bonjour Caleb ! Je suis Immo-AI 🤖. Je peux analyser vos contrats, estimer un loyer ou trouver des investissements rentables. Comment puis-je vous aider ?", sender: 'AI' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setMessages(prev => [...prev, { id: Date.now(), text: userMsg, sender: 'USER' }]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI logic based on keywords
    setTimeout(() => {
      let aiResponse: Message = { id: Date.now() + 1, text: "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler ?", sender: 'AI' };

      if (userMsg.toLowerCase().includes('contrat') || userMsg.toLowerCase().includes('bail')) {
        aiResponse = { 
            id: Date.now() + 1, 
            text: "J'ai analysé votre dernier contrat de bail pour 'Haie Vive'.\n\n✅ Clause PaySafe active\n✅ Durée: 12 mois\n⚠️ Attention: Le préavis est de 3 mois (standard: 1 mois).", 
            sender: 'AI',
            type: 'ANALYSIS'
        };
      } else if (userMsg.toLowerCase().includes('invest') || userMsg.toLowerCase().includes('rentab')) {
        aiResponse = { 
            id: Date.now() + 1, 
            text: "Pour un budget de 50 000 CFA, je recommande le projet 'Assinie Beachfront'.\n\n📈 Rendement: 12.5%\n👥 340 Investisseurs\n💰 Dividende estimé: 6 250 CFA/an", 
            sender: 'AI',
            type: 'LISTING'
        };
      } else if (userMsg.toLowerCase().includes('bonjour') || userMsg.toLowerCase().includes('hello')) {
        aiResponse = { id: Date.now() + 1, text: "Bonjour ! Prêt à sécuriser votre prochain logement ?", sender: 'AI' };
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
      setInputValue(action);
      // Optional: auto-send
      // handleSend(); 
  };

  return (
    <div className="fixed bottom-6 left-6 z-[90] flex flex-col items-start font-sans">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[320px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-200 flex flex-col max-h-[500px]">
           
           {/* Header */}
           <div className="bg-gradient-to-r from-indigo-900 to-purple-800 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                 <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                    <Bot className="w-6 h-6 text-white" />
                 </div>
                 <div>
                    <h3 className="font-bold text-sm">Assistant Immo-AI™</h3>
                    <div className="flex items-center gap-1.5">
                       <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                       <span className="text-[10px] text-indigo-100 opacity-90">En ligne • Analyse en temps réel</span>
                    </div>
                 </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                 <X className="w-5 h-5" />
              </button>
           </div>

           {/* Messages Area */}
           <div className="flex-grow bg-[#f0f2f5] p-4 overflow-y-auto h-[350px]">
              
              <div className="text-center text-[10px] text-gray-400 mb-4 uppercase tracking-widest">Aujourd'hui</div>

              {messages.map((msg) => (
                 <div key={msg.id} className={`flex mb-4 ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'AI' && (
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2 flex-shrink-0 border border-indigo-200">
                           <Sparkles className="w-4 h-4 text-indigo-600" />
                        </div>
                    )}
                    <div 
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm leading-relaxed ${
                          msg.sender === 'USER' 
                          ? 'bg-linkedin-blue text-white rounded-br-none' 
                          : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                      }`}
                    >
                       {msg.type === 'ANALYSIS' && (
                           <div className="flex items-center gap-2 mb-2 text-indigo-600 font-bold text-xs uppercase tracking-wide border-b border-gray-100 pb-1">
                               <FileText className="w-3 h-3" /> Analyse Juridique
                           </div>
                       )}
                       <div className="whitespace-pre-line">{msg.text}</div>
                       
                       {msg.type === 'LISTING' && (
                           <button className="mt-3 w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold py-2 rounded flex items-center justify-center gap-1 transition-colors">
                               Voir l'opportunité <ChevronRight className="w-3 h-3" />
                           </button>
                       )}
                    </div>
                 </div>
              ))}
              
              {isTyping && (
                 <div className="flex justify-start mb-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                       <Sparkles className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 border border-gray-100 flex items-center gap-1">
                       <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                       <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></span>
                       <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></span>
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
           </div>

           {/* Quick Actions (if emptyish) */}
           {messages.length < 3 && !isTyping && (
               <div className="px-4 pb-2 bg-[#f0f2f5] flex gap-2 overflow-x-auto no-scrollbar">
                   <button onClick={() => handleQuickAction("Analyser mon bail actuel")} className="whitespace-nowrap bg-white border border-gray-200 text-xs text-indigo-700 px-3 py-1.5 rounded-full hover:bg-indigo-50 transition-colors flex items-center gap-1">
                       <FileText className="w-3 h-3" /> Analyser Bail
                   </button>
                   <button onClick={() => handleQuickAction("Quelle est la rentabilité à Assinie ?")} className="whitespace-nowrap bg-white border border-gray-200 text-xs text-indigo-700 px-3 py-1.5 rounded-full hover:bg-indigo-50 transition-colors flex items-center gap-1">
                       <TrendingUp className="w-3 h-3" /> Rentabilité
                   </button>
                   <button onClick={() => handleQuickAction("Cherche un T3 à Cotonou")} className="whitespace-nowrap bg-white border border-gray-200 text-xs text-indigo-700 px-3 py-1.5 rounded-full hover:bg-indigo-50 transition-colors flex items-center gap-1">
                       <Search className="w-3 h-3" /> Trouver Bien
                   </button>
               </div>
           )}

           {/* Input Area */}
           <div className="bg-white p-3 border-t border-gray-200 flex gap-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez une question..." 
                className="flex-grow bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="w-9 h-9 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
              >
                 <Send className="w-4 h-4 ml-0.5" />
              </button>
           </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 ${isOpen ? 'bg-gray-800 rotate-90' : 'bg-[#7c3aed] hover:bg-[#6d28d9]'}`}
      >
        {isOpen ? (
            <X className="w-6 h-6 text-white" />
        ) : (
            <>
                <Bot className="w-7 h-7 text-white" />
                <span className="absolute top-0 right-0 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-indigo-600"></span>
                </span>
                
                {/* Tooltip */}
                <span className="absolute left-16 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Assistant IA
                </span>
            </>
        )}
      </button>

    </div>
  );
};
