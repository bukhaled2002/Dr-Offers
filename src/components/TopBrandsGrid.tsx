import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import type { Brand } from "@/types/api";
import { Link } from "react-router";

type TopBrandsGridProps = {
  data: Brand[];
};

const TopBrandsGrid: React.FC<TopBrandsGridProps> = ({ data }) => {
  const getBrandStyle = (brandName: string) => {
    const brand = brandName.toLowerCase();

    switch (brand) {
      case "iphone":
      case "apple":
        return {
          bgColor: "#2c2c2c",
          textColor: "white",
          labelBg: "bg-white/20",
          labelText: "text-white",
        };
      case "realme":
        return {
          bgColor: "#ffd700",
          textColor: "#333",
          labelBg: "bg-black/10",
          labelText: "text-black",
        };
      case "xiaomi":
        return {
          bgColor: "#ff6b35",
          textColor: "white",
          labelBg: "bg-white/20",
          labelText: "text-white",
        };
      default:
        return {
          bgColor: "#f8f8f8",
          textColor: "#333",
          labelBg: "bg-white/80",
          labelText: "text-gray-700",
        };
    }
  };

  const renderBrandLogo = () => {
    // Default logo for all brands
    return (
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
        <span className="text-sm font-bold text-gray-500">🏷️</span>
      </div>
    );
  };

  const renderPhoneImage = () => {
    // if (item.image) {
    //   return (
    //     <img
    //       src={item.image}
    //       alt={item.brand}
    //       className="h-full w-auto object-contain max-w-none"
    //     />
    //   );
    // }

    // Default phone mockup
    return (
      <div className="relative h-full flex items-center">
        <div className="w-20 h-32 bg-gray-800 rounded-xl relative shadow-lg">
          <div className="absolute inset-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <div className="w-16 h-28 bg-black/20 rounded border border-white/20"></div>
          </div>
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-black/40 rounded-full"></div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white/60 rounded-full"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={24}
        pagination={{
          clickable: true,
          renderBullet: function (_, className) {
            return '<span class="' + className + ' custom-bullet-2"></span>';
          },
        }}
        className="custom-slider-2"
        modules={[Pagination]}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
        }}
      >
        {data.map((item, idx) => {
          const brandStyle = getBrandStyle(item.brand_name as string);
          return (
            <SwiperSlide key={idx}>
              <Link
                to={`/products?brand_id=${item.id}`}
                className="relative flex items-center justify-between rounded-2xl shadow-lg p-6 h-40 overflow-hidden"
                style={{
                  color: brandStyle.textColor,
                }}
              >
                {/* Left Side */}
                <div className="flex flex-col justify-between h-full z-10">
                  <div
                    className={`text-xs font-medium px-3 py-1 rounded-full w-fit tracking-wide ${brandStyle.labelBg} ${brandStyle.labelText}`}
                  >
                    {item?.brand_name?.toUpperCase() || ""}
                    "brandName"
                  </div>

                  {/* Logo */}
                  <div className="mt-2">{renderBrandLogo()}</div>

                  <p className="text-sm font-semibold mt-auto">
                    {/* UP to {item.discount_rate}% OFF */}
                  </p>
                </div>

                {/* Product Image */}
                <div className="absolute right-4 top-4 bottom-4 flex items-center">
                  {renderPhoneImage()}
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default TopBrandsGrid;
