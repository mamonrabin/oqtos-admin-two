import { Bell, Search} from "lucide-react";
import React, { useState } from "react";
import Responsibebar from "./Responsibebar";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);


  return (
    <div className="flex items-center justify-between gap-4 py-3 px-4 md:px-8 bg-white border-b border-gray-200  sticky top-0 z-20">
      {/* Left Side - Brand/Logo (Optional) */}
      <div className="flex items-center gap-2">
        <Responsibebar />
        <div className="w-8 h-8 bg-blue-600 rounded-lg md:flex hidden items-center justify-center">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        <span className="text-lg font-bold text-gray-800 hidden sm:block">
          Store
        </span>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-20 transition-all duration-200">
          <Search size={18} className="text-gray-400" />
          <input
            className="w-64 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 ml-2"
            type="text"
            placeholder="Search products, brands..."
          />
        </div>

        {/* Search Button - Mobile */}
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Search size={18} className="text-gray-600" />
        </button>

        {/* Mobile Search Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white p-4 border-b border-gray-200 shadow-lg md:hidden">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
              <Search size={18} className="text-gray-400" />
              <input
                className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 ml-2"
                type="text"
                placeholder="Search..."
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Notifications */}
        <div className="relative">
          <button className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center relative">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
              3
            </span>
          </button>
        </div>

        {/* Profile Dropdown */}
        <ProfileDropdown/>
      </div>
    </div>
  );
};

export default Header;
