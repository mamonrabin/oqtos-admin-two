/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MapPin, RotateCcw, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { TCityStats, TReturnStats, TReview } from "@/types";
import React from "react";
import Link from "next/link";


interface SatisfactionNLocationProps {
  reviews?: TReview;
  cityStats?: TCityStats[];
  returnStats?: TReturnStats[];
}

const SatisfactionNLocation: React.FC<SatisfactionNLocationProps> = ({
  reviews,
  cityStats,
  returnStats,
}) => {
  const totalReviews = reviews?.length || 0;

  const averageRating =
    totalReviews > 0
      ? (
          reviews?.reduce(
            (sum: number, review: TReview) => sum + review.rating,
            0,
          ) / totalReviews
        ).toFixed(1)
      : "0.0";

  const ratings = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews?.filter(
      (review: TReview) => Math.floor(review.rating) === star,
    ).length || 0;

    return {
      stars: star,
      count,
      percent: totalReviews ? (count / totalReviews) * 100 : 0,
    };
  });

  const maxRevenue = Math.max(
    ...(cityStats?.map((item: TCityStats) => item.totalRevenue) || [1]),
  );

  const totalReturns = returnStats?.[0]?.totalReturns || 0;
  const reasons = returnStats?.[0]?.reasons || [];



  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
      {/* Satisfaction */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4 gap-1">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">
              Customer Satisfaction
            </h3>
            <p className="text-xs text-gray-400">Reviews & ratings</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-gray-900">
              {averageRating}
            </span>
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
          </div>
        </div>
        <div className="space-y-2">
          {ratings?.map((r) => (
            <div key={r.stars} className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-12">{r.stars} ★</span>

              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${r.percent}%` }}
                />
              </div>

              <span className="text-sm text-gray-500 w-8">{r.count}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Recent Reviews
          </p>

          {reviews?.slice(0, 2).map((review: TReview) => (
            <div
              key={review._id}
              className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">
                    {review?.userID?.name}
                  </span>

                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        className={
                          star <= Math.round(review.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs line-clamp-1 text-gray-600 mt-1">
                  {review.comment}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {formatDistanceToNow(new Date(review.createdAt), {
                    addSuffix: true,
                  })}
                </p>

               
              </div>
            </div>
          ))}

          <Link href="/product-review">
                <p className="text-xs mt-2 font-medium text-gray-600 cursor-pointer hover:text-[#2B7FFF] duration-300">more review</p>
               </Link>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
  <div className="flex items-center justify-between mb-4">
    <div>
      <h3 className="text-sm font-semibold text-gray-700">
        Sales by Location
      </h3>
      <p className="text-xs text-gray-400">
        Top cities by revenue
      </p>
    </div>

    <Link href="/sales_location">
    <div className="flex items-center gap-1 text-xs text-blue-600 font-medium cursor-pointer">
      <MapPin size={14} />
     View More
    </div>
    </Link>
  </div>

  <div className="space-y-3">
    {cityStats?.map((city : TCityStats) => (
      <div key={city.city}>
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">
            {city.city}
          </span>

          <span className="font-semibold text-gray-900">
            ৳{city.totalRevenue.toLocaleString()}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-blue-500 transition-all duration-500"
            style={{
              width: `${(city.totalRevenue / maxRevenue) * 100}%`,
            }}
          />
        </div>

        <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
          <span>{city.totalOrders} Orders</span>
          <span>{city.totalProductsSold} Products</span>
        </div>
      </div>
    ))}
  </div>
</div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
  <div className="flex items-center justify-between mb-4">
    <div>
      <h3 className="text-sm font-semibold text-gray-700">
        Return Analytics
      </h3>
      <p className="text-xs text-gray-400">
        Return reasons & trends
      </p>
    </div>
  </div>

  <div className="space-y-3">
    {reasons.length ? (
      reasons.map((item) => (
        <div key={item.reason}>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">
              {item.reason}
            </span>

            <span className="font-medium text-gray-900">
              {item.count} ({item.percentage.toFixed(0)}%)
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-red-500 transition-all duration-500"
              style={{ width: `${item.percentage}%` }}
            />
          </div>
        </div>
      ))
    ) : (
      <div className="py-6 text-center text-sm text-gray-500">
        No return data available
      </div>
    )}
  </div>

  <div className="mt-4 pt-4 border-t border-gray-100">
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500">Total Returns</span>
      <span className="font-semibold text-gray-900">
        {totalReturns}
      </span>
    </div>
  </div>
</div>
    </div>
  );
};

export default SatisfactionNLocation;
