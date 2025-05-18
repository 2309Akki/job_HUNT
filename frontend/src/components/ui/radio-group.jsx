import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

const RadioGroup = ({ className, ...props }) => {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
};

const RadioGroupItem = ({ className, ...props }) => {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "relative flex items-center justify-center size-5 rounded-full border border-gray-400 transition-all focus:ring-0 checked:border-gray-900",
        className
      )}
      {...props}
    >
      {/* Inner filled circle when selected */}
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="size-3 bg-gray-900 rounded-full"
      />
    </RadioGroupPrimitive.Item>
  );
};

export { RadioGroup, RadioGroupItem };
