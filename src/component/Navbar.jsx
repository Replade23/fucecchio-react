import React, { useState } from 'react';
import { House, CalendarDays, User } from 'lucide-react';

export default function Navbar({ goToSlide }) {
    const [selected, setSelected] = useState(0);

    const handleClick = (index) => {
        setSelected(index);
        goToSlide(index);
    };

    return (
        <nav className="flex flex-col bg-transparent text-white space-y-2 px-2 grow">
            {[
                { icon: <House />, name: "Home" },
                { icon: <CalendarDays />, name: "Eventi" },
                { icon: <User />, name: "Utente" }
            ].map((item, index) => (
                <button
                    key={index}
                    onClick={() => handleClick(index)}
                    className={`p-4 rounded-4xl ${selected!==index ? 'bg-primary' : 'bg-selected'} flex items-center transition-all duration-300 
                        min-w-14 overflow-hidden 
                        ${selected === index ? "w-30" : "w-14"}`}
                >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className={`ml-2 transition-opacity duration-300 ${selected === index ? "opacity-100" : "opacity-0"}`}>
                        {item.name}
                    </span>
                </button>
            ))}
        </nav>
    );
}