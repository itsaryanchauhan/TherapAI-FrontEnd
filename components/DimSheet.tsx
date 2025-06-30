"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DimSheetProps {
  Hovered: string | null
}

const DimSheet: React.FC<DimSheetProps> = ({ Hovered }) => {
  return (
    <AnimatePresence>
      {Hovered && (
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: "easeInOut",
            backdropFilter: { duration: 0.6 }
          }}
        >
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DimSheet
