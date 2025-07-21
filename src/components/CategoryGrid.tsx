import { Heart } from "lucide-react"; // Or use any heart icon
import clsx from "clsx"; // Optional, for conditional classes

const categories = [
  {
    id: 1,
    title: "Category 1",
    description: "lorem ipsum",
    image: "/imgs/category-1.png",
    favorite: true,
  },
  {
    id: 2,
    title: "Category 2",
    description: "lorem ipsum",
    image: "/imgs/category-2.png",
    favorite: false,
  },
  {
    id: 3,
    title: "Category 3",
    description: "lorem ipsum",
    image: "/imgs/category-3.png",
    favorite: false,
  },
  {
    id: 4,
    title: "Category 4",
    description: "lorem ipsum",
    image: "/imgs/category-4.png",
    favorite: false,
  },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="bg-[#F1F1F1] rounded-xl shadow-md overflow-hidden flex flex-col items-center h-82 relative"
        >
          <img
            src={cat.image}
            alt={cat.title}
            className="object-cover flex-1 h-24"
          />
          <div className="p-4 text-center bg-white rounded-t-[200px] w-[120%]">
            <h2 className="font-semibold text-lg">{cat.title}</h2>
            <p className="text-sm text-gray-500">{cat.description}</p>
            <Heart
              size={18}
              className={clsx(
                "mt-4 absolute bottom-5 right-5",
                cat.favorite ? "text-red-600" : "text-gray-400"
              )}
              fill={cat.favorite ? "currentColor" : "none"}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
