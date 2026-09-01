import CreateBlog from "@/components/pages/blog_managment/CreateBlog";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
      <CreateBlog />
    </div>
  );
};

export default page;
