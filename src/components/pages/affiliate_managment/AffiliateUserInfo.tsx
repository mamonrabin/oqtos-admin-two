"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TUser } from "@/types";
import {
  CheckCircle2,
  Clock3,
  ExternalLink,
  Link2,
  Mail,
  User,
  Users,
  XCircle,
  Tag,
  X,
} from "lucide-react";
import React from "react";

interface AffiliateUserInfoProps {
  user: TUser;
}

const AffiliateUserInfo: React.FC<AffiliateUserInfoProps> = ({ user }) => {
  const getStatusStyle = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return {
          className: "bg-green-50 text-green-700 border-green-200",
          icon: CheckCircle2,
        };

      case "request":
        return {
          className: "bg-amber-50 text-amber-700 border-amber-200",
          icon: Clock3,
        };

      case "denied":
        return {
          className: "bg-red-50 text-red-700 border-red-200",
          icon: XCircle,
        };

      default:
        return {
          className: "bg-gray-50 text-gray-600 border-gray-200",
          icon: Clock3,
        };
    }
  };

  const status = getStatusStyle(user.affiliateStatus);
  const StatusIcon = status.icon;

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <button
            type="button"
            className="ml-8 p-2 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
          >
            <Users size={17} />
          </button>
        </SheetTrigger>

        <SheetContent className="lg:!max-w-3xl !w-full !max-w-full p-0 overflow-y-auto bg-gray-50">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
            <div className="px-6 py-5">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-semibold">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-gray-900 truncate">
                    {user.name}
                  </h2>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                    <Mail size={14} />
                    <span className="truncate">{user.email}</span>
                  </div>
                </div>

                {/* Status */}
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold capitalize ${status.className}`}
                >
                  <StatusIcon size={14} />
                  {user.affiliateStatus}
                </div>

                <SheetClose asChild>
                    <button
                      type="button"
                      className=" z-20 rounded-lg p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      aria-label="Close"
                    >
                      <X size={18} />
                    </button>
                  </SheetClose>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Affiliate Overview */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <User size={17} className="text-primary" />

                <h3 className="font-semibold text-gray-900">
                  Affiliate Overview
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Coupon */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Tag size={15} />
                    <span className="text-xs font-medium uppercase tracking-wide">
                      Affiliate Coupon
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      {user.affiliateCoupon || "Not assigned"}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <CheckCircle2 size={15} />
                    <span className="text-xs font-medium uppercase tracking-wide">
                      Affiliate Status
                    </span>
                  </div>

                  <span className="text-lg font-semibold text-gray-900 capitalize">
                    {user.affiliateStatus || "N/A"}
                  </span>

                  
                </div>

                {/* Custom Close Button */}
              </div>
            </section>

            {/* User Information */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <User size={17} className="text-primary" />

                <h3 className="font-semibold text-gray-900">
                  User Information
                </h3>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-500">Name</span>
                  <span className="text-sm font-medium text-gray-900">
                    {user.name}
                  </span>
                </div>

                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-500">Email</span>
                  <span className="text-sm font-medium text-gray-900">
                    {user.email}
                  </span>
                </div>

                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-500">Role</span>
                  <span className="text-sm font-medium text-gray-900">
                    {user.role}
                  </span>
                </div>

                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-500">Account Status</span>
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {user.isActive?.toLowerCase() || "N/A"}
                  </span>
                </div>
              </div>
            </section>

            {/* Affiliate Links */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Link2 size={17} className="text-primary" />

                  <h3 className="font-semibold text-gray-900">
                    Affiliate Links
                  </h3>
                </div>

                <span className="text-xs text-gray-500">
                  {user.affiliateLink?.length || 0} links
                </span>
              </div>

              <div className="space-y-2">
                {user.affiliateLink?.length ? (
                  user.affiliateLink?.map((link, index) => (
                    <div
                      key={`${link}-${index}`}
                      className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 group hover:border-gray-300 transition-colors"
                    >
                      <div className="h-8 w-8 shrink-0 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Link2 size={15} className="text-gray-500" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 mb-0.5">
                          Link {index + 1}
                        </p>

                        <p className="text-sm text-gray-700 truncate">{link}</p>
                      </div>

                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors"
                        title="Open link"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center">
                    <Link2 size={22} className="mx-auto text-gray-400 mb-2" />

                    <p className="text-sm text-gray-500">
                      No affiliate links added
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AffiliateUserInfo;
