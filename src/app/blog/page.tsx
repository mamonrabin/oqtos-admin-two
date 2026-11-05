import BlogList from "@/components/pages/blog_managment/BlogList";
import { BookOpen, FilePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

const Blog = () => {
  return (
    <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
      <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between gap-4 p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-sm">
              <BookOpen size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 capitalize">
                Blog
              </h2>
              <p className="text-sm text-gray-500">
                Total <span className="font-semibold text-gray-700">120</span>{" "}
                blogs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="blog/create-blog">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md cursor-pointer">
                <FilePlus size={16} />
                <span className="">Add Blog</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <BlogList />
    </div>
  );
};

export default Blog;
