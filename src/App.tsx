import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BrandPage from "./pages/BrandPage/brandPage";
import LandingPage from "./pages/LandingPage/LandingPage.tsx";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import AboutPage from "./pages/AboutPage";
// import { ProtectedRoute } from "@/components/ProtectedRoute";
import LoginRequiredPage from "./pages/AuthPages/LoginRequiredPage";
import { LoginPage } from "./pages/AuthPages/LoginPage";
import { RegisterPage } from "./pages/AuthPages/RegisterPage";
import { OtpVerify } from "./pages/AuthPages/OtpVerify";
// import ResetPassswordRequest from "./pages/AuthPages/ResetPassswordRequest";
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import ResetPassword from "./pages/AuthPages/ResetPassword";
import ProfileSettingPage from "./pages/SettingPage/ProfileSettingPage";
import { useAuth } from "./context/useAuth.tsx";
import SettingLayout from "./layout/SettingLayout.tsx";
import DashboardPage from "./pages/SettingPage/DashboardPage.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import AddOfferPage from "./pages/SettingPage/AddOfferPage.tsx";
import TemplatePage from "./pages/SettingPage/TemplatePage.tsx";
import RootLayout from "./layout/RootLayout.tsx";
import BrandLanding from "./pages/BrandPage/BrandLanding.tsx";
import AddBrand from "./pages/BrandPage/AddBrand.tsx";
import BrandSettingPage from "./pages/SettingPage/BrandSettingPage.tsx";
import EditOfferPage from "./pages/SettingPage/EditOfferPage.tsx";
import { Outlet } from "react-router-dom";

// Layout wrapper for offers
function OffersLayout() {
  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/brand-landing",
        element: <BrandLanding />,
      },
      { path: "products", element: <ProductsPage /> },
      { path: "about", element: <AboutPage /> },
      // {
      //   path: "products",
      //   element: <ProtectedRoute />,
      //   children: [{ path: "", element: <ProductsPage /> }],
      // },
    ],
  },
  {
    path: "/setting",
    element: <SettingLayout />,
    children: [
      { path: "profile", index: true, element: <ProfileSettingPage /> },
      {
        path: "",
        element: <ProtectedRoute restrictTo="owner" />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "offers",
            element: <OffersLayout />,
            children: [
              { path: "", element: <AddOfferPage /> },
              { path: ":id", element: <EditOfferPage /> },
            ],
          },
          { path: "template", element: <TemplatePage /> },
          { path: "brand", element: <BrandSettingPage /> },
        ],
      },
    ],
  },
  { path: "/brands/add", element: <AddBrand /> },
  { path: "/brands/:brand-slug", element: <BrandPage /> },
  // auth
  { path: "/auth/login", element: <LoginPage /> },
  { path: "/auth/register", element: <RegisterPage /> },
  { path: "/auth/verify-otp", element: <OtpVerify /> },
  // { path: "/auth/reset-password-request", element: <ResetPassswordRequest /> },
  { path: "/auth/forgot-password", element: <ForgotPassword /> },
  { path: "/auth/reset-password/:token", element: <ResetPassword /> },

  { path: "/login-required", element: <LoginRequiredPage /> },
]);
function App() {
  const { user } = useAuth();
  console.log(user);
  return <RouterProvider router={router} />;
}

export default App;
