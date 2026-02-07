import { useLocation } from "react-router-dom";
import DealsGrid, { DealsGridSkeleton } from "@/components/DealsGrid";
import FilterSidebar from "@/components/FilterSidebar";
import Pagination from "@/components/Pagination";
import { useEffect, Suspense } from "react";
import { useOffers } from "@/hooks/useOffers";

const ProductsContent = () => {
  const { deals, totalPages, error } = useOffers();

  return (
    <>
      <DealsGrid deals={deals} error={error ?? undefined} />
      <Pagination totalPages={totalPages} />
    </>
  );
};

export default function ProductsPage() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  // We still need meta for the sidebar, but meta is returned from useOffers.
  // This is a bit tricky with Suspense if we want the sidebar to be visible while loading deals.
  // For now, let's keep it simple and suspend the whole content area.
  // If we wanted to keep the sidebar static, we'd need another way to get meta or use useQuery (non-suspense) for meta.

  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      <FilterSidebar
        totalItems={0} // This will be updated when content loads, or we can use another hook for meta
        currentPage={1}
        perPage={10}
      />
      <section className="section-container mt-4 flex flex-col">
        <Suspense fallback={<DealsGridSkeleton />}>
          <ProductsContent />
        </Suspense>
      </section>
    </main>
  );
}
