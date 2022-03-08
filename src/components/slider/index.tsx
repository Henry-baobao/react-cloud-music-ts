import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderContainer } from "./style";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Scrollbar } from "swiper";

export interface Banner {
  imageUrl: string;
}

type Props = {
  bannerList: Banner[];
};

function Slider(props: Props) {
  const { bannerList } = props;

  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <Swiper
          modules={[Pagination, Autoplay]}
          loop
          autoplay
          pagination
          navigation
        >
          {bannerList?.map((banner, index) => (
            <SwiperSlide key={banner.imageUrl + index}>
              <img
                src={banner.imageUrl}
                width="100%"
                height="100%"
                alt="recommand"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </SliderContainer>
  );
}

export default React.memo(Slider);
