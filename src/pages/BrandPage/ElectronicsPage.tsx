// src/types/swiper.d.ts
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import type { BrandData } from "@/types/api";

interface ElectronicsPageProps {
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
    { title: "Home", href: "#home" },
    { title: "Shop", href: "#shop" },
    { title: "About", href: "#about" },
    { title: "Contact", href: "#contact" },
  ];

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 bg-white shadow-md ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-6">
        <div className="logo h-10 w-auto flex items-center gap-2">
          {brandData?.logo_url ? (
            <img
              src={brandData.logo_url}
              alt={brandData.name}
              className="h-full object-contain"
            />
          ) : (
            <span className="text-xl font-bold uppercase tracking-tighter">
              {brandData?.name}
            </span>
          )}
        </div>
        <ul className="hidden md:flex gap-8 font-semibold text-xs uppercase tracking-widest">
          {navItems.map((item) => (
            <li key={item.title}>
              <a
                href={item.href}
                className="hover:text-primary transition-colors"
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

export default function ElectronicsPage({ brandData }: ElectronicsPageProps) {
  return (
    <>
      <Navbar brandData={brandData} />

      {/* Hero Section */}
      <section
        id="home"
        className="bg-[#F8F9FA] min-h-[calc(100vh-84px)] flex flex-col md:flex-row items-center justify-between"
      >
        <div className="section-container w-full flex flex-col md:flex-row items-center justify-between py-16 md:py-24">
          <div className="text-left max-w-xl">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] uppercase tracking-tighter text-gray-900">
              {brandData?.section1_title || "Cutting Edge Technology"}
            </h1>
            <p className="mb-10 text-gray-600 text-lg leading-relaxed max-w-lg">
              {brandData?.section1_description ||
                "Discover the latest in high-performance electronics. Innovation meets design in every single detail."}
            </p>
            <Button
              className="rounded-none px-10 py-8 text-lg font-bold uppercase tracking-widest hover:scale-105 transition-transform"
              onClick={() =>
                brandData?.section1_cta_link &&
                window.open(brandData.section1_cta_link, "_blank")
              }
            >
              {brandData?.section1_cta_text || "Explore Now"}
            </Button>
          </div>
          <div className="mt-16 md:mt-0 w-full max-w-2xl relative">
            <div className="absolute -inset-4 bg-primary/5 rounded-full blur-3xl" />
            <img
              src={brandData?.section1_media_url || "/imgs/watch-hero.png"}
              alt="Hero product"
              className="w-full h-auto object-contain relative z-10 drop-shadow-2xl"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop";
              }}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="shop" className="py-24 bg-white">
        <div className="section-container text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">
            {brandData?.section2_header || "Featured Collections"}
          </h2>
          <p className="text-gray-500 mb-16 max-w-2xl mx-auto text-lg leading-relaxed">
            {brandData?.section2_subheader ||
              "Explore our wide range of premium gadgets designed for the modern lifestyle."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {brandData?.section2_items?.map((item, index) => (
              <div
                key={index}
                className="group relative h-[450px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={item.media_url || `/imgs/electronics-${index + 1}.jpg`}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1000&auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:via-black/40 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 w-full p-8 text-left">
                  <h3 className="text-white text-2xl font-bold mb-2 uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                    {item.description}
                  </p>
                  <Button
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-black rounded-none uppercase text-xs font-bold tracking-widest px-6 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  >
                    View Product
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {brandData?.video_url && (
        <section className="py-24 bg-[#0A0A0A] overflow-hidden">
          <div className="section-container">
            <div className="relative group w-full bg-slate-900 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(var(--primary-rgb),0.2)] border border-white/5">
              <div className="aspect-video w-full h-full relative z-10 transition-transform duration-1000 group-hover:scale-[1.03]">
                <video
                  src={brandData.video_url}
                  className="w-full h-full object-cover shadow-inner"
                  controls
                  preload="metadata"
                  playsInline
                />
              </div>
              {/* Techy scanline and glow effects */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-20 opacity-20" />
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                  Innovation in Motion
                </h2>
                <div className="w-20 h-1 bg-primary mb-6" />
                <p className="text-gray-400 text-lg font-light leading-relaxed">
                  Experience the precision engineering and cutting-edge design that defines {brandData.name}. Our latest showcase highlights our commitment to excellence.
                </p>
              </div>
              <div className="flex justify-start md:justify-end">
                <div className="inline-flex flex-col items-end">
                  <span className="text-[10px] text-primary font-black uppercase tracking-[0.4em] mb-2">
                    Digital Showcase / v.01
                  </span>
                  <div className="w-48 h-12 border border-white/10 flex items-center px-4 gap-4">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                      Now Streaming Live
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Section */}
      <section id="about" className="bg-black py-24 text-white overflow-hidden">
        <div className="section-container flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 space-y-10">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
              {brandData?.section3_title || "The Sound of Excellence"}
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed font-light">
              {brandData?.section3_description ||
                "Immerse yourself in pure studio-quality sound. Every note, every beat, rendered with absolute precision."}
            </p>
            <Button
              className="bg-white text-black hover:bg-gray-200 rounded-none px-12 py-8 text-lg font-black uppercase tracking-widest"
              onClick={() =>
                brandData?.section3_cta_link &&
                window.open(brandData.section3_cta_link, "_blank")
              }
            >
              {brandData?.section3_cta_text || "Get Yours Now"}
            </Button>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <img
              src={brandData?.section3_media_url || "/imgs/Headphone.png"}
              alt="Featured product"
              className="w-full h-auto object-contain relative z-10 hover:scale-105 transition-transform duration-700 drop-shadow-[0_0_50px_rgba(255,255,255,0.15)]"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop";
              }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-white text-gray-900 border-t pt-24 pb-12"
      >
        <div className="section-container grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Brand Info */}
          <div className="space-y-8">
            <div className="logo h-10 w-auto">
              {brandData?.logo_url ? (
                <img
                  src={brandData.logo_url}
                  alt={brandData.name}
                  className="h-full object-contain"
                />
              ) : (
                <span className="text-2xl font-black uppercase tracking-tighter">
                  {brandData?.name}
                </span>
              )}
            </div>
            <p className="text-gray-500 leading-relaxed">
              {brandData?.description ||
                "Pushing the boundaries of what's possible in consumer electronics. Built for the future, today."}
            </p>
            <div className="flex gap-6">
              {brandData?.facebook_url && (
                <a
                  href={brandData.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  <FaFacebookF size={20} />
                </a>
              )}
              {brandData?.youtube_url && (
                <a
                  href={brandData.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  <FaInstagram size={20} />
                </a>
              )}
              {brandData?.whatsapp_url && (
                <a
                  href={`https://wa.me/${brandData.whatsapp_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  <FaTwitter size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-gray-400">
              Navigation
            </h4>
            <ul className="space-y-4 font-bold text-sm">
              <li>
                <a
                  href="#home"
                  className="hover:text-primary transition-colors"
                >
                  HOME
                </a>
              </li>
              <li>
                <a
                  href="#shop"
                  className="hover:text-primary transition-colors"
                >
                  SHOP
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-primary transition-colors"
                >
                  ABOUT
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-primary transition-colors"
                >
                  CONTACT
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-gray-400">
              Service
            </h4>
            <ul className="space-y-4 font-bold text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  SHIPPING POLICY
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  WARRANTY TERMS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  PRIVACY POLICY
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-gray-400">
              Support
            </h4>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4">
                <MdLocationOn className="text-xl text-primary shrink-0" />
                <span className="text-gray-600 font-medium">
                  {brandData?.address || "Innovation Hub, Silicon Valley"}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <MdPhone className="text-xl text-primary shrink-0" />
                <span className="text-gray-600 font-medium">
                  {brandData?.phone || brandData?.whatsapp_url}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <MdEmail className="text-xl text-primary shrink-0" />
                <a
                  href={`mailto:${brandData?.email}`}
                  className="text-gray-600 font-medium hover:text-primary transition-colors"
                >
                  {brandData?.email || brandData?.owner?.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-container border-t pt-10 text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
          <p>
            © {new Date().getFullYear()} {brandData?.name}. Driven by Droffers.
            Powered by Innovation.
          </p>
        </div>
      </footer>
    </>
  );
}
