import { useLocation } from "react-router-dom";
import DealsGrid from "@/components/DealsGrid";
import FilterSidebar from "@/components/FilterSidebar";
import Pagination from "@/components/Pagination";
import { useEffect } from "react";
import { useOffers } from "@/hooks/useOffers";

export default function ProductsPage() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  const { deals, meta, totalPages, isLoading, error } = useOffers();

  console.log(meta);
  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      <FilterSidebar
        totalItems={meta?.total || 0}
        currentPage={meta?.currentPage || 1}
        perPage={meta?.perPage || 10}
      />
      <section className="section-container mt-4 flex flex-col">
        <DealsGrid
          deals={deals}
          loading={isLoading}
          error={error ?? undefined}
        />
        <Pagination totalPages={totalPages} />
      </section>
    </main>
  );
}
