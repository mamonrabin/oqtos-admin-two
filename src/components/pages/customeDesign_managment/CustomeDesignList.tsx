"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Palette,
  Home,
  ShoppingBag,
  Search,
  LogIn,
  Pencil,
} from "lucide-react";

import { useAllCustomeDesign, useUpdateCustomeDesign } from "@/hooks/customeDesign.hook";
import { mutationToast } from "@/reuseble_components/MutationToast";
import StatusSelect from "@/reuseble_components/StatusSelect";
import TableSkeleton from "@/reuseble_components/TableSkeleton";


const designOptions = {
  bannerType: [
    { label: "Default", value: "Default" },
    { label: "Second Banner", value: "SecondBanner" },
    { label: "Third Banner", value: "ThirdBanner" },
  ],

  categorySection: [
    { label: "Default", value: "Default" },
    { label: "Second Category", value: "SecondCategory" },
    { label: "Third Category", value: "ThirdCategory" },
  ],

  sectionHead: [
    { label: "Default", value: "Default" },
    { label: "Second Head", value: "SecondHead" },
    { label: "Third Head", value: "ThirdHead" },
  ],

  cardType: [
    { label: "Default", value: "Default" },
    { label: "Second Card", value: "SecondCard" },
    { label: "Third Card", value: "ThirdCard" },
  ],

  flashBanner: [
    { label: "Default", value: "Default" },
    { label: "Second Banner", value: "SecondBanner" },
    { label: "Third Banner", value: "ThirdBanner" },
  ],

  brandSection: [
    { label: "Default", value: "Default" },
    { label: "Second Brand", value: "SecondBrand" },
    { label: "Third Brand", value: "ThirdBrand" },
  ],

  blogSection: [
    { label: "Default", value: "Default" },
    { label: "Second Blog", value: "SecondBlog" },
    { label: "Third Blog", value: "ThirdBlog" },
  ],

  footerSection: [
    { label: "Default", value: "Default" },
    { label: "Second Footer", value: "SecondFooter" },
    { label: "Third Footer", value: "ThirdFooter" },
  ],

  shopPage: [
    { label: "Default", value: "Default" },
    { label: "Second Shop", value: "SecondShop" },
    { label: "Third Shop", value: "ThirdShop" },
  ],

  searchSection: [
    { label: "Default", value: "Default" },
    { label: "Second Search", value: "SecondSearch" },
  ],

  loginSection: [
    { label: "Default", value: "Default" },
    { label: "Second Login", value: "SecondLogin" },
  ],
};

const CustomeDesignList = () => {
  const { data: designList, isLoading } = useAllCustomeDesign();
  const { mutate } = useUpdateCustomeDesign();

  const design = designList?.data?.[0];

  const updateDesign = (
    section: string,
    field: string,
    value: string,
  ) => {
    if (!design?._id) return;

    mutate(
      {
        id: design._id,
        payload: {
          [section]: {
            [field]: value || "Default",
          },
        },
      },
      mutationToast,
    );
  };

  const sections = [
    {
      title: "Home",
      description: "Customize your homepage sections",
      icon: Home,
      fields: [
        {
          label: "Banner",
          field: "bannerType",
          value: design?.home?.bannerType,
          options: designOptions.bannerType,
        },
        {
          label: "Category Section",
          field: "categorySection",
          value: design?.home?.categorySection,
          options: designOptions.categorySection,
        },
        {
          label: "Section Head",
          field: "sectionHead",
          value: design?.home?.sectionHead,
          options: designOptions.sectionHead,
        },
        // {
        //   label: "Card Type",
        //   field: "cardType",
        //   value: design?.home?.cardType,
        //   options: designOptions.cardType,
        // },
        {
          label: "Flash Banner",
          field: "flashBanner",
          value: design?.home?.flashBanner,
          options: designOptions.flashBanner,
        },
        {
          label: "Brand Section",
          field: "brandSection",
          value: design?.home?.brandSection,
          options: designOptions.brandSection,
        },
        {
          label: "Blog Section",
          field: "blogSection",
          value: design?.home?.blogSection,
          options: designOptions.blogSection,
        },
        {
          label: "Footer Section",
          field: "footerSection",
          value: design?.home?.footerSection,
          options: designOptions.footerSection,
        },
      ],
    },
    {
      title: "Shop",
      description: "Customize your shop page",
      icon: ShoppingBag,
      fields: [
        {
          label: "Shop Page",
          field: "shopPage",
          value: design?.shop?.shopPage,
          options: designOptions.shopPage,
        },
        {
          label: "Card Type",
          field: "cardType",
          value: design?.shop?.cardType,
          options: designOptions.cardType,
        },
      ],
    },
    {
      title: "Search",
      description: "Customize your search experience",
      icon: Search,
      fields: [
        {
          label: "Search Section",
          field: "searchSection",
          value: design?.search?.searchSection,
          options: designOptions.searchSection,
        },
        // {
        //   label: "Card Type",
        //   field: "cardType",
        //   value: design?.search?.cardType,
        //   options: designOptions.cardType,
        // },
      ],
    },
    {
      title: "Login",
      description: "Customize your login page",
      icon: LogIn,
      fields: [
        {
          label: "Login Section",
          field: "loginSection",
          value: design?.login?.loginSection,
          options: designOptions.loginSection,
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
            <Palette className="h-6 w-6 text-blue-600" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Custom Design
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your website sections and choose the design you want to
              display.
            </p>
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <TableSkeleton rows={8} />
        </div>
      ) : !design ? (
        <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
          <Palette className="mx-auto mb-4 h-12 w-12 text-gray-300" />

          <h3 className="font-semibold text-gray-700">
            No custom design found
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            Create a custom design configuration first.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <div
                key={section.title}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                {/* Section Header */}
                <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50/70 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-gray-200">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>

                    <div>
                      <h2 className="font-semibold text-gray-900">
                        {section.title}
                      </h2>

                      <p className="text-xs text-gray-500">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                    Active
                  </span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-16 px-6">
                          SL
                        </TableHead>

                        <TableHead>
                          Design Section
                        </TableHead>

                        <TableHead>
                          Current Design
                        </TableHead>

                        <TableHead className="text-right px-6">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {section.fields.map((field, index) => (
                        <TableRow
                          key={`${section.title}-${field.field}`}
                          className="hover:bg-gray-50/50"
                        >
                          <TableCell className="px-6 text-sm text-gray-400">
                            {String(index + 1).padStart(2, "0")}
                          </TableCell>

                          <TableCell>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {field.label}
                              </p>

                              <p className="text-xs text-gray-400">
                                {field.field}
                              </p>
                            </div>
                          </TableCell>

                          <TableCell>
                            <StatusSelect
                              value={field.value || "Default"}
                              options={field.options}
                              className="w-[160px]"
                              onChange={(value) => {
                                updateDesign(
                                  section.title.toLowerCase(),
                                  field.field,
                                  value || "Default",
                                );
                              }}
                            />
                          </TableCell>

                          <TableCell className="px-6 text-right">
                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                              <Pencil size={14} />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomeDesignList;