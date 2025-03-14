import React from 'react';

export default function Navbar({ goToSlide }) {
    return (
        <nav className="flex flex-col bg-transparent text-white space-y-2 px-2 grow">
            <button onClick={() => goToSlide(0)} className="w-5 bg-black rounded">1</button>
            <button onClick={() => goToSlide(1)} className="w-5 bg-black rounded">2</button>
            <button onClick={() => goToSlide(2)} className="w-5 bg-black rounded">3</button>
            <button onClick={() => goToSlide(3)} className="w-5 bg-black rounded">4</button>
            <button onClick={() => goToSlide(4)} className="w-5 bg-black rounded">5</button>
            <button onClick={() => goToSlide(5)} className="w-5 bg-black rounded">6</button>
        </nav>
    );
}