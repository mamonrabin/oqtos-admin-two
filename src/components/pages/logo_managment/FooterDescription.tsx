/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BASE_URL } from "@/config";

import { TLogo } from "@/types";
import { Ellipsis } from "lucide-react";
import Image from "next/image";

import React from "react";

interface DescriptionProps {
  logo: TLogo;
}

const FooterDescription: React.FC<DescriptionProps> = ({ logo }) => {
  const {
    headerLogo,
    footerLogo,
    description,
    address,
    phone,
    whatsapp,
    email,
    status
  } = logo;

  return (
    <div>
      <Sheet>
        <SheetTrigger className="ml-8 cursor-pointer flex items-center text-gray-500">
          {description ? (
            <>
              {description.slice(0, 10)}
              <Ellipsis size={16} />
            </>
          ) : (
            <span>N/A</span>
          )}
        </SheetTrigger>

        <SheetContent className="lg:!max-w-4xl !w-full !max-w-full md:p-8 p-6 overflow-y-scroll bg-gray-50/50">
          <div className="space-y-8">
            {/* Product Title Section */}
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-sm text-gray-500 mt-1">Phone : {phone || "N/A"}</h2>
              <p className="text-sm text-gray-500 mt-1">
                Whats app: {whatsapp || "N/A" }
              </p>
              <p className="text-sm text-gray-500 mt-1">Email: {email || "N/A"}</p>
              <p className="text-sm text-gray-500 mt-1">Address: {address || "N/A"}</p>
              <p className="text-sm font-medium text-[#155DFC]  mt-1">Status: {status || "N/A"}</p>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                Description
              </h3>
              <div className="prose prose-sm max-w-none text-gray-600">
                <p>{description || "N/A"}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                Images
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={`${BASE_URL}${headerLogo}`}
                    alt="HEARDELOGO"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                {logo.footerLogo ? (
                  <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={`${BASE_URL}${footerLogo}`}
                      alt="HEARDELOGO"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="aspect-square text-center flex items-center justify-center rounded-lg overflow-hidden border border-gray-200">
                    {" "}
                    <span>N/A</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FooterDescription;
