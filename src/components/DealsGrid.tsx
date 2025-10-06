import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import CouponModal from "./CouponModal";
import type { Deal } from "@/types/api";
import { useTranslation } from "react-i18next";
import instance from "@/api/axiosInstance";

type DealsGridProps = {
  deals: Deal[];
  loading?: boolean;
  error?: Error | undefined;
};

const skeletonArray = Array.from({ length: 5 });

// Image Loading Component
const ImageWithLoading: React.FC<{
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}> = ({ src, alt, className = "", fallbackSrc = "/imgs/phone-1.jpg" }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setImageError(false); // Reset error state when switching to fallback
    } else {
      setImageError(true);
      setImageLoading(false);
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Loading skeleton */}
      {imageLoading && !imageError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error state */}
      {imageError && (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center text-gray-400">
          <svg
            className="w-12 h-12 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-xs">Image not found</span>
        </div>
      )}

      {/* Actual image */}
      <img
        src={currentSrc}
        alt={alt}
        className={`${className} ${
          imageLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: imageError ? "none" : "block" }}
      />
    </div>
  );
};

const DealsGrid: React.FC<DealsGridProps> = ({ deals, loading, error }) => {
  const { t } = useTranslation();
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = async (deal: Deal) => {
    console.log(deal.brand_id);
    const res = await instance.post(`/brands/${deal.brand_id}/clicks`, {
      count: 1,
    });
    console.log(res);
    setSelectedDeal(deal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDeal(null);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {skeletonArray.map((_, index) => (
          <Card
            key={index}
            className="relative rounded-xl overflow-hidden shadow-sm border flex flex-col p-0 max-w-[300px] mx-auto gap-0 animate-pulse"
          >
            <div className="absolute top-0 right-0 w-14 h-12 bg-gray-300 rounded-bl-xl" />
            <div className="w-full h-52 bg-gray-200" />
            <CardContent className="p-3 px-4 flex flex-col gap-2">
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="flex gap-2">
                <div className="h-4 bg-gray-300 rounded w-20" />
                <div className="h-4 bg-gray-200 rounded w-16" />
              </div>
              <div className="h-3 bg-gray-300 rounded w-full mt-2 border-t-2 pt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-10 text-center text-red-500 text-sm font-medium">
        {t("DealsGrid.error")}
      </div>
    );
  }
  if (deals.length === 0) {
    return (
      <div className="w-full py-10 text-center text-red-500 text-sm font-medium">
        {t("DealsGrid.noDealsFound")}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {deals.map((deal) => (
          <Card
            key={deal.id}
            onClick={() => handleCardClick(deal)}
            className="group relative rounded-xl overflow-hidden shadow-sm border flex flex-col p-0 max-w-[300px] mx-auto gap-0 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
          >
            <span className="absolute top-0 right-0 bg-[#8B2F1D] text-white text-[13px] font-semibold text-center w-14 h-12 py-[2px] rounded-bl-xl z-10 leading-5">
              {deal.discount_rate}% <br />
              {t("DealsGrid.off")}
            </span>

            <div className="w-full h-52 bg-white flex items-center justify-center overflow-hidden">
              <ImageWithLoading
                src={deal.image ?? "/imgs/phone-1.jpg"}
                alt={deal.name || deal.title}
                className="object-contain w-full transition-transform duration-300"
                fallbackSrc="/imgs/phone-1.jpg"
              />
            </div>

            <CardContent className="p-3 px-4 flex flex-col">
              <p className="text-[16px] font-medium text-gray-800">
                {deal.title}
              </p>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-black">
                  {deal.price_after} {t("DealsGrid.currency")}
                </p>
                <p className="line-through text-gray-400">
                  {deal.price_before} {t("DealsGrid.currency")}
                </p>
              </div>
              {/* <p className="text-[11px] text-primary font-semibold mt-2 pt-2 border-t-2">
                {t("DealsGrid.coupon")}: {deal.coupon}
              </p> */}
            </CardContent>
          </Card>
        ))}
      </div>

      <CouponModal
        deal={selectedDeal}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default DealsGrid;
