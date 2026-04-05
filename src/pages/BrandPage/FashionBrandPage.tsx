// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoSearchOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { Heart } from "lucide-react";
import type { BrandData } from "@/types/api";

interface FashionBrandPageProps {
  brandData?: BrandData;
}

function Navbar({ brandData }: { brandData?: BrandData }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { title: "Home", id: 1, href: "#home" },
    { title: "Shop", id: 2, href: "#shop" },
    { title: "About", id: 3, href: "#about" },
    { title: "Contact", id: 4, href: "#contact" },
  ];

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 bg-white shadow-md ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="section-container flex items-center justify-between py-5">
        <div className="logo h-10 w-auto">
          {brandData?.logo_url ? (
            <img
              src={brandData.logo_url}
              alt={brandData.name}
              className="h-full object-contain"
            />
          ) : (
            <span className="font-bold text-xl">
              {brandData?.name || "Logo"}
            </span>
          )}
        </div>
        <ul className="hidden md:flex gap-8 items-center font-medium uppercase tracking-wider text-xs">
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
          <Heart size={20} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default function FashionBrandPage({ brandData }: FashionBrandPageProps) {
  return (
    <>
      <Navbar brandData={brandData} />
      <main>
        <section
          id="home"
          className="flex overflow-hidden bg-cover bg-fixed justify-center md:justify-end items-center p-6 md:p-20 pt-28"
          style={{
            height: "calc(100vh - 84px)",
            backgroundImage: `url('${
              brandData?.section1_media_url || "/imgs/hero-2.jpg"
            }')`,
            backgroundPosition: "center",
          }}
        >
          <div className="bg-white/90 backdrop-blur-sm w-full md:w-[65vw] lg:w-[40vw] rounded-xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {brandData?.section1_title || "Discover New Trends"}
            </h2>
            <p className="mt-6 text-gray-700 leading-relaxed text-lg">
              {brandData?.section1_description ||
                "Aliquam laboriosam, atque facere libero explicabo provident. Lorem ipsum dolor sit amet."}
            </p>
            <Button
              className="mt-8 px-10 py-7 text-lg uppercase tracking-widest rounded-none"
              onClick={() =>
                brandData?.section1_cta_link &&
                window.open(brandData.section1_cta_link, "_blank")
              }
            >
              {brandData?.section1_cta_text || "Shop Now"}
            </Button>
          </div>
        </section>

        <section id="shop" className="section-container text-center py-24">
          <h2 className="font-bold text-3xl md:text-5xl mb-6">
            {brandData?.section2_header || "Shop Our Categories"}
          </h2>
          <p className="text-gray-500 mb-16 max-w-2xl mx-auto italic font-serif">
            {brandData?.section2_subheader ||
              "Exploring the intersection of style and comfort."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {brandData?.section2_items?.map((item, index) => (
              <div key={index} className="group flex flex-col items-center">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm mb-6 grayscale hover:grayscale-0 transition-all duration-700">
                  <img
                    src={item.media_url || `/imgs/category-${index + 4}.jpg`}
                    alt={item.title}
                    className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1445205170230-053b830c6039?q=80&w=1000&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <h3 className="font-bold text-xl uppercase tracking-widest mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm italic">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {brandData?.video_url && (
          <div className="bg-black py-24">
            <div className="section-container">
              <div className="relative group w-full overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)] border border-white/5">
                <div className="aspect-video w-full h-full relative z-10 transition-transform duration-1000 group-hover:scale-[1.02]">
                  <video
                    src={brandData.video_url}
                    className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
                    controls
                    preload="metadata"
                    playsInline
                  />
                </div>
                {/* Minimalist fashion overlay */}
                <div className="absolute top-8 left-8 z-20 pointer-events-none">
                  <span className="text-[10px] text-white/40 uppercase tracking-[0.5em] font-light">
                    Spring Summer / 26
                  </span>
                </div>
              </div>
              <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-8">
                 <div className="max-w-xl">
                   <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 lowercase tracking-tight">
                     the collection: {brandData.name}
                   </h2>
                   <p className="text-white/50 text-lg italic font-serif">
                     "Fashion is what you're offered four times a year by designers. And style is what you choose."
                   </p>
                 </div>
                 <div className="hidden md:block w-32 h-px bg-white/20 mb-6" />
              </div>
            </div>
          </div>
        )}

        <section id="about" className="bg-[#F9F7F6] py-24">
          <div className="section-container flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                {brandData?.section3_title || "Our Fashion Philosophy"}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed italic font-serif">
                {brandData?.section3_description ||
                  "We believe that fashion is a form of self-expression and empowerment. Our designs are crafted with passion and precision."}
              </p>
              <Button
                className="px-10 py-7 text-lg uppercase tracking-widest rounded-none border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white transition-all"
                onClick={() =>
                  brandData?.section3_cta_link &&
                  window.open(brandData.section3_cta_link, "_blank")
                }
              >
                {brandData?.section3_cta_text || "Learn More"}
              </Button>
            </div>

            <div className="flex-1 w-full scale-95 hover:scale-100 transition-transform duration-700 shadow-2xl rounded-sm overflow-hidden">
              <img
                src={brandData?.section3_media_url || "/imgs/category-4.jpg"}
                alt="Story image"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop";
                }}
              />
            </div>
          </div>
        </section>

        <footer
          id="contact"
          className="bg-white text-gray-900 border-t pt-24 pb-12"
        >
          <div className="section-container grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Logo + Social */}
            <div className="space-y-8">
              <div className="logo h-10 w-auto">
                {brandData?.logo_url ? (
                  <img
                    src={brandData.logo_url}
                    alt={brandData.name}
                    className="h-full object-contain"
                  />
                ) : (
                  <span className="font-bold text-2xl tracking-tighter uppercase">
                    {brandData?.name}
                  </span>
                )}
              </div>
              <p className="text-gray-500 leading-relaxed font-serif">
                {brandData?.description ||
                  "Curating excellence in fashion since our inception. Redefining style, one piece at a time."}
              </p>
              <div className="flex gap-6">
                {brandData?.facebook_url && (
                  <a
                    href={brandData.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    <FaFacebookF size={20} />
                  </a>
                )}
                {brandData?.youtube_url && (
                  <a
                    href={brandData.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    <FaInstagram size={20} />
                  </a>
                )}
                {brandData?.whatsapp_url && (
                  <a
                    href={`https://wa.me/${brandData.whatsapp_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    <FaTwitter size={20} />
                  </a>
                )}
              </div>
            </div>

            {/* Links */}
            <div className="space-y-6">
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400">
                Navigation
              </h4>
              <ul className="space-y-4 font-medium">
                <li>
                  <a
                    href="#home"
                    className="hover:text-primary transition-colors uppercase tracking-widest text-[11px]"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#shop"
                    className="hover:text-primary transition-colors uppercase tracking-widest text-[11px]"
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-primary transition-colors uppercase tracking-widest text-[11px]"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-6">
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400">
                Client Service
              </h4>
              <ul className="space-y-4 font-medium">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors uppercase tracking-widest text-[11px]"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors uppercase tracking-widest text-[11px]"
                  >
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors uppercase tracking-widest text-[11px]"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-6">
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400">
                Contact Details
              </h4>
              <ul className="space-y-4 text-sm text-gray-500 italic font-serif">
                <li>{brandData?.address || "Flagship Store, Paris"}</li>
                <li>{brandData?.phone || brandData?.whatsapp_url}</li>
                <li>{brandData?.email || brandData?.owner?.email}</li>
              </ul>
            </div>
          </div>

          <div className="section-container border-t pt-10 text-center text-[10px] uppercase tracking-widest text-gray-400">
            <p>
              © {new Date().getFullYear()} {brandData?.name}. Crafted by
              Droffers. All Rights Reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
