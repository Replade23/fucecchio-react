import React, { useRef } from 'react';
import Navbar from './Navbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar, A11y } from 'swiper/modules';
import Home from '../pages/Home'
import Archivio from '../pages/Archivio'
import Contatti from '../pages/Contatti'
import ChiSiamo from '../pages/ChiSiamo'
import Eventi from '../pages/Eventi'
import Utente from '../pages/Utente'

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

    return (
        <div className='relative h-7/8'>
            <div className='absolute z-10 -translate-y-1/2 top-1/2'>
                {/* Passiamo la funzione goToSlide alla Navbar */}
                <Navbar goToSlide={goToSlide} />
            </div>

            {/* Carosello che occupa il resto dello schermo */}
            <div className="h-full bg-blue-500">
                <Swiper
                    className='h-full'
                    modules={[Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={1}
                    onSwiper={(swiper) => (swiperRef.current = swiper)} // Salviamo l'istanza di Swiper
                >
                    <SwiperSlide className='h-full flex items-center justify-center text-white text-2xl'>
                        <Home />
                    </SwiperSlide>
                    <SwiperSlide className='h-full flex items-center justify-center text-white text-2xl'>
                        <Eventi />
                    </SwiperSlide>
                    <SwiperSlide className='h-full flex items-center justify-center text-white text-2xl'>
                        <ChiSiamo />
                    </SwiperSlide>
                    <SwiperSlide className='h-full flex items-center justify-center text-white text-2xl'>
                        <Contatti />
                    </SwiperSlide>
                    <SwiperSlide className='h-full flex items-center justify-center text-white text-2xl'>
                        <Archivio />
                    </SwiperSlide>
                    <SwiperSlide className='h-full flex items-center justify-center text-white text-2xl'>
                        <Utente />
                    </SwiperSlide>
                </Swiper>
            </div>

        </div>
    );
}