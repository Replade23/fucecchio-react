import React, { useRef } from 'react';
import { useEffect } from "react";
import Navbar from './Navbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar, A11y } from 'swiper/modules';
import Home from '../pages/Home'
import Eventi from '../pages/Eventi'
import Utente from '../pages/Utente'
import bgHome from '../assets/bgHome.jpg'
import bgEventi from '../assets/bgEventi.jpg'
import bgUtente from '../assets/bgUtente.jpg'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Carousel() {
    const swiperRef = useRef(null);

    // Funzione per spostarsi alla slide desiderata
    const goToSlide = (index) => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(index);
        }
    };

    useEffect(() => {
        document.querySelectorAll(".swiper").forEach((el) => {
            el.swiper.allowTouchMove = false;
        });
    }, []);

    return (
        <div className='relative h-7/8'>
            <div className='absolute z-10 -translate-y-1/2 top-1/2'>
                {/* Passiamo la funzione goToSlide alla Navbar */}
                <Navbar goToSlide={goToSlide} />
            </div>

            {/* Carosello che occupa il resto dello schermo */}
            <div className="h-full ">
                <Swiper
                    className='h-full'
                    modules={[Pagination, Scrollbar, A11y]}
                    slidesPerView={1}
                    onSwiper={(swiper) => (swiperRef.current = swiper)} // Salviamo l'istanza di Swiper
                >
                    <SwiperSlide className='h-full bg-cover bg-center text-white text-2xl'>
                        <img src={bgHome} className='w-full h-full absolute -inset-6 scale-110 -z-50 blur-xs' />
                        <div className='flex justify-center items-center h-full ml-20'>
                            <Home />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='h-full bg-cover bg-center flex items-center justify-center text-white text-2xl' style={{ backgroundImage: `url(${bgEventi})` }}>
                        <Eventi />
                    </SwiperSlide>
                    <SwiperSlide className='h-full bg-cover bg-center flex items-center justify-center text-white text-2xl' style={{ backgroundImage: `url(${bgUtente})` }}>
                        <Utente />
                    </SwiperSlide>
                </Swiper>
            </div>

        </div>
    );
}