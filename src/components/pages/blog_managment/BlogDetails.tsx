/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { TBlog } from "@/types";

import { Ellipsis, X } from "lucide-react";
import Image from "next/image";
import React from "react";

interface blogDetailsProps {
  blog: TBlog;
}

const BlogDetails: React.FC<blogDetailsProps> = ({ blog }) => {
  const { title, cardDescription, content, image, images, tags } = blog;

  const allImages = [image, ...(images ?? [])];

  return (
    <div>
      <Sheet>
        <SheetTrigger className="ml-8 cursor-pointer">
          <Ellipsis size={16} />
        </SheetTrigger>

        <SheetContent className="lg:!max-w-4xl !w-full !max-w-full p-0 bg-gray-50/50 overflow-y-scroll">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Blog Details</h2>
              <p className="text-sm text-gray-500">
                View complete blog information
              </p>
            </div>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={18} className="text-gray-500" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Product Title Section - White Background */}
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            </div>

            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                Card Description
              </h3>
              <div className="grid grid-cols-2 gap-3">{cardDescription}</div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                content
              </h3>
              <div
                className="prose prose-sm max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>

            {/* Tags*/}
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags && tags.length > 0 ? (
                  tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100"
                    >
                      #{tag.trim()}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">
                    No tags available
                  </span>
                )}
              </div>
            </div>

            {/* Product Images */}
            {allImages && allImages.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Images
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {allImages.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-white"
                    >
                      <Image
                        src={image}
                        alt={`Product image ${index + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BlogDetails;
