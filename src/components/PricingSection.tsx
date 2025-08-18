import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

interface Plan {
  name: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  description: string;
  features: string[];
  popular?: boolean;
  isCustom?: boolean;
}

// Get translated plans
const getPlans = (t: TFunction): Plan[] => [
  {
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    description: t("free_desc", "For your hobby projects"),
    features: [
      t("free_feature_1", "Free e-mail alerts"),
      t("free_feature_2", "3-minute checks"),
      t("free_feature_3", "Automatic data enrichment"),
      t("free_feature_4", "10 monitors"),
      t("free_feature_5", "Up to 3 seats"),
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 85,
    annualPrice: 55,
    description: t("pro_desc", "Great for small businesses"),
    features: [
      t("pro_feature_1", "Unlimited phone calls"),
      t("pro_feature_2", "30 second checks"),
      t("pro_feature_3", "Single-user account"),
      t("pro_feature_4", "20 monitors"),
      t("pro_feature_5", "Up to 6 seats"),
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    annualPrice: null,
    description: t("enterprise_desc", "For multiple teams"),
    features: [
      t("enterprise_feature_1", "Everything in Pro"),
      t("enterprise_feature_2", "Up to 5 team members"),
      t("enterprise_feature_3", "100 monitors"),
      t("enterprise_feature_4", "15 status pages"),
      t("enterprise_feature_5", "200+ integrations"),
    ],
    isCustom: true,
  },
];

export default function PricingPlans() {
  const { t } = useTranslation();
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const plans = getPlans(t);

  const formatPrice = (plan: Plan) => {
    if (plan.isCustom) return t("custom", "Custom");
    const price = billing === "monthly" ? plan.monthlyPrice : plan.annualPrice;
    return `$${price}`;
  };

  const getPriceSubtext = (plan: Plan) => {
    if (plan.isCustom)
      return t("per_user_annually", "per user/month, billed annually");
    if (plan.monthlyPrice === 0)
      return t("per_user_annually", "per user/month, billed annually");
    return billing === "monthly"
      ? t("per_user_month", "/user/month")
      : t("per_user_annually", "/user/month, billed annually");
  };

  const getButtonText = (plan: Plan) => {
    if (plan.isCustom)
      return t("get_started_enterprise", "Get started with Enterprise");
    if (plan.name === "Free")
      return t("get_started_free", "Get started for free");
    return t("get_started_plan", `Get started with ${plan.name}`, {
      name: plan.name,
    });
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
            "Receive unlimited credits when you pay yearly, and save on your plan."
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
                    {getPriceSubtext(plan)}
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
                    className={`w-full py-3 font-medium cursor-pointer ${
                      plan.isCustom
                        ? "bg-white text-gray-900 hover:bg-gray-100"
                        : "bg-white text-gray-900 ring-gray-300 ring-1 hover:bg-gray-100"
                    }`}
                  >
                    {getButtonText(plan)}
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
