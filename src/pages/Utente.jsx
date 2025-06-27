import React, { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Login from "../component/Login"; // Importa il componente di login
import SignUp from "../component/SignUp"; // Importa il componente di registrazione
import UtenteLoggato from "../component/UtenteLoggato";

export default function Utente() {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false); // Stato per alternare login/register

  // Controlla se l'utente è autenticato
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-center items-center h-full w-full">
      {user ? (
        // Se l'utente è autenticato, mostra la pagina utente
        <UtenteLoggato />
      ) : (
        // Se non è autenticato, mostra il form di login e registrazione
        <div className="flex items-center justify-center h-fit full bg-blue-100 p-6 rounded-3xl">
          <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
            {isRegistering ? <SignUp /> : <Login />}
            <div className="flex flex-row items-center justify-center gap-4 w-full">
            <p className="text-2xl text-gray-800 mb-4">
            {isRegistering ? "Hai già un account? " : "Non hai un account? "}
            </p>
            <button className="hover:cursor-pointer text-2xl font-bold text-gray-800 mb-4" onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? "Accedi" : "Registrati"}
            </button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}