"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const options = ["Today", "This Week", "This Month", "This Year"];

const DaySelector = () => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200 hover:bg-gray-50 transition-colors">
          <Calendar size={16} className="text-gray-400" />
          <span className="text-sm text-gray-700">{selected}</span>
          <ChevronDown size={16} className="text-gray-400" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-44">
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => setSelected(option)}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DaySelector;