"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo/pickaboo.svg";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#F4F4F5] flex items-center justify-center p-4 w-full h-[100vh] fixed top-0 right-0 left-0 bottom-0 z-50">
      <div className="w-full max-w-md">
        {/* Logo */}
        {/* 404 Card */}
        <div className="bg-white rounded shadow border border-gray-100 p-8 text-center">
          <div className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            404
          </div>
          
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mt-4">
            <span className="text-3xl">🔍</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mt-4">
            Page Not Found
          </h1>
          <p className="text-gray-500 mt-2">
            Oops! The page you are looking for does not exist.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Home size={18} />
              Dashboard
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-gray-300 hover:border-blue-400 text-gray-700 hover:text-blue-600 font-medium rounded-lg transition-all duration-200"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;