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

function Navbar() {
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
      <div className="section-container flex items-center justify-between py-7">
        <div className="logo font-bold text-lg">Logo</div>
        <ul className="flex gap-5 items-center">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={item.href} className="cursor-pointer">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <IoSearchOutline size={20} />
          <Heart />
        </div>
      </div>
    </div>
  );
}

export default function FashionBrandPage({ brandData }: FashionBrandPageProps) {
  return (
    <>
      <Navbar />
      <main>
        <section
          id="home"
          className="flex overflow-hidden bg-cover bg-fixed justify-end p-20 pt-28 "
          style={{
            height: "calc(100vh - 84px)",
            backgroundImage: `url('${
              brandData?.section1_media_url || "/imgs/hero-2.jpg"
            }')`,
            backgroundPosition: "center 70%",
          }}
        >
          <div className="bg-[#FFF3E3B2] w-[65vw] lg:w-[40vw] mx-auto lg:mx-0 rounded-md p-8 pt-32 h-fit">
            <h2 className="text-5xl font-bold text-primary max-w-[80%]">
              {brandData?.section1_title || "Main title to be Added here"}
            </h2>
            <p className="font-semibold mt-4">
              {brandData?.section1_description ||
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam laboriosam, atque facere libero explicabo provident."}
            </p>
            <Button
              className="mt-4 p-6 px-10 rounded-none"
              onClick={() =>
                window.open(brandData?.section1_cta_link, "_blank")
              }
            >
              {brandData?.section1_cta_text || "CTA1"}
            </Button>
          </div>
        </section>

        <section
          id="shop"
          className="section-container text-center min-h-screen pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8"
        >
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-4 sm:mt-6 leading-tight">
            {brandData?.section2_header || "Browse The Categories"}
          </h2>
          <p className="text-gray-500 mt-4 sm:mt-6 font-semibold text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            {brandData?.section2_subheader ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, adipisci."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mt-8 sm:mt-10 lg:mt-12 max-w-7xl mx-auto">
            {brandData?.section2_items?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 sm:gap-4 group"
              >
                <div className="relative bg-red-500 h-48 sm:h-64 md:h-72 lg:h-80 w-full max-w-xs overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={item.media_url || `/imgs/category-${index + 4}.jpg`}
                    alt={item.title}
                    className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://lh3.googleusercontent.com/proxy/R9dXqanxVP2kpX9iSZxr3LsxIAfQhpkR6GbJW0EENe9zMmPYJUiuslNRReZJIT5n1wmExGlEEgh2v4T7i2gxgU505LP5XxTZmjpSQnjDvoDbzCPy6WXaZg7NJwssL7KT1DZ88VpIYdUcZnNmmw";
                    }}
                  />
                </div>
                <h3 className="font-bold text-lg sm:text-xl md:text-2xl mt-2 sm:mt-3 text-center leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base text-center max-w-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="menu"
          className="px-5 md:px-15 text-center  pt-8 pb-6 bg-[#FCF8F3] flex flex-col md:flex-row gap-6"
        >
          <div className="flex-1 flex items-center justify-center px-6 md:px-20 my-auto">
            <div className="h-full">
              <h2 className="font-bold text-3xl">
                {brandData?.section3_title || "Second Title Here"}
              </h2>
              <p className="mt-5">
                {brandData?.section3_description ||
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae fugiat iure officiis in, nihil necessitatibus."}
              </p>
              <Button
                className="w-28 mt-4"
                onClick={() =>
                  window.open(brandData?.section3_cta_link, "_blank")
                }
              >
                {brandData?.section3_cta_text || "CTA2"}
              </Button>
            </div>
          </div>

          <div className="flex-1">
            <img
              src={brandData?.section3_media_url || "/imgs/category-4.jpg"}
              alt="Section 3"
              className="w-full md:w-[500px] h-[300px] md:h-[500px] object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src =
                  "https://lh3.googleusercontent.com/proxy/R9dXqanxVP2kpX9iSZxr3LsxIAfQhpkR6GbJW0EENe9zMmPYJUiuslNRReZJIT5n1wmExGlEEgh2v4T7i2gxgU505LP5XxTZmjpSQnjDvoDbzCPy6WXaZg7NJwssL7KT1DZ88VpIYdUcZnNmmw";
              }}
            />
          </div>
        </section>

        <footer className="bg-white text-black border-t px-5 md:px-20 pt-12 text-sm mt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
            {/* Logo + Social */}
            <div>
              <div className="text-lg font-bold mb-4">
                {brandData?.name || "Logo"}
              </div>
              <div className="flex gap-4 mb-6">
                <FaInstagram className="text-[#944B28] hover:text-black cursor-pointer" />
                <FaFacebookF className="text-[#944B28] hover:text-black cursor-pointer" />
                <FaTwitter className="text-[#944B28] hover:text-black cursor-pointer" />
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-gray-500 font-semibold mb-2">Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Shop</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="text-gray-500 font-semibold mb-2">Help</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#">Payment Options</a>
                </li>
                <li>
                  <a href="#">Returns</a>
                </li>
                <li>
                  <a href="#">Privacy Policies</a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-gray-500 font-semibold mb-2">Newsletter</h4>
              <form className="flex border-b border-black max-w-xs">
                <input
                  type="email"
                  placeholder="Enter Your Email Address"
                  className="bg-transparent outline-none flex-1 py-1"
                />
                <button type="submit" className="font-bold ml-2 text-sm">
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="text-left border-t pt-6 pb-10 text-xs">
            © Powered By Droffers ALL RIGHT RESERVED.
          </div>
        </footer>
      </main>
    </>
  );
}
