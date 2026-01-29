import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Slider = ({ children, slidesPerView = 1, autoplay = false }) => {
    return (
        <div className="slider-container cinematic-slider">
            <Swiper
                modules={[Navigation, Pagination, A11y, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                autoplay={autoplay ? { delay: 4000, disableOnInteraction: false } : false}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: slidesPerView,
                        spaceBetween: 40,
                    },
                }}
            >
                {React.Children.map(children, (child, index) => (
                    <SwiperSlide key={index}>
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;
