import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as analyticsSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAxsAZYxELSg0dwUvsON820fOaRmJi6zas",
	authDomain: "selling-website-digital.firebaseapp.com",
	projectId: "selling-website-digital",
	storageBucket: "selling-website-digital.firebasestorage.app",
	messagingSenderId: "857075190348",
	appId: "1:857075190348:web:c703382c845c94378c82e9",
	measurementId: "G-2E4HG0Q9RD"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

(async () => {
	try {
		if (await analyticsSupported()) {
			getAnalytics(app);
		}
	} catch {}
})();
