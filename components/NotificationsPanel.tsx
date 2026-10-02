
import React, { useState } from 'react';
import { Bell, AlertCircle, FileText, Wallet, CheckCircle, TrendingUp, X } from 'lucide-react';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContract?: () => void;
  onOpenWallet?: () => void;
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose, onOpenContract, onOpenWallet }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'ALL' | 'URGENT' | 'ACTIVITY'>('ALL');

  const notifications = [
    {
      id: 1,
      type: 'URGENT',
      icon: <AlertCircle className="w-5 h-5 text-white" />,
      iconBg: 'bg-red-500',
      title: 'Loyer en attente',
      message: 'Le loyer de Octobre (Haie Vive) arrive à échéance dans 2 jours.',
      time: 'Il y a 2h',
      action: 'Payer Maintenant',
      actionHandler: onOpenWallet,
      isRead: false,
    },
    {
      id: 2,
      type: 'ACTION',
      icon: <FileText className="w-5 h-5 text-white" />,
      iconBg: 'bg-blue-600',
      title: 'Contrat à signer',
      message: 'Agence Prestige a envoyé le bail pour "Résidence Cocotiers".',
      time: 'Il y a 5h',
      action: 'Voir le Contrat',
      actionHandler: onOpenContract,
      isRead: false,
    },
    {
      id: 3,
      type: 'INFO',
      icon: <TrendingUp className="w-5 h-5 text-white" />,
      iconBg: 'bg-green-600',
      title: 'Dividendes Reçus',
      message: 'Vous avez reçu 2 500 CFA de dividendes (Projet Assinie).',
      time: 'Hier',
      isRead: true,
    },
    {
      id: 4,
      type: 'ACTIVITY',
      icon: <CheckCircle className="w-5 h-5 text-white" />,
      iconBg: 'bg-gray-400',
      title: 'Artisan Réservé',
      message: 'Jean-Marc (Plombier) a confirmé le RDV pour demain 14h.',
      time: 'Hier',
      isRead: true,
    },
  ];

  const filteredNotifs = activeTab === 'ALL' 
    ? notifications 
    : activeTab === 'URGENT' 
      ? notifications.filter(n => n.type === 'URGENT' || n.type === 'ACTION')
      : notifications.filter(n => n.type === 'INFO' || n.type === 'ACTIVITY');

  return (
    <div className="absolute top-[52px] right-4 md:right-[20%] w-[380px] bg-white rounded-xl shadow-2xl border border-gray-200 z-[60] animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
         <h3 className="font-bold text-gray-900">Notifications</h3>
         <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('ALL')}
              className={`text-xs font-semibold px-2 py-1 rounded transition-colors ${activeTab === 'ALL' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
               Tout
            </button>
            <button 
              onClick={() => setActiveTab('URGENT')}
              className={`text-xs font-semibold px-2 py-1 rounded transition-colors ${activeTab === 'URGENT' ? 'bg-red-100 text-red-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
               Urgent (2)
            </button>
         </div>
      </div>

      {/* List */}
      <div className="max-h-[400px] overflow-y-auto">
         {filteredNotifs.length === 0 ? (
             <div className="p-8 text-center text-gray-400 text-sm">
                 Aucune notification.
             </div>
         ) : (
             filteredNotifs.map((notif) => (
                <div key={notif.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex gap-3 ${!notif.isRead ? 'bg-blue-50/30' : ''}`}>
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notif.iconBg} shadow-sm`}>
                      {notif.icon}
                   </div>
                   <div className="flex-grow">
                      <div className="flex justify-between items-start">
                         <h4 className={`text-sm ${!notif.isRead ? 'font-bold text-gray-900' : 'font-semibold text-gray-600'}`}>{notif.title}</h4>
                         <span className="text-[10px] text-gray-400">{notif.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{notif.message}</p>
                      
                      {notif.action && (
                         <button 
                           onClick={() => {
                               notif.actionHandler && notif.actionHandler();
                               onClose();
                           }}
                           className="mt-2 text-xs font-bold text-linkedin-blue border border-linkedin-blue px-3 py-1 rounded-full hover:bg-blue-50 transition-colors"
                         >
                            {notif.action}
                         </button>
                      )}
                   </div>
                   {!notif.isRead && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                   )}
                </div>
             ))
         )}
      </div>

      {/* Footer */}
      <div className="p-2 bg-gray-50 text-center border-t border-gray-200">
         <button className="text-xs font-semibold text-gray-500 hover:text-gray-800">
            Marquer tout comme lu
         </button>
      </div>
    </div>
  );
};
