import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router";
import ScrollToTop from "@/components/ScrollToTop";

function RootLayout() {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default RootLayout;
