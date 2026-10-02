
import React from 'react';
import { 
  Building2, 
  Users, 
  Wallet, 
  AlertCircle, 
  TrendingUp, 
  MoreHorizontal, 
  CheckCircle, 
  XCircle,
  Clock,
  Hammer
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Fév', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Avr', revenue: 4500 },
  { name: 'Mai', revenue: 6000 },
  { name: 'Juin', revenue: 5500 },
];

export const LandlordDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 animate-in">
      
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">LocaManager Pro™</h1>
            <p className="text-gray-500 text-sm mt-1">Bon retour, Agence Prestige. Voici votre aperçu.</p>
          </div>
          <button className="bg-linkedin-blue text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Ajouter un Bien
          </button>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wallet className="w-5 h-5 text-linkedin-blue" />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">+12%</span>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase">Revenus Totaux (Juin)</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">5.5M <span className="text-sm font-normal text-gray-500">CFA</span></h3>
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-xs font-bold text-gray-500">2 Vacants</span>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase">Taux d'Occupation</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">92%</h3>
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">Action req.</span>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase">Loyers en Retard</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">3 <span className="text-sm font-normal text-gray-500">Locataires</span></h3>
          </div>

           <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Hammer className="w-5 h-5 text-gray-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase">Maintenance</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">5 <span className="text-sm font-normal text-gray-500">En cours</span></h3>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Section: Property List & Tenant Status */}
        <div className="lg:col-span-2 flex flex-col gap-6">
           
           {/* Tenant Payment Status Table */}
           <div className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                 <h3 className="font-bold text-gray-900">Statut des Paiements</h3>
                 <button className="text-sm text-linkedin-blue font-semibold hover:underline">Voir Tout</button>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                       <tr>
                          <th className="px-6 py-3">Locataire / Bien</th>
                          <th className="px-6 py-3">Échéance</th>
                          <th className="px-6 py-3">Montant</th>
                          <th className="px-6 py-3">Statut</th>
                          <th className="px-6 py-3">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                       <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200">
                                   <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="w-full h-full rounded-full object-cover"/>
                                </div>
                                <div>
                                   <p className="font-bold text-gray-900">Caleb N.</p>
                                   <p className="text-xs text-gray-500">Appt 4B, Haie Vive</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">25 Oct 2025</td>
                          <td className="px-6 py-4 font-semibold">125 000 CFA</td>
                          <td className="px-6 py-4">
                             <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3" /> Payé
                             </span>
                          </td>
                          <td className="px-6 py-4">
                             <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5" /></button>
                          </td>
                       </tr>
                       
                       <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200">
                                   <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="w-full h-full rounded-full object-cover"/>
                                </div>
                                <div>
                                   <p className="font-bold text-gray-900">Sarah M.</p>
                                   <p className="text-xs text-gray-500">Villa 2, Cocody</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">20 Oct 2025</td>
                          <td className="px-6 py-4 font-semibold">350 000 CFA</td>
                          <td className="px-6 py-4">
                             <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                <XCircle className="w-3 h-3" /> Retard (2j)
                             </span>
                          </td>
                          <td className="px-6 py-4">
                             <button className="text-linkedin-blue text-xs font-bold hover:underline">Rappeler</button>
                          </td>
                       </tr>

                       <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200">
                                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="w-full h-full rounded-full object-cover"/>
                                </div>
                                <div>
                                   <p className="font-bold text-gray-900">John D.</p>
                                   <p className="text-xs text-gray-500">Studio 12, Calavi</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">28 Oct 2025</td>
                          <td className="px-6 py-4 font-semibold">45 000 CFA</td>
                          <td className="px-6 py-4">
                             <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                <Clock className="w-3 h-3" /> À venir
                             </span>
                          </td>
                          <td className="px-6 py-4">
                             <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5" /></button>
                          </td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </div>

           {/* Maintenance Requests */}
           <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-gray-900">Demandes de Maintenance</h3>
                 <span className="text-xs text-gray-500">Par Priorité</span>
              </div>
              <div className="space-y-4">
                 
                 <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="bg-red-100 p-2 rounded text-red-600 mt-1">
                       <AlertCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-grow">
                       <div className="flex justify-between">
                          <h4 className="font-bold text-sm text-gray-900">Fuite d'eau - Salle de bain</h4>
                          <span className="text-xs text-gray-500">il y a 2h</span>
                       </div>
                       <p className="text-xs text-gray-600 mt-1">Appt 4B • Résidence Haie Vive</p>
                       <div className="mt-2 flex gap-2">
                          <button className="text-xs bg-linkedin-blue text-white px-3 py-1 rounded hover:bg-blue-700">Assigner Artisan</button>
                          <button className="text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-50">Ignorer</button>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="bg-blue-100 p-2 rounded text-linkedin-blue mt-1">
                       <Hammer className="w-5 h-5" />
                    </div>
                    <div className="flex-grow">
                       <div className="flex justify-between">
                          <h4 className="font-bold text-sm text-gray-900">Maintenance Clim</h4>
                          <span className="text-xs text-gray-500">Hier</span>
                       </div>
                       <p className="text-xs text-gray-600 mt-1">Villa 2 • Cocody</p>
                       <div className="mt-2 flex gap-2">
                          <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                             <CheckCircle className="w-3 h-3" /> Prévu pour Demain
                          </span>
                       </div>
                    </div>
                 </div>

              </div>
           </div>

        </div>

        {/* Sidebar for Dashboard */}
        <div className="lg:col-span-1 flex flex-col gap-6">
           
           {/* Revenue Chart Widget */}
           <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-4 h-[300px]">
              <h3 className="font-bold text-gray-900 mb-4">Évolution Revenus</h3>
              <div className="h-[230px] w-full text-xs">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0a66c2" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0a66c2" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="revenue" stroke="#0a66c2" fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* AI Assistant Promo */}
           <div className="bg-gradient-to-br from-[#1b2a4e] to-[#2c3e50] rounded-lg shadow-sm p-5 text-white">
              <h3 className="font-bold text-lg mb-2">Manager IMMO-AI™</h3>
              <p className="text-sm text-gray-300 mb-4">L'analyse de votre portefeuille est prête. 3 opportunités d'augmentation de loyer détectées.</p>
              <button className="w-full bg-white text-[#1b2a4e] font-bold py-2 rounded text-sm hover:bg-gray-100 transition-colors">
                 Voir Rapport IA
              </button>
           </div>

        </div>

      </div>
    </div>
  );
};
