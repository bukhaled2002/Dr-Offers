import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PaymentErrorPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const errorMessage =
    searchParams.get("message") ||
    t("payment_error_generic", "Something went wrong with your payment.");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl bg-white border-0 text-center">
        <CardHeader className="pb-2">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {t("payment_error_title", "Payment Failed")}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <p className="text-gray-600">{errorMessage}</p>
          <p className="text-sm text-gray-500">
            {t(
              "payment_error_desc",
              "Don't worry, no funds were captured if the transaction failed. Please try again.",
            )}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            onClick={() => navigate("/")}
            className="w-full h-12 text-base font-semibold"
          >
            {t("try_again", "Try Again")}
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/contact")}
            className="w-full"
          >
            {t("contact_support", "Contact Support")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
