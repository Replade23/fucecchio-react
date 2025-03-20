import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyA5Lfr77wHo1MWtEs2TCifJFFu73mQSKpQ",
    authDomain: "fucecchio-react.firebaseapp.com",
    projectId: "fucecchio-react",
    storageBucket: "fucecchio-react.firebasestorage.app",
    messagingSenderId: "615957528741",
    appId: "1:615957528741:web:1d67ac7b20e7e1eef50d4c"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            const token = await getToken(messaging, { vapidKey: "LA_TUA_VAPID_KEY" });
            console.log("Token FCM:", token);
        } else {
            console.warn("Permesso notifiche negato.");
        }
    } catch (error) {
        console.error("Errore nel recupero del token FCM:", error);
    }
};

onMessage(messaging, (payload) => {
    console.log("Notifica ricevuta:", payload);
});
