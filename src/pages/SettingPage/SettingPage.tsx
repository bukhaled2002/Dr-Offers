import AppSidebar from "@/components/AppSidebar";
import { Outlet } from "react-router";
// import { useAuth } from "@/context/useAuth";

export default function ProfileSetting() {
  // const { user } = useAuth();
  return (
    <div className="flex">
      <AppSidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
