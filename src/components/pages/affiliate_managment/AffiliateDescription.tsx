
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TAffiliate } from "@/types";


import { Ellipsis } from "lucide-react";

import React from "react";

interface DescriptionProps {
  affiliates: TAffiliate;
}

const AffiliateDescription: React.FC<DescriptionProps> = ({affiliates}) => {
  const {
    description,
    type
  } = affiliates;



  return (
    <div>
      <Sheet>
        <SheetTrigger className="ml-8 cursor-pointer">
          <Ellipsis size={16} />
        </SheetTrigger>
      

        <SheetContent className="lg:!max-w-4xl !w-full !max-w-full md:p-8 p-6 overflow-y-scroll bg-gray-50/50">
          <div className="space-y-8">
            {/* Product Title Section */}
            <div className="border-b border-gray-200 pb-4">
           
              <p className="text-sm text-gray-500 mt-1">Type: {type}</p>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                Description
              </h3>
              <div
                className="prose prose-sm max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>

           

            

          
           

          
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AffiliateDescription;
