import { brands } from "@/constants";

const BrandsMarquee = () => {
  return (
    <div
      className="bg-[#F6F3F2] py-10 mt-10 overflow-hidden relative border-y border-gray-100"
      dir="ltr"
    >
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#F6F3F2] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#F6F3F2] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee gap-10 items-center pause-on-hover">
        {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
          <img
            key={index}
            src={brand}
            alt="brand-logo"
            className="size-18 object-contain md:size-24 transition-all shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default BrandsMarquee;
