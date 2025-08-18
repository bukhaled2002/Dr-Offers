import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import type { Deal } from "@/types/api";
import { useTranslation } from "react-i18next";
// Coupon Modal Component
const CouponModal: React.FC<{
  deal: Deal | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ deal, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const { t } = useTranslation();
  const handleCopyCode = async () => {
    if (deal?.coupon) {
      try {
        await navigator.clipboard.writeText(deal.coupon);
        setCopied(true);
        // setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  if (!deal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 bg-white rounded-2xl border-0 shadow-2xl">
        <div className="flex flex-col items-center text-center p-8">
          {/* Logo */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-[#8B2F1D] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <p className="text-[#8B2F1D] text-sm font-medium mt-2">Dr.Offers</p>
            <p className="text-gray-400 text-xs">{t("drOffers_ar")}</p>
          </div>

          {/* Surprise gift text */}
          <p className="text-gray-500 text-lg mb-8">{t("surpriseGift")}</p>

          {/* Discount */}
          <div className="mb-6">
            <h2 className="text-4xl font-bold text-[#8B2F1D] mb-2">
              {deal.discount_rate}% {t("off")}
            </h2>
            <p className="text-gray-800 text-lg font-medium">
              {t("entirePurchase")}
            </p>
          </div>

          {/* Coupon Code */}
          <div className="mb-8">
            <p className="text-gray-500 text-sm mb-3">{t("yourCouponCode")}</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
              <p className="text-2xl font-bold text-gray-800 tracking-wider">
                {deal.coupon}
              </p>
            </div>
          </div>

          {/* Use Coupon Button */}
          <Button
            onClick={handleCopyCode}
            className="w-full bg-[#8B2F1D] hover:bg-[#7A281A] text-white py-6 text-lg font-medium rounded-xl transition-colors duration-200"
          >
            {copied ? (
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                {t("copied")}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Copy className="w-5 h-5" />
                {t("copyCode")}
              </div>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CouponModal;
