import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db, requireAuth } from './_admin';

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method === 'GET') {
		const snap = await db.collection('settings').doc('rules').get();
		return res.status(200).json({ markdown: snap.exists ? snap.data()?.markdown : '' });
	}
	if (req.method === 'PUT') {
		if (!requireAuth(req,res)) return;
		const { markdown } = req.body || {};
		await db.collection('settings').doc('rules').set({ markdown, updatedAt: Date.now() }, { merge: true });
		return res.status(200).json({ ok: true });
	}
	return res.status(405).json({ error: 'Method not allowed' });
}
