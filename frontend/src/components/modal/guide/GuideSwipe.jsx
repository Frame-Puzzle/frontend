import "./GuideSwipe.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const GuideSwipe = ({ images }) => {
  return (
    <Swiper
      spaceBetween={15}
      slidesPerView={1.22}
      centeredSlides={true}
      effect="creative"
      creativeEffect={{
        prev: {
          shadow: true,
          translate: ["-120%", 0, -500],
        },
        next: {
          shadow: true,
          translate: ["120%", 0, -500],
        },
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div
            className="user-guide-frame"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="guide-shot">
              <img src={image} alt={`slide ${index + 1}`} />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default GuideSwipe;
