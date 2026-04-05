import { IoSearchOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import CategoryGrid from "@/components/CategoryGrid";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import type { BrandData } from "@/types/api";

interface FoodBrandPageProps {
  brandData?: BrandData;
}

function Navbar({ brandData }: { brandData?: BrandData }) {
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setShowNavbar(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { title: "Home", id: 1, href: "#home" },
    { title: "Menu", id: 2, href: "#menu" },
    { title: "About", id: 4, href: "#about" },
    { title: "Contact", id: 5, href: "#contact" },
  ];

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md shadow-gray-100" : "bg-transparent"
      } ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="section-container flex items-center justify-between py-4">
        <div className="logo h-12 w-auto flex items-center gap-2">
          {brandData?.logo_url ? (
            <img
              src={brandData.logo_url}
              alt={brandData.name}
              className="h-full object-contain"
            />
          ) : (
            <span className="font-bold text-lg">
              {brandData?.name || "Logo"}
            </span>
          )}
        </div>
        <ul className="hidden md:flex gap-8 items-center font-medium text-gray-700">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className="cursor-pointer hover:text-primary transition-colors"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <IoSearchOutline size={20} className="cursor-pointer" />
          <Button className="rounded-full hidden sm:flex">Order Now</Button>
        </div>
      </div>
    </div>
  );
}

export default function FoodBrandPage({ brandData }: FoodBrandPageProps) {
  return (
    <>
      <Navbar brandData={brandData} />
      <main>
        <section
          id="home"
          className="section-container pt-12 md:pt-28 min-h-[calc(100vh-84px)] flex flex-col md:flex-row justify-between items-center overflow-hidden"
        >
          <div className="flex flex-col z-10 md:max-w-xl text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {brandData?.section1_title || "Experience Fine Dining"}
            </h1>
            <p className="mb-8 text-gray-700 text-lg leading-relaxed">
              {brandData?.section1_description ||
                "Product Quality Is Our Priority, And Always Guarantees Halal And Safety Until It Is In Your Hands."}
            </p>
            <div className="flex justify-center md:justify-start">
              <Button
                className="rounded-full px-8 py-6 text-lg"
                onClick={() =>
                  brandData?.section1_cta_link &&
                  window.open(brandData.section1_cta_link, "_blank")
                }
              >
                {brandData?.section1_cta_text || "Order Now"}
              </Button>
            </div>
          </div>
          <div className="mt-12 md:mt-0 w-full max-w-[550px]">
            <img
              src={brandData?.section1_media_url || "/imgs/img-hero.png"}
              alt="Hero image"
              className="w-full h-auto object-cover rounded-2xl"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop";
              }}
            />
          </div>
          <img
            src="/imgs/shapes.svg"
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover z-[-1] pointer-events-none opacity-50"
          />
        </section>

        <section id="menu" className="section-container text-center py-20">
          <h2 className="font-bold text-3xl md:text-4xl mb-6">
            {brandData?.section2_header || "Our Popular Menu"}
          </h2>
          <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
            {brandData?.section2_subheader ||
              "Choose from our wide variety of dishes, prepared with the freshest ingredients."}
          </p>
          <CategoryGrid
            items={
              brandData?.section2_items?.map((item, index) => ({
                id: index,
                title: item.title,
                description: item.description,
                media_url: item.media_url,
                favorite: false,
              })) || []
            }
            fallbackImage="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
          />
        </section>

        {brandData?.video_url && (
          <div className="section-container py-16">
            <div className="relative group w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 shadow-primary/10">
              <div className="aspect-video w-full h-full relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <video
                  src={brandData.video_url}
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  playsInline
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10 blur-3xl opacity-30 animate-pulse pointer-events-none" />
            </div>
            <div className="mt-8 text-center max-w-2xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 animate-bounce">
                Featured Video
              </span>
              <h2 className="text-2xl font-bold text-slate-800">
                A Closer Look at {brandData.name}
              </h2>
            </div>
          </div>
        )}

        <div className="section-container py-16">
          <div
            className="flex relative overflow-hidden w-full h-[400px] md:h-[500px] bg-cover bg-center rounded-3xl justify-center items-center shadow-xl"
            style={{
              backgroundImage: `url('${
                brandData?.section3_media_url ||
                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop"
              }')`,
            }}
          >
            <div className="overlay absolute top-0 left-0 w-full h-full bg-black/60" />
            <div className="z-10 text-center px-6 max-w-2xl">
              <h3 className="text-white font-bold text-3xl md:text-4xl mb-6 leading-tight">
                {brandData?.section3_title || "Visit Our Location"}
              </h3>
              <p className="text-white/90 mb-8 text-lg">
                {brandData?.section3_description ||
                  "Find us in the heart of the city and enjoy our wonderful atmosphere."}
              </p>
              <Button
                className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-6 text-lg"
                onClick={() =>
                  brandData?.section3_cta_link &&
                  window.open(brandData.section3_cta_link, "_blank")
                }
              >
                {brandData?.section3_cta_text || "Get Directions"}
              </Button>
            </div>
          </div>
        </div>

        <footer
          id="contact"
          className="bg-gray-50 text-gray-700 pt-20 pb-10 border-t"
        >
          <div className="section-container grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo + Social */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                {brandData?.logo_url ? (
                  <img
                    src={brandData.logo_url}
                    alt={brandData.name}
                    className="h-10 w-auto"
                  />
                ) : (
                  <span className="text-xl font-bold">{brandData?.name}</span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                {brandData?.description ||
                  "Providing the best quality food for our customers."}
              </p>
              <div className="flex space-x-4">
                {brandData?.facebook_url && (
                  <a
                    href={brandData.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white shadow-sm rounded-full p-2.5 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
                  >
                    <FaFacebookF className="w-5 h-5" />
                  </a>
                )}
                {brandData?.youtube_url && (
                  <a
                    href={brandData.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white shadow-sm rounded-full p-2.5 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
                  >
                    <FaInstagram className="w-5 h-5" />
                  </a>
                )}
                {brandData?.whatsapp_url && (
                  <a
                    href={`https://wa.me/${brandData.whatsapp_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white shadow-sm rounded-full p-2.5 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">
                Company
              </h4>
              <ul className="space-y-4 text-sm font-medium">
                <li>
                  <a
                    href="#home"
                    className="hover:text-primary transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#menu"
                    className="hover:text-primary transition-colors"
                  >
                    Menu
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-primary transition-colors"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">
                Support
              </h4>
              <ul className="space-y-4 text-sm font-medium">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">
                Get In Touch
              </h4>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-gray-900 shrink-0">
                    Address:
                  </span>
                  <span>
                    {brandData?.address || "123 Main St, City, Country"}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="font-semibold text-gray-900 shrink-0">
                    Phone:
                  </span>
                  <span>{brandData?.phone || brandData?.whatsapp_url}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="font-semibold text-gray-900 shrink-0">
                    Email:
                  </span>
                  <a
                    href={`mailto:${brandData?.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {brandData?.email || brandData?.owner?.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="section-container mt-16 pt-8 border-t text-center text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} {brandData?.name}. Powered By
              Droffers. All Rights Reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
