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
    <div className="flex justify-center items-center h-full">
      {user ? (
        // Se l'utente è autenticato, mostra la pagina utente
        <UtenteLoggato />
      ) : (
        // Se non è autenticato, mostra il form di login e registrazione
        <div className="w-120 bg-gray-500 px-10 py-10 rounded-4xl">
          {isRegistering ? <SignUp /> : <Login />}
          {/* Bottone per cambiare tra Login e Register */}
          {isRegistering ? "Hai già un account?" : "Non hai un account?"}
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Accedi" : "Registrati"}
          </button>
        </div>
      )}
    </div>
  );
}