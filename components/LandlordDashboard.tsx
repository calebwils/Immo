import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Wallet, 
  AlertCircle, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Hammer,
  Search,
  Filter,
  ArrowUpRight,
  Download,
  Send,
  FileText,
  ChevronRight,
  Plus,
  ChevronDown,
  Check,
  ShieldCheck,
  Printer,
  RefreshCw,
  SlidersHorizontal,
  Phone,
  MessageSquare,
  X,
  Layers,
  ChevronLeft,
  Sparkles,
  Calendar,
  DollarSign,
  AlertTriangle,
  Building,
  KeyRound,
  FileCheck2,
  ExternalLink,
  Wrench
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LandlordDashboardProps {
  onOpenCreateListing?: () => void;
  onOpenContract?: () => void;
  onOpenWallet?: () => void;
  onSwitchToTenant?: () => void;
}

type TabType = 'overview' | 'properties' | 'tenants' | 'payments' | 'maintenance' | 'alerts';

interface PaymentItem {
  id: string;
  tenantName: string;
  property: string;
  city: string;
  dueDate: string;
  amount: number;
  status: 'PAID' | 'OVERDUE' | 'PENDING';
  daysOverdue?: number;
  phone: string;
  paymentMethod: 'Wave' | 'MTN MoMo' | 'Moov Money' | 'Virement BOA';
  avatar: string;
}

interface MaintenanceTicket {
  id: string;
  title: string;
  property: string;
  tenant: string;
  urgency: 'HIGH' | 'MEDIUM' | 'LOW';
  createdAt: string;
  costEstimate: number;
  artisan: string;
  status: 'IN_PROGRESS' | 'SCHEDULED' | 'RESOLVED';
}

const INITIAL_PAYMENTS: PaymentItem[] = [
  {
    id: 'pay-1',
    tenantName: 'Sarah Mensah',
    property: 'Villa 2, Cocody Danga',
    city: 'Abidjan',
    dueDate: '20 Octobre 2025',
    amount: 350000,
    status: 'OVERDUE',
    daysOverdue: 4,
    phone: '+225 07 45 89 12',
    paymentMethod: 'Wave',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'pay-2',
    tenantName: 'Ibrahim Touré',
    property: 'Appt B4, Résidence Marina',
    city: 'Cotonou',
    dueDate: '18 Octobre 2025',
    amount: 125000,
    status: 'OVERDUE',
    daysOverdue: 6,
    phone: '+229 97 45 12 34',
    paymentMethod: 'MTN MoMo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'pay-3',
    tenantName: 'Fatou Diop',
    property: 'Duplex Almadies Sud',
    city: 'Dakar',
    dueDate: '22 Octobre 2025',
    amount: 450000,
    status: 'OVERDUE',
    daysOverdue: 2,
    phone: '+221 77 123 45 67',
    paymentMethod: 'Wave',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'pay-4',
    tenantName: 'Caleb Dossou',
    property: 'Appt 4B, Haie Vive',
    city: 'Cotonou',
    dueDate: '25 Octobre 2025',
    amount: 140000,
    status: 'PAID',
    phone: '+229 96 11 22 33',
    paymentMethod: 'MTN MoMo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'pay-5',
    tenantName: 'Amina Konaté',
    property: 'Studio 12, Calavi IITA',
    city: 'Cotonou',
    dueDate: '28 Octobre 2025',
    amount: 45000,
    status: 'PENDING',
    phone: '+229 61 88 99 00',
    paymentMethod: 'Moov Money',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'pay-6',
    tenantName: 'Koffi Germain',
    property: 'Appt 3, Les Cocotiers',
    city: 'Cotonou',
    dueDate: '15 Octobre 2025',
    amount: 220000,
    status: 'PAID',
    phone: '+229 95 67 89 01',
    paymentMethod: 'Virement BOA',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'pay-7',
    tenantName: 'Marc-Aurèle S.',
    property: 'Loft Riviera 3',
    city: 'Abidjan',
    dueDate: '05 Octobre 2025',
    amount: 280000,
    status: 'PAID',
    phone: '+225 05 12 34 56',
    paymentMethod: 'Wave',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  }
];

