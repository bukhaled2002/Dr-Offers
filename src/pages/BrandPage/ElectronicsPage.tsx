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

const features = [
  {
    id: 1,
    title: "Category 1",
    image: "/imgs/electronics-1.jpg",
  },
  {
    id: 2,
    title: "Category 2",
    image: "/imgs/electronics-2.jpg",
  },
  {
    id: 3,
    title: "Category 3",
    image: "/imgs/electronics-3.jpg",
  },
];

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
        <div className="text-xl font-bold">Logo</div>
        <ul className="flex gap-6">
          {navItems.map((item) => (
            <li key={item.title}>
              <a href={item.href} className="text-sm hover:underline">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <IoSearchOutline size={20} />
          <Heart />
        </div>
      </div>
    </div>
  );
}

export default function ElectronicsPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="bg-white py-16 md:py-24 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 section-container min-h-screen"
      >
        <div className="text-left max-w-xl self-start ">
          <h1 className="text-5xl md:text-5xl mt-16 font-bold mb-4 leading-16">
            Main Title to be <br /> Added Here
          </h1>
          <p className="mb-6 text-gray-600 mt-15">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
          <Button className="rounded-sm px-6 py-3">CTA1</Button>
        </div>
        <div className="hidden md:block mr-20 h-full">
          <img
            src="/imgs/watch-hero.png"
            alt="Hero product"
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      {/* Categories */}
      <section
        id="shop"
        className="py-20 text-center bg-white px-4 max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-3">Browse The Categories</h2>
        <p className="text-gray-500 mb-10">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut elit
          tellus, luctus nec ullamcorper.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="items-center relative h-[360px] rounded-lg overflow-hidden"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full object-cover absolute top-0 left-0 h-full z-0"
              />
              <div className="font-semibold mt-2 z-2 absolute bottom-0 left-0 bg-black/40 w-full h-15 flex  items-center p-5">
                <span className="text-white"> {feature.title}</span>
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-6 px-6 py-3 rounded-sm">See more</Button>
      </section>

      {/* Featured Slider */}
      <section
        id="menu"
        className="px-6 text-center py-16 flex flex-col md:flex-row gap-6 max-w-7xl mx-auto"
      >
        <div className="flex-1 flex items-center justify-center px-6">
          <div>
            <h2 className="text-3xl font-bold">Second title Here</h2>
            <p className="mt-5 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae fugiat iure officiis in, nihil necessitatibus.
            </p>
            <Button className="w-28 mt-4">CTA2</Button>
          </div>
        </div>
        <div className="hidden md:block mr-20 h-full">
          <img
            src="/imgs/Headphone.png"
            alt="Hero product"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* <div className="flex-1">
          <div className="w-full md:w-[500px] h-[300px] md:h-[500px]"></div>
        </div> */}
      </section>

      {/* Footer */}
      <footer className="bg-white text-black border-t px-6 pt-12 text-sm mt-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 max-w-7xl mx-auto">
          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-base mb-3">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MdLocationOn className="text-lg mt-1" />
                <span>Naya Gaun, Pokhara-15, PKR 33700</span>
              </li>
              <li className="flex items-center gap-2">
                <MdPhone className="text-lg" />
                <span>+977 9806771233</span>
              </li>
              <li className="flex items-center gap-2">
                <MdEmail className="text-lg" />
                <span>bazaartgadget2234@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Product</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social + Customer Service */}
          <div>
            <h4 className="font-semibold text-base mb-3">Social Handles</h4>
            <div className="flex gap-4 mb-4">
              <FaInstagram className="text-[#944B28] hover:text-black cursor-pointer" />
              <FaTwitter className="text-[#944B28] hover:text-black cursor-pointer" />
              <FaFacebookF className="text-[#944B28] hover:text-black cursor-pointer" />
            </div>
            <h4 className="font-semibold text-base mb-3">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#">Terms of Use</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Report Issues</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-base mb-3">
              Subscribe to our News Letter
            </h4>
            <p className="mb-3 text-sm">
              Sign up to be the first to receive latest news about our products.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="border border-gray-300 rounded px-3 py-2 outline-none text-sm"
              />
              <button
                type="submit"
                className="bg-[#944B28] text-white font-medium text-sm px-4 py-2 rounded inline-flex items-center justify-center w-fit"
              >
                Subscribe <span className="ml-2">→</span>
              </button>
            </form>
          </div>
        </div>

        <div className="text-left border-t pt-6 pb-10 text-xs max-w-7xl mx-auto">
          © Powered By Droffers ALL RIGHT RESERVED.
        </div>
      </footer>
    </>
  );
}
