import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "./MainSwipe.css";

const MainSwipe = () => {
  const images = [
    {
      src: "https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/MainPage-pet.png",
      caption: "with Pet",
    },
    {
      src: "https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/MainPage-family.png",
      caption: "with Family",
    },
    {
      src: "https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/MainPage-couple.png",
      caption: "lovers",
    },
    {
      src: "https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/MainPage-friend.png",
      caption: "with Friends",
    },
  ];
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
              <img src={image.src} alt={`slide ${index + 1}`} />
              <div className="photo-name">{image.caption}</div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSwipe;
