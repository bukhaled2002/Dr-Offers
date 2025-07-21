import ElectronicsPage from "./ElectronicsPage";
import ErrorPage from "./ErrorPage";
import FashionBrandPage from "./FashionBrandPage";
import FoodBrandPage from "./FoodBrandPage";

const categoryComponentMap = {
  food: <FoodBrandPage />,
  fashion: <FashionBrandPage />,
  electronics: <ElectronicsPage />,
} as const;

export default function BrandPage() {
  const category: keyof typeof categoryComponentMap = "fashion";

  return categoryComponentMap[category] ?? <ErrorPage />;
}
