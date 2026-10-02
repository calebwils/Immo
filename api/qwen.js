export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey =
    process.env.VITE_QWEN_API_KEY ||
    process.env.QWEN_API_KEY ||
    'sk-ws-H.DMYHEHM.uWeV.MEYCIQDIX8DbXSabp_OXZ90ELFKP5h22WbSMNf1yoHtWyk3C1QIhAOhK30EJNVo4DH0kIAbH9cBEDP0Y4iFIWLBaxFJS9e8g';

  const endpoint =
    'https://ws-hrpprn3nx2citb4c.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1/chat/completions';

  try {
    const qwenRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: typeof req.body === 'string' ? req.body : JSON.stringify(req.body)
    });

    const data = await qwenRes.json();
    res.status(qwenRes.status).json(data);
  } catch (error) {
    console.error('Qwen proxy error:', error);
    res.status(500).json({ error: error.message });
  }
}
