import { useAuth } from "@/context/useAuth";
import { Globe, Search, User, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b text-sm">
      {/* Top Bar */}
      <div className="bg-gray-50 px-8 py-3 flex justify-between items-center text-gray-600">
        <div>
          <p>Welcome {user?.name || ""} to Dr Offers!</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4" /> English
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" /> All Offers
          </div>
        </div>
      </div>
      {isAuthenticated && user && !user.is_email_verified && (
        <div className=" px-8 py-3 flex justify-between items-center  text-red-700 text-xs font-medium bg-yellow-100/50">
          ⚠️ Your email is not verified.{" "}
          <Link to="/verify-email" className="underline">
            Verify now
          </Link>
        </div>
      )}
      {/* Main Header */}
      <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto">
        <img src="/logo.png" alt="Logo" height={60} width={60} />

        {/* Search Bar */}
        <div className="flex-1 mx-6 hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2 max-w-2xl">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search Fashion, Electronics and more..."
            className="ml-2 bg-transparent outline-none flex-1 text-sm"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6 text-sm text-primary relative">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 focus:outline-none cursor-pointer"
              >
                <img
                  src={user?.image_url || "/imgs/user-placeholder.png"}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover border"
                />
                <span>{user?.name}</span>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50 overflow-hidden">
                  <Link
                    to="/setting/profile"
                    className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-gray-100 w-full cursor-pointer"
                  >
                    <Settings className="w-4 h-4" />
                    Setting
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-gray-100 w-full cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth/login" className="flex items-center gap-1">
              <User className="w-4 h-4" /> Sign Up / Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
