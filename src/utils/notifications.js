export function requestNotificationPermission() {
    if (!("Notification" in window)) {
        console.log("Le notifiche non sono supportate dal browser.");
        return;
    }

    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            console.log("Permesso notifiche concesso.");
        } else {
            console.log("Permesso notifiche negato.");
        }
    });
}

export function showNotification() {
    new Notification("Benvenuto!", {
        body: "Grazie per essere entrato sul sito",
        icon: "/favicon.ico" // Cambia con un'icona valida se necessario
    });
}
