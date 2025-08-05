import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    label: "Profile",
    href: "/setting/profile",
    icon: <User className="w-5 h-5 text-primary" />,
  },
];

export default function AppSidebar() {
  const location = useLocation();
  return (
    <aside
      className="bg-[#EDEAEA99] border-r shadow-sm flex flex-col gap-4 h-[100vh] sticky top-0 
                 w-16 md:w-64 transition-all duration-300 z-10"
      // removed: fixed top-0 left-0 h-full
    >
      <div className="flex items-center justify-center md:justify-start px-2 md:px-6 max-h-40">
        <Link to={"/"} className="mt-15">
          <img src="/logo.png" alt="Logo" className="w-auto h-full" />
        </Link>
      </div>
      <nav className="flex-1 px-2 md:px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition hover:bg-primary/5",
                isActive && "bg-primary/15 font-medium"
              )}
            >
              <span className="w-6">{item.icon}</span>
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
