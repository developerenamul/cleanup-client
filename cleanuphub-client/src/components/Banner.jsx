// Banner.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Banner = () => {
  return (
    <Swiper slidesPerView={1} loop={true} autoplay={{ delay: 2500 }}>
      <SwiperSlide>
        <img
          className="w-full h-[400px] object-cover"
          src="https://images.pexels.com/photos/2382894/pexels-photo-2382894.jpeg?cs=srgb&dl=pexels-kelly-2382894.jpg&fm=jpg"
          alt="Garbage Issue"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="w-full h-[400px] object-cover"
          src="https://unhabitatmyanmar.org/wp-content/uploads/2023/06/IMG_E6238-scaled.jpg"
          alt="Community Cleaning"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="w-full h-[400px] object-cover"
          src="https://static.vecteezy.com/system/resources/thumbnails/039/063/419/small/ai-generated-the-concept-of-environmental-technology-the-sustainable-development-goals-sdgs-photo.jpeg"
          alt="Sustainability Action"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
