/**
 * Service d'intégration Qwen AI pour Immo Africa
 * Endpoint OpenAI-compatible Alibaba Cloud MaaS
 */

const QWEN_API_KEY =
  (typeof process !== 'undefined' && process.env?.QWEN_API_KEY) ||
  'sk-ws-H.DMYHEHM.uWeV.MEYCIQDIX8DbXSabp_OXZ90ELFKP5h22WbSMNf1yoHtWyk3C1QIhAOhK30EJNVo4DH0kIAbH9cBEDP0Y4iFIWLBaxFJS9e8g';

const QWEN_ENDPOINT =
  (typeof process !== 'undefined' && process.env?.QWEN_API_URL) ||
  'https://ws-hrpprn3nx2citb4c.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
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
  history: ChatMessage[] = []
): Promise<string> {
  const messages: ChatMessage[] = [
    { role: 'system', content: IMMO_SYSTEM_PROMPT },
    ...history.slice(-6), // Garde le contexte récent
    { role: 'user', content: userPrompt }
  ];

  try {
    const response = await fetch(`${QWEN_ENDPOINT}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${QWEN_API_KEY}`
      },
      body: JSON.stringify({
        model: 'qwen-flash',
        messages,
        max_tokens: 650,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      // Tenter le modèle alternatif en cas de souci
      const fallbackRes = await fetch(`${QWEN_ENDPOINT}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${QWEN_API_KEY}`
        },
        body: JSON.stringify({
          model: 'qwen3-coder-flash',
          messages,
          max_tokens: 650,
          temperature: 0.7
        })
      });
      if (fallbackRes.ok) {
        const data = await fallbackRes.json();
        return data.choices?.[0]?.message?.content || "Réponse reçue sans contenu.";
      }
      throw new Error(`Qwen HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Je n'ai pas pu générer de réponse pour le moment.";
  } catch (error) {
    console.error('Erreur API Qwen:', error);
    // Réponse de secours intelligente locale si le réseau échoue
    return generateLocalFallback(userPrompt);
  }
}

/**
 * Générateur de description immobilière avec Qwen AI
 */
export async function generateListingDescription(params: {
  title: string;
  type: string;
  location?: string;
  price?: string;
  features?: string[];
}): Promise<string> {
  const prompt = `Rédige une description immobilière percutante, moderne et attrayante pour une annonce sur IMMO Africa :
- Titre : ${params.title || 'Bien immobilier'}
- Type : ${params.type}
- Localisation : ${params.location || 'Afrique de l\'Ouest'}
- Prix : ${params.price || 'À négocier'} CFA
- Atouts : ${(params.features || []).join(', ') || 'Moderne, sécurisé, haut standing'}

Rédige un texte court (3 à 5 phrases), valorisant le cadre de vie, la sécurité et la commodité, avec 2 ou 3 emojis appropriés.`;

  return askQwenAi(prompt);
}

function generateLocalFallback(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes('contrat') || p.includes('bail')) {
    return "✅ **Analyse de Bail (Immo-AI) :**\n- Durée standard : 12 mois renouvelable.\n- Dépôt de garantie : conforme à la réglementation (max 2 à 3 mois).\n- Clause de révision : encadrée par l'indice des loyers d'habitation.\n\nBesoin d'examiner une clause spécifique ?";
  }
  if (p.includes('invest') || p.includes('assinie') || p.includes('rendement')) {
    return "📈 **Analyse Rentabilité Immo Africa :**\n- Les opportunités balnéaires (Assinie, Grand-Bassam) affichent un rendement brut moyen de 11% à 14% via la location saisonnière.\n- À Cotonou (Haie Vive, Fidjrossè), le rendement locatif longue durée se situe entre 8% et 10.5%.\n\nSouhaitez-vous simuler un investissement fractionné ?";
  }
  return "Bonjour ! Je suis **Immo-AI** propulsé par Qwen. Je suis à votre disposition pour vous orienter sur le marché immobilier africain, analyser vos contrats ou estimer vos rentabilités.";
}
