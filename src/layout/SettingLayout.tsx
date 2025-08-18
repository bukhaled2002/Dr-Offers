import AppSidebar from "@/components/AppSidebar";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/useAuth";
import { useTranslation } from "react-i18next";

export default function SettingLayout() {
  const { user, brands } = useAuth();
  const { t } = useTranslation();

  // Redirect if user has no brand
  if (user?.role === "owner" && (!brands || brands.length === 0)) {
    return <Navigate to="/brands/add" replace />;
  }

  return (
    <div className="flex">
      <AppSidebar />
      <main className="flex-1">
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <section className="my-6">
              <h2 className="font-bold text-2xl">
                {t("settingsPage.hello", { name: user?.name })}
              </h2>
              <p className="text-gray-500 font-semibold mt-5">
                {t("settingsPage.welcome_back")}
              </p>
            </section>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
