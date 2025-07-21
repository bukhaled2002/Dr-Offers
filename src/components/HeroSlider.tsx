// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { sliderData } from "@/constants";

export default function DealSlider({ className }: { className?: string }) {
  return (
    <div className={`w-full relative ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 5000 }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        loop={true}
        pagination={{
          clickable: true,
          renderBullet: function (_index, className) {
            return '<span class="' + className + ' custom-bullet"></span>';
          },
        }}
        className="w-full custom-slider"
      >
        {sliderData.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className={`${item.bgColor} text-white rounded-xl p-6 px-26 flex flex-col md:flex-row justify-between items-center relative overflow-hidden min-h-96 md:min-h-72`}
            >
              <div className="z-[2] space-y-2 h-full">
                <p className="text-base">
                  Today's Best Deal Online on Electronics
                </p>
                <h1 className="text-5xl font-bold">{item.title}</h1>
                <p className="text-xl">{item.desc}</p>
              </div>
              <img
                src={item.image}
                alt={item.title}
                className="z-[2] max-h-40 md:max-h-60"
              />
              <img
                src="/imgs/mask-group.png"
                className="absolute top-0 right-0 z-[1] h-full"
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="custom-prev absolute top-1/2 left-1 transform -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="#333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="custom-next absolute top-1/2 right-1 transform -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="#333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
