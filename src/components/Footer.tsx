import React, { useState } from "react";
import { Facebook, Twitter, Instagram, User } from "lucide-react";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <footer className="pt-12 pb-8 px-4 md:px-8 md:mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-gray-800 font-semibold text-sm mb-4 tracking-wide">
              COMPANY INFO
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  About Dr Offers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Social Responsibility
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Affiliate
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Fashion Blogger
                </a>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-gray-800 font-semibold text-sm mb-4 tracking-wide">
              HELP & SUPPORT
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  How to Order
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  How to Track
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-gray-800 font-semibold text-sm mb-4 tracking-wide">
              CUSTOMER CARE
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Payment
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Bonus Point
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Notices
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Newsletter */}
          <div>
            <h3 className="text-gray-800 font-semibold text-sm mb-4 tracking-wide">
              SOCIALS
            </h3>
            <div className="flex space-x-3 mb-6">
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
            </div>

            <h4 className="text-gray-800 font-semibold text-sm mb-3 tracking-wide">
              SIGN UP FOR Dr Offers NEWS
            </h4>
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSubscribe}
                className="bg-gray-700 text-white px-6 py-2 rounded-r-md hover:bg-gray-600 transition-colors text-sm font-medium"
              >
                SUBSCRIBE
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              By clicking the SUBSCRIBE button, you are agreeing to our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy & Cookie Policy
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            {/* Copyright and Links */}
            <div className="mb-6 lg:mb-0">
              <p className="text-gray-600 text-sm mb-4">
                © 2025 Dr All Rights Reserved
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 underline"
                >
                  Privacy Center
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 underline"
                >
                  Privacy & Cookie Policy
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 underline"
                >
                  Manage Cookies
                </a>
              </div>
              <div className="flex flex-wrap gap-4 text-sm mt-2">
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 underline"
                >
                  Terms & Conditions
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 underline"
                >
                  Copyright Notice
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 underline"
                >
                  Imprint
                </a>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h4 className="text-gray-800 font-semibold text-sm mb-3 tracking-wide">
                WE ACCEPT
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {/* Row 1 */}
                <div className="w-12 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
                  MC
                </div>
                <div className="w-12 h-8 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  PP
                </div>
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-yellow-400 rounded text-white text-xs flex items-center justify-center font-bold">
                  eB
                </div>
                <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-green-400 rounded text-white text-xs flex items-center justify-center font-bold">
                  GP
                </div>

                {/* Row 2 */}
                <div className="w-12 h-8 bg-gray-800 rounded text-white text-xs flex items-center justify-center font-bold">
                  AE
                </div>
                <div className="w-12 h-8 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
                  DS
                </div>
                <div className="w-12 h-8 bg-black rounded text-white text-xs flex items-center justify-center font-bold">
                  AP
                </div>
                <div className="w-12 h-8 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  AE
                </div>

                {/* Row 3 */}
                <div className="w-12 h-8 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
                  AM
                </div>
                <div className="w-12 h-8 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                  Al
                </div>
                <div className="w-12 h-8 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  bt
                </div>
                <div className="w-12 h-8 bg-yellow-400 rounded text-black text-xs flex items-center justify-center font-bold">
                  BC
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs mt-6">©2025 Dr All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
