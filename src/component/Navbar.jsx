import React, { useState } from 'react';
import { House } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import { User } from 'lucide-react';

export default function Navbar({ goToSlide }) {
    const [selected, setSelected] = useState(0); // Stato per il bottone selezionato

    // Funzione per gestire la selezione di un bottone
    const handleClick = (index) => {
        setSelected(index); // Impostiamo il bottone selezionato
        goToSlide(index); // Spostiamo la slide
    };

    // Oggetto con i nomi delle pagine da visualizzare
    const pageNames = ["Home", "Eventi", "Utente"];

    return (
        <nav className="flex flex-col bg-transparent text-white space-y-2 px-2 grow">
            <button
                onClick={() => handleClick(0)}
                className={`p-4 rounded-4xl bg-black flex items-center transition-all duration-300 
                    ${selected === 0 ? "w-40" : "w-14"} `}
            >
                <House />
                {selected === 0 && <span className="ml-2">{pageNames[0]}</span>} {/* Mostra nome solo se selezionato */}
            </button>
            <button
                onClick={() => handleClick(1)}
                className={`p-4 rounded-4xl bg-black flex items-center transition-all duration-300 
                    ${selected === 1 ? "w-40" : "w-14"} `}
            >
                <CalendarDays />
                {selected === 1 && <span className="ml-2">{pageNames[1]}</span>}
            </button>
            <button
                onClick={() => handleClick(2)}
                className={`p-4 rounded-4xl bg-black flex items-center transition-all duration-300 
                    ${selected === 2 ? "w-40" : "w-14"} `}
            >
                <User />
                {selected === 2 && <span className="ml-2">{pageNames[2]}</span>}
            </button>
        </nav>
    );
}
