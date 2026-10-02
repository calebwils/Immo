
import React, { useState } from 'react';
import { X, FileText, PenTool, CheckCircle, ShieldCheck, Download, ExternalLink, Fingerprint } from 'lucide-react';

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContractModal: React.FC<ContractModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'VIEW' | 'SIGNING' | 'SIGNED'>('VIEW');
  const [signature, setSignature] = useState('');

  const handleSign = () => {
    // Simulate processing
    setTimeout(() => setStep('SIGNED'), 1500);
    setStep('SIGNING');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-[#f3f2ef] w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col h-[85vh]">
        
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-3">
             <div className="bg-blue-600 p-2 rounded text-white">
                <FileText className="w-5 h-5" />
             </div>
             <div>
                <h2 className="text-lg font-bold text-gray-900 leading-none">Bail d'Habitation Numérique</h2>
                <p className="text-xs text-gray-500 mt-1">Réf: #LEASE-2025-8821 • Haie Vive, Cotonou</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
           
           {/* Document Viewer (Left/Top) */}
           <div className="flex-grow bg-gray-50 p-6 overflow-y-auto border-r border-gray-200">
              <div className="bg-white shadow-sm border border-gray-200 min-h-[800px] p-8 max-w-2xl mx-auto text-sm text-gray-800 leading-relaxed font-serif relative">
                 {/* Watermark if signed */}
                 {step === 'SIGNED' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                       <div className="border-8 border-green-600 rounded-full w-96 h-96 flex items-center justify-center transform -rotate-12">
                          <span className="text-6xl font-black text-green-600 uppercase">Signé & Certifié</span>
                       </div>
                    </div>
                 )}

                 <h1 className="text-2xl font-bold text-center mb-8 uppercase tracking-widest border-b-2 border-black pb-4">Contrat de Bail</h1>
                 
                 <div className="space-y-6">
                    <section>
                       <h3 className="font-bold uppercase text-xs text-gray-500 mb-2">1. Les Parties</h3>
                       <p>Entre les soussignés :</p>
                       <p><strong>Le Bailleur :</strong> Agence Prestige Immobilier, représentée par M. Kouamé, sise à Cotonou.</p>
                       <p><strong>Le Locataire :</strong> M. Caleb N., Ingénieur, titulaire du RentCV #IMMO-8291.</p>
                    </section>

                    <section>
                       <h3 className="font-bold uppercase text-xs text-gray-500 mb-2">2. Objet du Contrat</h3>
                       <p>Le présent contrat a pour objet la location d'un appartement de type F3 situé au 2ème étage de la Résidence "Les Cocotiers", Haie Vive, Cotonou.</p>
                    </section>

                    <section>
                       <h3 className="font-bold uppercase text-xs text-gray-500 mb-2">3. Durée et Loyer</h3>
                       <p>Le bail est consenti pour une durée de <strong>12 mois</strong> renouvelable.</p>
                       <p>Le loyer mensuel est fixé à <strong>250 000 FCFA</strong>, payable via PaySafe™ avant le 5 de chaque mois.</p>
                    </section>

                    <section>
                       <h3 className="font-bold uppercase text-xs text-gray-500 mb-2">4. Clause PaySafe & Garantie</h3>
                       <p className="bg-yellow-50 p-2 border border-yellow-100 rounded text-yellow-900 text-xs">
                          <ShieldCheck className="w-3 h-3 inline mr-1" />
                          Le locataire accepte que les paiements soient tracés sur la Blockchain Immo. En cas de défaut, la garantie PaySafe™ s'active automatiquement pour le bailleur.
                       </p>
                    </section>
                    
                    <div className="mt-12 pt-8 border-t border-gray-300 flex justify-between">
                        <div className="w-1/3">
                            <p className="mb-8 font-bold">Le Bailleur</p>
                            <div className="h-12 border-b border-black flex items-end text-xs text-gray-500 italic">Signé électroniquement</div>
                        </div>
                        <div className="w-1/3">
                            <p className="mb-8 font-bold">Le Locataire</p>
                            {step === 'SIGNED' ? (
                                <div className="h-12 flex items-end">
                                   <img src={`https://api.dicebear.com/7.x/initials/svg?seed=Caleb`} alt="Signature" className="h-10 opacity-70 transform -rotate-6" />
                                   <span className="text-[10px] text-green-600 font-mono ml-2 block border border-green-600 px-1 rounded">Vérifié</span>
                                </div>
                            ) : (
                                <div className="h-12 border-b border-black border-dashed bg-yellow-50 text-xs flex items-center justify-center text-yellow-700 font-bold">
                                   En attente de signature
                                </div>
                            )}
                        </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Sidebar Action Panel (Right/Bottom) */}
           <div className="w-full md:w-80 bg-white border-l border-gray-200 flex flex-col">
              
              <div className="p-6 flex-grow">
                 {step === 'VIEW' && (
                    <div className="space-y-6">
                       <div className="text-center">
                          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                             <PenTool className="w-8 h-8" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Signature Requise</h3>
                          <p className="text-sm text-gray-500 mt-2">Veuillez relire le contrat avant de valider votre identité numérique.</p>
                       </div>

                       <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
                          <ul className="space-y-3">
                             <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Identité Vérifiée (RentCV)</span>
                             </li>
                             <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Solvabilité Confirmée</span>
                             </li>
                             <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Dépôt de Garantie : Reçu</span>
                             </li>
                          </ul>
                       </div>

                       <button 
                         onClick={handleSign}
                         className="w-full py-3 bg-linkedin-blue text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-transform active:scale-95 flex items-center justify-center gap-2"
                       >
                          <Fingerprint className="w-5 h-5" />
                          Signer le Contrat
                       </button>
                    </div>
                 )}

                 {step === 'SIGNING' && (
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                       <div className="w-12 h-12 border-4 border-blue-200 border-t-linkedin-blue rounded-full animate-spin"></div>
                       <p className="text-sm font-semibold text-gray-600">Inscription sur la Blockchain...</p>
                       <p className="text-xs text-gray-400">Hashage du document en cours</p>
                    </div>
                 )}

                 {step === 'SIGNED' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                       <div className="text-center">
                          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                             <ShieldCheck className="w-8 h-8" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">Félicitations !</h3>
                          <p className="text-sm text-gray-500 mt-2">Votre bail est officiellement signé et sécurisé.</p>
                       </div>

                       <div className="bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-xs break-all relative group cursor-pointer hover:bg-gray-800 transition-colors">
                          <p className="text-gray-500 uppercase text-[10px] mb-1 font-sans font-bold">Transaction Hash (Polygon)</p>
                          0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                          <ExternalLink className="absolute top-2 right-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                       </div>

                       <div className="space-y-2">
                           <button className="w-full py-2 border border-gray-300 rounded-full font-semibold text-sm hover:bg-gray-50 flex items-center justify-center gap-2">
                              <Download className="w-4 h-4" /> Télécharger PDF
                           </button>
                           <button onClick={onClose} className="w-full py-2 bg-gray-100 text-gray-700 rounded-full font-semibold text-sm hover:bg-gray-200">
                              Fermer
                           </button>
                       </div>
                    </div>
                 )}
              </div>

              {/* Footer Legal */}
              <div className="p-4 bg-gray-50 border-t border-gray-200 text-[10px] text-gray-400 text-center">
                 Ce document a valeur légale selon la loi sur le numérique en vigueur au Bénin et dans la zone UEMOA.
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};
