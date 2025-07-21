import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import CouponModal from "./CouponModal";
import type { Deal } from "@/types/api";
import { useAuth } from "@/context/useAuth";

type DealsGridProps = {
  deals: Deal[];
  loading?: boolean;
  error?: Error | undefined;
};

const skeletonArray = Array.from({ length: 5 });

const DealsGrid: React.FC<DealsGridProps> = ({ deals, loading, error }) => {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleCardClick = (deal: Deal) => {
    if (!isAuthenticated) {
      alert("You need to be logged in to view this offer.");
      return;
    }
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
        Failed to load deals. Please try again later.
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
              {deal.discount_rate}%<br />
              OFF
            </span>

            <div className="w-full h-52 bg-white flex items-center justify-center overflow-hidden">
              <img
                src={"/imgs/phone-1.jpg"}
                alt={deal.name || deal.title}
                className="object-contain w-full transition-transform duration-300"
              />
            </div>

            <CardContent className="p-3 px-4 flex flex-col">
              <p className="text-[16px] font-medium text-gray-800">
                {deal.title}
              </p>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-black">
                  {deal.price_after} SAR
                </p>
                <p className="line-through text-gray-400">
                  {deal.price_before} SAR
                </p>
              </div>
              {/* <p className="text-[11px] text-primary font-semibold mt-2 pt-2 border-t-2">
                Dr.offers Coupon: {deal.coupon}
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
