import { db } from './firebase';
import { collection, addDoc, setDoc, deleteDoc, doc, getDocs, getDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import type { Product } from './types';

const ADMIN_ID = '3248882548913828704095180';
const ADMIN_PASS = '+2tDk*dm]=mS@3~;[GQ22fffc';

function $(sel: string, root: Document | HTMLElement = document){
	return root.querySelector(sel) as HTMLElement;
}

function toast(message: string){
	alert(message);
}

function renderProductCard(p: Product): string {
	return `<div class="card">
		<img src="${p.imageUrl}" class="thumb" />
		<div class="title">${p.title}</div>
		<div class="desc">${p.description}</div>
		<div class="row" style="justify-content:space-between;align-items:center">
			<span class="price">$${p.price.toFixed(2)}</span>
			<button class="btn" data-edit="${p.id}">Edit</button>
		</div>
	</div>`;
}

async function refreshProducts(){
	const list = $('#productList');
	if (!list) return;
	const snap = await getDocs(collection(db,'products'));
	const items: Product[] = snap.docs.map(d => ({ id: d.id, ...(d.data() as any)}));
	list.innerHTML = items.map(renderProductCard).join('');
	list.querySelectorAll('[data-edit]').forEach(btn => {
		btn.addEventListener('click', () => loadIntoForm((btn as HTMLElement).getAttribute('data-edit')!));
	});
}

async function loadIntoForm(id: string){
	const d = await getDoc(doc(db,'products',id));
	if (!d.exists()) return;
	const p = { id: d.id, ...(d.data() as any) } as Product;
	($('#prodId') as HTMLInputElement).value = p.id;
	($('#prodTitle') as HTMLInputElement).value = p.title;
	($('#prodDesc') as HTMLTextAreaElement).value = p.description;
	($('#prodPrice') as HTMLInputElement).value = String(p.price);
	($('#prodImage') as HTMLInputElement).value = p.imageUrl;
	($('#prodBuyUrl') as HTMLInputElement).value = p.buyUrl;
	($('#prodFeatured') as HTMLInputElement).checked = !!p.featured;
}

async function saveProduct(ev: SubmitEvent){
	ev.preventDefault();
	const id = ($('#prodId') as HTMLInputElement).value.trim();
	const payload: Omit<Product,'id'> = {
		title: ($('#prodTitle') as HTMLInputElement).value.trim(),
		description: ($('#prodDesc') as HTMLTextAreaElement).value.trim(),
		price: parseFloat(($('#prodPrice') as HTMLInputElement).value.trim() || '0'),
		imageUrl: ($('#prodImage') as HTMLInputElement).value.trim(),
		buyUrl: ($('#prodBuyUrl') as HTMLInputElement).value.trim(),
		featured: ($('#prodFeatured') as HTMLInputElement).checked,
		createdAt: Date.now(),
		updatedAt: Date.now(),
	};
	if (id) {
		await setDoc(doc(db,'products',id), payload, { merge: true });
		toast('Updated product');
	} else {
		await addDoc(collection(db,'products'), payload);
		toast('Created product');
	}
	await refreshProducts();
}

async function deleteCurrent(){
	const id = ($('#prodId') as HTMLInputElement).value.trim();
	if (!id) return toast('No product selected');
	await deleteDoc(doc(db,'products',id));
	toast('Deleted');
	($('#productForm') as HTMLFormElement).reset();
	await refreshProducts();
}

async function saveRules(ev: SubmitEvent){
	ev.preventDefault();
	const markdown = ($('#rulesMarkdown') as HTMLTextAreaElement).value;
	await setDoc(doc(db,'settings','rules'), { markdown, updatedAt: Date.now() }, { merge: true });
	toast('Rules saved');
}

function switchTab(tab: 'products'|'rules'){
	$('.tab.active')?.classList.remove('active');
	$(`[data-tab="${tab}"]`)?.classList.add('active');
	$('#tab-products')?.classList.add('hidden');
	$('#tab-rules')?.classList.add('hidden');
	if (tab==='products') $('#tab-products')?.classList.remove('hidden');
	if (tab==='rules') $('#tab-rules')?.classList.remove('hidden');
}

function initTabs(){
	$('[data-tab="products"]').addEventListener('click', () => switchTab('products'));
	$('[data-tab="rules"]').addEventListener('click', () => switchTab('rules'));
}

function initAuth(){
	const form = document.getElementById('adminLogin') as HTMLFormElement;
	const app = document.getElementById('admin-app') as HTMLElement;
	const auth = document.getElementById('admin-auth') as HTMLElement;
	const error = document.getElementById('authError') as HTMLElement;
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const id = (document.getElementById('adminId') as HTMLInputElement).value;
		const pass = (document.getElementById('adminPass') as HTMLInputElement).value;
		if (id === ADMIN_ID && pass === ADMIN_PASS) {
			auth.classList.add('hidden');
			app.classList.remove('hidden');
			refreshProducts().catch(()=>{});
		} else {
			error.textContent = 'Invalid credentials';
		}
	});
}

(function init(){
	const y = document.getElementById('year');
	if (y) y.textContent = new Date().getFullYear().toString();
	initAuth();
	initTabs();
	(document.getElementById('productForm') as HTMLFormElement).addEventListener('submit', saveProduct);
	(document.getElementById('deleteProduct') as HTMLButtonElement).addEventListener('click', () => { deleteCurrent().catch(()=>{}); });
	(document.getElementById('rulesForm') as HTMLFormElement).addEventListener('submit', saveRules);
})();
