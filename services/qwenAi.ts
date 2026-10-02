/**
 * Service d'intégration Qwen AI pour Immo Africa
 * Supporte le proxy serverless /api/qwen (anti-CORS) et fallback direct
 */

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

const IMMO_SYSTEM_PROMPT = `Tu es Immo-AI™, l'intelligence artificielle experte en immobilier pour l'Afrique de l'Ouest (Bénin, Côte d'Ivoire, Sénégal, Togo, Cameroun...) intégrée à la plateforme IMMO.
Tes rôles clés :
1. Analyse juridique de baux d'habitation (droit OHADA, conformité aux lois numériques du Bénin et de l'UEMOA, détection des clauses abusives, conseils de préavis).
2. Estimation et négociation de loyers dans les quartiers réels (ex: Cotonou: Haie Vive, Cadjehoun, Fidjrossè, Ganhi; Abidjan: Cocody, Marcory, Plateau, Riviera, Assinie; Dakar: Almadies, Ngor, Plateau).
3. Conseil en investissement immobilier fractionné, calculs de rentabilité brute/nette et dividendes Mobile Money (FCFA).
4. Accompagnement des locataires (RentCV, solvabilité) et des bailleurs (gestion des impayés, maintenance artisans).

Consignes :
- Réponds toujours en français de manière claire, concise, professionnelle, chaleureuse et structurée (tirets, emojis pertinents).
- Utilise la devise FCFA (CFA).
- Ne sois pas trop verbeux : 2 à 4 paragraphes courts ou listes à puces percutantes suffisent généralement.`;

export async function askQwenAi(
  userPrompt: string,
  history: ChatMessage[] = [],
  context?: { isListingDescription?: boolean; params?: ListingParams }
): Promise<string> {
  const isListing = context?.isListingDescription;
  
  const systemPrompt = isListing
    ? `Tu es un rédacteur professionnel d'annonces immobilières haut de gamme en Afrique de l'Ouest (Bénin, Côte d'Ivoire, Sénégal...). 
Règles strictes :
- Rédige DIRECTEMENT la description de l'annonce sans dire 'Bonjour', ni 'Je suis une IA', ni 'Voici une annonce'.
- Sois vendeur, attractif, fluide et réaliste.
- Mentionne les atouts de l'emplacement, les commodités et la sécurité.
- Termine par les modalités de visite et de paiement PaySafe / Wave / Mobile Money.`
    : IMMO_SYSTEM_PROMPT;

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
        return content.trim();
      }
    }
  } catch (proxyErr) {
    console.warn('Proxy /api/qwen indisponible, tentative directe...', proxyErr);
  }

  // 2. Tenter l'appel direct au cas où
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
        return content.trim();
      }
    }
  } catch (directErr) {
    console.warn('Appel direct Qwen non concluant:', directErr);
  }

  // 3. Fallback contextuel riche et spécifique
  if (isListing && context?.params) {
    return generateTailoredListingDescription(context.params);
  }

  return generateGeneralFallback(userPrompt);
}

/**
 * Générateur de description immobilière avec Qwen AI
 */
export async function generateListingDescription(params: ListingParams): Promise<string> {
  const prompt = `Rédige une description commerciale attractive pour cette annonce immobilière :
- Titre : ${params.title || 'Appartement Haut Standing'}
- Catégorie : ${params.type === 'RENTAL' ? 'Location d\'habitation' : params.type === 'INVESTMENT' ? 'Investissement fractionné' : 'Service artisan'}
- Localisation : ${params.location || 'Haie Vive, Cotonou'}
- Loyer / Prix : ${params.price || '250 000'} CFA
- Commodités incluses : ${(params.features || []).join(', ') || 'Climatisation, WiFi, Sécurité 24/7, Groupe Électrogène'}

Rédige un texte fluide et élégant de 3 à 5 phrases, mettant en avant la luminosité, la sécurité, l'accès facile et la compatibilité PaySafe / Wave / Mobile Money.`;

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
    return `🚀 Opportunité d'investissement à ${loc} : ${title}.\n\nCe projet à fort potentiel locatif offre un rendement annuel prévisionnel attractif, géré par une équipe professionnelle locale. Commodités prévues : ${amenitiesStr}.\n\nTicket d'entrée dès ${price} avec distribution trimestrielle des dividendes directement sur votre portefeuille Wave ou Mobile Money. Propriété notariée et certifiée conforme.`;
  }

  return `🏡 Découvrez ce magnifique bien situé au cœur de ${loc} : ${title}.\n\nOffrant un cadre de vie calme, sécurisé et lumineux, cet espace bénéficie de prestations haut de gamme comprenant notamment : ${amenitiesStr}. Proche de toutes commodités, des commerces et des principaux axes routiers.\n\nLoyer mensuel : ${price} avec facilité de règlement via Wave & Mobile Money sous protection PaySafe™. Visites organisées immédiatement sur présentation de votre dossier certifié RentCV.`;
}

function generateGeneralFallback(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes('contrat') || p.includes('bail')) {
    return "✅ **Analyse de Bail (Immo-AI) :**\n- Durée standard : 12 mois renouvelable.\n- Dépôt de garantie : conforme à la réglementation (max 2 à 3 mois).\n- Clause de révision : encadrée par l'indice des loyers d'habitation.\n\nBesoin d'examiner une clause spécifique ?";
  }
  if (p.includes('invest') || p.includes('assinie') || p.includes('rendement')) {
    return "📈 **Analyse Rentabilité Immo Africa :**\n- Les opportunités balnéaires (Assinie, Grand-Bassam) affichent un rendement brut moyen de 11% à 14% via la location saisonnière.\n- À Cotonou (Haie Vive, Fidjrossè), le rendement locatif longue durée se situe entre 8% et 10.5%.\n\nSouhaitez-vous simuler un investissement fractionné ?";
  }
  return "Bonjour ! Je suis **Immo-AI** propulsé par Qwen. Je suis à votre disposition pour vous orienter sur le marché immobilier africain, analyser vos contrats ou estimer vos rentabilités.";
}
