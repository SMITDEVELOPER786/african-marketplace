"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // Cylindrical track styling - pill shape with minimal height
        "peer inline-flex h-6 w-12 shrink-0 items-center rounded-full",
        "transition-all duration-200 ease-in-out",
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        "dark:data-[state=unchecked]:bg-input/80",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Thumb styling - circular but moves within cylindrical track
          "pointer-events-none block h-5 w-5 rounded-full",
          "bg-background shadow-lg ring-0 transition-all duration-200",
          // Position with proper margins to stay within cylindrical track
          "data-[state=unchecked]:translate-x-0.5 data-[state=checked]:translate-x-6",
          "dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground",
          // Subtle scale animation
          "data-[state=checked]:scale-105 data-[state=unchecked]:scale-100"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }