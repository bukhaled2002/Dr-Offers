import { FaEye, FaUser } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FaTag } from "react-icons/fa6";
import type { AnalyticsData } from "@/hooks/useStats";

export default function StatsCards({
  clicks,
  products,
  users,
  views,
}: AnalyticsData) {
  console.log(clicks);
  const stats = [
    { label: "Views", value: views, icon: FaEye },
    { label: "Clicks", value: clicks, icon: AiFillLike },
    { label: "Users", value: users, icon: FaUser },
    { label: "Products", value: products, icon: FaTag },
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
