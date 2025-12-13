import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaRocket } from "react-icons/fa6";
import { AiOutlineStock } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";
import { Check } from "lucide-react";

import BrandHero from "@/components/BrandHero";
// import PricingSection from "@/components/PricingSection";
import { SocialSyncGrid } from "@/components/SocialSyncGrid";
// import { TestimonialGrid } from "@/components/TestimonialsSection";
import BrandOwnerJoin from "@/components/BrandOwnerJoin";

export default function BrandLanding() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const landing_features: string[] = t("landing_features", {
    returnObjects: true,
  }) as string[];
  const dashboard_features: string[] = t("dashboard_features", {
    returnObjects: true,
  }) as string[];
  const social_features: string[] = t("social_features", {
    returnObjects: true,
  }) as string[];

  return (
    <main className="bg-[#FAFAFA] text-black space-y-20">
      {/* Hero Section */}
      <BrandHero />

      {/* Section 1 - Page Builder */}
      <section className="section-container min-h-[100vh] lg:min-h-[70vh]">
        <div className="flex gap-10 flex-col lg:flex-row items-center justify-center px-10 mt-10">
          <div className="flex-1 items-center">
            <img
              src="/imgs/landing-builder.png"
              className="md:h-90 object-cover m-auto"
              alt="landing-builder"
            />
          </div>
          <div className="mt-10 lg:mt-0 space-y-6 lg:self-start flex-1 text-start">
            <span className="brand-landing-heading flex items-center gap-2">
              {t("pages_builder_title")} <FaShoppingBag />
            </span>
            <h2 className="font-bold text-4xl">{t("landing_page_builder")}</h2>
            <div className="space-y-4 text-gray-800">
              {landing_features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check size={16} className="mt-1 text-black" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Dashboard */}
      <section className="section-container min-h-[100vh] lg:min-h-[70vh]">
        <div className="flex gap-10 flex-col lg:flex-row-reverse items-center justify-center px-10 mt-10">
          <div className="flex-1 items-center">
            <img
              src="/imgs/analytics.png"
              className="md:h-90 object-cover m-auto"
              alt="dashboard-analytics"
            />
          </div>
          <div className="mt-10 lg:mt-0 space-y-6 lg:self-start flex-1 text-start">
            <span className="brand-landing-heading flex items-center gap-2">
              <FaRocket /> {t("dashboard_monitoring")}
            </span>
            <h2 className="font-bold text-4xl">{t("dashboard_title")}</h2>
            <div className="space-y-4 text-gray-800">
              {dashboard_features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check size={16} className="mt-1 text-black" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Social Media */}
      <section className="section-container min-h-[100vh] lg:min-h-[70vh]">
        <div className="flex gap-10 flex-col lg:flex-row items-center justify-center px-10 mt-10">
          <div className="flex-1 items-center">
            <SocialSyncGrid />
          </div>
          <div className="mt-10 lg:mt-0 space-y-6 lg:self-start flex-1 text-start">
            <span className="brand-landing-heading flex items-center gap-2">
              <AiOutlineStock /> {t("social_media_title")}
            </span>
            <h2 className="font-bold text-4xl">{t("social_media_sharing")}</h2>
            <div className="space-y-4 text-gray-800">
              {social_features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check size={16} className="mt-1 text-black" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <TestimonialGrid /> */}

      {/* Pricing */}
      {/* <PricingSection /> */}

      {/* Join Section */}
      <div className="section-container">
        <BrandOwnerJoin targetPage="register" />
      </div>
    </main>
  );
}
