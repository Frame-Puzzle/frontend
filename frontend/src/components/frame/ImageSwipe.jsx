import "./ImageSwipe.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ImageSwipe = ({ images }) => {
  return (
    <Swiper
      spaceBetween={1}
      slidesPerView={1.22}
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
          <div className="img-photo-frame">
            <div className="img-photo">
              <img src={image.imgUrl} alt={`slide ${index + 1}`} />
              <div className="img-photo-name">{image.comment}</div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwipe;
