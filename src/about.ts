import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

async function loadRules() {
	const rulesEl = document.getElementById('rules');
	if (!rulesEl) return;
	const snap = await getDoc(doc(db, 'settings', 'rules'));
	const markdown = (snap.exists() ? (snap.data() as any).markdown : 'Rules are not available yet.') as string;
	rulesEl.innerHTML = `<div class="card"><div class="content">${markdown.replace(/</g,'&lt;')}</div></div>`;
}

(function init(){
	const y = document.getElementById('year');
	if (y) y.textContent = new Date().getFullYear().toString();
	loadRules().catch(() => {});
})();
