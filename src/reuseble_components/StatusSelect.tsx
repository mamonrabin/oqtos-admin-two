"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StatusOption = {
  label: string;
  value: string;
};

interface StatusSelectProps {
  value: string;
  options: StatusOption[];
  onChange: (value: string) => void;
  className?: string;
}

const StatusSelect = ({
  value,
  options,
  onChange,
  className,
}: StatusSelectProps) => {
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700 border-green-300";
      case "ADMIN":
        return "bg-green-100 text-green-700 border-green-300";
      case "inactive":
        return "bg-red-100 text-red-700 border-red-300";
      case "STAFF":
        return "bg-red-100 text-red-700 border-red-300";
      // Landing Page Sections
      case "categories":
        return "bg-blue-100 text-blue-700 border-blue-300";

      case "best selling":
        return "bg-emerald-100 text-emerald-700 border-emerald-300";

      case "flash sale":
        return "bg-red-100 text-red-700 border-red-300";

      case "featured products":
        return "bg-purple-100 text-purple-700 border-purple-300";

      case "new arrivals":
        return "bg-cyan-100 text-cyan-700 border-cyan-300";

      case "about":
        return "bg-slate-100 text-slate-700 border-slate-300";

      case "brands":
        return "bg-orange-100 text-orange-700 border-orange-300";

      case "testimonials":
        return "bg-pink-100 text-pink-700 border-pink-300";

      case "faq":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";

      case "newsletter":
        return "bg-indigo-100 text-indigo-700 border-indigo-300";
      // Order Positions
      case "first":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"; // Gold

      case "second":
        return "bg-gray-100 text-gray-800 border-gray-300"; // Silver

      case "third":
        return "bg-orange-100 text-orange-800 border-orange-300"; // Bronze

      case "fourth":
        return "bg-blue-100 text-blue-700 border-blue-300";

      case "fifth":
        return "bg-indigo-100 text-indigo-700 border-indigo-300";

      case "sixth":
        return "bg-violet-100 text-violet-700 border-violet-300";

      case "seventh":
        return "bg-teal-100 text-teal-700 border-teal-300";

      case "eighth":
        return "bg-lime-100 text-lime-700 border-lime-300";

      case "ninth":
        return "bg-rose-100 text-rose-700 border-rose-300";

      case "tenth":
        return "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={`${className ?? "w-[120px] h-8 text-xs"} ${getStatusStyle(
          value,
        )}`}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            // className={getStatusStyle(option.value)}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusSelect;
