(async function(){
	try{
		const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear().toString();
		const res = await fetch('/api/rules');
		if (!res.ok) return;
		const data = await res.json();
		const markdown = data.markdown || '';
		const rulesEl = document.getElementById('rules');
		if (rulesEl) rulesEl.innerHTML = `<div class=\"card\"><div class=\"content\">${String(markdown).replace(/</g,'&lt;')}</div></div>`;
	}catch(e){}
})();
