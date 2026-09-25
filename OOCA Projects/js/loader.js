/**
 * loader.js
 * Fetches each screen's HTML fragment from /screens/*.html and injects it
 * into the page, then loads app.js (the app logic) once everything is in
 * the DOM.
 *
 * NOTE: because this uses fetch() on local files, the project must be
 * served over http(s) — opening index.html directly via file:// will be
 * blocked by the browser's CORS rules for local files.
 *
 * Quick ways to serve it locally:
 *   npx serve .
 *   python3 -m http.server 8000
 */

const SCREEN_FILES = [
  ['curtains-slot', 'screens/curtains.html'],
  ['screens-slot',  'screens/start.html'],
  ['screens-slot',  'screens/count.html'],
  ['screens-slot',  'screens/breathe.html'],
  ['screens-slot',  'screens/move.html'],
  ['screens-slot',  'screens/focus.html'],
  ['screens-slot',  'screens/preend.html'],
  ['screens-slot',  'screens/ending.html'],
];

async function loadFragment(targetId, url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
  const html = await res.text();
  document.getElementById(targetId).insertAdjacentHTML('beforeend', html);
}

async function loadAllScreens() {
  for (const [targetId, url] of SCREEN_FILES) {
    // sequential so screens stay in their original order
    await loadFragment(targetId, url);
  }
}

async function boot() {
  try {
    await loadAllScreens();
    const script = document.createElement('script');
    script.src = 'js/app.js';
    document.body.appendChild(script);
  } catch (err) {
    console.error('Mooca failed to load:', err);
    document.body.innerHTML = '<p style="font-family:sans-serif;padding:24px">โหลดหน้าไม่สำเร็จ กรุณาเปิดผ่านเซิร์ฟเวอร์ท้องถิ่น (ดู README)</p>';
  }
}

boot();