const INITIAL_PROPERTIES = [
  {
    id: 'prop-1',
    title: 'Villa Balinaise 5 Pièces',
    location: 'Cocody Danga, Abidjan',
    type: 'Villa résidentielle',
    rent: 350000,
    status: 'OCCUPIED',
    tenant: 'Sarah Mensah',
    contractEnd: '31 Déc 2026',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prop-2',
    title: 'Appartement Haut Standing F3',
    location: 'Haie Vive, Cotonou',
    type: 'Appartement meublé',
    rent: 140000,
    status: 'OCCUPIED',
    tenant: 'Caleb Dossou',
    contractEnd: '15 Juin 2026',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prop-3',
    title: 'Duplex avec Piscine',
    location: 'Almadies, Dakar',
    type: 'Duplex',
    rent: 450000,
    status: 'OCCUPIED',
    tenant: 'Fatou Diop',
    contractEnd: '01 Nov 2026',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prop-4',
    title: 'Studio Standing Climatiseur',
    location: 'Calavi IITA, Cotonou',
    type: 'Studio moderne',
    rent: 45000,
    status: 'OCCUPIED',
    tenant: 'Amina Konaté',
    contractEnd: '30 Sept 2026',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prop-5',
    title: 'Penthouse Vue Lagune',
    location: 'Plateau Dokui, Abidjan',
    type: 'Attique F4',
    rent: 600000,
    status: 'VACANT',
    tenant: 'Aucun (En commercialisation)',
    contractEnd: '-',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const INITIAL_MAINTENANCE: MaintenanceTicket[] = [
  {
    id: 'm-1',
    title: "Fuite sous vasque principale",
    property: 'Appt B4 • Résidence Marina (Cotonou)',
    tenant: 'Ibrahim Touré',
    urgency: 'HIGH',
    createdAt: 'Il y a 3h',
    costEstimate: 35000,
    artisan: 'Plomberie Express Cotonou',
    status: 'IN_PROGRESS'
  },
  {
    id: 'm-2',
    title: "Dysfonctionnement compresseur split salon",
    property: 'Villa 2 • Cocody Danga (Abidjan)',
    tenant: 'Sarah Mensah',
    urgency: 'MEDIUM',
    createdAt: 'Hier à 14h',
    costEstimate: 45000,
    artisan: 'Ivoire Froid & Élec',
    status: 'SCHEDULED'
  },
  {
    id: 'm-3',
    title: "Remplacement gâche serrure connectée",
    property: 'Duplex Almadies (Dakar)',
    tenant: 'Fatou Diop',
    urgency: 'LOW',
    createdAt: 'Il y a 2 jours',
    costEstimate: 20000,
    artisan: 'Serrurerie Moderne DKR',
    status: 'RESOLVED'
  }
];

const REVENUE_DATA = [
  { name: 'Mai', attendu: 5200, encaisse: 5100 },
  { name: 'Juin', attendu: 5300, encaisse: 5250 },
  { name: 'Juil', attendu: 5400, encaisse: 5300 },
  { name: 'Août', attendu: 5400, encaisse: 5380 },
  { name: 'Sept', attendu: 5500, encaisse: 5420 },
  { name: 'Oct', attendu: 5500, encaisse: 4980 },
];

export const LandlordDashboard: React.FC<LandlordDashboardProps> = ({
  onOpenCreateListing,
  onOpenContract,
  onOpenWallet,
  onSwitchToTenant
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [paymentFilter, setPaymentFilter] = useState<'ALL' | 'OVERDUE' | 'PAID' | 'PENDING'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [payments, setPayments] = useState<PaymentItem[]>(INITIAL_PAYMENTS);
  const [properties] = useState(INITIAL_PROPERTIES);
  const [maintenance, setMaintenance] = useState<MaintenanceTicket[]>(INITIAL_MAINTENANCE);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Modals for deep real-world interactions
  const [whatsappModalData, setWhatsappModalData] = useState<PaymentItem | null>(null);
  const [receiptModalData, setReceiptModalData] = useState<PaymentItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const markPaymentAsPaid = (id: string) => {
    setPayments(prev =>
      prev.map(p => (p.id === id ? { ...p, status: 'PAID' as const, daysOverdue: undefined } : p))
    );
    showToast('Loyer enregistré comme réglé avec succès.');
  };

  const filteredPayments = payments.filter(p => {
    if (paymentFilter !== 'ALL' && p.status !== paymentFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.tenantName.toLowerCase().includes(q) ||
        p.property.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const overdueCount = payments.filter(p => p.status === 'OVERDUE').length;
  const overdueTotal = payments
    .filter(p => p.status === 'OVERDUE')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs sm:text-sm font-medium border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          LEFT SIDEBAR: CONSOLE DE GESTION LOCATIVE (SaaS Architecture)
          ========================================================================= */}
      <aside 
        className={`w-full lg:sticky lg:top-20 shrink-0 transition-all duration-200 ${
          isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
        }`}
      >
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.04)] overflow-hidden">
          {/* Agency Identification Bar */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                P
              </div>
              {!isSidebarCollapsed && (
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-bold text-slate-900 text-xs sm:text-sm truncate">Prestige Gestion</h2>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium truncate">Agrément #BJ-2021-042</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden lg:flex p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              title={isSidebarCollapsed ? 'Déplier la barre' : 'Réduire la barre'}
            >
              {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links Grouped Semantically */}
          <div className="p-3 space-y-6 text-xs">
            {/* Group 1: Pilotage */}
            <div>
              {!isSidebarCollapsed && (
                <div className="px-2.5 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Pilotage
                </div>
              )}
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-all font-semibold ${
                    activeTab === 'overview'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  title="Vue d'ensemble"
                >
                  <Layers className="w-4 h-4 shrink-0" />
                  {!isSidebarCollapsed && <span>Vue d'ensemble</span>}
                </button>

                <button
                  onClick={() => setActiveTab('alerts')}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl transition-all font-semibold ${
                    activeTab === 'alerts'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  title="Alertes & Échéances"
                >
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
                    {!isSidebarCollapsed && <span>Alertes & Retards</span>}
                  </div>
                  {!isSidebarCollapsed && overdueCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                      {overdueCount}
                    </span>
                  )}
                </button>
              </nav>
            </div>

            {/* Group 2: Gestion Patrimoniale */}
            <div>
              {!isSidebarCollapsed && (
                <div className="px-2.5 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Parc & Locataires
                </div>
              )}
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('properties')}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl transition-all font-semibold ${
                    activeTab === 'properties'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  title="Biens & Lots"
                >
                  <div className="flex items-center gap-2.5">
                    <Building className="w-4 h-4 shrink-0" />
                    {!isSidebarCollapsed && <span>Biens & Lots</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="text-[10px] font-medium text-slate-400">14</span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('tenants')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-all font-semibold ${
                    activeTab === 'tenants'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  title="Locataires & Baux"
                >
                  <Users className="w-4 h-4 shrink-0" />
                  {!isSidebarCollapsed && <span>Locataires & Baux</span>}
                </button>
              </nav>
            </div>

            {/* Group 3: Finances */}
            <div>
              {!isSidebarCollapsed && (
                <div className="px-2.5 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Comptabilité
                </div>
              )}
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl transition-all font-semibold ${
                    activeTab === 'payments'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  title="Loyers & Échéances"
                >
                  <div className="flex items-center gap-2.5">
                    <Wallet className="w-4 h-4 shrink-0" />
                    {!isSidebarCollapsed && <span>Loyers & Quittances</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                      Octobre
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('maintenance')}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl transition-all font-semibold ${
                    activeTab === 'maintenance'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  title="Incidents & Travaux"
                >
                  <div className="flex items-center gap-2.5">
                    <Wrench className="w-4 h-4 shrink-0" />
                    {!isSidebarCollapsed && <span>Incidents & Travaux</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                      {maintenance.filter(m => m.status !== 'RESOLVED').length}
                    </span>
                  )}
                </button>
              </nav>
            </div>
          </div>

          {/* Bottom Card / Synchronisation */}
          {!isSidebarCollapsed && (
            <div className="p-3 bg-slate-50/80 border-t border-slate-100 m-2 rounded-xl text-left">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Passerelle MoMo / Wave
                </span>
                <span className="text-[9px] font-mono text-slate-400">En direct</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Rapprochement automatique des versements 24/7.
              </p>
            </div>
          )}

          {/* Quick exit to Tenant View */}
          <div className="p-3 border-t border-slate-100">
            <button
              onClick={onSwitchToTenant}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors border border-slate-200"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              {!isSidebarCollapsed && <span>Quitter vers le Feed public</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          MAIN WORKSPACE CANVAS: EXÉCUTION & PILOTAGE
          ========================================================================= */}
      <main className="flex-1 min-w-0 space-y-6 w-full">
        {/* Workspace Top Header Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.04)] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Espace Bailleur & Gestionnaire
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-medium text-slate-600">Exercice 2025-2026</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
              LocaManager Console™
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Portefeuille géré : 14 lots répartis à Cotonou, Abidjan et Dakar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenContract}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center gap-1.5"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Nouveau Bail OHADA</span>
            </button>

            <button
              onClick={onOpenCreateListing}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-xs flex items-center gap-1.5 active:scale-98"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajouter un Bien</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            KPI CARDS: FINTECH CLEAN DESIGN (AUCUN EFFET D'ARC-EN-CIEL IA)
            ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Card 1: Total Encaissé */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Loyers Encaissés
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-mono">
                  90.5%
                </span>
              </div>
              <div className="text-2xl font-bold font-mono tracking-tight text-slate-900">
                4.98M <span className="text-xs font-normal text-slate-500 font-sans">CFA</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Sur un montant attendu de <strong className="text-slate-700 font-mono">5.50M CFA</strong>
              </p>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-slate-900 h-full rounded-full" style={{ width: '90.5%' }}></div>
            </div>
          </div>

          {/* Card 2: Taux d'Occupation */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Taux d'Occupation
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  13 / 14 Lots
                </span>
              </div>
              <div className="text-2xl font-bold font-mono tracking-tight text-slate-900">
                92.8%
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                1 seul lot vacant (Penthouse Plateau Dokui)
              </p>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: '92.8%' }}></div>
            </div>
          </div>

          {/* Card 3: Impayés & Alertes */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Impayés en Souffrance
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  {overdueCount} dossiers
                </span>
              </div>
              <div className="text-2xl font-bold font-mono tracking-tight text-rose-700">
                {overdueTotal.toLocaleString('fr-FR')} <span className="text-xs font-normal text-slate-500 font-sans">CFA</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Relances WhatsApp automatiques prêtes
              </p>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-rose-500 h-full rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>

          {/* Card 4: Maintenance & Interventions */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Tickets Maintenance
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  3 en cours
                </span>
              </div>
              <div className="text-2xl font-bold font-mono tracking-tight text-slate-900">
                100 000 <span className="text-xs font-normal text-slate-500 font-sans">CFA devis</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                1 urgence plomberie à Cotonou
              </p>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            TAB CONTENT: VUE D'ENSEMBLE OU AUTRES RUBRIQUES DU MENU LATÉRAL
            ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Split: Table des Loyers & Graphique des Revenus */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              {/* Left Column: Payments Table (8 cols on XL) */}
              <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.04)] overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Suivi des Encaissements & Loyers
                    </h3>
                    <p className="text-xs text-slate-500">
                      Échéances du mois d'Octobre 2025
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    <button
                      onClick={() => setPaymentFilter('ALL')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                        paymentFilter === 'ALL'
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Tous ({payments.length})
                    </button>
                    <button
                      onClick={() => setPaymentFilter('OVERDUE')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                        paymentFilter === 'OVERDUE'
                          ? 'bg-rose-700 text-white'
                          : 'text-rose-700 bg-rose-50 hover:bg-rose-100'
                      }`}
                    >
                      En retard ({overdueCount})
                    </button>
                    <button
                      onClick={() => setPaymentFilter('PAID')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                        paymentFilter === 'PAID'
                          ? 'bg-emerald-700 text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Payés
                    </button>
                  </div>
                </div>

                {/* Table Component */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50/75 text-slate-500 font-semibold border-b border-slate-100">
                      <tr>
                        <th className="px-4 sm:px-5 py-3">Locataire & Lot</th>
                        <th className="px-4 py-3">Échéance</th>
                        <th className="px-4 py-3">Montant & Moyen</th>
                        <th className="px-4 py-3">Statut</th>
                        <th className="px-4 sm:px-5 py-3 text-right">Actions Métier</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredPayments.map(item => (
                        <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-4 sm:px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.avatar}
                                alt={item.tenantName}
                                className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200"
                              />
                              <div className="min-w-0">
                                <div className="font-bold text-slate-900 truncate">
                                  {item.tenantName}
                                </div>
                                <div className="text-[11px] text-slate-500 truncate">
                                  {item.property} • <span className="font-medium">{item.city}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <div className="font-medium text-slate-700">{item.dueDate}</div>
                            {item.daysOverdue && (
                              <div className="text-[10px] text-rose-600 font-semibold mt-0.5">
                                +{item.daysOverdue} jours de retard
                              </div>
                            )}
                          </td>

                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <div className="font-mono font-bold text-slate-900">
                              {item.amount.toLocaleString('fr-FR')} CFA
                            </div>
                            <span className="inline-block mt-0.5 text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                              {item.paymentMethod}
                            </span>
                          </td>

                          <td className="px-4 py-3.5 whitespace-nowrap">
                            {item.status === 'PAID' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                <CheckCircle2 className="w-3 h-3" /> Réglé
                              </span>
                            )}
                            {item.status === 'OVERDUE' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
                                <Clock className="w-3 h-3" /> En retard
                              </span>
                            )}
                            {item.status === 'PENDING' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
                                <Clock className="w-3 h-3" /> À échoir
                              </span>
                            )}
                          </td>

                          <td className="px-4 sm:px-5 py-3.5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {item.status === 'OVERDUE' && (
                                <button
                                  onClick={() => setWhatsappModalData(item)}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1 transition-all shadow-2xs"
                                  title="Envoyer un rappel WhatsApp pré-formaté"
                                >
                                  <MessageSquare className="w-3 h-3" />
                                  <span>Relance WhatsApp</span>
                                </button>
                              )}

                              {item.status === 'PAID' ? (
                                <button
                                  onClick={() => setReceiptModalData(item)}
                                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold flex items-center gap-1 transition-all"
                                  title="Générer la Quittance de Loyer officielle"
                                >
                                  <FileText className="w-3 h-3 text-slate-600" />
                                  <span>Quittance</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => markPaymentAsPaid(item.id)}
                                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-all"
                                  title="Enregistrer l'encaissement"
                                >
                                  Encaisser
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: Financial Trajectory Chart & Quick Actions (4 cols on XL) */}
              <div className="xl:col-span-4 space-y-6">
                {/* Clean Revenue Trajectory Chart */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.04)] p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        Évolution des Recouvrements
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Comparatif loyers attendus vs perçus (en k CFA)
                      </p>
                    </div>
                  </div>

                  <div className="h-[210px] w-full text-[11px] font-mono">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorRecouvrement" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0f172a" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#0f172a" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0f172a',
                            borderRadius: '10px',
                            border: 'none',
                            color: '#fff',
                            fontSize: '11px'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="encaisse"
                          name="Encaissé"
                          stroke="#0f172a"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorRecouvrement)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Moyenne trimestrielle</span>
                    <span className="font-bold font-mono text-slate-900">5.34M CFA / mois</span>
                  </div>
                </div>

                {/* Maintenance Quick Feed */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.04)] p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <Wrench className="w-4 h-4 text-slate-600" />
                      Urgences & Maintenance
                    </h3>
                    <button
                      onClick={() => setActiveTab('maintenance')}
                      className="text-xs text-slate-500 hover:text-slate-900 font-semibold"
                    >
                      Voir tout
                    </button>
                  </div>

                  <div className="space-y-3">
                    {maintenance.slice(0, 2).map(ticket => (
                      <div
                        key={ticket.id}
                        className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 text-xs space-y-1.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-slate-900 leading-tight">
                            {ticket.title}
                          </span>
                          <span
                            className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-bold ${
                              ticket.urgency === 'HIGH'
                                ? 'bg-rose-100 text-rose-700'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {ticket.urgency === 'HIGH' ? 'Urgent' : 'Planifié'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{ticket.property}</p>
                        <div className="flex items-center justify-between pt-1 text-[11px]">
                          <span className="text-slate-600 font-medium">
                            Artisan : {ticket.artisan}
                          </span>
                          <span className="font-mono font-bold text-slate-800">
                            {ticket.costEstimate.toLocaleString('fr-FR')} CFA
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BIENS & LOTS (Properties catalog) */}
        {activeTab === 'properties' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.04)] p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Parc Immobilier Sous Gestion</h3>
                <p className="text-xs text-slate-500">14 lots au total • Mandats exclusifs de gestion locative</p>
              </div>
              <button
                onClick={onOpenCreateListing}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau Lot</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {properties.map(p => (
                <div key={p.id} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
                  <div className="h-36 relative bg-slate-100">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    <span className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      p.status === 'OCCUPIED' ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {p.status === 'OCCUPIED' ? 'Loué' : 'Vacant'}
                    </span>
                  </div>
                  <div className="p-3.5 space-y-2 text-xs">
                    <div className="font-bold text-slate-900 truncate">{p.title}</div>
                    <p className="text-[11px] text-slate-500">{p.location}</p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-slate-500">Loyer mensuel :</span>
                      <span className="font-mono font-bold text-slate-900">{p.rent.toLocaleString('fr-FR')} CFA</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-600">
                      <span>Locataire :</span>
                      <span className="font-medium truncate max-w-[140px]">{p.tenant}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LOCATAIRES & BAUX */}
        {activeTab === 'tenants' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.04)] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Fiches Locataires & Solvabilité</h3>
                <p className="text-xs text-slate-500">Historique des ponctualités et garanties de loyers</p>
              </div>
              <button
                onClick={onOpenContract}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau Dossier Locataire</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Locataire</th>
                    <th className="px-4 py-3">Téléphone</th>
                    <th className="px-4 py-3">Bien Occupé</th>
                    <th className="px-4 py-3">Dépôt de Garantie</th>
                    <th className="px-4 py-3">Score Ponctualité</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payments.map(t => (
                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-bold text-slate-900 flex items-center gap-2.5">
                        <img src={t.avatar} className="w-7 h-7 rounded-full object-cover" />
                        <span>{t.tenantName}</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-600">{t.phone}</td>
                      <td className="px-4 py-3 text-slate-700">{t.property}</td>
                      <td className="px-4 py-3 font-mono text-slate-800">
                        {(t.amount * 2).toLocaleString('fr-FR')} CFA
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {t.status === 'PAID' ? '98% (Exemplaire)' : '82% (Relancé)'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setWhatsappModalData(t)}
                          className="text-slate-600 hover:text-slate-900 font-semibold hover:underline"
                        >
                          Écrire
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ALERTES & RETARDS */}
        {activeTab === 'alerts' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.04)] p-5 space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                Actions Requises en Priorité ({overdueCount} Impayés)
              </h3>
              <p className="text-xs text-slate-500">
                Ces locataires ont dépassé la date limite de règlement contractuelle.
              </p>
            </div>

            <div className="space-y-3">
              {payments
                .filter(p => p.status === 'OVERDUE')
                .map(item => (
                  <div
                    key={item.id}
                    className="p-4 bg-rose-50/50 rounded-xl border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{item.tenantName}</div>
                      <p className="text-slate-600 text-[11px] mt-0.5">
                        {item.property} • Échu depuis le <strong>{item.dueDate}</strong> ({item.daysOverdue} jours de retard)
                      </p>
                      <p className="font-mono font-bold text-rose-700 text-sm mt-1">
                        Montant dû : {item.amount.toLocaleString('fr-FR')} CFA
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setWhatsappModalData(item)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Relance WhatsApp</span>
                      </button>
                      <button
                        onClick={() => markPaymentAsPaid(item.id)}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors"
                      >
                        Encaisser
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 5: MAINTENANCE & INCIDENTS */}
        {activeTab === 'maintenance' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.04)] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Incidents & Travaux</h3>
                <p className="text-xs text-slate-500">Gestion des interventions techniques et devis artisans</p>
              </div>
              <button
                onClick={() => showToast('Nouveau ticket de maintenance enregistré.')}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Ouvrir un Ticket</span>
              </button>
            </div>

            <div className="space-y-3">
              {maintenance.map(m => (
                <div
                  key={m.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{m.title}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.urgency === 'HIGH' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {m.urgency === 'HIGH' ? 'Priorité Haute' : 'Normal'}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px]">{m.property} • Signalé par {m.tenant}</p>
                    <p className="text-slate-700 font-medium">Artisan mandaté : <strong>{m.artisan}</strong></p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                    <div className="font-mono font-bold text-slate-900 text-sm">
                      {m.costEstimate.toLocaleString('fr-FR')} CFA
                    </div>
                    <span className="text-[10px] text-slate-500">Devis estimé</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          MODAL 1: RELANCE WHATSAPP FORMELLE (OPÉRATIONNEL TERRAIN)
          ========================================================================= */}
      {whatsappModalData && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <MessageSquare className="w-4 h-4" />
                <span>Rappel de Loyer par WhatsApp</span>
              </div>
              <button
                onClick={() => setWhatsappModalData(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Message courtois et professionnel prêt à être transmis au locataire :
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mt-2 text-xs text-slate-800 font-mono leading-relaxed select-all">
                Bonjour {whatsappModalData.tenantName},<br /><br />
                Sauf erreur de notre part, votre loyer de{' '}
                <strong>{whatsappModalData.amount.toLocaleString('fr-FR')} CFA</strong> pour le logement{' '}
                <strong>{whatsappModalData.property}</strong> est arrivé à échéance le{' '}
                {whatsappModalData.dueDate}.<br /><br />
                Vous pouvez effectuer le règlement sans frais via <strong>Wave</strong> ou{' '}
                <strong>MTN MoMo</strong> sur le compte de l'agence au : <strong>+229 97 12 34 56</strong>.<br /><br />
                Votre quittance vous sera immédiatement transmise.<br />
                Merci de votre confiance,<br />
                <em>Prestige Immobilier Bénin</em>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(
                    `Bonjour ${whatsappModalData.tenantName}, nous vous rappelons votre loyer de ${whatsappModalData.amount.toLocaleString('fr-FR')} CFA pour ${whatsappModalData.property}. Contact Agence: +229 97 12 34 56.`
                  );
                  showToast('Message copié dans le presse-papier.');
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Copier le texte
              </button>
              <button
                onClick={() => {
                  window.open(
                    `https://wa.me/${whatsappModalData.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Bonjour ${whatsappModalData.tenantName}, sauf erreur votre loyer de ${whatsappModalData.amount.toLocaleString('fr-FR')} CFA pour ${whatsappModalData.property} est échu. Merci de régler via Wave ou MoMo au +229 97 12 34 56.`
                    )}`,
                    '_blank'
                  );
                  setWhatsappModalData(null);
                  showToast('Ouverture de WhatsApp Web / App...');
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Envoyer sur WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: QUITTANCE DE LOYER OFFICIELLE CERTIFIÉE
          ========================================================================= */}
      {receiptModalData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Document Conforme OHADA
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                  Quittance de Loyer N° Q-2025-10-088
                </h2>
              </div>
              <button
                onClick={() => setReceiptModalData(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Receipt Body */}
            <div className="border border-slate-200 rounded-xl p-5 space-y-4 text-xs bg-slate-50/50">
              <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                <div>
                  <div className="font-bold text-slate-900">BAILLEUR / GESTIONNAIRE :</div>
                  <div className="text-slate-600 mt-0.5">Prestige Immobilier Bénin SARL</div>
                  <div className="text-slate-500 text-[11px]">Agrément #BJ-2021-042 • Cotonou</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">LOCATAIRE :</div>
                  <div className="text-slate-600 mt-0.5">{receiptModalData.tenantName}</div>
                  <div className="text-slate-500 text-[11px]">{receiptModalData.property}</div>
                </div>
              </div>

              <div className="space-y-1.5 py-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Période d'occupation :</span>
                  <span className="font-medium text-slate-800">Du 01/10/2025 au 31/10/2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Loyer principal :</span>
                  <span className="font-mono text-slate-800">
                    {(receiptModalData.amount * 0.9).toLocaleString('fr-FR')} CFA
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Charges locatives forfaitaires :</span>
                  <span className="font-mono text-slate-800">
                    {(receiptModalData.amount * 0.1).toLocaleString('fr-FR')} CFA
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold">
                  <span className="text-slate-900">TOTAL RÉGLÉ :</span>
                  <span className="font-mono text-emerald-700">
                    {receiptModalData.amount.toLocaleString('fr-FR')} CFA
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-500 leading-normal">
                Je soussigné, représentant du cabinet de gestion, certifie avoir reçu la somme mentionnée
                ci-dessus pour acquit du terme d'Octobre 2025, libérant le locataire de toute dette locative
                pour cette période.
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Signature & Tampon Électronique Certifiés</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Émis le 25/10/2025 à Cotonou
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimer</span>
              </button>
              <button
                onClick={() => {
                  showToast('Quittance officielle téléchargée au format PDF.');
                  setReceiptModalData(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
