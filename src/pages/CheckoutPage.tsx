import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { useAuth } from "@/context/useAuth";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import instance from "@/api/axiosInstance";

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const planName = searchParams.get("plan") || "Free";
  const billing = searchParams.get("billing") || "monthly";
  const price = searchParams.get("price") || "0";

  const isFree = parseFloat(price) === 0;

  const handleConfirm = async () => {
    if (!isAuthenticated) {
      navigate("/auth/register?role=owner");
      return;
    }

    if (isFree) {
      navigate("/setting/dashboard");
      return;
    }

    if (!user?.email) {
      alert(t("checkout.missingEmail", "User email is required for payment."));
      return;
    }

    try {
      setIsProcessing(true);

      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice)) {
        throw new Error("Invalid price");
      }

      const response = await instance.post("/payment/initiate", {
        orderId: `ORD-${Date.now()}-${user?.id}`,
        amount: parsedPrice,
        currency: "SAR",
        customerName: user?.name || "Customer",
        customerEmail: user?.email,
        metadata: {
          plan: planName.toLowerCase(),
          duration: billing === "monthly" ? "30d" : "365d",
          userId: user?.id,
        },
      });

      const data = response.data?.data || response.data;
      const { redirectUrl } = data;

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        throw new Error("No redirect URL received");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert(
        t("checkout.error", "Payment initiation failed. Please try again."),
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl bg-white border-0">
        <CardHeader className="text-center pb-2 border-b border-gray-100">
          <CardTitle className="text-2xl font-bold text-gray-900">
            {t("checkout.title", "Checkout")}
          </CardTitle>
          <p className="text-gray-500 mt-2">
            {t("checkout.subtitle", "Complete your subscription")}
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">
                {t("checkout.plan", "Plan")}
              </span>
              <span className="font-bold text-gray-900">{planName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">
                {t("checkout.billing", "Billing Cycle")}
              </span>
              <span className="capitalize text-gray-900">{billing}</span>
            </div>
            <div className="h-px bg-gray-200 my-2" />
            <div className="flex justify-between items-center text-lg">
              <span className="font-bold text-gray-900">
                {t("checkout.total", "Total")}
              </span>
              <span className="font-bold text-primary">${price}</span>
            </div>
          </div>

          {isFree && (
            <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg text-green-800 text-sm">
              <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p>
                {t(
                  "checkout.noPaymentRequired",
                  "No payment required. You can upgrade or cancel at any time.",
                )}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-2">
          <Button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("checkout.processing", "Processing...")}
              </>
            ) : isFree ? (
              t("checkout.completeSetup", "Complete Setup")
            ) : (
              t("checkout.payNow", "Pay Now")
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
