import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import ElectronicsPage from "./ElectronicsPage";
import ErrorPage from "./ErrorPage";
import FashionBrandPage from "./FashionBrandPage";
import FoodBrandPage from "./FoodBrandPage";
import { useQuery } from "@tanstack/react-query";
import instance from "@/api/axiosInstance";
import type { BrandData } from "@/types/api";

const categoryComponentMap = {
  food: (data: BrandData) => <FoodBrandPage brandData={data} />,
  fashion: (data: BrandData) => <FashionBrandPage brandData={data} />,
  electronics: (data: BrandData) => <ElectronicsPage brandData={data} />,
} as const;

export default function BrandPage() {
  const { "brand-slug": brandSlug } = useParams();
  const pendingClicks = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const viewSentRef = useRef(false); // prevent multiple view posts

  const { data, isLoading, isError } = useQuery({
    queryKey: ["brand", brandSlug],
    queryFn: async () => {
      const res = await instance.get(`brands/${brandSlug}/templates`);
      console.log(res);
      return res.data;
    },
    enabled: !!brandSlug,
  });

  // 👁️ Track view once
  useEffect(() => {
    const sendView = async () => {
      const brandId = data?.data?.id;
      if (!brandId || viewSentRef.current) return;

      try {
        await instance.post(`/brands/${brandId}/views`);
        console.log(`View recorded for brand ID: ${brandId}`);
        viewSentRef.current = true;
      } catch (err) {
        console.error("Failed to send view:", err);
      }
    };

    sendView();
  }, [data?.data?.id]);

  // 🖱️ Track clicks (batched)
  useEffect(() => {
    const sendClicks = async () => {
      const brandId = data?.data?.id;
      if (!brandId || pendingClicks.current === 0) return;

      const count = pendingClicks.current;
      pendingClicks.current = 0;

      console.log(`Sending ${count} clicks to brand ID: ${brandId}`);

      try {
        await instance.post(`/brands/${brandId}/clicks`, {
          count,
        });
      } catch (err) {
        console.error("Failed to send clicks:", err);
        pendingClicks.current += count;
      }
    };

    const handleClick = () => {
      pendingClicks.current += 1;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(sendClicks, 1000);
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("beforeunload", sendClicks);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("beforeunload", sendClicks);
      sendClicks(); // flush on unmount
    };
  }, [data?.data?.id]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data?.data) return <ErrorPage />;

  const brandData: BrandData = data.data[0];

  const category = "food";

  const Component = categoryComponentMap[category];

  if (!Component) return <ErrorPage />;

  return Component(brandData);
}
