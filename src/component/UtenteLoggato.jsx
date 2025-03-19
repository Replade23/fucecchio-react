import React, { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function UtenteLoggato() {
    const [evento, setEvento] = useState({
        titolo: "",
        descrizione: "",
        data: "",
        imageUrl: "",
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Funzione per gestire l'input del form
    const handleChange = (e) => {
        setEvento({ ...evento, [e.target.name]: e.target.value });
    };

    // Funzione per inviare l'evento a Firestore
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            if (!evento.titolo || !evento.descrizione || !evento.data) {
                throw new Error("Compila tutti i campi.");
            }

            const eventDate = new Date(evento.data);
            if (isNaN(eventDate)) {
                throw new Error("Data non valida.");
            }

            // Creiamo un nuovo documento nella collezione "eventi"
            await addDoc(collection(db, "eventi"), {
                titolo: evento.titolo,
                descrizione: evento.descrizione,
                data: Timestamp.fromDate(eventDate),
                imageUrl: evento.imageUrl || "https://via.placeholder.com/300",
            });

            setSuccessMessage("Evento creato con successo!");
            setEvento({ titolo: "", descrizione: "", data: "", imageUrl: "" });
        } catch (error) {
            console.error("Errore Firestore:", error.message);
            setErrorMessage(error.message || "Errore durante la creazione dell'evento.");
        }

        setLoading(false);
    };

    // Funzione per il logout
    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-6">
            {/* Titolo e Logout */}
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Area Utente</h2>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>

            {/* Form per Creare un Evento */}
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md mt-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Crea un Nuovo Evento</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="titolo"
                        placeholder="Titolo evento"
                        value={evento.titolo}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-100 rounded-lg text-gray-500"
                    />
                    <textarea
                        name="descrizione"
                        placeholder="Descrizione evento"
                        value={evento.descrizione}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-100 rounded-lg text-gray-500"
                    />
                    <input
                        type="date"
                        name="data"
                        value={evento.data}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-100 rounded-lg text-gray-500"
                    />
                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="URL immagine evento (opzionale)"
                        value={evento.imageUrl}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-100 rounded-lg text-gray-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? "Creazione..." : "Crea Evento"}
                    </button>
                </form>

                {/* Messaggi di Successo / Errore */}
                {successMessage && <p className="text-green-500 text-center mt-2">{successMessage}</p>}
                {errorMessage && <p className="text-red-500 text-center mt-2">{errorMessage}</p>}
            </div>
        </div>
    );
}
