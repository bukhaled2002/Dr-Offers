import ViewsChart from "@/components/AreaChart";
import ChartBarClick from "@/components/BarChart";
import ProductsTable from "../../components/ProductsTable";
import { useOffers } from "@/hooks/useOffers";
import StatsCards from "@/components/StatsCard";
import { useStats } from "@/hooks/useStats";
import { useAuth } from "@/context/useAuth";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import instance from "@/api/axiosInstance";

export default function DashboardPage() {
  const { t } = useTranslation();
  const { brands } = useAuth();
  const brand = brands[0];
  const brandId = brand?.id;
  const [brandHasTemplate, setBrandHasTemplate] = useState(false);

  useEffect(() => {
    const checkTemplates = async () => {
      if (!brandId) return;

      try {
        const res = await instance.get(`/brands/${brandId}/templates`);
        setBrandHasTemplate(res.data.data.length > 0);
      } catch (err) {
        console.error("Failed to fetch templates:", err);
      }
    };

    checkTemplates();
  }, [brandId]);
  const {
    deals,
    isLoading: isLoadingDeals,
    error: isErrorDeals,
  } = useOffers({ myOffers: true, perPage: 50 });

  const { analytics, clicks, views, analyticsError, analyticsLoading } =
    useStats(brandId);

  return (
    <main className="py-6 space-y-8">
      {/* Brand Button */}
      {brandId && brandHasTemplate && (
        <div className="mt-6">
          <Link to={`/brands/${brandId}`}>
            <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
              {t("dashboard.viewBrand")}
            </button>
          </Link>
        </div>
      )}

      {/* Analytics Cards */}
      {analyticsLoading ? (
        <div>{t("dashboard.loadingStats")}</div>
      ) : analyticsError ? (
        <div className="text-red-500">{t("dashboard.failedStats")}</div>
      ) : (
        <StatsCards
          clicks={analytics?.clicks}
          views={analytics?.views}
          products={analytics?.products}
          users={analytics?.users}
        />
      )}

      {/* Charts */}
      <div className="flex flex-col md:flex-row gap-10">
        <ViewsChart views={views} />
        <ChartBarClick days={clicks} />
      </div>

      {/* Active Deals */}
      {isLoadingDeals ? (
        <div>{t("dashboard.loadingDeals")}</div>
      ) : isErrorDeals ? (
        <div className="text-red-500">{t("dashboard.failedDeals")}</div>
      ) : (
        <ProductsTable deals={deals} />
      )}
    </main>
  );
}
