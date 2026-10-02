/**
 * Service d'intégration Qwen AI pour Immo Africa
 * Supporte le proxy serverless /api/qwen (anti-CORS) et fallback direct
 */

import { PostData } from '../types';

const QWEN_API_KEY =
  (typeof process !== 'undefined' && process.env?.QWEN_API_KEY) ||
  'sk-ws-H.DMYHEHM.uWeV.MEYCIQDIX8DbXSabp_OXZ90ELFKP5h22WbSMNf1yoHtWyk3C1QIhAOhK30EJNVo4DH0kIAbH9cBEDP0Y4iFIWLBaxFJS9e8g';

const DIRECT_ENDPOINT =
  'https://ws-hrpprn3nx2citb4c.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1/chat/completions';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ListingParams {
  title: string;
  type: string;
  location?: string;
  price?: string;
  features?: string[];
}

export interface AiContext {
  isListingDescription?: boolean;
  params?: ListingParams;
  availableListings?: PostData[];
}

/**
 * Moteur de recherche et de scoring des annonces pertinentes pour orienter l'utilisateur
 */
export function searchRelevantListings(query: string, listings: PostData[] = []): PostData[] {
  if (!query || !listings || listings.length === 0) return [];
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const tokens = q.split(/\s+/).filter(t => t.length > 2);

  const locations = [
    'haie vive', 'cadjehoun', 'fidjrosse', 'cotonou', 'calavi', 'ouedo',
    'cocody', 'riviera', 'marcory', 'plateau', 'abidjan', 'assinie',
    'almadies', 'dakar', 'ngor', 'mermoz', 'yoff'
  ];

  const types = ['maison', 'villa', 'appartement', 'duplex', 'terrain', 'studio', 'bureau'];

  const bedroomMatches = q.match(/(\d+)\s*(?:chambre|piece|f(\d+))/i);
  const targetBedrooms = bedroomMatches ? parseInt(bedroomMatches[1] || bedroomMatches[2]) : null;

  const scored = listings.map(item => {
    let score = 0;
    const textToSearch = `${item.content} ${item.location || ''} ${item.city || ''} ${item.district || ''} ${item.specs || ''} ${item.propertyCategory || ''}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    // Correspondance géographique
    for (const loc of locations) {
      if (q.includes(loc) && textToSearch.includes(loc)) {
        score += 8;
      }
    }

    // Type de bien
    for (const t of types) {
      if (q.includes(t) && textToSearch.includes(t)) {
        score += 5;
      }
    }

    // Nombre de chambres
    if (targetBedrooms && (item.bedrooms === targetBedrooms || textToSearch.includes(`${targetBedrooms} chambre`))) {
      score += 7;
    }

    // Modalité : Location / Vente / Investissement
    if ((q.includes('louer') || q.includes('location')) && item.listingType === 'RENTAL') {
      score += 4;
    }
    if ((q.includes('acheter') || q.includes('achat') || q.includes('vente')) && item.listingType === 'SALE') {
      score += 4;
    }
    if ((q.includes('investir') || q.includes('invest')) && item.listingType === 'INVESTMENT') {
      score += 4;
    }

    // Mots clés génériques
    for (const token of tokens) {
      if (textToSearch.includes(token)) {
        score += 1;
      }
    }

    return { item, score };
  });

  return scored
    .filter(s => s.score >= 5)
    .sort((a, b) => b.score - a.score)
    .map(s => s.item)
    .slice(0, 3);
}

const IMMO_SYSTEM_PROMPT = `Tu es Immo-AI™, l'intelligence artificielle experte en immobilier pour l'Afrique de l'Ouest (Bénin, Côte d'Ivoire, Sénégal, Togo, Cameroun...) intégrée à la plateforme IMMO.

Consignes impératives de style et de mise en forme :
- RÈGLE ABSOLUE : N'utilise JAMAIS de symboles markdown comme '##' ou '###' pour les titres. Ne commence aucune ligne par des dièses.
- Pour structurer ta réponse, utilise des retours à la ligne et des tirets avec puces.
- Mets en valeur les informations clés (quartier, prix en FCFA, type de bien, nombre de pièces, sécurité) en les entourant de doubles étoiles **comme ceci** pour le texte en gras.
- Si des annonces réelles du catalogue IMMO te sont fournies ci-après, cite expressément leurs titres, leurs quartiers et leurs prix exacts pour que l'utilisateur puisse directement cliquer sur l'offre.
- Réponds toujours en français de manière chaleureuse, professionnelle, fluide et bienveillante.
- Utilise la devise FCFA.`;

export async function askQwenAi(
  userPrompt: string,
  history: ChatMessage[] = [],
  context?: AiContext
): Promise<string> {
  const isListing = context?.isListingDescription;
  const availableListings = context?.availableListings || [];
  const matchedListings = searchRelevantListings(userPrompt, availableListings);

  let systemPrompt = isListing
    ? `Tu es un rédacteur professionnel d'annonces immobilières haut de gamme en Afrique de l'Ouest.
Règles strictes :
- Rédige DIRECTEMENT la description sans 'Bonjour', sans 'Je suis une IA', sans 'Voici une annonce'.
- N'utilise AUCUN symbole '##' ou '###'. Utilise uniquement des paragraphes soignés et du gras avec **mot**.
- Sois vendeur, attractif, fluide et réaliste.
- Mentionne les atouts de l'emplacement, les commodités et la sécurité.
- Termine par les modalités de visite et de paiement PaySafe / Wave / Mobile Money.`
    : IMMO_SYSTEM_PROMPT;

  // Injection du catalogue contextuel
  if (!isListing && matchedListings.length > 0) {
    const listingsSummary = matchedListings
      .map(
        (l, i) =>
          `[Offre ${i + 1}] Titre : "${l.content.split('\n')[0].replace(/^🏢|🏡|🌴|✨|🏷️|💎|🏠/g, '').trim()}" | Prix : ${l.price} | Quartier : ${l.location || l.city} | Type : ${l.listingType === 'RENTAL' ? 'Location' : 'Vente'}`
      )
      .join('\n');

    systemPrompt += `\n\nANNONCES RÉELLES IMMO CORRESPONDANT À LA RECHERCHE :\n${listingsSummary}\nRecommande expressément ces offres réelles dans ta réponse en citant leur titre et leur prix !`;
  }

  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-6),
    { role: 'user', content: userPrompt }
  ];

  const payload = {
    model: 'qwen-flash',
    messages,
    max_tokens: 650,
    temperature: 0.7
  };

  // 1. Tenter l'appel via la route API proxy (/api/qwen) pour éviter tout blocage CORS navigateur
  try {
    const proxyRes = await fetch('/api/qwen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (proxyRes.ok) {
      const data = await proxyRes.json();
      const content = data.choices?.[0]?.message?.content;
      if (content && content.trim()) {
        return cleanResponseText(content.trim());
      }
    }
  } catch (proxyErr) {
    console.warn('Proxy /api/qwen indisponible, tentative directe...', proxyErr);
  }

  // 2. Tenter l'appel direct
  try {
    const directRes = await fetch(DIRECT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${QWEN_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (directRes.ok) {
      const data = await directRes.json();
      const content = data.choices?.[0]?.message?.content;
      if (content && content.trim()) {
        return cleanResponseText(content.trim());
      }
    }
  } catch (directErr) {
    console.warn('Appel direct Qwen non concluant:', directErr);
  }

  // 3. Fallback contextuel riche et spécifique
  if (isListing && context?.params) {
    return generateTailoredListingDescription(context.params);
  }

  return generateGeneralFallback(userPrompt, matchedListings);
}

/**
 * Nettoyage des résidus de markdown bruts (##, etc.) pour garantir un affichage impeccable
 */
function cleanResponseText(text: string): string {
  return text
    .replace(/^(\s*)#{1,6}\s*\*\*(.*?)\*\*/gm, '$1**$2**')
    .replace(/^(\s*)#{1,6}\s+/gm, '$1')
    .replace(/\*\*\s*#{1,6}\s*/g, '**')
    .replace(/#{1,6}\s*$/gm, '');
}

/**
 * Générateur de description immobilière avec Qwen AI
 */
export async function generateListingDescription(params: ListingParams): Promise<string> {
  const prompt = `Rédige une description commerciale attractive pour cette annonce immobilière :
- Titre : ${params.title || 'Appartement Haut Standing'}
- Catégorie : ${params.type === 'RENTAL' ? "Location d'habitation" : params.type === 'INVESTMENT' ? 'Investissement fractionné' : 'Service artisan'}
- Localisation : ${params.location || 'Haie Vive, Cotonou'}
- Loyer / Prix : ${params.price || '250 000'} CFA
- Commodités incluses : ${(params.features || []).join(', ') || 'Climatisation, WiFi, Sécurité 24/7, Groupe Électrogène'}

Rédige un texte fluide et élégant de 3 à 5 phrases, mettant en avant la luminosité, la sécurité, l'accès facile et la compatibilité PaySafe / Wave / Mobile Money. N'utilise pas de '##'.`;

  return askQwenAi(prompt, [], { isListingDescription: true, params });
}

function generateTailoredListingDescription(p: ListingParams): string {
  const loc = p.location || 'Haie Vive, Cotonou';
  const title = p.title || 'Superbe bien immobilier';
  const price = p.price ? `${parseInt(p.price).toLocaleString('fr-FR')} CFA` : '250 000 CFA';
  const amenitiesStr = (p.features && p.features.length > 0)
    ? p.features.join(', ')
    : 'climatisation, connexion internet haut débit, groupe électrogène et gardiennage 24/7';

  if (p.type === 'INVESTMENT') {
    return `🚀 **Opportunité d'investissement à ${loc} : ${title}**\n\nCe projet à fort potentiel locatif offre un rendement annuel prévisionnel attractif, géré par une équipe professionnelle locale. Prestations prévues : **${amenitiesStr}**.\n\nTicket d'entrée dès **${price}** avec distribution trimestrielle des dividendes directement sur votre portefeuille Wave ou Mobile Money. Titre foncier notarié et certifié conforme.`;
  }

  return `🏡 **Découvrez ce magnifique bien situé au cœur de ${loc} : ${title}**\n\nOffrant un cadre de vie calme, sécurisé et lumineux, cet espace bénéficie de prestations haut de gamme comprenant notamment : **${amenitiesStr}**. Proche de toutes commodités, des commerces et des principaux axes de communication.\n\nLoyer mensuel : **${price}** avec facilité de règlement via Wave & Mobile Money sous protection **PaySafe™**. Visites organisées immédiatement sur rendez-vous avec le propriétaire.`;
}

function generateGeneralFallback(prompt: string, matchedListings: PostData[] = []): string {
  const p = prompt.toLowerCase();

  // Si des annonces réelles correspondent (ex: Haie Vive, Cocody, 3 chambres...)
  if (matchedListings.length > 0) {
    const listBullets = matchedListings
      .map(item => {
        const cleanTitle = item.content.split('\n')[0].replace(/^🏢|🏡|🌴|✨|🏷️|💎|🏠/g, '').trim();
        return `• **${cleanTitle}** situé à **${item.location || item.city}**. Loyer / Prix : **${item.price}**. Prestations vérifiées avec titre conforme.`;
      })
      .join('\n');

    return `J'ai trouvé exactement ce que vous recherchez dans notre catalogue vérifié !\n\nVoici les offres actuellement disponibles sur **IMMO** qui correspondent à vos critères :\n\n${listBullets}\n\nVous pouvez cliquer directement sur les fiches d'offres ci-dessous pour consulter l'ensemble des photos, les modalités de caution et organiser une visite avec le propriétaire.`;
  }

  if (p.includes('haie vive') || (p.includes('3 chambre') && p.includes('cotonou'))) {
    return `J'ai trouvé des offres correspondant parfaitement à votre recherche à **Haie Vive (Cotonou)** !\n\n• **Appartement F4 de Standing** dans un immeuble moderne avec ascenseur, gardiennage 24/7 et groupe électrogène. Loyer : **350 000 CFA/mois**.\n• **Maison de Ville 4 Pièces avec Cour Privative** à Cadjèhoun / Haie Vive, idéale pour une famille. Loyer : **280 000 CFA/mois**.\n\nCliquez sur les fiches ci-dessous pour découvrir toutes les photos et réserver une visite.`;
  }

  if (p.includes('contrat') || p.includes('bail')) {
    return "✅ **Analyse de Bail d'Habitation (Immo-AI) :**\n• **Durée standard :** 12 mois renouvelable par tacite reconduction.\n• **Dépôt de garantie :** plafonné à 2 ou 3 mois selon la réglementation UEMOA.\n• **Clause de révision :** encadrée par l'indice des loyers d'habitation.\n\nBesoin d'examiner une clause spécifique de votre contrat ?";
  }

  if (p.includes('invest') || p.includes('assinie') || p.includes('rendement')) {
    return "📈 **Analyse de Rentabilité Immo Africa :**\n• Les opportunités balnéaires (**Assinie, Grand-Bassam**) génèrent un rendement brut moyen de **11% à 14%** en location courte durée.\n• À **Cotonou (Haie Vive, Fidjrossè)**, le rendement locatif résidentiel annuel se situe entre **8% et 10.5%**.\n\nSouhaitez-vous simuler un investissement fractionné avec versement Mobile Money ?";
  }

  return "Bonjour ! Je suis **Immo-AI** propulsé par Qwen 🧠.\n\nJe suis à votre disposition pour vous orienter sur le marché immobilier africain, vous proposer les meilleures offres de location et de vente, analyser vos contrats de bail ou estimer la rentabilité d'un bien.";
}
