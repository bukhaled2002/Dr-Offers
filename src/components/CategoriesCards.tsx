import React from "react";
import { Link } from "react-router";

type Category = {
  name: string;
  icon: string;
  to: string;
};

type CategoryCardsProps = {
  categories: Category[];
};

const CategoryCards: React.FC<CategoryCardsProps> = ({ categories }) => {
  return (
    <div className="flex justify-around flex-wrap gap-6">
      {categories.map((cat) => (
        <Link
          to={`/products?category=${cat.to.toLowerCase()}`}
          key={cat.name}
          className="flex flex-col items-center text-sm "
        >
          <div className="h-30 w-30 ">
            <img
              src={cat.icon}
              alt={cat.name}
              className="rounded-full border-2 transition duration-200 hover:shadow-lg cursor-pointer hover:border-primary h-full w-full p-3 object-cover"
            />
          </div>
          <p className="mt-3 font-semibold">{cat.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCards;
