import './index.css';
import Carousel from './component/carousel';
import Footer from './component/Footer';
import Logo from './assets/Logo_FèL.svg';
import { useEffect, useRef } from 'react';
import { requestNotificationPermission, showNotification } from './utils/notifications';

function App() {
    const hasRequestedPermission = useRef(false);
    useEffect(() => {
        if (!hasRequestedPermission.current) {
            hasRequestedPermission.current = true;
            requestNotificationPermission();
            showNotification();
        }
    }, []);

    return (
        <div className="flex flex-col h-screen relative">
            {/* Contenitore del logo con bordo rosso per debug */}
            <div className="absolute top-0 left-0 bg-gray-500 p-4 z-50 rounded-br-4xl">
                <img src={Logo} alt="Logo del sito" className="h-23" />
            </div>
            <Carousel />
            <Footer />
        </div>
    );
}

export default App;
