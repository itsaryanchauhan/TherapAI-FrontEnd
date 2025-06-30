"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 4,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & { side?: "left" | "right" }) {
  return (
    <TooltipPrimitive.Portal>
      <AnimatePresence>
        <TooltipPrimitive.Content
          data-slot="tooltip-content"
          sideOffset={sideOffset}
          side={props.side || "right"}
          avoidCollisions={false}
          className={cn(
            "bg-white text-gray-800 z-[999] w-fit shadow-md border border-dashed border-gray-400 rounded-md px-3 py-1.5 text-xs text-balance ",
            className
          )}
          style={{ fontFamily: "montserrat" }}
          asChild
          {...props}
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0.9, filter: "blur(5px)" }}
            animate={{ opacity: 1, scaleX: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scaleX: 0.9, filter: "blur(5px)" }}
            transition={{
              duration: 0.15,
              ease: "easeOut"
            }}
          >
            {children}
            <TooltipPrimitive.Arrow className="fill-white bg-white rotate-45 -translate-y-1/2 border-gray-400 border-dashed border-b border-r z-[222222] h-2 w-2" />
          </motion.div>
        </TooltipPrimitive.Content>
      </AnimatePresence>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }