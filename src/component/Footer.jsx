import React from 'react'

export default function Footer() {
    return (
        <div className="h-1/8 bg-gray-500 text-white flex items-center justify-between px-4">
            {/* Sezione Contatti */}
            <div className="text-sm">
                <p>fucecchio.libera@gmail.com</p>
            </div>

            {/* Sezione Link Utili */}
            <div className="text-sm text-center">
                <p>&copy; 2025 #FucecchioèLibera.</p>
                <p>Tutti i diritti riservati.</p>
            </div>

            {/* Sezione Social Media */}
            <div className="flex space-x-4 text-sm">
                <a href="https://www.facebook.com/fucecchio.libera" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white">Facebook</a>
                <a href="https://www.instagram.com/fucecchio.libera/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white">Instagram</a>
            </div>
        </div>
    )
}
