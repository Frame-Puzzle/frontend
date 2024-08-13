import "./FrameSwipe.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const FrameSwipe = ({ frames, setSelectFrame }) => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={2}
      centeredSlides={true}
      loop={true}
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
      {frames.map((frame, index) => (
        <SwiperSlide key={index}>
          <div
            className="photo-frame-swiper"
            onClick={() => setSelectFrame(index)}
          >
            <img
              className="frame-img"
              src={frame.src}
              alt={`slide ${index + 1}`}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FrameSwipe;
