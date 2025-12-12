import { useAuth } from "@/context/useAuth";
import {
  Globe,
  // Search,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header() {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user, logout, brands, setLanguage } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const isBrandPending = brands[0]?.status === "pending";
  const redirectTo =
    useLocation().pathname === "/brand-landing"
      ? "/auth/register?role=owner"
      : "/auth/login?role=visitor";

  const changeLanguage = (lng: string) => {
    setLanguage(lng);
    setIsLangOpen(false);
  };

  return (
    <header className="text-sm bg-[#FAFAFA]">
      {/* Top Bar */}
      <div className=" bg-[#D9D9D9]/30 px-8 py-3 flex justify-between items-center text-gray-600">
        <div>
          <p>
            {t("welcome", { name: user?.name || "" })}{" "}
            <img
              src="/textlogo.png"
              alt="textlogo"
              className="inline p-0 h-8 w-17"
            />
            !
          </p>
        </div>
        <div className="flex items-center gap-4 relative">
          {/* 🌍 Language Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              <Globe className="w-4 h-4" />
              {i18n.language === "ar" ? "العربية" : "English"}
              <ChevronDown className="w-4 h-4" />
            </button>
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-lg z-50">
                <button
                  onClick={() => changeLanguage("en")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage("ar")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  العربية
                </button>
              </div>
            )}
          </div>

          <Link to={"/products"} className="flex items-center gap-1">
            <User className="w-4 h-4" /> {t("allOffers")}
          </Link>
        </div>
      </div>

      {isAuthenticated && user && !user.is_email_verified && (
        <div className=" px-8 py-3 flex justify-between items-center  text-red-700 text-xs font-medium bg-yellow-100/50">
          {t("emailNotVerified")}{" "}
          <Link to="/auth/verify-otp" className="underline">
            {t("verifyNow")}
          </Link>
        </div>
      )}

      {isAuthenticated && user && user?.role === "owner" && isBrandPending && (
        <div className=" px-8 py-3 flex justify-between items-center  text-xs font-medium bg-yellow-300">
          {t("brandPending")}
        </div>
      )}

      {/* Main Header */}
      <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto">
        <Link to={"/"}>
          <img src="/logo.png" alt="Logo" height={50} width={50} />
        </Link>

        {/* Search Bar */}
        {/* <div className="flex-1 mx-6 hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2 max-w-2xl">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="ml-2 bg-transparent outline-none flex-1 text-sm"
          />
        </div> */}

        {/* Right Side */}
        <div className="flex items-center gap-6 text-sm text-primary relative">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 focus:outline-none cursor-pointer"
              >
                {/* <img
                  src={user?.image_url || "/imgs/user-placeholder.png"}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover border"
                /> */}
                <span>{user?.name}</span>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50 overflow-hidden">
                  <Link
                    to="/setting/profile"
                    className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-gray-100 w-full cursor-pointer"
                  >
                    <Settings className="w-4 h-4" />
                    {t("settings")}
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-gray-100 w-full cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    {t("logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to={redirectTo} className="flex items-center gap-1">
              <User className="w-4 h-4" /> {t("signupSignin")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
