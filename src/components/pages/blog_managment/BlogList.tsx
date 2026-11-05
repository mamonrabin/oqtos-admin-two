/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BASE_URL } from "@/config";
import {
  useAllBlogs,
  useDeleteBlog,
  useUpdateBlogStatus,
} from "@/hooks/blog.hook";
import { mutationToast } from "@/reuseble_components/MutationToast";
import StatusSelect from "@/reuseble_components/StatusSelect";
import TableSkeleton from "@/reuseble_components/TableSkeleton";
import { TBlog } from "@/types";
import { FolderOpen, Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import BlogDetails from "./BlogDetails";
import UpdateBlog from "./UpdateBlog";

const statusOptions = [
  { label: "draft", value: "draft" },
  { label: "published", value: "published" },
];

const tableHeaders = [
  "#",
  "title",
  "image",
  "detals",
  "cardDescription",
  "content",
  "status",
  "Actions",
];

const BlogList = () => {
  const { data: blogList, isLoading } = useAllBlogs();
  const bloges = blogList?.data;

  const { mutate: deleteBlog } = useDeleteBlog();
  const { mutate } = useUpdateBlogStatus();

  const handleDelete = (id: string) => {
    toast("Delete Blog?", {
      description: "This blog will be permanently deleted.",
      action: {
        label: "Delete",
        onClick: () => {
          deleteBlog(id, {
            onSuccess: (res: any) => {
              toast.success(res?.message || "blog deleted successfully");
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message || "Failed to delete blog",
              );
            },
          });
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
      duration: 10000,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog List</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your blog list</p>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="hover:bg-transparent border-b border-gray-200">
              {tableHeaders.map((header) => (
                <TableHead
                  key={header}
                  className="text-xs font-semibold text-gray-600 uppercase tracking-wider py-3 px-4"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {isLoading ? (
            <TableSkeleton rows={5} />
          ) : (
            <TableBody>
              {bloges?.length ? (
                bloges.map((blog: TBlog, index: number) => (
                  <TableRow
                    key={blog._id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                  >
                    <TableCell className="py-3 px-4 text-sm text-gray-500 font-medium text-center">
                      {index + 1}
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {blog?.title?.slice(0, 20) || "N/A"}..
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                        <Image
                          width={300}
                          height={300}
                          src={BASE_URL + blog.image}
                          alt="banner"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      </div>
                    </TableCell>

                    <TableCell className="py-3 px-4 text-center">
                      <span className="text-sm font-semibold text-gray-900">
                        <BlogDetails blog={blog} />
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700">
                        {blog?.cardDescription?.slice(0,30) || "N/A"}..
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: blog?.content?.slice(0,40) }}>
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-3">
                      <StatusSelect
                        value={blog.status ?? "draft"}
                        options={statusOptions}
                        className="w-[100px]"
                        onChange={(status) => {
                          mutate(
                            {
                              id: blog._id,
                              status: status as "draft" | "published",
                            },
                            mutationToast,
                          );
                        }}
                      />
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 hover:shadow-sm"
                        >
                          <Trash size={16} />
                        </button>

                        <UpdateBlog blog={blog} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={tableHeaders.length}
                    className="text-center py-16 text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <FolderOpen size={32} className="text-gray-300" />
                      </div>
                      <p className="text-lg font-medium text-gray-700">
                        No blog found
                      </p>
                      <p className="text-sm text-gray-400">
                        Start by adding your first blog
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
};

export default BlogList;
