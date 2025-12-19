/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { sliderData } from "@/constants"; // fallback content
import { useTranslation } from "react-i18next";

type SlideItem = {
  title: string;
  desc: string;
  image?: string;
  bgColor?: string;
};

export default function DealSlider({ className }: { className?: string }) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language?.toLowerCase().startsWith("ar");

  // Pull translated slides; fall back to sliderData titles/desc if missing
  const slides: SlideItem[] = useMemo(() => {
    const fromI18n = t("slider", { returnObjects: true }) as unknown as Array<{
      title?: string;
      desc?: string;
    }>;

    let processedSlides = sliderData;

    // Merge translation (title/desc) onto your existing sliderData for images/bg
    if (Array.isArray(fromI18n) && fromI18n.length) {
      processedSlides = sliderData.map((base, idx) => ({
        ...base,
        title: fromI18n[idx]?.title ?? base.title,
        desc: fromI18n[idx]?.desc ?? base.desc,
      }));
    }

    // For RTL, reverse the slides array to make looping feel natural
    return isRtl ? [...processedSlides].reverse() : processedSlides;
  }, [t, isRtl]);

  const subtitle = t(
    "slider_subtitle",
    "Today's Best Deal Online on Electronics"
  );

  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    // Small delay to ensure swiper is fully initialized
    const timeout = setTimeout(() => {
      // Re-bind custom navigation to real DOM nodes
      if (swiper.params.navigation && swiper.navigation) {
        const nav = swiper.params.navigation as any;
        nav.prevEl = prevRef.current;
        nav.nextEl = nextRef.current;
        swiper.navigation.destroy();
        swiper.navigation.init();
        swiper.navigation.update();
      }

      // Configure direction first
      if (isRtl) {
        swiper.changeLanguageDirection("rtl");
      } else {
        swiper.changeLanguageDirection("ltr");
      }

      // Reset autoplay with proper configuration
      if (swiper.autoplay) {
        swiper.autoplay.stop();

        // Update autoplay parameters
        if (
          swiper.params.autoplay &&
          typeof swiper.params.autoplay === "object"
        ) {
          swiper.params.autoplay.delay = 5000;
          swiper.params.autoplay.disableOnInteraction = false;
          // For RTL, we don't reverse direction since we reversed the slides array instead
          swiper.params.autoplay.reverseDirection = false;
        }

        swiper.autoplay.start();
      }

      // Always start from the first slide (which is now properly ordered for RTL)
      swiper.slideTo(0, 0);
      swiper.update();
    }, 100);

    return () => clearTimeout(timeout);
  }, [isRtl]);

  // Custom navigation handlers that work properly with RTL
  const handlePrevClick = () => {
    if (swiperRef.current) {
      if (isRtl) {
        swiperRef.current.slideNext(); // In RTL with reversed array, "prev" means next
      } else {
        swiperRef.current.slidePrev();
      }
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current) {
      if (isRtl) {
        swiperRef.current.slidePrev(); // In RTL with reversed array, "next" means prev
      } else {
        swiperRef.current.slideNext();
      }
    }
  };

  return (
    <div
      className={`w-full relative ${className}`}
      dir={isRtl ? "rtl" : "ltr"}
      style={{ direction: isRtl ? "rtl" : "ltr" }}
    >
      {/* Custom Navigation Buttons with manual handlers */}
      <div
        onClick={handlePrevClick}
        className="custom-prev absolute top-1/2 left-1 transform -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18L9 12L15 6"
            stroke="#333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div
        onClick={handleNextClick}
        className="custom-next absolute top-1/2 right-1 transform -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18L15 12L9 6"
            stroke="#333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <Swiper
        key={`${isRtl ? "rtl" : "ltr"}-${slides.length}`} // Force re-render when direction or slides change
        modules={[Navigation, Pagination, Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onBeforeInit={(swiper) => {
          const nav = swiper.params.navigation as any;
          if (nav) {
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
          }
        }}
        dir={isRtl ? "rtl" : "ltr"}
        autoplay={{
          delay: 5000,
          reverseDirection: false, // We handle direction by reversing slides array
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        loop={true}
        centeredSlides={false}
        pagination={{
          clickable: true,
          renderBullet: (_index, className) =>
            '<span class="' + className + ' custom-bullet"></span>',
        }}
        speed={600}
        className={`w-full custom-slider ${
          isRtl ? "swiper-rtl" : "swiper-ltr"
        }`}
        style={
          {
            "--pagination-left": isRtl ? "auto" : "24px",
            "--pagination-right": isRtl ? "24px" : "auto",
            "--pagination-text-align": isRtl ? "right" : "left",
          } as React.CSSProperties
        }
      >
        {slides.map((item, index) => (
          <SwiperSlide key={`${isRtl ? "rtl" : "ltr"}-${index}`}>
            <div
              className={`${
                item.bgColor
              } text-white rounded-xl p-6 px-26 flex flex-col md:flex-row ${
                isRtl ? "" : ""
              } justify-between items-center relative overflow-hidden h-96 md:h-72`}
            >
                <motion.div
                  initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`z-[2] space-y-2 h-full ${
                    isRtl ? "text-right" : "text-left"
                  }`}
                >
                  <p className="text-base">{subtitle}</p>
                  <h1 className="text-5xl font-bold">{item.title}</h1>
                  <p className="text-xl">{item.desc}</p>
                </motion.div>
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  src={item.image}
                  alt={item.title}
                  className="z-[2] max-h-40 md:max-h-60"
                />
              <img
                src="/imgs/mask-group.png"
                className={`absolute top-0 object-cover  ${
                  isRtl ? "left-0 scale-x-[-1]" : "right-0"
                } z-[1] h-full`}
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
