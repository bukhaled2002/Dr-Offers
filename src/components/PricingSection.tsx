import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Plan {
  name: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  description: string;
  features: string[];
  popular?: boolean;
  isCustom?: boolean;
}

const plans: Plan[] = [
  {
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "For your hobby projects",
    features: [
      "Free e-mail alerts",
      "3-minute checks",
      "Automatic data enrichment",
      "10 monitors",
      "Up to 3 seats",
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 85,
    annualPrice: 55, // 35% discount
    description: "Great for small businesses",
    features: [
      "Unlimited phone calls",
      "30 second checks",
      "Single-user account",
      "20 monitors",
      "Up to 6 seats",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    annualPrice: null,
    description: "For multiple teams",
    features: [
      "Everything in Pro",
      "Up to 5 team members",
      "100 monitors",
      "15 status pages",
      "200+ integrations",
    ],
    isCustom: true,
  },
];

export default function PricingPlans() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const formatPrice = (plan: Plan) => {
    if (plan.isCustom) return "Custom";

    const price = billing === "monthly" ? plan.monthlyPrice : plan.annualPrice;
    return `$${price}`;
  };

  const getPriceSubtext = (plan: Plan) => {
    if (plan.isCustom) return "per user/month, billed annually";
    if (plan.monthlyPrice === 0) return "per user/month, billed annually";
    return billing === "monthly"
      ? "/user/month"
      : "/user/month, billed annually";
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 bg-gray-50 min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Plans and Pricing
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Receive unlimited credits when you pay yearly, and save on your plan.
        </p>

        <Tabs
          value={billing}
          onValueChange={(e) => setBilling(e as "monthly" | "annual")}
          className="flex justify-center mb-12"
        >
          <TabsList className="bg-gray-100 border border-gray-200 rounded-md p-1 w-80 h-fit m-auto">
            <TabsTrigger
              value="monthly"
              className="w-1/2  cursor-pointer rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              value="annual"
              className="w-1/2 cursor-pointer rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 "
            >
              Annual{" "}
              <span className="ml-2 text-xs p-1 rounded-md bg-gray-100 font-medium">
                Save 35%
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
                        Popular
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
                    {plan.isCustom
                      ? "Get started with Enterprise"
                      : plan.name === "Free"
                      ? "Get started for free"
                      : `Get started with ${plan.name}`}
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
