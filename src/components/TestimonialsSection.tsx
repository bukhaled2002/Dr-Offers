import { StarIcon } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  message: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Fatima Al-Qahtani",
    role: "Brand Owner",
    avatar: "/imgs/avatar.jpg",
    message:
      "The quality of the design is top-notch, and I love how organized the files are. It’s easy to find what I need.",
  },
  {
    name: "Fatima Al-Qahtani",
    role: "Brand Owner",
    avatar: "/imgs/avatar.jpg",
    message:
      "Perfect for quick prototyping! The designs are professional and work seamlessly with my workflow.",
  },
  {
    name: "Fatima Al-Qahtani",
    role: "Brand Owner",
    avatar: "/imgs/avatar.jpg",
    message:
      "I was blown away by how complete this UI Kit is. It has everything I need, from assets to components.",
  },
  {
    name: "Fatima Al-Qahtani",
    role: "Brand Owner",
    avatar: "/imgs/avatar.jpg",
    message:
      "Amazing work! The color schemes are vibrant, and the icons fit perfectly with all my projects.",
  },
  {
    name: "Fatima Al-Qahtani",
    role: "Brand Owner",
    avatar: "/imgs/avatar.jpg",
    message:
      "This kit exceeded my expectations! The components are versatile and make implementation much easier.",
  },
  {
    name: "Fatima Al-Qahtani",
    role: "Brand Owner",
    avatar: "/imgs/avatar.jpg",
    message:
      "This kit exceeded my expectations! The components are versatile and make implementation much easier.",
  },
];

export function TestimonialGrid() {
  return (
    <section className="px-4 pb-12 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">
        Our customers Success Stories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
            <div className="flex gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className="w-4 h-4 text-orange-400 fill-orange-400"
                />
              ))}
            </div>
            <p className="text-sm text-gray-700">{t.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
