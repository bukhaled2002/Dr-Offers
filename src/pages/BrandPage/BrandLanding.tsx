import BrandHero from "@/components/BrandHero";
import PricingSection from "@/components/PricingSection";
import { FaRocket } from "react-icons/fa6";
import { AiOutlineStock } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";
import { SocialSyncGrid } from "@/components/SocialSyncGrid";
import { TestimonialGrid } from "@/components/TestimonialsSection";
import { Check } from "lucide-react"; // or use any other icon library
import BrandOwnerJoin from "@/components/BrandOwnerJoin";
import { useEffect } from "react";
const landing_features = [
  "Drag-and-drop interface with fully responsive templates",
  "Customize everything from colors to fonts to layout with no Code or technical experience",
  "Preview changes instantly and publish in seconds",
];
const dashboard_features = [
  "Monitor page performance with real-time analytics",
  "Save, duplicate, or edit your landing pages anytime",
  "Manage all your projects from a single intuitive dashboard",
];
const social_features = [
  "Share your pages directly on Facebook, Twitter, LinkedIn, and more",
  "Optimize previews for each platform automatically",
  "See the direct effect.",
];

export default function BrandLanding() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#FAFAFA] text-black space-y-10">
      <BrandHero />
      {/* secion 1 */}
      <div className="">
        {" "}
        <section className="section-container min-h-[100vh] lg:min-h-[70vh]">
          <div className="flex gap-10 flex-col lg:flex-row items-center justify-center px-10 mt-10">
            <div className="flex-1 items-center">
              <img
                src="/imgs/landing-builder.png"
                className="md:h-90 object-cover m-auto"
                alt="landing-builder"
              />
            </div>
            <div className="mt-10 lg:mt-0 space-y-6 lg:self-start  flex-1">
              <span className="brand-landing-heading">
                Pages Builder <FaShoppingBag />
              </span>
              <h2 className="font-bold text-4xl">Landing Page Builder</h2>
              <div className="space-y-6  text-gray-800 text-start">
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
        {/* secion 2 */}
        <section className="section-container  min-h-[100vh] lg:min-h-[70vh] ">
          <div className="flex gap-10 flex-col lg:flex-row-reverse items-center justify-center px-10 mt-10">
            <div className="flex-1 items-center">
              <img
                src="/imgs/analytics.png"
                className="md:h-90 object-cover m-auto"
                alt="landing-builder"
              />
            </div>
            <div className="mt-10 lg:mt-0 space-y-6 lg:self-start flex-1 ">
              <div className="brand-landing-heading">
                <FaRocket /> Monitoring
              </div>
              <h2 className="font-bold text-4xl">
                Dashboard To Manage Your Work
              </h2>
              <div className="space-y-6  text-gray-800 text-start">
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
        {/* secion 2 */}
        <section className="section-container  min-h-[100vh] lg:min-h-[70vh]">
          <div className="flex gap-10 flex-col lg:flex-row items-center justify-center px-10 mt-10">
            <div className="flex-1 items-center">
              <SocialSyncGrid />
            </div>
            <div className="mt-10 lg:mt-0 space-y-6 lg:self-start flex-1 text-start">
              <div className="brand-landing-heading">
                <AiOutlineStock /> Social Media
              </div>
              <h2 className="font-bold text-4xl">Social Media Sharing</h2>
              <div className="space-y-6  text-gray-800">
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
      </div>
      <TestimonialGrid />
      <PricingSection />

      <div className="section-container ">
        <BrandOwnerJoin targetPage="register" />
      </div>
    </main>
  );
}
