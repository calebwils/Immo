import React, { useState, useEffect } from 'react';
import {
  X,
  CreditCard,
  Smartphone,
  TrendingUp,
  History,
  ShieldCheck,
  PieChart,
  ArrowUpRight,
  ArrowDownLeft,
  FileText,
  CheckCircle,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Transaction {
  id: string;
  type: 'RENT' | 'DEPOSIT' | 'WITHDRAW' | 'INVESTMENT';
  amount: string;
  currency: string;
  date: string;
  status: 'COMPLETED' | 'PENDING' | 'LATE';
  description: string;
  method: string;
}

const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-8832-XJ',
    type: 'RENT',
    amount: '-125 000',
    currency: 'CFA',
    date: '24 Oct, 10:00',
    status: 'COMPLETED',
    description: 'Paiement Loyer (Bi-mensuel)',
    method: 'Wave'
  },
  {
    id: 'TXN-9921-MM',
    type: 'DEPOSIT',
    amount: '+50 000',
    currency: 'CFA',
    date: '23 Oct, 20:30',
    status: 'COMPLETED',
    description: 'Dépôt MoMo (MTN)',
    method: 'MTN MoMo'
  },
  {
    id: 'TXN-7742-PQ',
    type: 'INVESTMENT',
    amount: '+2 500',
    currency: 'CFA',
    date: '20 Oct, 09:15',
    status: 'COMPLETED',
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
    method: 'Orange Money'
  }
];

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem('immo_wallet_balance');
    return saved ? parseInt(saved, 10) : 15400;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('immo_wallet_transactions');
    return saved ? JSON.parse(saved) : DEFAULT_TRANSACTIONS;
  });

  const [actionType, setActionType] = useState<'NONE' | 'DEPOSIT' | 'WITHDRAW'>('NONE');
  const [selectedOperator, setSelectedOperator] = useState<'WAVE' | 'MTN' | 'ORANGE' | 'MOOV' | 'CARD'>('WAVE');
  const [amountInput, setAmountInput] = useState('25000');
  const [phoneInput, setPhoneInput] = useState('+229 97 00 12 34');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('immo_wallet_balance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('immo_wallet_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleExecuteTransaction = () => {
    const parsedAmount = parseInt(amountInput, 10);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    if (actionType === 'WITHDRAW' && parsedAmount > balance) {
      alert('Solde insuffisant pour ce retrait.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const opNames: Record<string, string> = {
        WAVE: 'Wave',
        MTN: 'MTN MoMo',
        ORANGE: 'Orange Money',
        MOOV: 'Moov Flooz',
        CARD: 'Carte Bancaire'
      };

      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      if (actionType === 'DEPOSIT') {
        setBalance(prev => prev + parsedAmount);
        const newTx: Transaction = {
          id: `TXN-${Math.floor(1000 + Math.random() * 9000)}-${actionType.substring(0, 2)}`,
          type: 'DEPOSIT',
          amount: `+${parsedAmount.toLocaleString('fr-FR')}`,
          currency: 'CFA',
          date: `Aujourd'hui, ${timeStr}`,
          status: 'COMPLETED',
          description: `Dépôt Mobile Money (${opNames[selectedOperator]})`,
          method: opNames[selectedOperator]
        };
        setTransactions(prev => [newTx, ...prev]);
        setSuccessMessage(`Dépôt de ${parsedAmount.toLocaleString('fr-FR')} CFA réussi via ${opNames[selectedOperator]} !`);
      } else {
        setBalance(prev => prev - parsedAmount);
        const newTx: Transaction = {
          id: `TXN-${Math.floor(1000 + Math.random() * 9000)}-${actionType.substring(0, 2)}`,
          type: 'WITHDRAW',
          amount: `-${parsedAmount.toLocaleString('fr-FR')}`,
          currency: 'CFA',
          date: `Aujourd'hui, ${timeStr}`,
          status: 'COMPLETED',
          description: `Retrait vers ${opNames[selectedOperator]}`,
          method: opNames[selectedOperator]
        };
        setTransactions(prev => [newTx, ...prev]);
        setSuccessMessage(`Retrait de ${parsedAmount.toLocaleString('fr-FR')} CFA transféré sur ${phoneInput} !`);
      }

      setTimeout(() => {
        setSuccessMessage(null);
        setActionType('NONE');
      }, 2500);
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="relative bg-[#f3f2ef] w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-linkedin-blue p-1.5 rounded text-white shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-none">Portefeuille PaySafe™</h2>
              <p className="text-xs text-gray-500 mt-0.5">Mobile Money & Dépôts Sécurisés UEMOA</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-grow">
          {/* Success Banner */}
          {successMessage && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-800 p-3 rounded-xl flex items-center gap-2 text-sm font-semibold animate-in fade-in slide-in-from-top-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Main Balance Card */}
          <div className="bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0a66c2] rounded-xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
              <ShieldCheck className="w-44 h-44" />
            </div>

            <div className="flex justify-between items-start mb-1">
              <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider">Solde Disponible</p>
              <span className="text-[10px] bg-green-400/20 text-green-300 font-bold px-2 py-0.5 rounded-full border border-green-400/30">
                Compte Vérifié
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight">
              {balance.toLocaleString('fr-FR')} <span className="text-lg font-medium opacity-80">CFA</span>
            </h3>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setActionType('DEPOSIT');
                  setSuccessMessage(null);
                }}
                className={`flex-1 rounded-lg py-2.5 flex items-center justify-center gap-2 font-bold text-sm transition-all shadow-sm ${
                  actionType === 'DEPOSIT'
                    ? 'bg-white text-blue-900 ring-2 ring-white'
                    : 'bg-white/15 hover:bg-white/25 border border-white/20 text-white'
                }`}
              >
                <ArrowDownLeft className="w-4 h-4" />
                <span>Dépôt</span>
              </button>
              <button
                onClick={() => {
                  setActionType('WITHDRAW');
                  setSuccessMessage(null);
                }}
                className={`flex-1 rounded-lg py-2.5 flex items-center justify-center gap-2 font-bold text-sm transition-all shadow-sm ${
                  actionType === 'WITHDRAW'
                    ? 'bg-white text-blue-900 ring-2 ring-white'
                    : 'bg-white/15 hover:bg-white/25 border border-white/20 text-white'
                }`}
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>Retrait</span>
              </button>
            </div>
          </div>

          {/* Interactive Deposit / Withdrawal Drawer */}
          {actionType !== 'NONE' && (
            <div className="bg-white rounded-xl border-2 border-blue-500 p-5 mb-6 shadow-md animate-in fade-in slide-in-from-top-3">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-linkedin-blue" />
                  {actionType === 'DEPOSIT' ? 'Recharger le Portefeuille' : 'Retirer vers Mobile Money'}
                </h4>
                <button onClick={() => setActionType('NONE')} className="text-gray-400 hover:text-gray-600 text-xs font-bold">
                  Annuler
                </button>
              </div>

              {/* Operator Select (including Wave) */}
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                Choisir l'opérateur
              </label>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {[
                  { id: 'WAVE', label: 'Wave', color: 'bg-[#1dc4f3] text-white', icon: '🌊' },
                  { id: 'MTN', label: 'MTN MoMo', color: 'bg-[#ffcc00] text-black font-bold', icon: '🟡' },
                  { id: 'ORANGE', label: 'Orange', color: 'bg-[#ff7900] text-white font-bold', icon: '🟠' },
                  { id: 'MOOV', label: 'Moov', color: 'bg-[#005ca9] text-white font-bold', icon: '🔵' },
                  { id: 'CARD', label: 'Carte', color: 'bg-gray-800 text-white', icon: '💳' }
                ].map(op => (
                  <button
                    key={op.id}
                    type="button"
                    onClick={() => setSelectedOperator(op.id as any)}
                    className={`py-2 px-1 rounded-lg border text-center transition-all flex flex-col items-center gap-1 ${
                      selectedOperator === op.id
                        ? 'border-blue-600 ring-2 ring-blue-500/30 bg-blue-50/50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="text-sm">{op.icon}</span>
                    <span className="text-[10px] font-bold truncate max-w-full text-gray-800">{op.label}</span>
                  </button>
                ))}
              </div>

              {/* Amount Presets & Custom */}
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                Montant (CFA)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {['10000', '25000', '50000', '100000'].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmountInput(val)}
                    className={`py-1.5 text-xs rounded-md border font-semibold transition-colors ${
                      amountInput === val
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {parseInt(val).toLocaleString('fr-FR')}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={amountInput}
                onChange={e => setAmountInput(e.target.value)}
                placeholder="Montant libre"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-linkedin-blue focus:outline-none mb-3 font-semibold"
              />

              {/* Phone Input */}
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                Numéro Mobile Money
              </label>
              <input
                type="text"
                value={phoneInput}
                onChange={e => setPhoneInput(e.target.value)}
                placeholder="+229 97 00 12 34 ou +225 07..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-linkedin-blue focus:outline-none mb-4"
              />

              {/* Submit Action */}
              <button
                type="button"
                onClick={handleExecuteTransaction}
                disabled={isProcessing}
                className="w-full py-2.5 bg-linkedin-blue hover:bg-blue-700 text-white rounded-lg font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Validation USSD / Mobile Money en cours...
                  </>
                ) : (
                  <>
                    <span>Confirmer le {actionType === 'DEPOSIT' ? 'Dépôt' : 'Retrait'}</span>
                    <span className="font-mono text-xs opacity-90">({parseInt(amountInput || '0').toLocaleString('fr-FR')} CFA)</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Quick Accounts / Operators overview */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Opérateurs Partenaires UEMOA</h4>
            <div className="flex justify-between items-center gap-2">
              <div className="flex flex-col items-center gap-1 cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-[#1dc4f3] flex items-center justify-center border border-gray-100 group-hover:scale-105 transition-transform shadow-xs text-white font-extrabold text-xs">
                  Wave
                </div>
                <span className="text-[10px] text-gray-600 font-semibold">0% Frais</span>
              </div>
              <div className="flex flex-col items-center gap-1 cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center border border-gray-100 group-hover:scale-105 transition-transform shadow-xs">
                  <span className="font-bold text-[10px] text-black">MTN</span>
                </div>
                <span className="text-[10px] text-gray-600 font-medium">MoMo</span>
              </div>
              <div className="flex flex-col items-center gap-1 cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center border border-gray-100 group-hover:scale-105 transition-transform shadow-xs">
                  <span className="font-bold text-[10px] text-white">ORG</span>
                </div>
                <span className="text-[10px] text-gray-600 font-medium">Orange</span>
              </div>
              <div className="flex flex-col items-center gap-1 cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center border border-gray-100 group-hover:scale-105 transition-transform shadow-xs">
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
                  <Smartphone className="w-3 h-3 text-linkedin-blue" />
                  Paiement Fractionné PaySafe™
                </span>
                <span className="text-[10px] text-green-700 font-bold bg-green-100 px-2 py-0.5 rounded-full">Actif</span>
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
                Prochain prélèvement : <span className="font-bold text-gray-800">125 000 CFA</span> Lundi via Wave / MoMo
              </p>
            </div>
          </div>

          {/* Investment Portfolio Mini */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1">
                <PieChart className="w-4 h-4 text-purple-600" />
                Mes Investissements Fractionnés
              </h4>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-gray-200 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                      className="w-full h-full object-cover"
                      alt="Villa Assinie"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Villa Assinie</p>
                    <p className="text-[10px] text-gray-500">2 Parts (20 000 CFA)</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-green-600">+12%</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-gray-200 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                      className="w-full h-full object-cover"
                      alt="Haie Vive"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Haie Vive Cotonou</p>
                    <p className="text-[10px] text-gray-500">5 Parts (50 000 CFA)</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-green-600">+8.5%</span>
              </div>
            </div>
          </div>

          {/* Transaction History Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <History className="w-4 h-4 text-gray-500" />
              Historique des Transactions
            </h4>
            <div className="space-y-3">
              {transactions.map(tx => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between border-b border-gray-50 pb-2 last:border-0 last:pb-0 hover:bg-gray-50 p-1.5 rounded transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        tx.amount.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-700'
                      }`}
                    >
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
                        {tx.status === 'PENDING' && (
                          <span className="px-1.5 py-0.2 bg-yellow-100 text-yellow-700 text-[9px] font-bold rounded">
                            EN ATTENTE
                          </span>
                        )}
                        {tx.status === 'LATE' && (
                          <span className="px-1.5 py-0.2 bg-red-100 text-red-700 text-[9px] font-bold rounded">
                            RETARD
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-xs font-bold ${
                        tx.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900'
                      }`}
                    >
                      {tx.amount} <span className="text-[10px] text-gray-500">{tx.currency}</span>
                    </p>
                    <p className="text-[10px] text-gray-400 capitalize">
                      {tx.status === 'COMPLETED' ? 'Terminé' : tx.status.toLowerCase()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Passerelle PaySafe active</span>
          </div>
          <span className="text-[10px] text-gray-400 font-mono">Conforme UEMOA • Chiffré TLS 256-bit</span>
        </div>
      </div>
    </div>
  );
};
