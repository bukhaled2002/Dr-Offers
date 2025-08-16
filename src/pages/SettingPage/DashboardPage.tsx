import ViewsChart from "@/components/AreaChart";
import ChartBarClick from "@/components/BarChart";
import ProductsTable from "../../components/ProductsTable";
import { useOffers } from "@/hooks/useOffers";
import StatsCards from "@/components/StatsCard";
import { useStats } from "@/hooks/useStats";
import { useAuth } from "@/context/useAuth";

export default function DashboardPage() {
  const { brands } = useAuth();
  const brandId = brands[0]?.id;
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
  console.log(viewsError);
  console.log(viewsLoading);
  console.log(clicks);
  return (
    <main className="py-6 space-y-8">
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
        {/* <ChartBarClick /> */}
        <ChartBarClick days={clicks} />
      </div>
      {/* Active brand deals */}
      {isLoadingDeals && <div>Loading deals...</div>}
      {isErrorDeals && <div>Failed to load deals</div>}
      {!isLoadingDeals && !isErrorDeals && <ProductsTable deals={deals} />}
    </main>
  );
}
