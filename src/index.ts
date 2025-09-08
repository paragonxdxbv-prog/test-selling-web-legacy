import { db } from './firebase';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import type { Product } from './types';

function byId<T extends HTMLElement>(id: string): T {
	return document.getElementById(id) as T;
}

function productCard(p: Product): string {
	return `<div class="card">
		<img src="${p.imageUrl}" alt="${p.title}" class="thumb" />
		<div class="title">${p.title}</div>
		<div class="desc">${p.description}</div>
		<div class="row" style="justify-content:space-between;align-items:center">
			<span class="price">$${p.price.toFixed(2)}</span>
			<a href="${p.buyUrl}" class="btn btn-primary">Buy</a>
		</div>
	</div>`;
}

async function loadFeatured() {
	const featuredEl = document.querySelector('#featured');
	if (!featuredEl) return;
	const q = query(collection(db, 'products'), where('featured', '==', true), orderBy('updatedAt', 'desc'), limit(8));
	const snap = await getDocs(q);
	const products: Product[] = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
	featuredEl.innerHTML = `<div class="grid">${products.map(productCard).join('')}</div>`;
}

(function init() {
	const y = byId<HTMLSpanElement>('year');
	if (y) y.textContent = new Date().getFullYear().toString();
	loadFeatured().catch(() => {});
})();
