import { db } from './firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import type { Product } from './types';

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

async function load() {
	const featuredEl = document.querySelector('#featured');
	const catalogEl = document.querySelector('#catalog');
	if (featuredEl) {
		const qf = query(collection(db, 'products'), where('featured', '==', true), orderBy('updatedAt', 'desc'));
		const snap = await getDocs(qf);
		const products: Product[] = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
		featuredEl.innerHTML = `<div class=\"grid\">${products.map(productCard).join('')}</div>`;
	}
	if (catalogEl) {
		const qc = query(collection(db, 'products'), orderBy('updatedAt', 'desc'));
		const snap = await getDocs(qc);
		const products: Product[] = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
		catalogEl.innerHTML = `<div class=\"grid\">${products.map(productCard).join('')}</div>`;
	}
	const y = document.getElementById('year');
	if (y) y.textContent = new Date().getFullYear().toString();
}

load().catch(() => {});
