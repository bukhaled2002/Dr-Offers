import ViewsChart from "@/components/AreaChart";
import ChartBarClick from "@/components/BarChart";
import ProductsTable from "../../components/ProductsTable";
import { useOffers } from "@/hooks/useOffers";
import StatsCards from "@/components/StatsCard";
import { useStats } from "@/hooks/useStats";
import { useAuth } from "@/context/useAuth";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { brands } = useAuth();
  const brand = brands[0];
  const brandId = brand?.id;

  const {
    deals,
    isLoading: isLoadingDeals,
    error: isErrorDeals,
  } = useOffers({ myOffers: true, perPage: 50 });

  const {
    analytics,
    clicks,
    views,
    analyticsError,
    analyticsLoading,
    viewsError,
    viewsLoading,
  } = useStats(brandId);
  console.log(viewsError, viewsLoading);
  return (
    <main className="py-6 space-y-8">
      {/* Button to view brand template */}
      {brandId && (
        <div className="mt-6">
          <Link to={`/brands/${brandId}`} className="">
            <button className="px-4 py-2 bg-primary cursor-pointer text-white rounded hover:bg-primary/90">
              View Brand
            </button>
          </Link>
        </div>
      )}
      {/* Analytics number */}
      {analyticsLoading && <div>Loading stats...</div>}
      {analyticsError && <div>Failed to load stats</div>}
      {!analyticsLoading && !analyticsError && (
        <StatsCards
          clicks={analytics?.clicks}
          views={analytics?.views}
          products={analytics?.products}
          users={analytics?.users}
        />
      )}

      {/* Charts */}
      <div className="flex items-center gap-10 flex-col md:flex-row">
        <ViewsChart views={views} />
        <ChartBarClick days={clicks} />
      </div>

      {/* Active brand deals */}
      {isLoadingDeals && <div>Loading deals...</div>}
      {isErrorDeals && <div>Failed to load deals</div>}
      {!isLoadingDeals && !isErrorDeals && <ProductsTable deals={deals} />}
    </main>
  );
}
