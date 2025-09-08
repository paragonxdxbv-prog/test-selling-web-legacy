(async function(){
	try{
		const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear().toString();
		const res = await fetch('/api/products');
		if (!res.ok) return;
		const data = await res.json();
		const items = (data.items||[]).filter(p=>p.featured).slice(0,8);
		const featuredEl = document.getElementById('featured');
		if (!featuredEl) return;
		const card = (p) => `<div class=\"card\">\n\t\t<img src=\"${p.imageUrl}\" class=\"thumb\" />\n\t\t<div class=\"title\">${p.title}</div>\n\t\t<div class=\"desc\">${p.description}</div>\n\t\t<div class=\"row\" style=\"justify-content:space-between;align-items:center\">\n\t\t\t<span class=\"price\">$${Number(p.price||0).toFixed(2)}</span>\n\t\t\t<a href=\"${p.buyUrl}\" class=\"btn btn-primary\">Buy</a>\n\t\t</div>\n\t</div>`;
		featuredEl.innerHTML = `<div class=\"grid\">${items.map(card).join('')}</div>`;
	}catch(e){}
})();
