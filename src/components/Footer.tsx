import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { Facebook, Twitter, Instagram, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import PrivacyDialogHtml from "./PrivacyDialogHtml";

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    console.log("Subscribing email:", email);
    setEmail("");
  };

  const isArabic = i18n.language === "ar";

  return (
    <footer
      className={`pt-12 pb-8 px-4 md:px-8 md:mt-20 ${
        isArabic ? "direction-rtl" : "direction-ltr"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-gray-800 font-semibold text-sm mb-4 tracking-wide">
              {t("company_info")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  {t("about_dr_offers")}
                </Link>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  {t("social_responsibility")}
                </a>
              </li> */}
              {/* <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  {t("affiliate")}
                </a>
              </li> */}
              {/* <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  {t("fashion_blogger")}
                </a>
              </li> */}
            </ul>
          </div>

          {/* Help & Support */}
          {/* <div>
            <h3 className="text-gray-800 font-semibold text-sm mb-4 tracking-wide">
              {t("help_support")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  {t("shipping_info")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  {t("returns")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  {t("how_to_order")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  {t("how_to_track")}
                </a>
              </li>
            </ul>
          </div> */}

          {/* Customer Care */}
          <div>
            <h3 className="text-gray-800 font-semibold text-sm mb-4 tracking-wide">
              {t("customer_care")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+966554469058"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  {t("contact_us")}
                </a>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  {t("payment")}
                </a>
              </li> */}
              {/* <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  {t("bonus_point")}
                </a>
              </li> */}
              {/* <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  {t("notices")}
                </a>
              </li> */}
            </ul>
          </div>

          {/* Socials & Newsletter */}
          <div>
            {/* <h3 className="text-gray-800 font-semibold text-sm mb-4 tracking-wide">
              {t("socials")}
            </h3> */}
            {/* <div className="flex space-x-3 mb-6">
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
              >
                <Twitter className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
              >
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <span className="text-gray-700 text-xs font-bold">T</span>
                </div>
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
              >
                <User className="w-4 h-4 text-white" />
              </a>
            </div> */}

            <h4 className="text-gray-800 font-semibold text-sm mb-3 tracking-wide">
              {t("newsletter_signup")}
            </h4>
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("your_email")}
                className={`flex-1 px-4 py-2 border border-gray-300 ${
                  isArabic ? "rounded-r-md" : "rounded-l-md"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                  isArabic ? "text-right" : ""
                }`}
              />
              <button
                onClick={handleSubscribe}
                className={`bg-gray-700 text-white px-6 py-2  ${
                  isArabic ? "rounded-l-md" : "rounded-r-md"
                } hover:bg-gray-600 transition-colors text-sm font-medium`}
              >
                {t("subscribe")}
              </button>
            </div>
            <p
              className={`text-xs text-gray-500 mt-2 ${
                isArabic ? "text-right" : ""
              }`}
            >
              {t("subscribe_note")}

              <PrivacyDialogHtml />
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <p
              className={`text-gray-600 text-sm mb-4 ${
                isArabic ? "text-right" : ""
              }`}
            >
              {t("all_rights_reserved")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
