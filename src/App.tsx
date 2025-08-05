import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BrandPage from "./pages/BrandPage/brandPage";
import RootLayout from "./components/RootLayout";
import LandingPage from "./pages/LandingPage/LandingPage.tsx";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
// import { ProtectedRoute } from "@/components/ProtectedRoute";
import LoginRequiredPage from "./pages/AuthPages/LoginRequiredPage";
import { LoginPage } from "./pages/AuthPages/LoginPage";
import { RegisterPage } from "./pages/AuthPages/RegisterPage";
import { OtpVerify } from "./pages/AuthPages/OtpVerify";
// import ResetPassswordRequest from "./pages/AuthPages/ResetPassswordRequest";
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import ResetPassword from "./pages/AuthPages/ResetPassword";
import SettingPage from "./pages/SettingPage/SettingPage";
import ProfileSettingPage from "./pages/SettingPage/ProfileSettingPage";
import { useAuth } from "./context/useAuth.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      { path: "products", element: <ProductsPage /> },
      // {
      //   path: "products",
      //   element: <ProtectedRoute />,
      //   children: [{ path: "", element: <ProductsPage /> }],
      // },
    ],
  },
  {
    path: "/setting",
    element: <SettingPage />,
    children: [
      { path: "profile", index: true, element: <ProfileSettingPage /> },
    ],
  },
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
