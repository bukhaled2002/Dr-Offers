import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import instance from "@/api/axiosInstance";

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

type Catergory = {
  name: string;
  value: string;
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
  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, totalItems);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const { data: brandsResponse, isLoading: brandsLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await instance.get("/brands");
      return res?.data.data as BrandsResponse;
    },
  });

  const brands = brandsResponse?.data ?? [];

  const { data: categories = [] } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await instance.get("/offers/categories");
      return res?.data.data as Catergory[];
    },
  });

  const selectedBrands = searchParams.getAll("brand_id");
  const selectedCategories = searchParams.getAll("category");
  const priceMin = Number(searchParams.get("minPrice")) || 120;
  const priceMax = Number(searchParams.get("maxPrice")) || 600;

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

  const updatePriceRange = (range: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", range[0].toString());
    params.set("maxPrice", range[1].toString());
    navigate({ search: params.toString() });
  };

  return (
    <div className="p-6 md:h-full w-full md:w-64">
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Showing {start} - {end} out of {totalItems} Products
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-4 md:block w-full">
        {/* Price Range */}
        <div className="mb-8 col-span-2 sm:col-span-1">
          <h3 className="text-lg font-semibold mb-4">PRICES</h3>
          <p className="text-sm text-gray-600 mb-2">Range</p>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{priceMin} SAR</span>
            <span>{priceMax} SAR</span>
          </div>
          <Slider
            value={[priceMin, priceMax]}
            onValueChange={updatePriceRange}
            max={600}
            min={120}
            step={1}
            className="w-full"
          />
        </div>

        {/* Brands */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">BRANDS</h3>
          <div className="space-y-3">
            {brandsLoading ? (
              <p>loading...</p>
            ) : (
              (showAllBrands ? brands : brands.slice(0, 4)).map(
                ({ id, brand_name }) => {
                  return (
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
                  );
                }
              )
            )}
          </div>
          {brands.length > 4 && (
            <Button
              variant="link"
              onClick={() => setShowAllBrands((prev) => !prev)}
              className="text-red-500 text-sm p-0 mt-2 h-auto"
            >
              {showAllBrands ? "View less" : `+ ${brands.length - 4} more`}
            </Button>
          )}
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4">CATEGORIES</h3>
          <div className="space-y-3">
            {(showAllCategories ? categories : categories.slice(0, 4)).map(
              ({ name, value }) => (
                <div key={value} className="flex items-center space-x-2">
                  <Checkbox
                    id={value}
                    checked={selectedCategories.includes(value)}
                    onCheckedChange={() => toggleParam("category", value)}
                  />
                  <label
                    htmlFor={value}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {name}
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
                ? "View less"
                : `+ ${categories.length - 4} more`}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
