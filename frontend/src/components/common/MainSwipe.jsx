import { Swiper, SwiperSlide } from "swiper/react";
import Emotion1 from "../../assets/emotion1.png";
import Emotion2 from "../../assets/emotion2.png";
import Emotion3 from "../../assets/emotion3.png";
import Emotion4 from "../../assets/emotion4.png";
import "swiper/css";

import "./MainSwipe.css";

const MainSwipe = () => {
  const images = [Emotion1, Emotion2, Emotion3, Emotion4];
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
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="home-photo-frame">
            <div className="home-photo">
              <img src={image} alt={`slide ${index + 1}`} />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSwipe;
