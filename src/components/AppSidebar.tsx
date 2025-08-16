import { useAuth } from "@/context/useAuth";
import { cn } from "@/lib/utils";
import { Home, LayoutGrid, Percent, User, Store } from "lucide-react";
import type { ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";

type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

export default function AppSidebar() {
  const location = useLocation();

  const { user } = useAuth();

  const role = user?.role || "visitor";

  const commonItems: NavItem[] = [
    {
      label: "Profile",
      href: "/setting/profile",
      icon: <User className="w-5 h-5" />,
    },
  ];

  const ownerExtraItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/setting/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      label: "Templates",
      href: "/setting/template",
      icon: <LayoutGrid className="w-5 h-5" />,
    },
    {
      label: "Brand",
      href: "/setting/brand",
      icon: <Store className="w-5 h-5" />,
    },
    {
      label: "Add Offer",
      href: "/setting/offers",
      icon: <Percent className="w-5 h-5" />,
    },
  ];

  const navItems =
    role === "owner" ? [...ownerExtraItems, ...commonItems] : commonItems;

  return (
    <aside
      className="bg-[#EDEAEA99] border-r shadow-sm flex flex-col gap-4 h-[100vh] sticky top-0 
                 w-16 md:w-64 transition-all duration-300 z-10"
    >
      <div className="flex items-center justify-center md:justify-start px-2 md:px-6 max-h-40">
        <Link to={role === "owner" ? "/brand-landing" : "/"} className="mt-15">
          <img src="/logo.png" alt="Logo" className="w-auto h-full" />
        </Link>
      </div>
      <nav className="flex-1 px-2 md:px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition hover:bg-primary/5 text-primary font-semibold",
                isActive &&
                  "bg-primary font-medium text-white hover:bg-primary/80"
              )}
            >
              <span className={cn("w-6")}>{item.icon}</span>
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
