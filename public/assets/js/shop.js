(async function(){
	try{
		const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear().toString();
		const res = await fetch('/api/products');
		if (!res.ok) return;
		const data = await res.json();
		const items = data.items || [];
		const featuredEl = document.getElementById('featured');
		const catalogEl = document.getElementById('catalog');
		const card = (p) => `<div class="card">
			<img src="${p.imageUrl}" class="thumb" />
			<div class="title">${p.title}</div>
			<div class="desc">${p.description}</div>
			<div class="row" style="justify-content:space-between;align-items:center">
				<span class="price">$${Number(p.price||0).toFixed(2)}</span>
				<a href="${p.buyUrl}" class="btn btn-primary">Buy</a>
			</div>
		</div>`;
		if (featuredEl){
			featuredEl.innerHTML = `<div class=\"grid\">${items.filter(p=>p.featured).slice(0,8).map(card).join('')}</div>`;
		}
		if (catalogEl){
			catalogEl.innerHTML = `<div class=\"grid\">${items.map(card).join('')}</div>`;
		}
	}catch(e){}
})();
