import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { useAuth } from "@/context/useAuth";
import instance from "@/api/axiosInstance";
import { Loader2 } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  description: string;
  features: string[];
  popular?: boolean;
  isCustom?: boolean;
}

export default function PricingPlans() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

  // Plans data based on documentation requirements
  const getPlans = (t: TFunction): Plan[] => [
    {
      id: "basic",
      name: t("plan_basic", "Basic"),
      monthlyPrice: 99,
      annualPrice: 999,
      description: t("basic_desc", "Essential features for small businesses"),
      features: [
        t("basic_feat_1", "10 Products"),
        t("basic_feat_2", "5 Templates"),
        t("basic_feat_3", "Email Support"),
        t("basic_feat_4", "Standard Analytics"),
      ],
    },
    {
      id: "pro",
      name: t("plan_pro", "Pro"),
      monthlyPrice: 299,
      annualPrice: 2999,
      description: t("pro_desc", "Advanced tools for growing teams"),
      features: [
        t("pro_feat_1", "50 Products"),
        t("pro_feat_2", "20 Templates"),
        t("pro_feat_3", "Priority Support"),
        t("pro_feat_4", "Advanced Analytics"),
        t("pro_feat_5", "Custom Branding"),
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: t("plan_enterprise", "Enterprise"),
      monthlyPrice: 999,
      annualPrice: 9999,
      description: t(
        "enterprise_desc",
        "Full power for large scale operations",
      ),
      features: [
        t("ent_feat_1", "500 Products"),
        t("ent_feat_2", "100 Templates"),
        t("ent_feat_3", "24/7 Support"),
        t("ent_feat_4", "Full Analytics Suite"),
        t("ent_feat_5", "Dedicated Manager"),
      ],
    },
  ];

  const plans = getPlans(t);

  const formatPrice = (plan: Plan) => {
    const price = billing === "monthly" ? plan.monthlyPrice : plan.annualPrice;
    return `SR ${price}`;
  };

  const getPriceSubtext = () => {
    return billing === "monthly"
      ? t("per_month", "/month")
      : t("per_year", "/year");
  };

  const getButtonText = () => {
    return t("subscribe_now", "Subscribe Now");
  };

  const handleNavigate = async (plan: Plan) => {
    if (!isAuthenticated) {
      navigate("/auth/register?role=owner");
      return;
    }

    if (user?.role !== "owner") {
      navigate("/dashboard");
      return;
    }

    if (!user?.email) {
      alert(t("checkout.missingEmail", "User email is required for payment."));
      return;
    }

    try {
      setLoadingPlanId(plan.id);

      const amount =
        billing === "monthly" ? plan.monthlyPrice : plan.annualPrice;

      if (amount === null || isNaN(amount)) {
        throw new Error("Invalid price");
      }

      // Payload aligned with backend/docs/payment-system.md
      const response = await instance.post("/payment/initiate", {
        orderId: `ORD-${Date.now()}-${String(user?.id).substring(0, 8)}`,
        amount: amount,
        currency: "SAR",
        customerName: user?.name || "Customer",
        customerEmail: user?.email,
        metadata: {
          plan: plan.id,
          duration: billing === "monthly" ? "30d" : "365d",
          userId: user?.id,
        },
      });

      const data = response.data?.data || response.data;
      console.log(data);
      const { redirectUrl } = data;
      if (redirectUrl) {
        // Redirect user to Al Rajhi Secure Payment Page
        window.location.href = redirectUrl;
      } else {
        throw new Error("No redirect URL received from gateway");
      }
    } catch (error: unknown) {
      console.error("Payment initiation failed:", error);
      const errorMsg =
        error instanceof Error ? error.message : "Payment initiation failed";
      alert(t("checkout.error", `Payment failed: ${errorMsg}`));
    } finally {
      setLoadingPlanId(null);
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 bg-gray-50 min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {t("plans_and_pricing", "Plans and Pricing")}
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          {t(
            "pricing_description",
            "Receive unlimited credits when you pay yearly, and save on your plan.",
          )}
        </p>

        <Tabs
          value={billing}
          onValueChange={(e) => setBilling(e as "monthly" | "annual")}
          className="flex justify-center mb-12"
        >
          <TabsList className="bg-gray-100 border border-gray-200 rounded-md p-1 w-80 h-fit m-auto">
            <TabsTrigger
              value="monthly"
              className="w-1/2 cursor-pointer rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900"
            >
              {t("monthly", "Monthly")}
            </TabsTrigger>
            <TabsTrigger
              value="annual"
              className="w-1/2 cursor-pointer rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900"
            >
              {t("annual", "Annual")}
              <span className="ml-2 text-xs p-1 rounded-md bg-gray-100 font-medium">
                {t("save_35", "Save 35%")}
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div key={plan.name} className="relative">
            <Card
              className={`h-full border-2 transition-all duration-300 hover:shadow-lg ${
                plan.isCustom
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-4xl font-bold flex gap-4">
                      {formatPrice(plan)}
                    </span>
                    {plan.popular && (
                      <span className="bg-orange-500 text-white px-3 py-1 h-fit rounded-full text-sm font-medium">
                        {t("popular", "Popular")}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-sm ${
                      plan.isCustom ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {getPriceSubtext()}
                  </p>
                </div>

                <p
                  className={`text-base ${
                    plan.isCustom ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {plan.description}
                </p>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="text-green-500 font-bold text-lg mt-0.5">
                        ✓
                      </span>
                      <span
                        className={`text-sm ${
                          plan.isCustom ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  <Button
                    onClick={() => handleNavigate(plan)}
                    disabled={loadingPlanId !== null}
                    className={`w-full py-3 font-medium cursor-pointer ${
                      plan.isCustom
                        ? "bg-white text-gray-900 hover:bg-gray-100"
                        : "bg-white text-gray-900 ring-gray-300 ring-1 hover:bg-gray-100"
                    }`}
                  >
                    {loadingPlanId === plan.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("processing", "Processing...")}
                      </>
                    ) : (
                      getButtonText()
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
