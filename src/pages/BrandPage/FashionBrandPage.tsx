import { IoSearchOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { Heart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const categories = [
  {
    id: 1,
    title: "Category 1",
    image: "/imgs/category-4.jpg",
  },
  {
    id: 2,
    title: "Category 2",
    image: "/imgs/category-5.jpg",
  },
  {
    id: 2,
    title: "Category 2",
    image: "/imgs/category-5.jpg",
  },
  {
    id: 2,
    title: "Category 2",
    image: "/imgs/category-5.jpg",
  },
  {
    id: 2,
    title: "Category 2",
    image: "/imgs/category-5.jpg",
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

const features = [
  {
    id: 1,
    title: "Category 1",
    subtitle: "You only order through the app",
    image: "/imgs/category-4.jpg",
  },
  {
    id: 2,
    title: "Category 2",
    subtitle: "Delivery will be on time",
    image: "/imgs/category-5.jpg",
  },
  {
    id: 3,
    title: "Category 3",
    subtitle: "The best quality of food for you",
    image: "/imgs/category-6.jpg",
  },
];

export default function FashionBrandPage() {
  return (
    <>
      <Navbar />
      <main>
        <section
          id="home"
          className="flex overflow-hidden bg-cover bg-fixed justify-end p-20 pt-28 "
          style={{
            height: "calc(100vh - 84px)",
            backgroundImage: "url('/imgs/hero-2.jpg')",
            backgroundPosition: "center 70%",
          }}
        >
          <div className="bg-[#FFF3E3B2] w-[65vw] lg:w-[40vw] mx-auto lg:mx-0 rounded-md p-8 pt-32 h-fit">
            <h2 className="text-5xl font-bold text-primary max-w-[80%]">
              Main title to be Added here
            </h2>
            <p className="font-semibold mt-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              laboriosam, atque facere libero explicabo provident.
            </p>
            <Button className="mt-4 p-6 px-10 rounded-none">CTA1</Button>
          </div>
        </section>

        <section
          id="shop"
          className="section-container text-center min-h-screen pt-16 pb-8"
        >
          <h2 className="font-bold text-4xl mt-6">Browse The Categories</h2>
          <p className="text-gray-500 mt-6 font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
            adipisci.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 mt-10 text-center max-w-4xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="flex flex-col items-center gap-2"
              >
                <div className="bg-red-500 h-96 w-72 overflow-hidden rounded-md">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="object-cover h-full w-full"
                  />
                </div>
                <h3 className="font-bold text-2xl mt-2">{feature.title}</h3>
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
              <h2 className="font-bold text-3xl">Second Title Here</h2>
              <p className="mt-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae fugiat iure officiis in, nihil necessitatibus.
              </p>
              <Button className="w-28 mt-4">CTA2</Button>
            </div>
          </div>

          <div className="flex-1">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              // pagination={{ clickable: true }}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
              }}
              className="w-full md:w-[500px] h-[300px] md:h-[500px] "
            >
              {categories.map((cat, index) => (
                <SwiperSlide key={cat.id}>
                  <div
                    className="relative h-full bg-cover bg-center rounded-lg"
                    style={{ backgroundImage: `url(${cat.image})` }}
                  >
                    <div className="absolute  bottom-3 left-3 flex items-end gap-2">
                      <div className="bg-white/65 p-4">
                        <p className="text-xs text-gray-500 ">0{index + 1} —</p>
                        <h3 className="text-lg font-semibold capitalize ">
                          {cat.title}
                        </h3>
                      </div>
                      <div className="bg-[#782d19] text-white w-8 h-8 flex items-center justify-center cursor-pointer">
                        <span className="text-lg">→</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <footer className="bg-white text-black border-t px-5 md:px-20 pt-12 text-sm mt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
            {/* Logo + Social */}
            <div>
              <div className="text-lg font-bold mb-4">Logo</div>
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
