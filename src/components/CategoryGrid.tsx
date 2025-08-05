import { Heart } from "lucide-react"; // Or use any heart icon
import clsx from "clsx"; // Optional, for conditional classes

interface CategoryItem {
  id?: number;
  title: string;
  description: string;
  media_url?: string;
  image?: string;
  favorite?: boolean;
}

interface CategoryGridProps {
  items?: CategoryItem[];
  fallbackImage?: string;
}

export default function CategoryGrid({
  items,
  fallbackImage,
}: CategoryGridProps) {
  const defaultFallback =
    "https://lh3.googleusercontent.com/proxy/R9dXqanxVP2kpX9iSZxr3LsxIAfQhpkR6GbJW0EENe9zMmPYJUiuslNRReZJIT5n1wmExGlEEgh2v4T7i2gxgU505LP5XxTZmjpSQnjDvoDbzCPy6WXaZg7NJwssL7KT1DZ88VpIYdUcZnNmmw";

  // إذا لم تكن هناك بيانات من API، لا تعرض شيئاً
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
      {items.map((cat, index) => (
        <div
          key={cat.id || index}
          className="bg-[#F1F1F1] rounded-xl shadow-md overflow-hidden flex flex-col items-center h-82 relative"
        >
          <img
            src={cat.media_url || defaultFallback}
            alt={cat.title}
            className="object-cover flex-1 h-full"
            onError={(e) => {
              e.currentTarget.src = fallbackImage || defaultFallback;
            }}
          />
          <div className="px-10 pt-5 pb-4 text-center bg-white rounded-t-[200px] w-full absolute bottom-0">
            <h2 className="font-semibold text-lg">{cat.title}</h2>
            <p className="text-sm text-gray-500">{cat.description}</p>
            <Heart
              size={16}
              className={clsx(
                "transition-colors duration-200",
                cat.favorite ? "text-red-600 fill-current" : "text-gray-600"
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
