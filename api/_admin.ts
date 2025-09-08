import type { VercelRequest, VercelResponse } from '@vercel/node';
import admin from 'firebase-admin';

if (!admin.apps.length) {
	const projectId = process.env.FIREBASE_PROJECT_ID || 'selling-website-digital';
	const clientEmail = process.env.FIREBASE_CLIENT_EMAIL || '';
	const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
	try {
		admin.initializeApp({
			credential: admin.credential.cert({ projectId, clientEmail, privateKey })
		});
	} catch {}
}

export const db = admin.firestore();

export function isAuthed(req: VercelRequest): boolean {
	const id = req.headers['x-admin-id'];
	const pass = req.headers['x-admin-pass'];
	return id === '3248882548913828704095180' && pass === '+2tDk*dm]=mS@3~;[GQ22fffc';
}

export function requireAuth(req: VercelRequest, res: VercelResponse): boolean {
	if (!isAuthed(req)) {
		res.status(401).json({ error: 'Unauthorized' });
		return false;
	}
	return true;
}
