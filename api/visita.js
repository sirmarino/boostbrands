/* Instant alert on Cristian's phone (ntfy app) when someone opens the site or taps a contact button.
   The page posts { t, ref, utm, dev, lang } (see the end of index.html); the place comes from Vercel's IP headers
   (city and country only: no IP is kept or sent). NTFY_TOPIC, a Vercel environment variable, is the topic his ntfy
   app is subscribed to; without it, or from another site, the function does nothing. */
const SITE = /^https:\/\/((www\.)?cristian-marino\.com|cristian-marino\.vercel\.app)$/;
const TITLE = { visita: 'Nueva visita a tu web', agenda: 'Alguien tocó «Agenda»', whatsapp: 'Alguien tocó WhatsApp', email: 'Alguien tocó tu email' };
const TAGS = { visita: ['eyes'], agenda: ['fire', 'calendar'], whatsapp: ['fire', 'speech_balloon'], email: ['fire', 'email'] };
const SOURCES = [[/linkedin|lnkd/, 'LinkedIn'], [/google/, 'Google'], [/bing/, 'Bing'], [/instagram/, 'Instagram'],
  [/facebook|^fb\.|messenger/, 'Facebook'], [/whatsapp|wa\.me/, 'WhatsApp'], [/^t\.co$|twitter|^x\.com$/, 'X'],
  [/youtube/, 'YouTube'], [/chatgpt|openai/, 'ChatGPT'], [/claude\.ai/, 'Claude'], [/perplexity/, 'Perplexity'], [/mail/, 'un email']];
const clean = (s, n) => String(s || '').replace(/[^\p{L}\p{N} .,:/_-]/gu, '').trim().slice(0, n);
let windowStart = 0, sent = 0;   // at most 40 alerts per 10 minutes per instance, so nobody can flood the phone

module.exports = async (req, res) => {
  const topic = process.env.NTFY_TOPIC;
  const from = req.headers.origin || String(req.headers.referer || '').split('/').slice(0, 3).join('/');
  if (req.method !== 'POST' || !topic || !SITE.test(from)) return res.status(204).end();
  if (Date.now() - windowStart > 6e5) { windowStart = Date.now(); sent = 0; }
  if (++sent > 40) return res.status(204).end();

  let d = {};
  try { d = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {}); } catch (e) {}
  const t = TITLE[d.t] ? d.t : 'visita';
  const head = k => { try { return decodeURIComponent(req.headers[k] || ''); } catch (e) { return ''; } };
  const cc = head('x-vercel-ip-country');
  let country = cc;
  try { if (cc) country = new Intl.DisplayNames(['es'], { type: 'region' }).of(cc); } catch (e) {}
  const place = [head('x-vercel-ip-city'), country].filter(Boolean).join(', ');
  const ref = clean(d.ref, 80).toLowerCase();
  const source = clean(d.utm, 40) || (ref && ((SOURCES.find(([re]) => re.test(ref)) || [])[1] || ref));
  const message = [place || 'Lugar desconocido', clean(d.dev, 20), source ? `llegó desde ${source}` : 'entró directo',
    d.lang === 'en' ? 'la vio en inglés' : ''].filter(Boolean).join(' · ');

  try {
    await fetch('https://ntfy.sh/', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, title: TITLE[t], message, tags: TAGS[t], priority: t === 'visita' ? 3 : 4, click: 'https://www.cristian-marino.com' }) });
  } catch (e) { console.error('ntfy', e.message); }
  res.status(204).end();
};
