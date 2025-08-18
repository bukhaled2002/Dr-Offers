import { FaEye, FaUser } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FaTag } from "react-icons/fa6";
import type { AnalyticsData } from "@/hooks/useStats";
import { useTranslation } from "react-i18next";

export default function StatsCards({
  clicks,
  products,
  users,
  views,
}: AnalyticsData) {
  const { t } = useTranslation();

  const stats = [
    { label: t("stats.views"), value: views, icon: FaEye },
    { label: t("stats.clicks"), value: clicks, icon: AiFillLike },
    { label: t("stats.users"), value: users, icon: FaUser },
    { label: t("stats.products"), value: products, icon: FaTag },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="flex items-center gap-4 bg-white rounded-md px-8 py-6 "
        >
          {/* Icon Circle */}
          <div className="flex items-center justify-center bg-gray-100 rounded-full p-3">
            <Icon className="w-9 h-9 text-primary" />
          </div>

          {/* Text Content */}
          <div>
            <p className="text-xs uppercase text-gray-500">{label}</p>
            <p className="text-lg font-bold">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
