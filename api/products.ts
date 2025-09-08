import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db, requireAuth } from './_admin';

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method === 'GET') {
		const snap = await db.collection('products').orderBy('updatedAt','desc').get();
		const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
		return res.status(200).json({ items });
	}
	if (req.method === 'POST') {
		if (!requireAuth(req,res)) return;
		const body = req.body || {};
		const now = Date.now();
		const docRef = await db.collection('products').add({ ...body, createdAt: now, updatedAt: now });
		return res.status(200).json({ id: docRef.id });
	}
	if (req.method === 'PUT') {
		if (!requireAuth(req,res)) return;
		const { id, ...rest } = req.body || {};
		if (!id) return res.status(400).json({ error: 'id required' });
		await db.collection('products').doc(id).set({ ...rest, updatedAt: Date.now() }, { merge: true });
		return res.status(200).json({ ok: true });
	}
	if (req.method === 'DELETE') {
		if (!requireAuth(req,res)) return;
		const { id } = req.query;
		if (!id || Array.isArray(id)) return res.status(400).json({ error: 'id required' });
		await db.collection('products').doc(id).delete();
		return res.status(200).json({ ok: true });
	}
	return res.status(405).json({ error: 'Method not allowed' });
}
