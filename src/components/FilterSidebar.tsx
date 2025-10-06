import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import instance from "@/api/axiosInstance";
import { useTranslation } from "react-i18next";

type Brand = {
  id: string;
  brand_name: string;
};

type BrandsResponse = {
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: Brand[];
};

type FilterSidebarProps = {
  totalItems: number;
  currentPage: number;
  perPage: number;
};

const FilterSidebar = ({
  totalItems = 10,
  currentPage = 1,
  perPage = 20,
}: FilterSidebarProps) => {
  const { t, i18n } = useTranslation();
  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, totalItems);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // 🟢 Local state for slider (not directly updating URL)
  const [priceRange, setPriceRange] = useState<number[]>([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 10000,
  ]);

  const { data: brandsResponse, isLoading: brandsLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await instance.get("/brands");
      return res?.data.data as BrandsResponse;
    },
  });

  const brands = brandsResponse?.data ?? [];

  const categories = [
    "groceries",
    "premium_fruits",
    "home_kitchen",
    "fashion",
    "electronics",
    "beauty",
    "home_improvement",
    "sports_toys_luggage",
    "mobile",
    "cosmetics",
    "furniture",
    "watches",
    "food",
    "accessories",
  ];

  const selectedBrands = searchParams.getAll("brand_id");
  const selectedCategories = searchParams.getAll("category");

  const toggleParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const values = new Set(params.getAll(key));
    if (values.has(value)) {
      values.delete(value);
    } else {
      values.add(value);
    }
    params.delete(key);
    values.forEach((v) => params.append(key, v));
    navigate({ search: params.toString() });
  };

  // 🟢 Trigger navigation only when user finishes sliding
  const commitPriceRange = (range: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", range[0].toString());
    params.set("maxPrice", range[1].toString());
    navigate({ search: params.toString() });
  };

  return (
    <div className="p-6 md:h-full w-full md:w-64">
      <div className="mb-6">
        <p className="text-sm text-gray-600 w-60">
          {t("filter.showing")} {start} - {end} {t("filter.outOf")} {totalItems}{" "}
          {t("filter.products")}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-4 md:block w-full">
        {/* Price Range */}
        <div className="mb-8 col-span-2 sm:col-span-1">
          <h3 className="text-lg font-semibold mb-4">{t("filter.prices")}</h3>
          <p className="text-sm text-gray-600 mb-2">{t("filter.range")}</p>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              {priceRange[0]} {t("filter.currency")}
            </span>
            <span>
              {priceRange[1]} {t("filter.currency")}
            </span>
          </div>
          <div>
            <Slider
              dir={i18n.language === "ar" ? "rtl" : "ltr"}
              value={priceRange}
              max={1000}
              min={0}
              step={1}
              className="w-full"
              // 🟢 Update local state while sliding
              onValueChange={(val) => setPriceRange(val)}
              // 🟢 Trigger request only when user releases
              onValueCommit={(val) => commitPriceRange(val)}
            />
          </div>
        </div>

        {/* Brands */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">{t("filter.brands")}</h3>
          <div className="space-y-3">
            {brandsLoading ? (
              <p>{t("filter.loading")}</p>
            ) : (
              (showAllBrands ? brands : brands.slice(0, 4)).map(
                ({ id, brand_name }) => (
                  <div key={id} className="flex items-center space-x-2">
                    <Checkbox
                      id={id}
                      checked={selectedBrands.includes(`${id}`)}
                      onCheckedChange={() => toggleParam("brand_id", `${id}`)}
                    />
                    <label
                      htmlFor={id}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {brand_name}
                    </label>
                  </div>
                )
              )
            )}
          </div>
          {brands.length > 4 && (
            <Button
              variant="link"
              onClick={() => setShowAllBrands((prev) => !prev)}
              className="text-red-500 text-sm p-0 mt-2 h-auto"
            >
              {showAllBrands
                ? t("filter.viewLess")
                : t("filter.viewMore", { count: brands.length - 4 })}
            </Button>
          )}
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {t("filter.categories")}
          </h3>
          <div className="space-y-3">
            {(showAllCategories ? categories : categories.slice(0, 4)).map(
              (category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => toggleParam("category", category)}
                  />
                  <label
                    htmlFor={category}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {t(`All_Categories.${category}`)}
                  </label>
                </div>
              )
            )}
          </div>
          {categories.length > 4 && (
            <Button
              variant="link"
              onClick={() => setShowAllCategories((prev) => !prev)}
              className="text-red-500 text-sm p-0 mt-2 h-auto"
            >
              {showAllCategories
                ? t("filter.viewLess")
                : t("filter.viewMore", { count: categories.length - 4 })}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
