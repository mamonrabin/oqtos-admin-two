/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { Trash, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ColorPicker from "@/reuseble_components/ColorPicker";

export const inventoryTypes = [
  { id: 1, name: "Color", key: "colorInventory" },
  { id: 2, name: "Size", key: "levelInventory" },
  { id: 3, name: "Color - Size", key: "colorLevelInventory" },
  { id: 4, name: "Without Any", key: "inventory" },
];

type InventoryItem = {
  color?: string;
  colorName?: string;
  size?: string;
  quantity: string;
};

type FormValues = {
  inventoryType: string;
  inventories: InventoryItem[];
};

type CreateInventoryProps = {
  control: any;
  register: any;
  watch: any;
  defaultInventoryType?: string;
  defaultInventories?: any[];
};

const getDefaultInventory = (): InventoryItem => ({
  color: "",
  colorName: "",
  size: "",
  quantity: "",
});

export function CreateInventeryType({
  control,
  register,
  watch,
  defaultInventoryType = "",
  defaultInventories = [],
}: CreateInventoryProps) {
  const { fields, append, remove, replace } = useFieldArray<FormValues>({
    control,
    name: "inventories",
  });

  const selectedInventoryType = watch("inventoryType");
  const isInitialized = useRef(false);
  const prevTypeRef = useRef<string>("");

  // ✅ Initialize only once
  useEffect(() => {
    if (isInitialized.current) return;

    if (defaultInventories.length > 0) {
      const formattedInventories = defaultInventories.map((inv: any) => ({
        color: inv.color || "",
        colorName: inv.colorName || "",
        size: inv.size || "",
        quantity: String(inv.quantity || ""),
      }));
      replace(formattedInventories);
      isInitialized.current = true;
    } else if (defaultInventoryType) {
      replace([getDefaultInventory()]);
      isInitialized.current = true;
    } else {
      isInitialized.current = true;
    }
  }, [defaultInventories, defaultInventoryType, replace]);

  // ✅ Handle inventory type changes - FIXED: removed fields.length from deps
  useEffect(() => {
    if (!isInitialized.current) return;
    
    // Track previous type to prevent unnecessary updates
    if (prevTypeRef.current === selectedInventoryType) return;
    prevTypeRef.current = selectedInventoryType || "";

    if (!selectedInventoryType) {
      replace([]);
      return;
    }

    // Only add default inventory if no items exist
    if (fields.length === 0) {
      replace([getDefaultInventory()]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedInventoryType]); // ✅ Only depends on selectedInventoryType

  return (
    <div className="flex flex-col gap-4">
      {/* Inventory Type */}
      <div className="flex flex-col gap-2">
        <p className="text-sm">
          Inventory Type <span className="text-red-600">*</span>
        </p>

        <Controller
          name="inventoryType"
          control={control}
          defaultValue={defaultInventoryType}
          render={({ field }) => (
            <Select 
              value={field.value || defaultInventoryType} 
              onValueChange={(value) => {
                field.onChange(value);
              }}
            >
              <SelectTrigger className="md:w-77 w-full !h-10 rounded">
                <SelectValue placeholder="Select Inventory" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Inventory</SelectLabel>

                  {inventoryTypes.map((item) => (
                    <SelectItem key={item.id} value={item.key}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Inventory Items */}
      {selectedInventoryType &&
        fields.map((field, index) => (
          <div
            key={field.id}
            className="grid md:grid-cols-4 gap-3 border rounded p-4 relative"
          >
            {(selectedInventoryType === "colorInventory" ||
              selectedInventoryType === "colorLevelInventory") && (
              <ColorPicker
                control={control}
                name={`inventories.${index}.color`}
              />
            )}

            {(selectedInventoryType === "colorInventory" ||
              selectedInventoryType === "colorLevelInventory") && (
              <Input
                className="rounded h-9.5!"
                placeholder="Color Name"
                {...register(`inventories.${index}.colorName`)}
                defaultValue={field.colorName}
              />
            )}

            {(selectedInventoryType === "levelInventory" ||
              selectedInventoryType === "colorLevelInventory") && (
              <Input
                className="rounded h-9.5!"
                placeholder="Size"
                {...register(`inventories.${index}.size`)}
                defaultValue={field.size}
              />
            )}

            <Input
              className="rounded h-9.5!"
              placeholder="Quantity"
              type="number"
              {...register(`inventories.${index}.quantity`, {
                required: true,
              })}
              defaultValue={field.quantity}
            />

            {fields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => remove(index)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}

      {/* Add Item */}
      {selectedInventoryType && selectedInventoryType !== "inventory" && (
        <Button
          type="button"
          variant="outline"
          className="w-fit rounded cursor-pointer"
          onClick={() => append(getDefaultInventory())}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      )}
    </div>
  );
}