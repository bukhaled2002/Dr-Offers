import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/useAuth";

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { refreshUser } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);

  const paymentId = searchParams.get("paymentId");

  useEffect(() => {
    // Refresh user data to get the new subscription status
    const verify = async () => {
      try {
        await refreshUser();
      } catch (err) {
        console.error("Failed to refresh user:", err);
      } finally {
        setIsVerifying(false);
      }
    };
    verify();
  }, [refreshUser]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl bg-white border-0 text-center">
        <CardHeader className="pb-2">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {t("payment_success_title", "Payment Successful!")}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <p className="text-gray-600">
            {t(
              "payment_success_desc",
              "Thank you for your subscription. Your account has been upgraded.",
            )}
          </p>
          {paymentId && (
            <p className="text-sm text-gray-400">
              {t("payment_id", "Payment ID")}: {paymentId}
            </p>
          )}

          {isVerifying && (
            <div className="flex items-center justify-center gap-2 text-orange-600 text-sm font-medium">
              <Loader2 className="w-4 h-4 animate-spin" />
              {t("updating_account", "Updating your account...")}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => navigate("/setting/dashboard")}
            className="w-full h-12 text-base font-semibold"
          >
            {t("go_to_dashboard", "Go to Dashboard")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
