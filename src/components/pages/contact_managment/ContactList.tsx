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

import { Trash, FolderOpen } from "lucide-react";

import { toast } from "sonner";
import { TContact } from "@/types";
import TableSkeleton from "@/reuseble_components/TableSkeleton";

import { useState } from "react";
import { useAllContact, useDeleteContact } from "@/hooks/contact.hook";
import ContactMessage from "./ContactMessage";
import Paginations from "@/reuseble_components/Paginations";


const tableHeaders = ["SL", "name", "email", "phone", "message", "Actions"];

const ContactList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: contactList, isLoading } = useAllContact(page, limit);

  const { mutate: deleteContact } = useDeleteContact();

  const contacts = contactList?.data?.data;
  const meta = contactList?.data?.meta;



  const handleDelete = (id: string) => {
    toast("Delete Contact?", {
      description: "This contact will be permanently deleted.",
      action: {
        label: "Delete",
        onClick: () => {
          deleteContact(id, {
            onSuccess: (res: any) => {
              toast.success(res?.message || "Contact deleted successfully");
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message || "Failed to delete about",
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
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2.5 rounded-lg">
            <FolderOpen size={20} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Contact List</h2>
            <p className="text-sm text-gray-500">
              Total <span className="font-semibold text-gray-700">0</span>{" "}
              contact
            </p>
          </div>
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
              {contacts?.length ? (
                contacts.map((contact: TContact, index: number) => (
                  <TableRow
                    key={contact._id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                  >
                    <TableCell className="py-3 px-4 text-sm text-gray-500 font-medium text-center">
                      {index + 1}
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900 capitalize">
                        {contact.name || "N/A"}
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 capitalize">
                        {contact.email || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 capitalize">
                        {contact.phone || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span className="text-sm text-gray-700 capitalize">
                        <ContactMessage contact={contact} />
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(contact._id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 hover:shadow-sm"
                        >
                          <Trash size={16} />
                        </button>
                        {/* <EditAbout about={about} /> */}
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
                        No about found
                      </p>
                      <p className="text-sm text-gray-400">
                        Start by adding your first about
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <div className="py-4 px-4">
        <Paginations
          page={meta?.page}
          limit={meta?.limit}
          total={meta?.total}
          setPage={setPage}
          setLimit={setLimit}
        />
      </div>
    </div>
  );
};

export default ContactList;
