
import React from 'react';
import { X, CreditCard, Smartphone, TrendingUp, History, ShieldCheck, PieChart, ArrowUpRight, ArrowDownLeft, FileText } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const transactions = [
    { 
      id: 'TXN-8832-XJ', 
      type: 'RENT', 
      amount: '-125 000', 
      currency: 'CFA', 
      date: '24 Oct, 10:00', 
      status: 'COMPLETED', 
      description: 'Paiement Loyer (Bi-mensuel)',
      method: 'MoMo' 
    },
    { 
      id: 'TXN-9921-MM', 
      type: 'DEPOSIT', 
      amount: '+50 000', 
      currency: 'CFA', 
      date: '23 Oct, 20:30', 
      status: 'COMPLETED', 
      description: 'Dépôt MoMo (MTN)',
      method: 'Mobile Money' 
    },
    { 
      id: 'TXN-7742-PQ', 
      type: 'INVESTMENT', 
      amount: '+2 500', 
      currency: 'CFA', 
      date: '20 Oct, 09:15', 
      status: 'PENDING', 
      description: 'Dividende - Assinie',
      method: 'Crédit Wallet'
    },
    { 
      id: 'TXN-3321-LZ', 
      type: 'RENT', 
      amount: '-125 000', 
      currency: 'CFA', 
      date: '10 Oct, 10:00', 
      status: 'LATE', 
      description: 'Paiement Loyer (Pénalité)',
      method: 'MoMo'
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[#f3f2ef] w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-linkedin-blue p-1.5 rounded text-white">
               <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
               <h2 className="text-lg font-bold text-gray-900 leading-none">Portefeuille PaySafe™</h2>
               <p className="text-xs text-gray-500 mt-0.5">Paiements Sécurisés & Investissements</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-grow">
          
          {/* Main Balance Card */}
          <div className="bg-gradient-to-br from-[#1b2a4e] to-[#0a66c2] rounded-xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck className="w-32 h-32" />
             </div>
             
             <p className="text-blue-200 text-sm font-medium mb-1">Solde Total</p>
             <h3 className="text-4xl font-bold mb-6 tracking-tight">15 400 <span className="text-xl font-normal opacity-80">CFA</span></h3>
             
             <div className="flex gap-3">
                <button className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg py-2 flex items-center justify-center gap-2 transition-colors">
                   <ArrowDownLeft className="w-4 h-4" />
                   <span className="text-sm font-semibold">Dépôt</span>
                </button>
                <button className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg py-2 flex items-center justify-center gap-2 transition-colors">
                   <ArrowUpRight className="w-4 h-4" />
                   <span className="text-sm font-semibold">Retrait</span>
                </button>
             </div>
          </div>

          {/* Quick Actions / Mobile Money */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
             <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Comptes Liés</h4>
             <div className="flex justify-between items-center gap-2">
                <div className="flex flex-col items-center gap-1 cursor-pointer group">
                   <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center border border-gray-100 group-hover:scale-105 transition-transform">
                      <span className="font-bold text-[10px] text-black">MTN</span>
                   </div>
                   <span className="text-[10px] text-gray-600 font-medium">MoMo</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer group">
                   <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center border border-gray-100 group-hover:scale-105 transition-transform">
                      <span className="font-bold text-[10px] text-white">ORG</span>
                   </div>
                   <span className="text-[10px] text-gray-600 font-medium">Orange</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer group">
                   <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center border border-gray-100 group-hover:scale-105 transition-transform">
                      <span className="font-bold text-[10px] text-white">MOOV</span>
                   </div>
                   <span className="text-[10px] text-gray-600 font-medium">Flooz</span>
                </div>
                <div className="w-[1px] h-8 bg-gray-200 mx-1"></div>
                <div className="flex flex-col items-center gap-1 cursor-pointer group">
                   <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-dashed border-gray-400 group-hover:border-gray-600 transition-colors">
                      <CreditCard className="w-5 h-5 text-gray-500" />
                   </div>
                   <span className="text-[10px] text-gray-600 font-medium">Carte</span>
                </div>
             </div>
          </div>

          {/* Split Rent Feature */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
             <div className="flex justify-between items-start mb-3">
                <div>
                   <h4 className="text-sm font-bold text-gray-900">Prochain Loyer</h4>
                   <p className="text-xs text-gray-500">Appt 4B, Résidence Haie Vive</p>
                </div>
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">Dans 5 jours</span>
             </div>
             
             <div className="flex items-end gap-1 mb-4">
                <span className="text-2xl font-bold text-gray-900">250 000</span>
                <span className="text-xs text-gray-500 mb-1">CFA</span>
             </div>

             {/* Split Toggle */}
             <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                     <Smartphone className="w-3 h-3" />
                     Paiement Fractionné
                   </span>
                   <span className="text-[10px] text-green-600 font-bold bg-green-100 px-1.5 rounded">Actif</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                   <button className="py-2 rounded border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50">
                      Mensuel
                   </button>
                   <button className="py-2 rounded border border-linkedin-blue bg-blue-50 text-xs font-bold text-linkedin-blue ring-1 ring-linkedin-blue">
                      Bi-Hebdo
                   </button>
                   <button className="py-2 rounded border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50">
                      Hebdo
                   </button>
                </div>
                <p className="text-[10px] text-gray-500 mt-2 text-center">
                   Prochain prélèvement : <span className="font-bold">125 000 CFA</span> Lundi
                </p>
             </div>
          </div>

          {/* Investment Portfolio Mini */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
             <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1">
                   <PieChart className="w-4 h-4 text-purple-600" />
                   Mes Investissements
                </h4>
                <TrendingUp className="w-4 h-4 text-green-600" />
             </div>
             
             <div className="space-y-3">
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-gray-200 overflow-hidden">
                         <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" className="w-full h-full object-cover" />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-gray-800">Villa Assinie</p>
                         <p className="text-[10px] text-gray-500">2 Parts</p>
                      </div>
                   </div>
                   <span className="text-xs font-bold text-green-600">+12%</span>
                </div>
                
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-gray-200 overflow-hidden">
                         <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" className="w-full h-full object-cover" />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-gray-800">Haie Vive Cotonou</p>
                         <p className="text-[10px] text-gray-500">5 Parts</p>
                      </div>
                   </div>
                   <span className="text-xs font-bold text-green-600">+8.5%</span>
                </div>
             </div>
             
             <button className="w-full mt-4 py-2 bg-purple-50 text-purple-700 text-xs font-bold rounded hover:bg-purple-100 transition-colors">
                Voir Portfolio Complet
             </button>
          </div>

          {/* Transaction History Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <History className="w-4 h-4 text-gray-500" />
                  Historique
              </h4>
              <div className="space-y-3">
                  {transactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between border-b border-gray-50 pb-2 last:border-0 last:pb-0 hover:bg-gray-50 p-1 rounded transition-colors cursor-default">
                          <div className="flex items-start gap-3">
                              <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                  tx.type === 'DEPOSIT' || tx.type === 'INVESTMENT' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-700'
                              }`}>
                                 {tx.type === 'RENT' ? '🏠' : tx.type === 'INVESTMENT' ? '📈' : tx.type === 'DEPOSIT' ? '💰' : '💸'}
                              </div>
                              <div>
                                  <p className="text-xs font-bold text-gray-800">{tx.description}</p>
                                  <p className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                                    <span>{tx.date}</span>
                                    <span>•</span>
                                    <span>{tx.method}</span>
                                  </p>
                                  <div className="flex items-center gap-1 mt-0.5">
                                    <span className="text-[9px] text-gray-400 font-mono">#{tx.id}</span>
                                    {tx.status === 'PENDING' && <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-[9px] font-bold rounded">EN ATTENTE</span>}
                                    {tx.status === 'LATE' && <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-[9px] font-bold rounded">RETARD</span>}
                                  </div>
                              </div>
                          </div>
                          <div className="text-right">
                               <p className={`text-xs font-bold ${
                                   tx.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900'
                               }`}>
                                   {tx.amount} <span className="text-[10px] text-gray-500">{tx.currency}</span>
                               </p>
                               <p className="text-[10px] text-gray-400 capitalize">{tx.status === 'COMPLETED' ? 'Terminé' : tx.status.toLowerCase()}</p>
                               <FileText className="w-3 h-3 text-gray-300 ml-auto mt-1 cursor-pointer hover:text-gray-600" />
                          </div>
                      </div>
                  ))}
              </div>
              <button className="w-full mt-3 text-center text-xs text-linkedin-blue font-semibold hover:underline border-t border-gray-100 pt-2">
                  Voir tout l'historique
              </button>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-between items-center flex-shrink-0">
           <div className="flex items-center gap-1 text-xs text-gray-500">
              <History className="w-3 h-3" />
              <span>Sync: À l'instant</span>
           </div>
           <span className="text-[10px] text-gray-400">Crypté 256-bit • Certifié PaySafe</span>
        </div>
      </div>
    </div>
  );
};
