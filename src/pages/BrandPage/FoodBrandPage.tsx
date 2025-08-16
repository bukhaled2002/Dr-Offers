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
  console.log(brandData);
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
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      } ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="section-container flex items-center justify-between py-7">
        <div className="logo font-bold text-lg">
          {brandData?.name || "Logo"}
        </div>
        <ul className="flex gap-5 items-center">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={item.href} className="cursor-pointer">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
        <IoSearchOutline size={20} />
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
          className="section-container pt-28 h-screen flex justify-between items-start overflow-hidden"
          style={{ height: "calc(100vh - 84px)" }}
        >
          <div className="flex flex-col z-10 md:max-w-md">
            <h1 className="text-6xl font-bold mb-4 leading-20">
              {brandData?.section1_title || "Main title to be added Here"}
            </h1>
            <p className="mb-6 text-gray-700 leading-8">
              {brandData?.section1_description ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit fugit architecto doloremque cum nulla temporibus ipsam quisquam"}
            </p>
            <Button
              className="rounded-full w-fit"
              onClick={() =>
                window.open(brandData?.section1_cta_link, "_blank")
              }
            >
              {brandData?.section1_cta_text || "CTA 1"}
            </Button>
          </div>
          <div className="hidden md:block w-full max-w-[500px]">
            <img
              src={brandData?.section1_media_url || "/imgs/img-hero.png"}
              alt=""
              className="w-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://lh3.googleusercontent.com/proxy/R9dXqanxVP2kpX9iSZxr3LsxIAfQhpkR6GbJW0EENe9zMmPYJUiuslNRReZJIT5n1wmExGlEEgh2v4T7i2gxgU505LP5XxTZmjpSQnjDvoDbzCPy6WXaZg7NJwssL7KT1DZ88VpIYdUcZnNmmw";
              }}
            />
          </div>
          <img
            src="/imgs/shapes.svg"
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover z-[-1] pointer-events-none"
          />
        </section>

        <section
          id="menu"
          className="section-container text-center min-h-screen pt-16"
        >
          <h2 className="font-bold text-4xl mt-6">
            {brandData?.section2_header || "Second Title Here"}
          </h2>
          <p className="text-gray-500 mt-6 font-semibold">
            {brandData?.section2_subheader ||
              "Product Quality Is Our Priority, And Always Guarantees Halal And Safety Until It Is In Your Hands."}
          </p>
          <CategoryGrid
            items={brandData?.section2_items?.map((item, index) => {
              return {
                id: index,
                title: item.title,
                description: item.description,
                media_url: item.media_url,
                favorite: false,
              };
            })}
            fallbackImage="https://lh3.googleusercontent.com/proxy/R9dXqanxVP2kpX9iSZxr3LsxIAfQhpkR6GbJW0EENe9zMmPYJUiuslNRReZJIT5n1wmExGlEEgh2v4T7i2gxgU505LP5XxTZmjpSQnjDvoDbzCPy6WXaZg7NJwssL7KT1DZ88VpIYdUcZnNmmw"
          />
        </section>

        <div className="section-container py-16 h-[60vh]">
          <div
            className="flex relative overflow-hidden w-full h-full bg-cover bg-center rounded-xl justify-center items-center"
            style={{
              backgroundImage: `url('${
                brandData?.section3_media_url || "/imgs/splash-2.jpg"
              }')`,
            }}
          >
            <div className="overlay absolute top-0 left-0 w-full h-full bg-black/70" />
            <div className="z-10 text-center">
              <h5 className="text-white font-bold text-3xl mb-4">
                {brandData?.section3_title ||
                  "Join our member and get discount up to 50%"}
              </h5>
              <p className="text-white mb-4">
                {brandData?.section3_description ||
                  "Get notified about the latest deals and exclusive offers."}
              </p>
              <Button
                className="bg-white text-black hover:bg-gray-100"
                onClick={() =>
                  window.open(brandData?.section3_cta_link, "_blank")
                }
              >
                {brandData?.section3_cta_text || "Subscribe Now"}
              </Button>
            </div>
          </div>
        </div>

        <footer
          style={{ backgroundImage: "url('/imgs/footer-img.svg')" }}
          className="md:px-30 px-15 text-gray-700 pt-12 border-t object-cover"
        >
          <div className=" grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
            {/* Logo + Address + Social */}
            <div>
              <div className="text-lg font-bold mb-2">
                {brandData?.name || "Logo"} 🍜
              </div>
              <p className="text-sm mb-4">
                {brandData?.owner?.email ||
                  "Jalan Semangka Raya, Telaga Murni, Cikarang Barat, Kab. Bekasi"}
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  aria-label="Instagram"
                  className=" bg-white rounded-full p-2 group hover:bg-primary transition"
                >
                  <FaInstagram className="w-6 h-6 text-primary transition group-hover:text-white" />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className=" bg-white rounded-full p-2 group hover:bg-primary transition"
                >
                  <FaFacebookF className="w-6 h-6 text-primary transition group-hover:text-white" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className=" bg-white rounded-full p-2 group hover:bg-primary transition"
                >
                  <FaTwitter className="w-6 h-6 text-primary transition group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Career</a>
                </li>
                <li>
                  <a href="#">How It Work</a>
                </li>
              </ul>
            </div>

            {/* Policy Links */}
            <div>
              <h4 className="font-semibold mb-3">Policy</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
                <li>
                  <a href="#">Shipping</a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-3">Get In Touch</h4>
              <ul className="space-y-2 text-sm">
                <li>+62 896 7311 2766</li>
                <li>{brandData?.owner?.email || "food@example.com"}</li>
              </ul>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="text-center  mt-10 w-full border-t-2 border-[#1D1D1D80] p-10">
            © Powered By Droffers ALL RIGHT RESERVED.
          </div>
        </footer>
      </main>
    </>
  );
}
