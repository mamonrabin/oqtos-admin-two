import LogIn from "@/components/auth/LogIn";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-[#F4F4F5] flex items-center justify-center p-4 w-full h-[100vh] fixed top-0 right-0 left-0 bottom-0 z-50">
    
        <LogIn />
     
    </div>
  );
};

export default page;
